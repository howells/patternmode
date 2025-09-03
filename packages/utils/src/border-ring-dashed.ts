/**
 * Dashed border replacement ring utility (Tailwind classes).
 *
 * Box-shadow cannot be dashed. To mimic a dashed "ring" without impacting
 * layout, we draw two dashed borders using pseudo-elements:
 * - before: outer dashed stroke (zinc-950 @ 8%) inset by -1px
 * - after: inner dashed stroke (zinc-50) aligned to the element box
 *
 * Requires the host element to be relatively positioned; this utility sets it.
 * Respects the element's border radius via rounded-inherit.
 */
export const borderRingDashed = [
  // establish positioning context
  "relative",
  // outer dashed ring (subtle dark)
  "before:content-[''] before:absolute before:inset-[-1px] before:rounded-[inherit] before:pointer-events-none",
  "before:border before:border-dashed",
  "before:border-[color-mix(in_oklab,var(--color-zinc-950)_12%,transparent)]",
  // inner dashed ring (light)
  "after:content-[''] after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none",
  "after:border after:border-dashed",
  "after:border-[var(--color-zinc-50)]",
];
