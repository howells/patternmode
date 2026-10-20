import { describe, expect, it } from "vitest";

import { fitOklabToSrgbGamut } from "./color-gamut";
import {
  hexLightness,
  hexToHsl,
  hexToOklab,
  hexToRgb,
  hslToHex,
  hslToRgb,
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
      expect(hexLightness(hex)).toBe(0);
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
    expect(hexLightness("#f00")).toBe(lab.L);
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
