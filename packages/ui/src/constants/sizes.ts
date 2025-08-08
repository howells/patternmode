/**
 * Universal sizes used across all components
 */
export const SIZES = ["2xs", "xs", "sm", "base", "lg"] as const;

export type Size = typeof SIZES[number];

/**
 * Human-readable labels for sizes
 */
export const SIZE_LABELS: Record<Size, string> = {
  "2xs": "2X Small",
  xs: "X Small",
  sm: "Small",
  base: "Base",
  lg: "Large",
} as const;
