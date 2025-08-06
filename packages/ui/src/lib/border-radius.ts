import type { Size } from "./component-config-types";

/**
 * Centralized Border Radius System
 *
 * Provides consistent border-radius values based on size across all components.
 * This ensures visual consistency and reduces duplication in component variants.
 */

/**
 * Standard border radius values for different sizes
 */
export const borderRadiusBySize = {
  xs: "rounded-sm",
  sm: "rounded",
  base: "rounded-md",
  lg: "rounded-lg",
} as const;

/**
 * Get border radius class for a given size
 */
export function getBorderRadius(size: Size): string {
  return borderRadiusBySize[size];
}

/**
 * Border radius variants for use in tailwind-variants
 * Can be used directly in component variant definitions
 */
export const borderRadiusVariants = {
  xs: "rounded-sm",
  sm: "rounded",
  base: "rounded-md",
  lg: "rounded-lg",
} as const;

/**
 * Type for border radius size options
 */
export type BorderRadiusSize = keyof typeof borderRadiusBySize;

/**
 * Extended border radius options including full rounded
 */
export const extendedBorderRadiusVariants = {
  ...borderRadiusVariants,
  full: "rounded-full",
} as const;

/**
 * Get extended border radius class for a given size or full
 */
export function getExtendedBorderRadius(size: Size | "full"): string {
  return extendedBorderRadiusVariants[size];
}
