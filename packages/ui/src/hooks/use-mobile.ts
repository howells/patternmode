import { useMediaQuery } from "usehooks-ts";
import { BREAKPOINT_VALUES } from "../lib/breakpoint";

/**
 * Returns whether the viewport is below the mobile breakpoint (1024px, Tailwind `lg`).
 *
 * During SSR and the first client render the value is `false` (hydration-safe).
 * Once mounted, it listens to `matchMedia` changes and updates reactively.
 *
 * @returns `true` when `window.innerWidth < 1024`, `false` otherwise (including SSR)
 */
export function useIsMobile() {
  return useMediaQuery(`(max-width: ${BREAKPOINT_VALUES.lg - 1}px)`, {
    defaultValue: false,
    initializeWithValue: false,
  });
}
