import { springs } from "@patternmode/motion/springs";

/**
 * SIDEBAR_TRANSITION shared constant for Sidebar.
 * Import from "@patternmode/ui/compositions/sidebar".
 * Based on springs.subtle with slightly reduced mass for snappier feel.
 */
export const SIDEBAR_TRANSITION = {
  ...springs.subtle,
  mass: 0.8,
} as const;
