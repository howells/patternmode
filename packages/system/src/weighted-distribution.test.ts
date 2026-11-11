import { describe, expect, it } from "vitest";

import {
  deriveDistribution,
  getColorLightness,
  isLightColor,
  sanitizeWeight,
} from "./weighted-distribution";

/** WCAG relative luminance of one sRGB grey channel value. */
const greyLuminance = (channel: number) => {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

describe(sanitizeWeight, () => {
  it("keeps positive weights, including fractions", () => {
    expect(sanitizeWeight(3)).toBe(3);
    expect(sanitizeWeight(0.25)).toBe(0.25);
  });

  it("coerces zero, negative, and non-finite weights to 0", () => {
    expect(sanitizeWeight(0)).toBe(0);
    expect(sanitizeWeight(-4)).toBe(0);
    expect(sanitizeWeight(Number.NaN)).toBe(0);
    expect(sanitizeWeight(Number.POSITIVE_INFINITY)).toBe(0);
    expect(sanitizeWeight(Number.NEGATIVE_INFINITY)).toBe(0);
  });
});

describe(deriveDistribution, () => {
  it("derives sanitized weights, total, and unrounded percentages", () => {
    const { sanitized, total, percentages } = deriveDistribution([1, 3]);
    expect(sanitized).toStrictEqual([1, 3]);
    expect(total).toBe(4);
    expect(percentages).toStrictEqual([25, 75]);
  });

  it("leaves percentages unrounded", () => {
    const { percentages } = deriveDistribution([1, 1, 1]);
    expect(percentages[0]).toBeCloseTo(33.333, 3);
  });

  it("sanitizes invalid weights without dropping them (drop is caller policy)", () => {
    const { sanitized, total, percentages } = deriveDistribution([2, -1, Number.NaN, 2]);
    expect(sanitized).toStrictEqual([2, 0, 0, 2]);
    expect(total).toBe(4);
    expect(percentages).toStrictEqual([50, 0, 0, 50]);
  });

  it("returns zeros for an all-zero distribution (equal-weight fallback is caller policy)", () => {
    expect(deriveDistribution([0, 0])).toStrictEqual({
      edges: [0, 0, 0],
      percentages: [0, 0],
      sanitized: [0, 0],
      total: 0,
    });
  });

  it("handles the empty distribution", () => {
    expect(deriveDistribution([])).toStrictEqual({
      edges: [0],
      percentages: [],
      sanitized: [],
      total: 0,
    });
  });

  it("derives cumulative edges from the running weight, ending exactly at 100", () => {
    expect(deriveDistribution([1, 3]).edges).toStrictEqual([0, 25, 100]);
    expect(deriveDistribution([2, -1, 2]).edges).toStrictEqual([0, 50, 50, 100]);
    const { edges } = deriveDistribution([1, 1, 1]);
    expect(edges[1]).toBe((1 / 3) * 100);
    expect(edges[2]).toBe((2 / 3) * 100);
    expect(edges[3]).toBe(100);
  });
});

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

  it("returns null, not a guess, for colors it cannot parse", () => {
    for (const color of [
      "not-a-color",
      "gold",
      "hwb(0 0% 0%)",
      "var(--surface)",
      "color-mix(in oklab, white 50%, black)",
      "rgb(none 0 0)",
      " #fff",
      "#12345",
      "",
    ]) {
      expect({ color, light: isLightColor(color) }).toStrictEqual({ color, light: null });
      expect(getColorLightness(color)).toBeNull();
    }
  });
});
