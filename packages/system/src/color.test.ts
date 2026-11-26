import { describe, expect, it } from "vitest";

import { fitOklabToSrgbGamut } from "./color-gamut";
import {
  getColorLightness,
  hexToHsl,
  hexToOklab,
  hexToRgb,
  hslToHex,
  hslToRgb,
  isLightColor,
  oklabDistance,
  oklabToHex,
  oklabToLinearRgb,
  oklabToOklch,
  oklchToOklab,
  rgbToHex,
  rgbToOklab,
} from "./color";

describe("hex and HSL conversions", () => {
  it("accepts short, long, uppercase and hashless hex", () => {
    for (const hex of ["#f80", "f80", "#FF8800", "ff8800"]) {
      expect(hexToRgb(hex)).toStrictEqual({ b: 0, g: 136, r: 255 });
    }
    expect(rgbToHex(-10, 127.5, 300)).toBe("#0080ff");
  });

  it("keeps invalid hex unresolved, including alpha and partial parses", () => {
    for (const hex of [
      "",
      "#12",
      "#ggg",
      "#12345g",
      "#1234",
      "#12345678",
      " #fff",
      "#fff\n",
      "red",
    ]) {
      expect(hexToRgb(hex)).toBeNull();
      expect(hexToOklab(hex)).toBeNull();
      expect(hexToHsl(hex)).toBeNull();
    }
  });

  it("encodes the six hue sectors and wraps positive and negative turns", () => {
    const primaries = ["#ff0000", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"];
    for (const [sector, hex] of primaries.entries()) {
      for (const turn of [-720, 0, 720]) {
        expect(hslToHex(sector * 60 + turn, 100, 50)).toBe(hex);
      }
    }
    expect(hslToHex(400, 100, 40)).toBe("#cc8800");
    expect(hslToRgb(240, 100, 50)).toStrictEqual({ b: 255, g: 0, r: 0 });
  });

  it("clamps bounded HSL channels and rejects non-finite channels", () => {
    expect(hslToHex(720, 200, -20)).toBe("#000000");
    expect(hslToHex(-40, -100, 150)).toBe("#ffffff");
    for (const invalid of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
      expect(() => hslToRgb(invalid, 50, 50)).toThrow(TypeError);
      expect(() => hslToRgb(0, invalid, 50)).toThrow(TypeError);
      expect(() => hslToRgb(0, 50, invalid)).toThrow(TypeError);
    }
  });

  it("returns rounded HSL channels with neutral hue and hue below 360", () => {
    expect(hexToHsl("#808080")).toStrictEqual({ h: 0, l: 50, s: 0 });
    expect(hexToHsl("#ff0001")).toStrictEqual({ h: 0, l: 50, s: 100 });
    expect(hexToHsl("#00ff00")).toStrictEqual({ h: 120, l: 50, s: 100 });
    expect(hexToHsl("#0000ff")).toStrictEqual({ h: 240, l: 50, s: 100 });
  });
});

describe("perceptual colour conversions", () => {
  it("matches the published OKLab red reference", () => {
    const lab = rgbToOklab(255, 0, 0);
    expect(lab.L).toBeCloseTo(0.627955, 6);
    expect(lab.a).toBeCloseTo(0.224863, 6);
    expect(lab.b).toBeCloseTo(0.125846, 6);
    expect(hexToOklab("#f00")?.L).toBe(lab.L);
    expect(oklabToHex(lab)).toBe("#ff0000");
  });

  it("round-trips a spread of sRGB colours through OKLab", () => {
    for (const r of [0, 32, 128, 200, 255]) {
      for (const g of [0, 64, 128, 192, 255]) {
        for (const b of [0, 50, 128, 220, 255]) {
          expect(oklabToHex(rgbToOklab(r, g, b))).toBe(rgbToHex(r, g, b));
        }
      }
    }
    expect(oklabDistance({ L: 0, a: 0, b: 0 }, { L: 0, a: 0.3, b: 0.4 })).toBe(0.5);
  });

  it("uses degrees for OKLCh and preserves lightness", () => {
    const lab = oklchToOklab({ C: 0.2, L: 0.6, h: 450 });
    expect(lab.L).toBe(0.6);
    expect(lab.a).toBeCloseTo(0, 12);
    expect(lab.b).toBeCloseTo(0.2, 12);
  });
});

describe("sRGB gamut fitting", () => {
  it("keeps an in-gamut colour intact", () => {
    const lab = rgbToOklab(128, 100, 80);
    expect(fitOklabToSrgbGamut(lab)).toBe(lab);
  });

  it("stays correct after the chroma-limit cache evicts its oldest entries", () => {
    const probe = oklchToOklab({ C: 0.5, L: 0.5, h: 10 });
    const first = fitOklabToSrgbGamut(probe);
    for (let step = 1; step <= 4200; step += 1) {
      fitOklabToSrgbGamut(oklchToOklab({ C: 0.5, L: 0.2 + step / 10_000, h: 20 + (step % 300) }));
    }

    expect(fitOklabToSrgbGamut(probe)).toStrictEqual(first);
  });

  it("reduces chroma without shifting hue or lightness", () => {
    for (const L of [0.08, 0.34, 0.6, 0.82, 0.97]) {
      for (const h of [0, 45, 90, 135, 180, 225, 270, 315]) {
        const fitted = fitOklabToSrgbGamut(oklchToOklab({ C: 0.5, L, h }));
        const polar = oklabToOklch(fitted);
        expect(fitted.L).toBe(L);
        expect(polar.C).toBeLessThan(0.5);
        expect(polar.h).toBeCloseTo(h, 8);
        for (const channel of Object.values(oklabToLinearRgb(fitted))) {
          expect(channel).toBeGreaterThanOrEqual(-1e-8);
          expect(channel).toBeLessThanOrEqual(1 + 1e-8);
        }
      }
    }
  });

  it("maps out-of-range lightness to black or white", () => {
    expect(oklabToHex(fitOklabToSrgbGamut({ L: -1, a: 0.3, b: 0.2 }))).toBe("#000000");
    expect(oklabToHex(fitOklabToSrgbGamut({ L: 2, a: 0.3, b: 0.2 }))).toBe("#ffffff");
  });
});

/** WCAG relative luminance of one sRGB grey channel value. */
const greyLuminance = (channel: number) => {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

describe(isLightColor, () => {
  it("treats high perceptual lightness as light", () => {
    expect(isLightColor("#ffffff")).toBe(true);
    expect(isLightColor("#f5f5f5")).toBe(true);
  });

  it("treats low perceptual lightness as not light", () => {
    expect(isLightColor("#000000")).toBe(false);
    expect(isLightColor("#222222")).toBe(false);
  });

  it("detects light and dark tones for 3-digit hex", () => {
    expect(isLightColor("#fff")).toBe(true);
    expect(isLightColor("#1d1d1b")).toBe(false);
  });

  it("parses rgb() and rgba() in comma and space syntax", () => {
    expect(isLightColor("rgb(255, 255, 255)")).toBe(true);
    expect(isLightColor("rgb(20 20 20)")).toBe(false);
    expect(isLightColor("rgba(250, 250, 250, 0.9)")).toBe(true);
    expect(isLightColor("rgb(90% 90% 90% / 0.5)")).toBe(true);
  });

  it("resolves hsl() and hsla() through perceptual lightness", () => {
    expect(isLightColor("hsl(0, 0%, 95%)")).toBe(true);
    expect(isLightColor("hsl(220 60% 20%)")).toBe(false);
    // Same HSL lightness, opposite perceptual tone: vivid yellow vs vivid blue.
    expect(isLightColor("hsla(60, 100%, 50%, 1)")).toBe(true);
    expect(isLightColor("hsl(240, 100%, 50%)")).toBe(false);
  });

  /*
   * The threshold is the WCAG crossover where black and white text tie, so a
   * grey just either side of it must pick whichever text colour actually has
   * more contrast. #767676 is the first sRGB grey where black wins (4.62:1
   * against 4.54:1 for white); #757575 is the last where white wins.
   */
  it("flips at the contrast crossover between black and white text", () => {
    expect(isLightColor("#757575")).toBe(false);
    expect(isLightColor("#767676")).toBe(true);
    // Mid greys the old 0.62 threshold sent to white text, at lower contrast.
    expect(isLightColor("#808080")).toBe(true);
    expect(isLightColor("#858585")).toBe(true);
  });

  it("picks the higher-contrast text colour for every sRGB grey", () => {
    for (let channel = 0; channel <= 255; channel += 1) {
      const hex = channel.toString(16).padStart(2, "0");
      const luminance = greyLuminance(channel);
      const blackTextContrast = (luminance + 0.05) / 0.05;
      const whiteTextContrast = 1.05 / (luminance + 0.05);

      expect({ channel, light: isLightColor(`#${hex}${hex}${hex}`) }).toStrictEqual({
        channel,
        light: blackTextContrast > whiteTextContrast,
      });
    }
  });

  // These inputs cross the foreground threshold if hue wrapping or saturation
  // clamping is lost, so they protect visible contrast rather than only arithmetic.
  it("wraps out-of-range hue rather than picking the wrong hue sector", () => {
    /*
     * 400° is 40° — a light orange. Below the floor, an unwrapped hue fell past
     * every `< 60`/`< 120`… test and landed in the final 300–360 branch, so this
     * came back a darker magenta and the answer inverted.
     */
    expect(isLightColor("hsl(400, 100%, 40%)")).toBe(true);
    expect(isLightColor("hsl(400, 100%, 40%)")).toBe(isLightColor("hsl(40, 100%, 40%)"));
    // 600° is 240°, a deep blue — the fall-through magenta reads light, blue does not.
    expect(isLightColor("hsl(600, 100%, 50%)")).toBe(false);
    // Negative hues wrap the other way: -40° is 320°, -120° is 240°.
    expect(isLightColor("hsl(-40, 100%, 50%)")).toBe(true);
    expect(isLightColor("hsl(-120, 100%, 50%)")).toBe(false);
  });

  it("clamps out-of-range saturation", () => {
    // -100% clamps to 0, a dark grey (#666, L 0.51) below the threshold. Used
    // raw it produced a saturated magenta (L 0.59) that read as light.
    expect(isLightColor("hsl(120, -100%, 40%)")).toBe(false);
  });

  it("uses the L channel directly for oklch() and oklab()", () => {
    expect(isLightColor("oklch(0.85 0.1 150)")).toBe(true);
    expect(isLightColor("oklch(90% 0.05 120)")).toBe(true);
    expect(isLightColor("oklab(40% 0.1 0.1)")).toBe(false);
    expect(isLightColor("oklab(0.3 0 0)")).toBe(false);
  });

  it("resolves the named colors white, black, and transparent", () => {
    expect(isLightColor("white")).toBe(true);
    expect(isLightColor("WHITE")).toBe(true);
    expect(isLightColor("black")).toBe(false);
    expect(isLightColor("transparent")).toBe(false);
  });

  it("reads 4- and 8-digit hex, ignoring alpha", () => {
    expect(isLightColor("#ffffff80")).toBe(true);
    expect(isLightColor("#fff8")).toBe(true);
    expect(isLightColor("#00000080")).toBe(false);
    expect(isLightColor("#0008")).toBe(false);
    expect(getColorLightness("#ff000080")).toBe(getColorLightness("#ff0000"));
  });

  it("trims surrounding whitespace around hex", () => {
    expect(isLightColor(" #fff ")).toBe(true);
    expect(getColorLightness("\n#000000\t")).toBe(0);
  });

  it("returns null, not a guess, for colors it cannot parse", () => {
    for (const color of [
      "not-a-color",
      "gold",
      "hwb(0 0% 0%)",
      "var(--surface)",
      "color-mix(in oklab, white 50%, black)",
      "rgb(none 0 0)",
      "#12345",
      "#fffz",
      "#ffffff0z",
      "#ggg",
      "",
    ]) {
      expect({ color, light: isLightColor(color) }).toStrictEqual({ color, light: null });
      expect(getColorLightness(color)).toBeNull();
    }
  });
});
