# @patternmode/thumbnail

## 0.1.7

### Patch Changes

- d960b32: Author each stylesheet with Tailwind v4 `@apply` against the theme, like the other packages. Class names, `data-*` selectors and `--patternmode-*` properties are unchanged, and the compiled `styles.css` resolves to the same declarations, with these exceptions:

  - Deck and Status now declare `@layer theme, base, components, utilities;` before their rules. If their stylesheet loaded before the app declared its own layer order, `components` was registered ahead of `theme` and `base`, so the app's base reset outranked these rules. `components` now always sorts after them.
  - Status (the track tint) and Briolette (the facet seam) use `color-mix()`. The compiled sheet now carries a fallback for browsers without `color-mix()`: the track draws in the mark's colour and the seam in the seam colour, where those browsers previously dropped the declaration. Browsers with `color-mix()` are unaffected.
  - Halo and Briolette read the gap and value font size from the host's Tailwind theme (`--spacing`, `--text-xs`), and Halo's arc handle stroke from `--color-white`, falling back to the previous values when the theme does not define them.

  The shadcn registry items for Deck, Halo, Briolette, Status and Verge ship `styles.css` as a file, which needs Tailwind CSS v4 to compile. Thumbnail is not a registry item.

- d960b32: Uses `@patternmode/system`'s `toCssSize` instead of a local copy. No change to the public API.
- Updated dependencies [d960b32]
  - @patternmode/system@1.0.0

## 0.1.6

### Patch Changes

- Updated dependencies [e8d30a9]
  - @patternmode/system@0.8.1

## 0.1.5

### Patch Changes

- e1ab95a: A `<picture>` passed as the child now fills the frame. Before, its `<img>` drew at full size and the frame showed one corner of the photo.

  `raised` now shows. The lift was a single `0 1px 2px -1px` shadow that spread inwards as far as it blurred, so it darkened the edge below the picture by about 1% and looked the same as no lift at all. It is now a contact shadow plus a short, soft drop in a warm ink, which darkens the edge by about 9% and fades out within 8px. It is still not a card shadow. The new default for `--patternmode-thumbnail-lift` is `0 1px 2px rgb(29 27 22 / 0.1), 0 4px 10px -3px rgb(29 27 22 / 0.16)`, and the README no longer calls the lift a "whisper".

## 0.1.4

### Patch Changes

- Updated dependencies
  - @patternmode/system@0.8.0

## 0.1.3

### Patch Changes

- Rebuild the component packages with current native TypeScript 7, tsdown, and CSS tooling. Public exports and component behavior are preserved.
- Updated dependencies
  - @patternmode/system@0.7.2

## 0.1.2

### Patch Changes

- Updated dependencies
  - @patternmode/system@0.7.1

## 0.1.1

### Patch Changes

- Updated dependencies
  - @patternmode/system@0.7.0
