/**
 * Shadow design tokens for use in JavaScript/TypeScript contexts.
 * These mirror the CSS custom properties in shared-styles.css.
 *
 * Use these when you need shadows in style props (e.g., Motion animations)
 * where CSS classes aren't available.
 *
 * @example
 * import { shadows } from "@patternmode/ui/lib/shadows";
 *
 * <motion.div style={{ boxShadow: shadows.xl }} />
 */
export const shadows = {
  /** 0 1px 0 0 rgb(0 0 0 / 0.05) */
  "2xs": "0 1px 0 0 rgb(0 0 0 / 0.05)",

  /** 0 1px 2px 0 rgb(0 0 0 / 0.05) */
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",

  /** 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) */
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",

  /** 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) */
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",

  /** 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) */
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",

  /** 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) */
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",

  /** 0 25px 50px -12px rgb(0 0 0 / 0.25) */
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",

  /** Layered shadow for prominent floating UI */
  "3xl":
    "0 7px 15px rgb(0 0 0 / 0.1), 0 27px 27px rgb(0 0 0 / 0.06), 0 40px 36px rgb(0 0 0 / 0.05)",

  /** Dramatic shadow for hero elements */
  "4xl":
    "0 18px 39px rgb(0 0 0 / 0.1), 0 70px 70px rgb(0 0 0 / 0.09), 0 158px 95px rgb(0 0 0 / 0.05), 0 281px 112px rgb(0 0 0 / 0.01)",

  /** Collins 3-layer lifted shadow (contact + diffuse + ambient) */
  collins:
    "0px 2px 5px 0px rgba(0,0,0,0.11), 0px 9px 9px 0px rgba(0,0,0,0.1), 0px 21px 13px 0px rgba(0,0,0,0.06)",

  /** No shadow */
  none: "none",
} as const;

/** Inner shadow tokens */
export const innerShadows = {
  /** inset 0 1px 0 0 rgb(0 0 0 / 0.05) */
  "2xs": "inset 0 1px 0 0 rgb(0 0 0 / 0.05)",

  /** inset 0 1px 1px 0 rgb(0 0 0 / 0.05) */
  xs: "inset 0 1px 1px 0 rgb(0 0 0 / 0.05)",

  /** inset 0 2px 4px 0 rgb(0 0 0 / 0.05) */
  sm: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
} as const;

/** Drop shadow tokens (for CSS filter) */
export const dropShadows = {
  /** 0 1px 1px rgb(0 0 0 / 0.05) */
  xs: "drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))",

  /** 0 1px 2px rgb(0 0 0 / 0.15) */
  sm: "drop-shadow(0 1px 2px rgb(0 0 0 / 0.15))",

  /** 0 3px 3px rgb(0 0 0 / 0.12) */
  md: "drop-shadow(0 3px 3px rgb(0 0 0 / 0.12))",

  /** 0 4px 4px rgb(0 0 0 / 0.15) */
  lg: "drop-shadow(0 4px 4px rgb(0 0 0 / 0.15))",

  /** 0 9px 7px rgb(0 0 0 / 0.1) */
  xl: "drop-shadow(0 9px 7px rgb(0 0 0 / 0.1))",

  /** 0 25px 25px rgb(0 0 0 / 0.15) */
  "2xl": "drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))",
} as const;

export type ShadowSize = keyof typeof shadows;
export type InnerShadowSize = keyof typeof innerShadows;
export type DropShadowSize = keyof typeof dropShadows;
