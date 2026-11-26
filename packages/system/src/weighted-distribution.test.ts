import { describe, expect, it } from "vitest";

import { deriveDistribution, sanitizeWeight } from "./weighted-distribution";

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
