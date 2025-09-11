/**
 * Component ring utility (Tailwind classes).
 *
 * Subtle ring styling designed for general component use.
 * Provides visual separation while maintaining clean aesthetics.
 *
 * Effect: single 1px outline via box-shadow using theme tokens:
 * - subtle ring: zinc-950 @ 4% opacity (lighter than standard borderRing)
 */
export const componentRing = [
  // Use arbitrary property to avoid merge/utility conflicts in v4
  "[box-shadow:color-mix(in_oklab,var(--color-zinc-950)_4%,transparent)_0_0_0_1px]",
];

/**
 * Component ring utility with hover state (Tailwind classes).
 *
 * Enhanced ring that becomes more prominent on hover for interactive feedback.
 * Maintains the subtle base ring while adding hover enhancement.
 */
export const componentRingWithHover = [
  // Base subtle ring
  "[box-shadow:color-mix(in_oklab,var(--color-zinc-950)_4%,transparent)_0_0_0_1px]",
  // Enhanced ring on hover
  "hover:[box-shadow:color-mix(in_oklab,var(--color-zinc-950)_6%,transparent)_0_0_0_1px,color-mix(in_oklab,var(--color-zinc-200)_20%,transparent)_0_0_0_2px]",
];

/**
 * Component focus ring utility (Tailwind classes).
 *
 * Focus-specific ring styling that provides clear focus indication
 * while maintaining visual hierarchy across components.
 */
export const componentFocusRing = [
  // Focus ring with zinc-950 and zinc-200 for accessibility
  "focus-visible:[box-shadow:color-mix(in_oklab,var(--color-zinc-950)_8%,transparent)_0_0_0_1px,color-mix(in_oklab,var(--color-zinc-200)_40%,transparent)_0_0_0_2px]",
];
