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

  it("returns false for colors that cannot be parsed", () => {
    expect(isLightColor("not-a-color")).toBe(false);
  });
});
