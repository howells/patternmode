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

import { type ClassValue } from "clsx";

// Global semantic variant types (used by all components)
export type GlobalSemanticVariant =
  | "default"
  | "neutral"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "critical"
  | "positive"
  | "negative";

// Button-specific variants
export type ButtonVariant =
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "inverse-ghost"
  | "link"
  | "minimal";

// Badge-specific variants (semantic + curated colors)
export type BadgeVariant =
  | GlobalSemanticVariant
  | "purple"
  | "pink"
  | "rose"
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
  | "fuchsia";

// Combined semantic variant types
export type SemanticVariant = GlobalSemanticVariant | ButtonVariant;

// Tailwind color names - comprehensive list
export type TailwindColor =
  | "slate"
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
export type TailwindShade =
  | 50
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
  secondary: [
    // clean secondary without border, just shadow
    "shadow-xs",
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // background color
    "bg-zinc-100 dark:bg-zinc-800",
    // hover with shadow only
    "hover:bg-zinc-200 hover:shadow-xs",
    "dark:hover:bg-zinc-700",
    // disabled
    "disabled:bg-zinc-50 disabled:text-zinc-400 disabled:shadow-none",
    "dark:disabled:bg-zinc-900 dark:disabled:text-zinc-600",
  ],
  destructive: [
    // inset border with normal shadow using proper Tailwind classes
    "inset-ring-1 inset-ring-white/20 shadow-xs",
    "dark:inset-ring-white/10",
    // text color
    "text-white dark:text-white",
    // background color
    "bg-red-500 dark:bg-red-900",
    // hover with enhanced inset border
    "hover:bg-red-600 hover:inset-ring-white/25 hover:shadow-xs",
    "dark:hover:bg-red-800 dark:hover:inset-ring-white/15",
    // disabled
    "disabled:bg-red-300 disabled:text-white disabled:inset-ring-white/15 disabled:shadow-none",
    "dark:disabled:bg-red-950 dark:disabled:text-red-400 dark:disabled:inset-ring-white/5",
  ],
  outline: [
    // inset border with normal shadow using proper Tailwind classes
    "inset-ring-1 inset-ring-black/15 shadow-xs",
    "dark:inset-ring-white/15",
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // background color
    "bg-white dark:bg-zinc-950",
    // hover with enhanced inset border
    "hover:bg-zinc-100 hover:inset-ring-black/20 hover:shadow-xs",
    "dark:hover:bg-zinc-800 dark:hover:inset-ring-white/20",
    // disabled
    "disabled:text-zinc-400 disabled:inset-ring-black/10 disabled:shadow-none",
    "dark:disabled:text-zinc-600 dark:disabled:inset-ring-white/10",
  ],
  ghost: [
    // base
    "shadow-none",
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // hover with just background and shadow, no border
    "bg-transparent hover:bg-zinc-100 hover:shadow-xs",
    "dark:hover:bg-zinc-800",
    // disabled
    "disabled:text-zinc-400",
    "dark:disabled:text-zinc-600",
  ],
  "inverse-ghost": [
    // base
    "shadow-none",
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
  link: [
    // base
    "shadow-none",
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // hover color
    "bg-transparent hover:underline hover:underline-offset-3 decoration-current/25",
    // disabled
    "disabled:text-zinc-400",
    "dark:disabled:text-zinc-600",
  ],
  minimal: [
    // base - completely transparent, no shadows
    "shadow-none bg-transparent",
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
  secondary: globalSemanticVariants.neutral,
  destructive: globalSemanticVariants.error,
  outline: globalSemanticVariants.neutral,
  ghost: globalSemanticVariants.neutral,
  "inverse-ghost": globalSemanticVariants.neutral,
  link: globalSemanticVariants.default,
  minimal: globalSemanticVariants.neutral,
} as const;

/**
 * Generate color classes for any Tailwind color
 * Supports both semantic variants and custom colors
 */
export interface ColorClassOptions {
  /** The color to use - can be semantic variant or Tailwind color */
  color: SemanticVariant | TailwindColor;
  /** Custom shade for Tailwind colors (ignored for semantic variants) */
  shade?: TailwindShade;
  /** Opacity for background colors */
  bgOpacity?: number;
  /** Opacity for border/ring colors */
  borderOpacity?: number;
}

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
  options?: Omit<ColorClassOptions, "color">
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
 * Predefined variant configurations for different component types
 */
export const componentVariants = {
  // Badge uses global semantic variants + curated color variants
  badge: {
    default: getVariantClasses("default"),
    neutral: getVariantClasses("neutral"),
    success: getVariantClasses("success"),
    info: getVariantClasses("info"),
    warning: getVariantClasses("warning"),
    error: getVariantClasses("error"),
    critical: getVariantClasses("critical"),
    positive: getVariantClasses("positive"),
    negative: getVariantClasses("negative"),
    // Static color variants (so Tailwind can detect them)
    purple: [
      "bg-purple-50",
      "text-purple-900",
      "border-purple-500/30",
      "ring-purple-500/30",
      "dark:bg-purple-400/10",
      "dark:text-purple-400",
      "dark:border-purple-400/30",
      "dark:ring-purple-400/30",
    ],
    pink: [
      "bg-pink-50",
      "text-pink-900",
      "border-pink-500/30",
      "ring-pink-500/30",
      "dark:bg-pink-400/10",
      "dark:text-pink-400",
      "dark:border-pink-400/30",
      "dark:ring-pink-400/30",
    ],
    rose: [
      "bg-rose-50",
      "text-rose-900",
      "border-rose-500/30",
      "ring-rose-500/30",
      "dark:bg-rose-400/10",
      "dark:text-rose-400",
      "dark:border-rose-400/30",
      "dark:ring-rose-400/30",
    ],
    orange: [
      "bg-orange-50",
      "text-orange-900",
      "border-orange-500/30",
      "ring-orange-500/30",
      "dark:bg-orange-400/10",
      "dark:text-orange-400",
      "dark:border-orange-400/30",
      "dark:ring-orange-400/30",
    ],
    amber: [
      "bg-amber-50",
      "text-amber-900",
      "border-amber-500/30",
      "ring-amber-500/30",
      "dark:bg-amber-400/10",
      "dark:text-amber-400",
      "dark:border-amber-400/30",
      "dark:ring-amber-400/30",
    ],
    yellow: [
      "bg-yellow-50",
      "text-yellow-900",
      "border-yellow-500/30",
      "ring-yellow-500/30",
      "dark:bg-yellow-400/10",
      "dark:text-yellow-400",
      "dark:border-yellow-400/30",
      "dark:ring-yellow-400/30",
    ],
    lime: [
      "bg-lime-50",
      "text-lime-900",
      "border-lime-500/30",
      "ring-lime-500/30",
      "dark:bg-lime-400/10",
      "dark:text-lime-400",
      "dark:border-lime-400/30",
      "dark:ring-lime-400/30",
    ],
    green: [
      "bg-green-50",
      "text-green-900",
      "border-green-500/30",
      "ring-green-500/30",
      "dark:bg-green-400/10",
      "dark:text-green-400",
      "dark:border-green-400/30",
      "dark:ring-green-400/30",
    ],
    emerald: [
      "bg-emerald-50",
      "text-emerald-900",
      "border-emerald-600/30",
      "ring-emerald-600/30",
      "dark:bg-emerald-400/10",
      "dark:text-emerald-400",
      "dark:border-emerald-400/30",
      "dark:ring-emerald-400/30",
    ],
    teal: [
      "bg-teal-50",
      "text-teal-900",
      "border-teal-500/30",
      "ring-teal-500/30",
      "dark:bg-teal-400/10",
      "dark:text-teal-400",
      "dark:border-teal-400/30",
      "dark:ring-teal-400/30",
    ],
    cyan: [
      "bg-cyan-50",
      "text-cyan-900",
      "border-cyan-500/30",
      "ring-cyan-500/30",
      "dark:bg-cyan-400/10",
      "dark:text-cyan-400",
      "dark:border-cyan-400/30",
      "dark:ring-cyan-400/30",
    ],
    sky: [
      "bg-sky-50",
      "text-sky-900",
      "border-sky-500/30",
      "ring-sky-500/30",
      "dark:bg-sky-400/10",
      "dark:text-sky-400",
      "dark:border-sky-400/30",
      "dark:ring-sky-400/30",
    ],
    blue: [
      "bg-blue-50",
      "text-blue-900",
      "border-blue-500/30",
      "ring-blue-500/30",
      "dark:bg-blue-400/10",
      "dark:text-blue-400",
      "dark:border-blue-400/30",
      "dark:ring-blue-400/30",
    ],
    indigo: [
      "bg-indigo-50",
      "text-indigo-900",
      "border-indigo-500/30",
      "ring-indigo-500/30",
      "dark:bg-indigo-400/10",
      "dark:text-indigo-400",
      "dark:border-indigo-400/30",
      "dark:ring-indigo-400/30",
    ],
    violet: [
      "bg-violet-50",
      "text-violet-900",
      "border-violet-500/30",
      "ring-violet-500/30",
      "dark:bg-violet-400/10",
      "dark:text-violet-400",
      "dark:border-violet-400/30",
      "dark:ring-violet-400/30",
    ],
    fuchsia: [
      "bg-fuchsia-50",
      "text-fuchsia-900",
      "border-fuchsia-500/30",
      "ring-fuchsia-500/30",
      "dark:bg-fuchsia-400/10",
      "dark:text-fuchsia-400",
      "dark:border-fuchsia-400/30",
      "dark:ring-fuchsia-400/30",
    ],
  },

  // Button uses global variants + button-specific interactive variants
  button: {
    // Global semantic variants with simple styling
    default: [
      // inset border with normal shadow using proper Tailwind classes
      "inset-ring-1 inset-ring-white/10 shadow-xs",
      "dark:inset-ring-black/20",
      // text color
      "text-white dark:text-white",
      // background color
      "bg-zinc-900 dark:bg-zinc-50",
      // hover with enhanced inset border
      "hover:bg-zinc-800 hover:inset-ring-white/15 hover:shadow-xs",
      "dark:hover:bg-zinc-200 dark:hover:inset-ring-black/25",
      // disabled
      "disabled:bg-zinc-400 disabled:text-white disabled:inset-ring-white/5 disabled:shadow-none",
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
  options?: Omit<ColorClassOptions, "color" | "shade">
): ClassValue[] {
  return getVariantClasses(color, { shade, ...options });
}

/**
 * Type-safe way to extend variants with custom colors
 */
export type ExtendedVariant<T extends Record<string, unknown>> = T & {
  [K in TailwindColor]?: ClassValue[];
};
