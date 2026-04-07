/**
 * Tailwind v4 breakpoint pixel values.
 * Includes extended breakpoints for small mobile (2xs) and ultrawide (3xl).
 */
export const BREAKPOINT_VALUES = {
  "2xs": 320,
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
  "3xl": 1920,
} as const;

/** Breakpoint name type */
export type Breakpoint = keyof typeof BREAKPOINT_VALUES | "base";

/** Ordered list of breakpoints from smallest to largest (excluding base) */
export const BREAKPOINTS = [
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
] as const satisfies readonly (keyof typeof BREAKPOINT_VALUES)[];

/** Semantic viewport categories */
export type Viewport = "mobile" | "tablet" | "desktop";
