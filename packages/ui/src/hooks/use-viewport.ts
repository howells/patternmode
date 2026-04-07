"use client";

import { useMediaQuery } from "usehooks-ts";
import { BREAKPOINT_VALUES, type Viewport } from "../lib/breakpoint";

// Re-export for convenience
export type { Viewport } from "../lib/breakpoint";

/**
 * Returns the current viewport category based on Tailwind breakpoints.
 * - mobile: < 768px (below md)
 * - tablet: >= 768px and < 1024px (md to lg)
 * - desktop: >= 1024px (lg and above)
 *
 * @example
 * ```tsx
 * const viewport = useViewport();
 *
 * if (viewport === "desktop") {
 *   return <DesktopLayout />;
 * }
 * ```
 */
export function useViewport(): Viewport {
  const isDesktopOrAbove = useMediaQuery(
    `(min-width: ${BREAKPOINT_VALUES.lg}px)`,
    { initializeWithValue: false },
  );
  const isTabletOrAbove = useMediaQuery(
    `(min-width: ${BREAKPOINT_VALUES.md}px)`,
    { initializeWithValue: false },
  );

  if (isDesktopOrAbove) {
    return "desktop";
  }
  if (isTabletOrAbove) {
    return "tablet";
  }
  return "mobile";
}
