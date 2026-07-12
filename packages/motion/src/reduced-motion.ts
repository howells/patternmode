/**
 * SSR-safe check of the user's reduced-motion preference. Returns false when no DOM
 * (or no `matchMedia` implementation, e.g. jsdom) is present.
 */
export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
