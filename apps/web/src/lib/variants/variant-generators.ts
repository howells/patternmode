/**
 * Dynamic Variant Generation Utilities
 *
 * Functions for generating color classes and variants at runtime,
 * supporting both semantic variants and custom Tailwind colors.
 */

import type { ClassValue } from "clsx";

import type {
  ColorClassOptions,
  SemanticVariant,

  TailwindColor,
  TailwindShade,
} from "./variant-types";

import { semanticVariants } from "./semantic-variants";

/**
 * Generate comprehensive color classes for backgrounds, text, borders, and rings
 */
export function generateColorClasses(options: ColorClassOptions): {
  light: { bg: string; text: string; border: string; ring: string };
  dark: { bg: string; text: string; border: string; ring: string };
} {
  const { color, shade = 500, bgOpacity, borderOpacity } = options;

  // If it's a global semantic variant, use predefined mappings
  if (color in semanticVariants) {
    return semanticVariants[color as SemanticVariant];
  }

  // If it's any semantic variant (including button-specific), use combined mappings
  if (color in semanticVariants) {
    return semanticVariants[color as SemanticVariant];
  }

  // Generate classes for custom Tailwind colors
  const bgShade = shade <= 500 ? 50 : 900;
  const textShade = shade <= 500 ? 900 : 50;
  const borderShade = shade;

  const bgOpacityStr = bgOpacity ? `/${bgOpacity}` : "";
  const borderOpacityStr = borderOpacity ? `/${borderOpacity}` : "/30";

  return {
    light: {
      bg: `bg-${color}-${bgShade}${bgOpacityStr}`,
      text: `text-${color}-${textShade}`,
      border: `border-${color}-${borderShade}${borderOpacityStr}`,
      ring: `ring-${color}-${borderShade}${borderOpacityStr}`,
    },
    dark: {
      bg: `dark:bg-${color}-400/10`,
      text: `dark:text-${color}-400`,
      border: `dark:border-${color}-400${borderOpacityStr}`,
      ring: `dark:ring-${color}-400${borderOpacityStr}`,
    },
  };
}

/**
 * Utility to get variant classes as array for tailwind-variants
 */
export function getVariantClasses(
  variant: SemanticVariant | TailwindColor,
  options?: Omit<ColorClassOptions, "color">,
): ClassValue[] {
  const colors = generateColorClasses({ color: variant, ...options });

  return [
    colors.light.bg,
    colors.light.text,
    colors.light.border,
    colors.light.ring,
    colors.dark.bg,
    colors.dark.text,
    colors.dark.border,
    colors.dark.ring,
  ];
}

/**
 * Helper to create custom color variants at runtime
 * Useful for allowing users to specify any Tailwind color
 */
export function createCustomVariant(
  color: TailwindColor,
  shade?: TailwindShade,
  options?: Omit<ColorClassOptions, "color" | "shade">,
): ClassValue[] {
  return getVariantClasses(color, { shade, ...options });
}
