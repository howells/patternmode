# @patternmode/channel

## 1.0.0

### Major Changes

- d960b32: ChannelSlider takes its size scale from `@patternmode/system` and no longer depends on `@patternmode/swatch`.

  - **Breaking:** `size` is typed as `PatternmodeExtendedSize` from `@patternmode/system` (the same `2xs` … `7xl` tokens) instead of Swatch's removed `SwatchSize`.

### Patch Changes

- d960b32: Motion fixes.

  - Swatch: a Distribution Bar boundary moved by key lands at once; the settle transition no longer lags a held arrow key.
  - Channel: the active thumb's core scales on a plain ease-out, without overshoot or delay.
  - Deck: a leaving card fades on a linear curve, not ease-in.
  - Tags and Aperto: hover styles apply only on devices that hover with a fine pointer, so a tap no longer leaves them stuck.

- d960b32: Author each stylesheet with Tailwind v4 `@apply` against the theme, like the other packages. Class names, `data-*` selectors and `--patternmode-*` properties are unchanged, and the compiled `styles.css` resolves to the same declarations, with these exceptions:

  - Swatch and ScrollFrame now declare `@layer theme, base, components, utilities;` before their rules. If their stylesheet loaded before the app declared its own layer order, `components` was registered ahead of `theme` and `base`, so the app's base reset outranked these rules. `components` now always sorts after them. Tags and Channel already declared it.
  - Tags (the trigger's focus halo and the search field's focus border) and ScrollFrame (the scrollbar thumb, and the control's background and border) use `color-mix()`. The compiled sheet now carries a fallback for browsers without `color-mix()`: the halo and border draw in the solid ring colour, the thumb in solid `currentColor`, and the control in the solid card and border colours, where those browsers previously dropped the declaration. Browsers with `color-mix()` are unaffected.
  - Spacing and font weight read the host's Tailwind theme (`--spacing`, `--font-weight-medium`), and Swatch's icon colour reads `--color-white`, falling back to the previous values when the theme does not define them.
  - Transitions are written as `transition-property`, `transition-duration` and `transition-timing-function` instead of the `transition` shorthand, so they no longer reset `transition-delay`. Nothing in these stylesheets sets a delay, so the delay is still 0s unless an app sets one.

  The shadcn registry items for Swatch, Tags and ScrollFrame now ship `styles.css` as a file, like Channel, which needs Tailwind CSS v4 to compile.

- Updated dependencies [d960b32]
  - @patternmode/system@1.0.0

## 0.2.7

### Patch Changes

- Updated dependencies [e8d30a9]
  - @patternmode/swatch@5.1.3

## 0.2.6

### Patch Changes

- e1ab95a: Keep the thumb's keyboard focus ring visible on dark ramps. On a near-black track the ring measured 2.3:1 against the track and 1.2:1 against the glass; it now has a band of the page colour inside it, so it contrasts at either end of any ramp.
- Updated dependencies [e1ab95a]
  - @patternmode/swatch@5.1.2

## 0.2.5

### Patch Changes

- Updated dependencies
  - @patternmode/swatch@5.1.1

## 0.2.4

### Patch Changes

- A range's undimmed stretch now ends in a round cap around each thumb instead of a straight edge beside it.
- 5add3d1: Update @base-ui/react to the latest release.

## 0.2.1

### Patch Changes

- 03ea00d: Let a range's veil vanish at the endpoints so the pill's rounded end stays undimmed around a thumb parked there.
- 03ea00d: Draw a range's dimmed veil on the track instead of clipping the control. Chromium ignores calc() values for overflow-clip-margin, so the clip cut the pill's rounded ends off flush with the thumbs at both endpoints.
- 03ea00d: Stop a range's veil at the thumb's outer edge rather than its centre, so the glass thumb no longer shows the veil's seam through it.
- Updated dependencies [1b9efbc]
  - @patternmode/swatch@5.0.0

## 0.2.0

### Minor Changes

- f4234e3: Introduce ChannelSlider: gradient channels with inset glass thumbs, single values or ranges, accessible Base UI interactions, independent live and committed callbacks, and the exact Swatch size scale.
