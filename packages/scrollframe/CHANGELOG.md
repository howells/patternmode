# @patternmode/scrollframe

## 2.0.1

### Patch Changes

- Updated dependencies [c55e9be]
  - @patternmode/system@0.6.0

## 2.0.0

### Major Changes

- ae67cf0: Re-release the theme variable rename as a major.

  The move to shadcn's theme variable vocabulary was previously staged as a minor. It is a breaking change: its own notes tell consumers who set the old custom properties that they must migrate, and a consumer who themed ScrollFrame through `--surface` gets the package's built-in fallback instead once it lands.

  Shipping that on a minor meant any consumer on a `^1.0.0` caret absorbed it silently on their next install, for reasons unrelated to this package. That is the failure it is most important to avoid, so it ships as a major and consumers upgrade deliberately.

  ScrollFrame reads exactly two theme variables:

  | Old         | New                    |
  | ----------- | ---------------------- |
  | `--surface` | `--card`               |
  | `--border`  | `--border` (unchanged) |

  Old values are preserved as `var()` fallbacks, so nothing renders differently out of the box. Consumers already using shadcn's variables pick ScrollFrame up with no configuration.

## 1.1.1

### Patch Changes

- f7463da: Replace the local hand-rolled reduced-motion checks with the shared
  `prefersReducedMotion()` adapter from `@howells/motion`. ScrollFrame drops its
  `getReducedMotionPreference` helper and Briolette drops its internal
  `prefersReducedMotion`, so both now resolve the one-shot preference through one seam.
  Briolette's live reduced-motion media-query subscription inside `useIdleMotion` is
  unchanged — that is the reactive concept, not the one-shot check.
- Updated dependencies [f7463da]
- Updated dependencies [f7463da]
- Updated dependencies [f7463da]
  - @patternmode/system@0.5.0
  - @howells/motion@0.2.0

## 1.1.0

### Minor Changes

- eda5188: Component CSS now reads the standard shadcn theme variable vocabulary instead of this project's earlier ad hoc token names. The previous hex defaults are preserved as fallback values on every `var(...)` reference, so nothing renders differently out of the box — only the custom property names that drive the look changed.

  | Old name         | New name             |
  | ---------------- | -------------------- |
  | `--ink`          | `--foreground`       |
  | `--muted`        | `--muted-foreground` |
  | `--accent`       | `--ring`             |
  | `--accent-soft`  | `--accent`           |
  | `--surface`      | `--card`             |
  | `--surface-soft` | `--muted`            |
  | `--border-soft`  | `--border-subtle`    |
  | `--quiet`        | `--muted-foreground` |

  Consumers who set any of the old custom properties (`--ink`, `--muted`, `--accent`, `--surface`, `--surface-soft`, `--border-soft`, `--quiet`) to theme these components must migrate to the new names above. Consumers already using shadcn's own theme variables (`--foreground`, `--muted-foreground`, `--ring`, `--accent`, `--card`, `--muted`, `--border-subtle`) will now pick these components up automatically with no changes required.

### Patch Changes

- Updated dependencies [c105cb1]
  - @patternmode/system@0.4.1

## 1.0.0

### Major Changes

- 5985325: Migrate from Radix UI to Base UI (`@base-ui/react`). Radix is in maintenance; Base UI is its successor. This also removes the Radix ScrollArea types that previously leaked into ScrollFrame's published `.d.ts`.

  **Breaking changes:**
  - **`asChild` → `render`** on movement controls (`ScrollFrame.Previous` / `ScrollFrame.Next`). Use Base UI's `render` prop; if you use its function form, spread every prop from the first argument (including `ref`).
  - **Scrollbar visibility is now CSS-driven.** Base UI's ScrollArea has no `type` prop, so the `scrollbars` modes are reimplemented with `keepMounted` plus CSS keyed on the scrollbar's `data-scrolling` / `data-hovering` state (Base UI keeps `data-scrolling` for ~500ms after a scroll stops, standing in for Radix's hide delay). `hidden` and `always` keep the plumbing mounted; `auto` and `hover` reveal on scroll / hover. If you restyle the scrollbar, target those data attributes.
  - **Viewport DOM change.** The Base UI viewport is a plain scrolling div with no Radix inner wrapper — selectors like `viewport > div` no longer apply. ScrollFrame still renders its own `.patternmode-scrollframe__content` wrapper.
  - **Prop types are now self-contained** (declared over the underlying `div` element) rather than extending Radix ScrollArea types, so no third-party types ship in the public API. `ScrollFrame.Corner` is now a thin wrapper rather than a direct Radix re-export.

## 0.3.0

### Minor Changes

- b2ae98e: Add `fadeMode="mask"` for scroll-edge fades over non-uniform backdrops.

  The default `"color"` mode paints a `fadeColor` gradient over the content,
  which only matches solid surfaces. In `"mask"` mode the viewport masks its own
  content at the scroll edges instead, so translucent, blurred, image, or tinted
  backdrops show through the fade. Masking keeps the measured behavior of
  painted fades — each edge's ramp collapses when that edge is rested against or
  unreachable, animated via registered `@property` transitions — and honors the
  existing `fades` edge config, `fadeSize`, both axes, and reduced motion.
  `ScrollFrame.Root` now also accepts `fadeMode` and `fades` so custom
  compositions can opt in; registered viewports handle the masking.

  Also fixes packaging: the `"use client"` directive now survives into
  `dist/index.mjs` (it previously lived on inner modules only, which tsdown
  drops), so the package imports cleanly from React Server Components.

### Patch Changes

- Updated dependencies [f35ca73]
- Updated dependencies [094bdf0]
  - @patternmode/system@0.4.0

## 0.2.3

### Patch Changes

- 8141b17: Make ScrollFrame overscroll containment axis-aware so horizontal-only frames do not block vertical page scroll chaining.
- Updated dependencies [2aa9530]
  - @patternmode/system@0.3.0

## 0.2.2

### Patch Changes

- Stop clipping the trailing edge of vertical (or horizontal) frames. `.patternmode-scrollframe__content` set `min-width: min-content` and `min-height: min-content` on both axes, so a non-shrinking child on the cross axis (e.g. a flex header label that doesn't truncate) widened the content box past the panel and clipped right-aligned content under the cross-axis `overflow: hidden`. Intrinsic sizing is now scoped to the scrollable axis only — vertical frames keep `min-height: min-content`, horizontal frames keep `min-width: min-content`, and the cross axis is free to shrink to the panel.

## 0.2.1

### Patch Changes

- Fix an unbounded render loop in ScrollFrame. `readEdgeState` allocated a fresh object on every measurement, so each ResizeObserver/scroll measurement forced a render even when the scroll metrics were unchanged — and because the observer fires on the very layout changes a render can cause, this could spin the renderer at 100% CPU (reproducible with an always-on, centered horizontal scrollbar). Edge-state updates now bail out when the measured metrics are identical.

## 0.2.0

### Minor Changes

- Align public package documentation, lint configuration, and React 19 release metadata.

### Patch Changes

- Updated dependencies
  - @patternmode/system@0.2.3

## 0.1.4

### Patch Changes

- Switch package linting and formatting to the `@howells/lint` Ox lane.
- Updated dependencies
  - @patternmode/system@0.2.2

## 0.1.3

### Patch Changes

- Configure `@howells/lint` across the monorepo, adopt Biome presets, and reformat source with 2-space indentation.
- Updated dependencies
  - @patternmode/system@0.2.1

## 0.1.2

### Patch Changes

- Add optional native drag scrolling with activation thresholds, ignored descendants, cursor states, and demo documentation.

## 0.1.1

### Patch Changes

- 0e5ada8: Add shared Patternmode sizing, responsive, object sizing, and class composition utilities, then reuse them across component packages.
- Updated dependencies [0e5ada8]
  - @patternmode/system@0.2.0
