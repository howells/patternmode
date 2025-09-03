/**
 * Border replacement ring utility (Tailwind classes).
 *
 * Mirrors the approach in `focusRing`/`focusInput` by exporting class strings
 * instead of relying on a custom CSS class.
 *
 * Effect: two 1px outlines via box-shadow using theme tokens:
 * - dark ring: zinc-950 @ 8% opacity
 * - light ring: zinc-50
 */
export const borderRing = [
  // Use arbitrary property to avoid merge/utility conflicts in v4
  "[box-shadow:color-mix(in_oklab,var(--color-zinc-950)_8%,transparent)_0_0_0_1px,var(--color-zinc-50)_0_0_0_1px]",
];
