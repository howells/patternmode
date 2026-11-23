# @patternmode/deck

## 1.0.0

### Major Changes

- d960b32: Dragging a card no longer re-renders the Deck. The drag offset is a Motion value shared by the stack: background cards derive their response with `useTransform` and follow it on their existing springs, and the active card's tilt follows the pointer directly, so React renders once per advance, not once per pointer move.

  - **Breaking:** removed the `CardStack` alias. Use `Deck`.
  - **Breaking:** removed internal helpers from the public entry: `getAdvanceDecision`, `getNextDeckIndex`, `getVisibleDeckItems`, `getVisualDepth` (deleted outright), `resolveCardRotation`, and the `AdvanceDecision`, `AdvanceDecisionInput` and `DeckItem` types.
  - **Breaking:** a drag that ends on a card that was never measured now throws, instead of assuming a 320px card. A card the pointer can grab always has a width in a browser.

### Patch Changes

- d960b32: Motion fixes.

  - Swatch: a Distribution Bar boundary moved by key lands at once; the settle transition no longer lags a held arrow key.
  - Channel: the active thumb's core scales on a plain ease-out, without overshoot or delay.
  - Deck: a leaving card fades on a linear curve, not ease-in.
  - Tags and Aperto: hover styles apply only on devices that hover with a fine pointer, so a tap no longer leaves them stuck.

- d960b32: Author each stylesheet with Tailwind v4 `@apply` against the theme, like the other packages. Class names, `data-*` selectors and `--patternmode-*` properties are unchanged, and the compiled `styles.css` resolves to the same declarations, with these exceptions:

  - Deck and Status now declare `@layer theme, base, components, utilities;` before their rules. If their stylesheet loaded before the app declared its own layer order, `components` was registered ahead of `theme` and `base`, so the app's base reset outranked these rules. `components` now always sorts after them.
  - Status (the track tint) and Briolette (the facet seam) use `color-mix()`. The compiled sheet now carries a fallback for browsers without `color-mix()`: the track draws in the mark's colour and the seam in the seam colour, where those browsers previously dropped the declaration. Browsers with `color-mix()` are unaffected.
  - Halo and Briolette read the gap and value font size from the host's Tailwind theme (`--spacing`, `--text-xs`), and Halo's arc handle stroke from `--color-white`, falling back to the previous values when the theme does not define them.

  The shadcn registry items for Deck, Halo, Briolette, Status and Verge ship `styles.css` as a file, which needs Tailwind CSS v4 to compile. Thumbnail is not a registry item.

- Updated dependencies [d960b32]
  - @patternmode/system@1.0.0

## 0.5.4

### Patch Changes

- Updated dependencies [e8d30a9]
  - @patternmode/system@0.8.1

## 0.5.3

### Patch Changes

- e1ab95a: Keyboard focus on a Deck is now visible. The active card, or `Deck.Empty` once a finite deck runs out, shows a `--ring` outline while the Deck has keyboard focus. Before, focus went to a hidden control and nothing on screen changed. Pointer users don't see the ring.

  Screen readers now hear the active card by its place in the deck, such as "Card 2 of 6", instead of its internal id (a React key or a generated id). A `Deck.Card` with an `aria-label` is announced by that name, such as "Light study, 2 of 6", and is exposed as a labelled group. The slider's value also reports the card's real position after a cycle-mode deck wraps round. The README now documents the Left and Right arrow keys.

## 0.5.2

### Patch Changes

- Updated dependencies
  - @patternmode/system@0.8.0

## 0.5.1

### Patch Changes

- 814cdc6: Fix stacked cards all tilting the same way. The id hash behind `rotation` was
  signed and then `Math.abs`'d, which capped it at half its range, so every card
  leaned left. It is now an unsigned multiplicative hash with a final mix and the
  spread covers both directions.

## 0.5.0

### Minor Changes

- c5fa471: Cards that join the stack after first render now rise in from beneath. New `enter` prop (`"rise"` default, `"none"` to place instantly).

## 0.4.4

### Patch Changes

- Rebuild the component packages with current native TypeScript 7, tsdown, and CSS tooling. Public exports and component behavior are preserved.
- Updated dependencies
  - @patternmode/system@0.7.2

## 0.4.3

### Patch Changes

- 5dde69f: Accept Motion versions from 12.40.0 onward instead of blocking newer majors at installation. The development workspace now exercises Motion 13. Consumers need no API migration.

## 0.4.2

### Patch Changes

- Updated dependencies
  - @patternmode/system@0.7.1

## 0.4.1

### Patch Changes

- Updated dependencies
  - @patternmode/system@0.7.0

## 0.4.0

### Major Changes

- 8fd4407: `motion` is now a peer dependency, not a regular one.

  Shipping it as a regular dependency let a consumer end up with two copies of
  the animation library in one tree. Card gestures and the stack transitions are motion-driven. A duplicate copy is not a second
  instance of the same thing — React context does not cross the boundary, so
  `LazyMotion` and `LayoutGroup` set up by one copy are invisible to components
  rendered against the other, and the failure is silent.

  **Migration: declare `motion` yourself.** Range `^12.40.0`. Every consumer in
  this estate already does, because the package importing patternmode imports
  motion too — so this is a version bump, not an install-graph change.

## 0.3.5

### Patch Changes

- Updated dependencies [c55e9be]
  - @patternmode/system@0.6.0

## 0.3.4

### Patch Changes

- f7463da: Dedupe motion constants; document intentional forks — no behavior change. The inline
  card springs scattered across `deck-root.tsx` and `deck-motion.ts` are hoisted into
  named, documented constants in `deck-constants.ts`. Each records why it forks from the
  nearest `@howells/motion` spring token (tuned stiffness/damping for card weight), so the
  same rendered values now live in one place instead of being repeated inline.
- Updated dependencies [f7463da]
- Updated dependencies [f7463da]
  - @patternmode/system@0.5.0

## 0.3.3

### Patch Changes

- Updated dependencies [c105cb1]
  - @patternmode/system@0.4.1

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
