# CSS cascade layers

Every package that ships CSS takes part in a consumer's cascade, so the rules below
are load-bearing. `packages/theme/test/cascade-layers.test.mjs`, run by `pnpm test`,
enforces them.

- A layer is registered the first time it is seen, and a later `@layer …;` can't move
  one that already exists. A package sheet loaded before the app's Tailwind entry
  therefore leaves the app's `components` appended after `utilities`.
- Any package that opens a layer must declare the full order,
  `@layer theme, base, components, utilities;`, **before its `@import`s**. Emitted after
  the layer blocks it does nothing.
- That includes packages that only open `components`. They can't invert a consumer's
  utilities, but registering `components` early leaves it ahead of the host's `theme`
  and `base`, so a base reset outranks the component rules.
- Never ship a style rule outside a layer. A layerless declaration outranks every rule
  in a named layer at any specificity, so consumers can't override it. Verify in the
  built artefact by brace depth rather than by reading the source. Tailwind's own
  `*,::before,::after,::backdrop` block of `--tw-*` initialisers is legitimately
  layerless; leave it alone.
- Importing `tailwindcss/utilities` on its own emits rules layerless. Always
  `layer(utilities)`.
- The test walks `packages/*/dist/styles.css` **and** `packages/*/registry/**`,
  because `theme.css` reaches every consumer through the registry rather than through a
  `dist/`. If a package ever ships CSS by a third route, teach the check about it too.
