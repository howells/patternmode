---
"@patternmode/swatch": patch
---

Component review fixes for Swatch and DistributionBar.

- `blend="smooth"` now respects `ratio` weights: each stop is positioned at
  the cumulative midpoint of its ratio share (a 90/10 palette centers at 45%
  and 95%) while keeping OKLab interpolation, so a Weighted Palette Swatch
  reads proportionally in smooth mode. Equal, missing, or all-zero ratios
  fall back to the previous even spacing.
- Swatch tone detection now understands more color formats via
  `@patternmode/system`'s shared `isLightColor` (see the system changeset) —
  light fills in `rgb()`/`hsl()`/`oklch()`/named forms no longer render an
  invisible selected check.
- A consumer-provided `role` is now applied to the rendered Swatch wrapper
  instead of being silently dropped.
- DistributionBar boundary handles expose slider semantics: `role="slider"`,
  `aria-valuemin`/`aria-valuemax`, `aria-valuenow` (the left segment's share
  of the adjacent pair), an `aria-valuetext` like "Woody 60%, Citrus 40%",
  and `aria-orientation="horizontal"`.
- The DistributionBar root sets `data-dragging` while a handle drag is
  active and segment width transitions are disabled under it, so Live
  Distribution Adjustment tracks the pointer instead of fighting the 480ms
  settle transition.
- The Swatch Remove Affordance is now visible under `@media (hover: none)`
  so touch users can discover removal.
- Packaging: the `"use client"` directive survives into `dist/index.mjs`, so
  the package imports cleanly from React Server Components.
