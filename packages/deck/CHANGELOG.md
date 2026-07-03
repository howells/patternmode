# @patternmode/deck

## 0.3.2

### Patch Changes

- ef4c33b: Component review fixes for Deck:
  - Drag advance thresholds now measure the active card's real width. The
    drag-end event's `currentTarget` is gone by the time Motion dispatches it,
    so the previous `width: 1` fallback made the default `distanceThreshold`
    of `0.35` mean 0.35 pixels — every release advanced. The card element is
    now measured via a ref captured at drag start, with a 320px fallback when
    layout cannot be measured.
  - `onAdvanceEnd` now fires after the accepted card's exit animation
    completes (via `AnimatePresence` `onExitComplete`), matching its
    documented contract, and still fires exactly once per advance when no
    exit animation runs.
  - Background cards are now `inert` as well as `aria-hidden`, so their
    focusable content is unreachable by keyboard and assistive technology.
  - Generated ids for keyless cards use a running counter across the child
    traversal, so keyless cards in sibling fragments no longer collide.

- Updated dependencies [f35ca73]
- Updated dependencies [094bdf0]
  - @patternmode/system@0.4.0

## 0.3.1

### Patch Changes

- Updated dependencies [2aa9530]
  - @patternmode/system@0.3.0

## 0.3.0

### Minor Changes

- Align public package documentation, lint configuration, and React 19 release metadata.

### Patch Changes

- Updated dependencies
  - @patternmode/system@0.2.3

## 0.2.2

### Patch Changes

- Switch package linting and formatting to the `@howells/lint` Ox lane.
- Updated dependencies
  - @patternmode/system@0.2.2

## 0.2.1

### Patch Changes

- Configure `@howells/lint` across the monorepo, adopt Biome presets, and reformat source with 2-space indentation.
- Updated dependencies
  - @patternmode/system@0.2.1

## 0.2.0

### Minor Changes

- 8b66680: Add the new swipeable deck/card-stack package and let Aperto primitive content opt out of centered positioning with `placement="none"`.

### Patch Changes

- 0e5ada8: Add shared Patternmode sizing, responsive, object sizing, and class composition utilities, then reuse them across component packages.
- Updated dependencies [0e5ada8]
  - @patternmode/system@0.2.0
