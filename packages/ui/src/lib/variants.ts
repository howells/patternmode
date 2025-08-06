/**
 * Centralized Variant System
 *
 * This file provides a unified approach to component variants and color handling
 * across the entire design system. It includes:
 *
 * 1. Semantic variant definitions (success, error, warning, etc.)
 * 2. Utilities for generating Tailwind color classes
 * 3. Consistent variant mappings for different component types
 */

import type { ClassValue } from "clsx";

// Global semantic variant types (used by all components)
export type GlobalSemanticVariant
  = | "default"
    | "neutral"
    | "success"
    | "info"
    | "warning"
    | "error"
    | "critical"
    | "positive"
    | "negative";

// Button-specific variants
export type ButtonVariant
  = | "primary"
    | "secondary"
    | "destructive"
    | "outline"
    | "outline-dashed"
    | "ghost"
    | "inverse-ghost"
    | "link"
    | "minimal";

// Remove component-specific types - components should define their own

// Combined semantic variant types
export type SemanticVariant = GlobalSemanticVariant | ButtonVariant;

// Tailwind color names - comprehensive list
export type TailwindColor
  = | "slate"
    | "gray"
    | "zinc"
    | "neutral"
    | "stone"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose";

// Tailwind color shades
export type TailwindShade
  = | 50
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900
    | 950;

/**
 * Global semantic variant color mappings
 * These provide consistent colors across all components
 */
export const globalSemanticVariants = {
  default: {
    light: {
      bg: "bg-blue-50",
      text: "text-blue-900",
      border: "border-blue-500/30",
      ring: "ring-blue-500/30",
    },
    dark: {
      bg: "dark:bg-blue-400/10",
      text: "dark:text-blue-400",
      border: "dark:border-blue-400/30",
      ring: "dark:ring-blue-400/30",
    },
  },
  neutral: {
    light: {
      bg: "bg-slate-50",
      text: "text-slate-900",
      border: "border-slate-200",
      ring: "ring-slate-200",
    },
    dark: {
      bg: "dark:bg-slate-800",
      text: "dark:text-slate-100",
      border: "dark:border-slate-700",
      ring: "dark:ring-slate-700",
    },
  },
  success: {
    light: {
      bg: "bg-emerald-50",
      text: "text-emerald-900",
      border: "border-emerald-600/30",
      ring: "ring-emerald-600/30",
    },
    dark: {
      bg: "dark:bg-emerald-400/10",
      text: "dark:text-emerald-400",
      border: "dark:border-emerald-400/30",
      ring: "dark:ring-emerald-400/30",
    },
  },
  info: {
    light: {
      bg: "bg-sky-50",
      text: "text-sky-900",
      border: "border-sky-600/30",
      ring: "ring-sky-600/30",
    },
    dark: {
      bg: "dark:bg-sky-400/10",
      text: "dark:text-sky-400",
      border: "dark:border-sky-400/30",
      ring: "dark:ring-sky-400/30",
    },
  },
  warning: {
    light: {
      bg: "bg-amber-50",
      text: "text-amber-900",
      border: "border-amber-600/30",
      ring: "ring-amber-600/30",
    },
    dark: {
      bg: "dark:bg-amber-400/10",
      text: "dark:text-amber-400",
      border: "dark:border-amber-400/30",
      ring: "dark:ring-amber-400/30",
    },
  },
  error: {
    light: {
      bg: "bg-red-50",
      text: "text-red-900",
      border: "border-red-600/30",
      ring: "ring-red-600/30",
    },
    dark: {
      bg: "dark:bg-red-400/10",
      text: "dark:text-red-400",
      border: "dark:border-red-400/30",
      ring: "dark:ring-red-400/30",
    },
  },
  critical: {
    light: {
      bg: "bg-rose-50",
      text: "text-rose-900",
      border: "border-rose-600/30",
      ring: "ring-rose-600/30",
    },
    dark: {
      bg: "dark:bg-rose-400/10",
      text: "dark:text-rose-400",
      border: "dark:border-rose-400/30",
      ring: "dark:ring-rose-400/30",
    },
  },
  positive: {
    light: {
      bg: "bg-teal-50",
      text: "text-teal-900",
      border: "border-teal-600/30",
      ring: "ring-teal-600/30",
    },
    dark: {
      bg: "dark:bg-teal-400/10",
      text: "dark:text-teal-400",
      border: "dark:border-teal-400/30",
      ring: "dark:ring-teal-400/30",
    },
  },
  negative: {
    light: {
      bg: "bg-rose-50",
      text: "text-rose-900",
      border: "border-rose-600/30",
      ring: "ring-rose-600/30",
    },
    dark: {
      bg: "dark:bg-rose-400/10",
      text: "dark:text-rose-400",
      border: "dark:border-rose-400/30",
      ring: "dark:ring-rose-400/30",
    },
  },
} as const;

/**
 * Button-specific variant styling
 * These are complex interactive styles specific to buttons
 */
export const buttonSpecificVariants = {
  "secondary": [
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // background color
    "bg-zinc-100 dark:bg-zinc-800",
    // hover
    "hover:bg-zinc-200",
    "dark:hover:bg-zinc-700",
    // disabled
    "disabled:bg-zinc-50 disabled:text-zinc-400",
    "dark:disabled:bg-zinc-900 dark:disabled:text-zinc-600",
  ],
  "destructive": [
    // inset border
    "inset-ring-1 inset-ring-white/20",
    "dark:inset-ring-white/10",
    // text color
    "text-white dark:text-white",
    // background color
    "bg-red-500 dark:bg-red-900",
    // hover with enhanced inset border
    "hover:bg-red-600 hover:inset-ring-white/25",
    "dark:hover:bg-red-800 dark:hover:inset-ring-white/15",
    // disabled
    "disabled:bg-red-300 disabled:text-white disabled:inset-ring-white/15",
    "dark:disabled:bg-red-950 dark:disabled:text-red-400 dark:disabled:inset-ring-white/5",
  ],
  "outline": [
    // border (use default form control border color)
    "border-zinc-200 dark:border-zinc-800",
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // background color
    "bg-white dark:bg-zinc-950",
    // hover with enhanced border
    "hover:bg-zinc-50 hover:border-zinc-300",
    "dark:hover:bg-zinc-900 dark:hover:border-zinc-700",
    // disabled
    "disabled:text-zinc-400 disabled:border-zinc-200",
    "dark:disabled:text-zinc-600 dark:disabled:border-zinc-800",
  ],
  "outline-dashed": [
    // dashed border
    "border-2 border-dashed",
    "dark:border-zinc-600",
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // background color
    "bg-white dark:bg-zinc-950",
    // hover with enhanced border
    "hover:bg-zinc-100 hover:border-zinc-400",
    "dark:hover:bg-zinc-800 dark:hover:border-zinc-500",
    // disabled
    "disabled:text-zinc-400 disabled:",
    "dark:disabled:text-zinc-600 dark:disabled:border-zinc-700",
  ],
  "ghost": [
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // hover with just background, no border
    "bg-transparent hover:bg-zinc-100",
    "dark:hover:bg-zinc-800",
    // disabled
    "disabled:text-zinc-400",
    "dark:disabled:text-zinc-600",
  ],
  "inverse-ghost": [
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // hover and active with white background for light backgrounds
    "bg-transparent hover:bg-white active:bg-white",
    "dark:hover:bg-zinc-800 dark:active:bg-zinc-800",
    // current/selected state with white background
    "data-[current=true]:bg-white",
    "dark:data-[current=true]:bg-zinc-800",
    // disabled
    "disabled:text-zinc-400",
    "dark:disabled:text-zinc-600",
  ],
  "link": [
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // hover color
    "bg-transparent hover:underline hover:underline-offset-3 decoration-current/25",
    // disabled
    "disabled:text-zinc-400",
    "dark:disabled:text-zinc-600",
  ],
  "minimal": [
    // base - completely transparent
    "bg-transparent",
    // text color
    "text-zinc-950 dark:text-white",
    // hover - no background change, just subtle opacity
    "hover:text-zinc-700 dark:hover:text-zinc-300",
    // disabled
    "disabled:text-zinc-400 dark:disabled:text-zinc-600",
  ],
} as const;

// Combined semantic variants (for backward compatibility)
export const semanticVariants = {
  ...globalSemanticVariants,
  // Button variants get simple neutral styling for non-button components
  "primary": globalSemanticVariants.default,
  "secondary": globalSemanticVariants.neutral,
  "destructive": globalSemanticVariants.error,
  "outline": globalSemanticVariants.neutral,
  "outline-dashed": globalSemanticVariants.neutral,
  "ghost": globalSemanticVariants.neutral,
  "inverse-ghost": globalSemanticVariants.neutral,
  "link": globalSemanticVariants.default,
  "minimal": globalSemanticVariants.neutral,
} as const;

/**
 * Generate color classes for any Tailwind color
 * Supports both semantic variants and custom colors
 */
export type ColorClassOptions = {
  /** The color to use - can be semantic variant or Tailwind color */
  color: SemanticVariant | TailwindColor;
  /** Custom shade for Tailwind colors (ignored for semantic variants) */
  shade?: TailwindShade;
  /** Opacity for background colors */
  bgOpacity?: number;
  /** Opacity for border/ring colors */
  borderOpacity?: number;
};

/**
 * Generate comprehensive color classes for backgrounds, text, borders, and rings
 */
export function generateColorClasses(options: ColorClassOptions): {
  light: { bg: string; text: string; border: string; ring: string };
  dark: { bg: string; text: string; border: string; ring: string };
} {
  const { color, shade = 500, bgOpacity, borderOpacity } = options;

  // If it's a global semantic variant, use predefined mappings
  if (color in globalSemanticVariants) {
    return globalSemanticVariants[color as GlobalSemanticVariant];
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
 * Predefined variant configurations for core component types
 * Components should import utilities and create their own variants
 */
export const componentVariants = {
  // Button uses global variants + button-specific interactive variants
  button: {
    // Global semantic variants with simple styling
    primary: [
      // inset border
      "inset-ring-1 inset-ring-white/10",
      "dark:inset-ring-black/20",
      // text color
      "text-white dark:text-white",
      // background color
      "bg-zinc-900 dark:bg-zinc-50",
      // hover with enhanced inset border
      "hover:bg-zinc-800 hover:inset-ring-white/15",
      "dark:hover:bg-zinc-200 dark:hover:inset-ring-black/25",
      // disabled
      "disabled:bg-zinc-400 disabled:text-white disabled:inset-ring-white/5",
      "dark:disabled:bg-zinc-600 dark:disabled:text-zinc-300 dark:disabled:inset-ring-black/10",
    ],
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

/**
 * Type-safe way to extend variants with custom colors
 */
export type ExtendedVariant<T extends Record<string, unknown>> = T & {
  [K in TailwindColor]?: ClassValue[];
};

/**
 * Simple helper to get color classes for any semantic variant or Tailwind color
 * This is the recommended approach for components that need color variants
 */
export function getColorClasses(
  variant: GlobalSemanticVariant | TailwindColor,
) {
  // Semantic variant to color mapping
  const semanticColorMap: Record<GlobalSemanticVariant, TailwindColor> = {
    default: "blue",
    neutral: "zinc",
    success: "emerald",
    info: "sky",
    warning: "amber",
    error: "red",
    critical: "rose",
    positive: "teal",
    negative: "rose",
  };

  // Get the actual Tailwind color to use
  const actualColor
    = variant in semanticColorMap
      ? semanticColorMap[variant as GlobalSemanticVariant]
      : (variant as TailwindColor);

  return {
    // Common text colors
    text: `text-${actualColor}-900 dark:text-${actualColor}-400`,
    textLight: `text-${actualColor}-600 dark:text-${actualColor}-300`,
    textMuted: `text-${actualColor}-500 dark:text-${actualColor}-400`,

    // Common background colors
    bg: `bg-${actualColor}-50 dark:bg-${actualColor}-950`,
    bgSolid: `bg-${actualColor}-500 dark:bg-${actualColor}-500`,
    bgMuted: `bg-${actualColor}-100 dark:bg-${actualColor}-900`,

    // Common border colors
    border: `border-${actualColor}-200 dark:border-${actualColor}-800`,
    borderSolid: `border-${actualColor}-500 dark:border-${actualColor}-500`,

    // Raw color name for custom usage
    color: actualColor,
  };
}
