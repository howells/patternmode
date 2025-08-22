/**
 * Universal sizes used across all components
 */
export const SIZES = ["2xs", "xs", "sm", "base", "lg"] as const;

export type Size = (typeof SIZES)[number];