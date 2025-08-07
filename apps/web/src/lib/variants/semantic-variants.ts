/**
 * Global Semantic Variant Definitions
 *
 * Provides consistent color mappings and styles for semantic variants
 * across all components (success, error, warning, etc.).
 */

import type { SemanticVariant } from "./variant-types";

/**
 * Global semantic variant color mappings
 * These provide consistent colors across all components
 */
export const semanticVariants = {
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
 * Simple helper to get color classes for any semantic variant or Tailwind color
 * This is the recommended approach for components that need color variants
 */
export function getColorClasses(
  variant: SemanticVariant,
) {
  // Semantic variant to color mapping
  const semanticColorMap: Record<SemanticVariant, string> = {
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
  const actualColor = semanticColorMap[variant];

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
