/**
 * General focus ring styling for interactive elements.
 *
 * Provides consistent outline-based focus styling for buttons and other
 * interactive components. Uses outline instead of ring for better accessibility.
 */
export const focusRing = [
  // base
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  // outline color
  "outline-blue-500 dark:outline-blue-500",
];

/**
 * Selection ring styling for selected interactive elements.
 *
 * Provides consistent outline-based selection styling for cards and other
 * interactive components that need to show selected state. Uses a distinct
 * color from focus rings to differentiate selection from keyboard focus.
 */
export const selectionRing = [
  // base
  "outline outline-offset-2 outline-2",
  // outline color - green/emerald for selected state
  "outline-emerald-500 dark:outline-emerald-500",
];
