/**
 * Variant Utility Functions and Pre-configured Component Variants
 *
 * Helper functions and predefined variant configurations for common component types.
 */

import type { TailwindColor } from "./variant-types";

import { buttonSpecificVariants, defaultButtonVariant } from "./button-variants";
import { getVariantClasses } from "./variant-generators";

/**
 * Predefined variant configurations for core component types
 * Components should import utilities and create their own variants
 */
export const componentVariants = {
  // Button uses global variants + button-specific interactive variants
  button: {
    // Global semantic variants with simple styling
    default: defaultButtonVariant,
    ...buttonSpecificVariants,
  },

  // Alert uses global semantic variants
  alert: {
    default: getVariantClasses("default"),
    neutral: getVariantClasses("neutral"),
    success: getVariantClasses("success"),
    info: getVariantClasses("info"),
    warning: getVariantClasses("warning"),
    error: getVariantClasses("error"),
    critical: getVariantClasses("critical"),
    positive: getVariantClasses("positive"),
    negative: getVariantClasses("negative"),
  },
} as const;

/**
 * Enhanced color class generator for any semantic variant or Tailwind color
 * Provides more utility classes than the basic semantic variants
 */
export function getTailwindColorClasses(
  variant: TailwindColor,
) {
  return {
    // Common text colors
    text: `text-${variant}-900 dark:text-${variant}-400`,
    textLight: `text-${variant}-600 dark:text-${variant}-300`,
    textMuted: `text-${variant}-500 dark:text-${variant}-400`,

    // Common background colors
    bg: `bg-${variant}-50 dark:bg-${variant}-950`,
    bgSolid: `bg-${variant}-500 dark:bg-${variant}-500`,
    bgMuted: `bg-${variant}-100 dark:bg-${variant}-900`,

    // Common border colors
    border: `border-${variant}-200 dark:border-${variant}-800`,
    borderSolid: `border-${variant}-500 dark:border-${variant}-500`,

    // Raw color name for custom usage
    color: variant,
  };
}
