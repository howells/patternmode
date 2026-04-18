"use client";

import { useMediaQuery } from "usehooks-ts";
import { BREAKPOINT_VALUES, type Breakpoint } from "../lib/breakpoint";

// Re-export for convenience
export {
  BREAKPOINT_VALUES,
  BREAKPOINTS,
  type Breakpoint,
} from "../lib/breakpoint";

/**
 * Returns true when the viewport is at or above the specified breakpoint.
 *
 * @example
 * ```tsx
 * const isDesktop = useBreakpoint("lg");
 * const isTabletUp = useBreakpoint("md");
 * ```
 */
export function useBreakpoint(
  breakpoint: Exclude<Breakpoint, "base">,
): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINT_VALUES[breakpoint]}px)`, {
    initializeWithValue: false,
  });
}
