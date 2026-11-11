---
"@patternmode/deck": patch
"@patternmode/halo": patch
"@patternmode/briolette": patch
"@patternmode/status": patch
"@patternmode/verge": patch
"@patternmode/thumbnail": patch
---

Author each stylesheet with Tailwind v4 `@apply` against the theme, like the other packages. Class names, `data-*` selectors and `--patternmode-*` properties are unchanged, and the compiled `styles.css` resolves to the same declarations, with these exceptions:

- Deck and Status now declare `@layer theme, base, components, utilities;` before their rules. If their stylesheet loaded before the app declared its own layer order, `components` was registered ahead of `theme` and `base`, so the app's base reset outranked these rules. `components` now always sorts after them.
- Status (the track tint) and Briolette (the facet seam) use `color-mix()`. The compiled sheet now carries a fallback for browsers without `color-mix()`: the track draws in the mark's colour and the seam in the seam colour, where those browsers previously dropped the declaration. Browsers with `color-mix()` are unaffected.
- Halo and Briolette read the gap and value font size from the host's Tailwind theme (`--spacing`, `--text-xs`), and Halo's arc handle stroke from `--color-white`, falling back to the previous values when the theme does not define them.

The shadcn registry items for Deck, Halo, Briolette, Status and Verge ship `styles.css` as a file, which needs Tailwind CSS v4 to compile. Thumbnail is not a registry item.
