/**
 * Tailwind CSS breakpoint values for consistent responsive design.
 * These match the default Tailwind breakpoints.
 */
export const BREAKPOINTS = {
  /** Small screens (640px+) */
  sm: 640,
  /** Medium screens (768px+) */
  md: 768,
  /** Large screens (1024px+) */
  lg: 1024,
  /** Extra large screens (1280px+) */
  xl: 1280,
  /** 2X large screens (1536px+) */
  "2xl": 1536,
} as const;

/**
 * Media query strings for responsive hooks.
 * Use these with useMediaQuery for consistent breakpoint behavior.
 */
export const MEDIA_QUERIES = {
  /** Below small screens (< 640px) */
  mobile: `(max-width: ${BREAKPOINTS.sm - 1}px)`,
  /** Small screens and up (>= 640px) */
  sm: `(min-width: ${BREAKPOINTS.sm}px)`,
  /** Medium screens and up (>= 768px) */
  md: `(min-width: ${BREAKPOINTS.md}px)`,
  /** Large screens and up (>= 1024px) */
  lg: `(min-width: ${BREAKPOINTS.lg}px)`,
  /** Extra large screens and up (>= 1280px) */
  xl: `(min-width: ${BREAKPOINTS.xl}px)`,
  /** 2X large screens and up (>= 1536px) */
  "2xl": `(min-width: ${BREAKPOINTS["2xl"]}px)`,
} as const;
