import { hexLightness } from "@instruments/colorscope/math";

/**
 * Shared logic for rendering weighted color segments — the one place that owns
 * how a raw distribution value is sanitized, totalled, and turned into a
 * percentage, plus the single contrast decision for whether a color reads as
 * light. Both Swatch's Distribution Bar and Parquet's Tiles derive through here
 * instead of re-implementing the math, so the same input reads the same way in
 * one and two dimensions.
 */

/**
 * Treats a single distribution weight as a non-negative number: non-finite or
 * negative values become `0`. A `0` stays `0` — dropping zero-weight entries is
 * the caller's policy (Parquet filters them out; Distribution Bar keeps them as
 * identity-bearing zero-width segments).
 */
export const sanitizeWeight = (value: number): number =>
  Number.isFinite(value) && value > 0 ? value : 0;

/** The sanitized weights, their total, and each weight's share of the total. */
export interface DerivedDistribution {
  /** Input values with non-finite or negative entries coerced to `0`. */
  sanitized: number[];
  /** Sum of the sanitized weights. */
  total: number;
  /**
   * Each sanitized weight as an unrounded percentage (0–100) of the total.
   * When the total is `0`, every percentage is `0` — any equal-weight fallback
   * for an all-zero distribution is the caller's policy.
   */
  percentages: number[];
}

/**
 * Derives the sanitized weights, total, and unrounded percentages for one
 * weighted distribution. Pure: callers round percentages for display and decide
 * whether to drop or keep zero-weight entries.
 */
export const deriveDistribution = (values: number[]): DerivedDistribution => {
  const sanitized = values.map(sanitizeWeight);
  const total = sanitized.reduce((sum, weight) => sum + weight, 0);
  const percentages = sanitized.map((weight) => (total > 0 ? (weight / total) * 100 : 0));

  return { percentages, sanitized, total };
};

/** Perceptual (OKLab) lightness above which a color reads as "light". */
const LIGHT_LIGHTNESS_THRESHOLD = 0.62;

/**
 * Whether a color reads as light, by perceptual (OKLab) lightness above a
 * single shared threshold — so contrast treatment (e.g. dark foreground over a
 * light fill) is decided the same way wherever a weighted color is rendered.
 * Returns `false` for colors colorscope cannot parse.
 */
export const isLightColor = (color: string): boolean => {
  const lightness = hexLightness(color);
  return Number.isFinite(lightness) && lightness > LIGHT_LIGHTNESS_THRESHOLD;
};
