import { describe, expect, it } from "vitest";

import { deriveDistribution, isLightColor, sanitizeWeight } from "./weighted-distribution";

describe("sanitizeWeight", () => {
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

describe("deriveDistribution", () => {
  it("derives sanitized weights, total, and unrounded percentages", () => {
    const { sanitized, total, percentages } = deriveDistribution([1, 3]);
    expect(sanitized).toEqual([1, 3]);
    expect(total).toBe(4);
    expect(percentages).toEqual([25, 75]);
  });

  it("leaves percentages unrounded", () => {
    const { percentages } = deriveDistribution([1, 1, 1]);
    expect(percentages[0]).toBeCloseTo(33.333, 3);
  });

  it("sanitizes invalid weights without dropping them (drop is caller policy)", () => {
    const { sanitized, total, percentages } = deriveDistribution([2, -1, Number.NaN, 2]);
    expect(sanitized).toEqual([2, 0, 0, 2]);
    expect(total).toBe(4);
    expect(percentages).toEqual([50, 0, 0, 50]);
  });

  it("returns zeros for an all-zero distribution (equal-weight fallback is caller policy)", () => {
    expect(deriveDistribution([0, 0])).toEqual({
      percentages: [0, 0],
      sanitized: [0, 0],
      total: 0,
    });
  });

  it("handles the empty distribution", () => {
    expect(deriveDistribution([])).toEqual({ percentages: [], sanitized: [], total: 0 });
  });
});

describe("isLightColor", () => {
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
   * `isLightColor` hands hue/saturation/lightness straight to colorscope's
   * `hslToRgb` without normalizing them, because as of
   * `@instruments/colorscope@3.17.0` the library clamps and wraps at the root.
   * These cases are the proof of that floor rather than a test of our own
   * arithmetic. Below 3.17.0 an unwrapped hue falls through `hslToRgb`'s
   * `< 60`/`< 120` sector chain into the final 300–360 branch, and a negative
   * saturation is used as-is — so both return a confidently wrong colour with no
   * error and no malformed output. They are here so a floor that silently
   * resolves back down is caught by the suite rather than by a consumer.
   *
   * Every input below was chosen because it flips the boolean between 3.7.1 and
   * 3.17.0 — verified by running both. Values that merely *look* out of range
   * are not enough: most of them land the same side of the 0.62 threshold either
   * way and would pass against the broken library, which is a test that cannot
   * fail. Over-range *lightness* has no such input at all, so it is deliberately
   * not asserted here.
   */
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
    // -100% clamps to 0 — a mid grey below the threshold. Used raw it produced a
    // saturated colour that read as light.
    expect(isLightColor("hsl(120, -100%, 50%)")).toBe(false);
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

  it("returns false for colors that cannot be parsed", () => {
    expect(isLightColor("not-a-color")).toBe(false);
    expect(isLightColor("var(--surface)")).toBe(false);
  });
});
