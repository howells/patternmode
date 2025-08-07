/**
 * Shared spacing utilities for consistent spacing across components.
 *
 * This module provides standardized spacing types and tailwind-variants
 * configurations to eliminate duplication across components.
 */

import { tv } from "tailwind-variants";

/**
 * Standard spacing values using 4px grid scale.
 * Used for padding, gap, and other spacing properties.
 */
export type SpacingValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;

/**
 * Gap values including negative spacing for overlapping elements.
 */
export type GapValue = SpacingValue | -6 | -5 | -4 | -3 | -2 | -1;

/**
 * Responsive value type for spacing properties.
 * Allows specifying different values for different screen sizes.
 * Supports both min-width (sm, md, lg, xl, 2xl) and max-width (max-sm, max-md, max-lg, max-xl) breakpoints.
 */
export type ResponsiveSpacing<T> = T | {
  /**
   * Default value (mobile-first).
   */
  "default"?: T;
  /**
   * Small screens (640px+).
   */
  "sm"?: T;
  /**
   * Medium screens (768px+).
   */
  "md"?: T;
  /**
   * Large screens (1024px+).
   */
  "lg"?: T;
  /**
   * Extra large screens (1280px+).
   */
  "xl"?: T;
  /**
   * 2X large screens (1536px+).
   */
  "2xl"?: T;
  /**
   * Max small screens (639px and below).
   */
  "max-sm"?: T;
  /**
   * Max medium screens (767px and below).
   */
  "max-md"?: T;
  /**
   * Max large screens (1023px and below).
   */
  "max-lg"?: T;
  /**
   * Max extra large screens (1279px and below).
   */
  "max-xl"?: T;
};

/**
 * Shared padding variants for tailwind-variants.
 * Can be used in any component that needs consistent padding.
 */
export const paddingVariants = {
  0: "p-0",
  1: "p-1", // 4px
  2: "p-2", // 8px
  3: "p-3", // 12px
  4: "p-4", // 16px
  5: "p-5", // 20px
  6: "p-6", // 24px
  8: "p-8", // 32px
  10: "p-10", // 40px
  12: "p-12", // 48px
  16: "p-16", // 64px
  20: "p-20", // 80px
  24: "p-24", // 96px
} as const;

/**
 * Shared gap variants for tailwind-variants.
 * Includes negative values for overlapping elements.
 */
export const gapVariants = {
  "0": "gap-0",
  "1": "gap-1", // 4px
  "2": "gap-2", // 8px
  "3": "gap-3", // 12px
  "4": "gap-4", // 16px
  "5": "gap-5", // 20px
  "6": "gap-6", // 24px
  "8": "gap-8", // 32px
  "10": "gap-10", // 40px
  "12": "gap-12", // 48px
  "16": "gap-16", // 64px
  "20": "gap-20", // 80px
  "24": "gap-24", // 96px
  "-6": "", // -24px negative spacing (handled by compoundVariants)
  "-5": "", // -20px negative spacing (handled by compoundVariants)
  "-4": "", // -16px negative spacing (handled by compoundVariants)
  "-3": "", // -12px negative spacing (handled by compoundVariants)
  "-2": "", // -8px negative spacing (handled by compoundVariants)
  "-1": "", // -4px negative spacing (handled by compoundVariants)
} as const;

/**
 * Base spacing variants that can be extended by components.
 * Provides consistent padding and gap handling.
 */
export const spacingVariants = tv({
  variants: {
    padding: paddingVariants,
    gap: gapVariants,
  },
});

/**
 * Helper function to generate responsive spacing classes.
 * Handles breakpoint-specific spacing values.
 */
export const generateResponsiveSpacingClasses = (
  property: "padding" | "gap",
  value: ResponsiveSpacing<SpacingValue | GapValue> | undefined,
): string => {
  if (!value || typeof value !== "object") {
    return "";
  }

  const classes: string[] = [];
  const breakpoints = {
    "sm": "sm:",
    "md": "md:",
    "lg": "lg:",
    "xl": "xl:",
    "2xl": "2xl:",
  };

  Object.entries(value).forEach(([breakpoint, val]) => {
    if (val === undefined) {
      return;
    }

    const prefix = breakpoints[breakpoint as keyof typeof breakpoints] || "";

    if (property === "padding") {
      classes.push(`${prefix}p-${val}`);
    }
    else if (property === "gap") {
      const normalizedVal = String(val);
      classes.push(`${prefix}gap-${normalizedVal}`);
    }
  });

  return classes.join(" ");
};

/**
 * Helper function to get the base value from a responsive value.
 * Returns the non-responsive value or the smallest breakpoint value.
 */
export const getBaseSpacingValue = <T>(
  value: ResponsiveSpacing<T> | undefined,
): T | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (typeof value === "object" && value !== null) {
    const responsiveObj = value as {
      "sm"?: T;
      "md"?: T;
      "lg"?: T;
      "xl"?: T;
      "2xl"?: T;
    };
    return responsiveObj.sm;
  }
  return value as T;
};

/**
 * Utility function to create a padding class string from a spacing value.
 * Useful for components that need to apply padding conditionally.
 */
export const getPaddingClass = (value: SpacingValue): string => {
  return paddingVariants[value];
};

/**
 * Utility function to create a gap class string from a gap value.
 * Useful for components that need to apply gap conditionally.
 */
export const getGapClass = (value: GapValue): string => {
  const normalizedValue = String(value) as keyof typeof gapVariants;
  return gapVariants[normalizedValue] || `gap-${value}`;
};
