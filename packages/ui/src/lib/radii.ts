/**
 * Border radius design tokens for use in JavaScript/TypeScript contexts.
 * These mirror the Tailwind v4 radius scale for use in style props
 * (e.g., Motion animations) where CSS classes aren't available.
 *
 * @example
 * import { radii } from "@patternmode/ui/lib/radii";
 *
 * <motion.div style={{ borderRadius: radii["2xl"] }} />
 */
export const radii = {
  /** 0px - No border radius */
  none: 0,

  /** 2px - 0.125rem */
  sm: 2,

  /** 4px - 0.25rem - Default rounded */
  DEFAULT: 4,

  /** 6px - 0.375rem */
  md: 6,

  /** 8px - 0.5rem */
  lg: 8,

  /** 12px - 0.75rem */
  xl: 12,

  /** 16px - 1rem */
  "2xl": 16,

  /** 24px - 1.5rem */
  "3xl": 24,

  /** 32px - 2rem */
  "4xl": 32,

  /** 9999px - Fully rounded (pill/circle) */
  full: 9999,
} as const;

export type RadiusSize = keyof typeof radii;
