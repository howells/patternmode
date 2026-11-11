/** The media query behind every reduced-motion check in Patternmode. */
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * SSR-safe check of the user's reduced-motion preference. Returns false when no DOM
 * (or no `matchMedia` implementation, e.g. jsdom) is present.
 *
 * A one-off read: it does not follow the setting while mounted. React code that
 * renders from the preference should use `usePrefersReducedMotion` from
 * `@howells/motion/react`.
 */
export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia !== undefined &&
  window.matchMedia(REDUCED_MOTION_QUERY).matches;
