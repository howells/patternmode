---
"@patternmode/swatch": patch
"@patternmode/tags": patch
"@patternmode/scrollframe": patch
"@patternmode/channel": patch
---

Author each stylesheet with Tailwind v4 `@apply` against the theme, like the other packages. Class names, `data-*` selectors and `--patternmode-*` properties are unchanged, and the compiled `styles.css` resolves to the same declarations, with these exceptions:

- Swatch and ScrollFrame now declare `@layer theme, base, components, utilities;` before their rules. If their stylesheet loaded before the app declared its own layer order, `components` was registered ahead of `theme` and `base`, so the app's base reset outranked these rules. `components` now always sorts after them. Tags and Channel already declared it.
- Tags (the trigger's focus halo and the search field's focus border) and ScrollFrame (the scrollbar thumb, and the control's background and border) use `color-mix()`. The compiled sheet now carries a fallback for browsers without `color-mix()`: the halo and border draw in the solid ring colour, the thumb in solid `currentColor`, and the control in the solid card and border colours, where those browsers previously dropped the declaration. Browsers with `color-mix()` are unaffected.
- Spacing and font weight read the host's Tailwind theme (`--spacing`, `--font-weight-medium`), and Swatch's icon colour reads `--color-white`, falling back to the previous values when the theme does not define them.
- Transitions are written as `transition-property`, `transition-duration` and `transition-timing-function` instead of the `transition` shorthand, so they no longer reset `transition-delay`. Nothing in these stylesheets sets a delay, so the delay is still 0s unless an app sets one.

The shadcn registry items for Swatch, Tags and ScrollFrame now ship `styles.css` as a file, like Channel, which needs Tailwind CSS v4 to compile.
