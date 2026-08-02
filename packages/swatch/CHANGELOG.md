# @patternmode/swatch

## 1.1.1

### Patch Changes

- f7463da: Align the `@instruments/colorscope` dependency range to `^3.7.1` repo-wide (matches
  the resolved version; fixes the workspace range-consistency check).
- Updated dependencies [f7463da]
- Updated dependencies [f7463da]
  - @patternmode/system@0.5.0

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

- 5985325: Migrate from Radix UI to Base UI (`@base-ui/react`). Radix is in maintenance; Base UI is its successor, and this removes the last `@radix-ui/*` dependency from Swatch.

  **Breaking — `asChild` → `render`.** Swatch's `asChild` prop is replaced by Base UI's `render` prop. This is an API _reshape_ for Swatch specifically, not a rename: previously the content lived inside the slotted child; now the `render` element must be **childless** and the content moves to Swatch's own `children`.

  ```tsx
  // Before
  <Swatch asChild color="#315c4b">
    <button type="button">A1</button>
  </Swatch>

  // After
  <Swatch color="#315c4b" render={<button type="button" />}>
    A1
  </Swatch>
  ```

  If you pass the function form of `render`, you must spread every prop from the first argument (including `ref`) onto your element, or the swatch's data attributes and styling are silently lost. A dev-mode warning fires if the `render` element carries its own children (which would override the swatch's fill layers).

  The exported type `SwatchAsChildProps` is renamed to `SwatchRenderProps`.

## 0.10.4

### Patch Changes

- f35ca73: Add a shared **Distribution Normalization** to `@patternmode/system`: `sanitizeWeight`,
  `deriveDistribution` (sanitized weights, total, and unrounded percentages), and
  `isLightColor` (the perceptual OKLab contrast decision, owning the single lightness
  threshold). Parquet and Swatch's Distribution Bar now derive their total, percentages,
  and light treatment through this one module instead of each re-implementing the math, so
  the same weighted color reads the same way in one and two dimensions.

  Zero-weight handling stays caller policy: Parquet drops zero-weight Tiles, while a
  Distribution Bar keeps an identity-bearing Distribution Segment at zero width. No public
  API or behavior change for either consumer. `@patternmode/system` now depends on
  `@instruments/colorscope` for the lightness math.

- 30a30af: Component review fixes for Swatch and DistributionBar.
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

- Updated dependencies [f35ca73]
- Updated dependencies [094bdf0]
  - @patternmode/system@0.4.0

## 0.10.3

### Patch Changes

- 2aa9530: Add `@patternmode/parquet`: a controlled, proportional color mosaic. Each tile's
  area encodes its weight via a squarified treemap, and the layout re-tiles and
  morphs (largest weight always holds the first slot) whenever the palette
  changes — the two-dimensional, read-only counterpart to Swatch's
  `DistributionBar`. Labels are contrast-aware via colorscope, with a `renderTile`
  override.

  Introduces a shared `WeightedColorSegment` (`{ color, value, label? }`) in
  `@patternmode/system` that both Parquet tiles and Swatch distribution segments
  build on; `DistributionBarSegment` now extends it (a non-breaking change).

- b8e0048: Use `@instruments/colorscope` for color math instead of hand-rolled helpers, and
  upgrade colorscope to `^3.5.0` (the previously pinned `2.0.1` was deprecated).
  Swatch now derives light/dark tone from perceptual OKLab lightness and builds
  atmosphere alpha via colorscope conversion; Halo delegates its HSL→hex
  conversion to colorscope while keeping its defensive input clamping. Halo and
  atmosphere output are unchanged; only swatch tone selection on borderline colors
  may shift to the perceptual model.
- Updated dependencies [2aa9530]
  - @patternmode/system@0.3.0

## 0.10.2

### Patch Changes

- Swatch gains a `blend` prop for multi-color fills: `"step"` (default, the existing hard bands) or `"smooth"`, which renders the colors as a continuous OKLab-interpolated gradient ramp — for surfaces that represent bounded regions of color rather than discrete swatches.

## 0.10.1

### Patch Changes

- Distribution segment selection is now a pin, not a frame: the selected segment shows a small white ring with its own color through the middle — the same gesture as the bar's drag handles — instead of a hard 2px accent inset that read as a box.

## 0.10.0

### Minor Changes

- Add an `asChild` prop to `Swatch`. When set, the swatch renders through its single child element (Radix Slot pattern) — merging its className, style (including the size and fill CSS variables), `data-*` attributes, and remaining props onto the child and injecting the fill/scrim layers inside it — instead of emitting its own `<figure>` wrapper. Use it when the swatch must be an interactive element such as a `<button>` cell in a color matrix. `asChild` requires a single element child and does not support `onRemove`.

## 0.9.3

### Patch Changes

- Align public package documentation, lint configuration, and React 19 release metadata.
- Updated dependencies
  - @patternmode/system@0.2.3

## 0.9.2

### Patch Changes

- Switch package linting and formatting to the `@howells/lint` Ox lane.
- Updated dependencies
  - @patternmode/system@0.2.2

## 0.9.1

### Patch Changes

- Configure `@howells/lint` across the monorepo, adopt Biome presets, and reformat source with 2-space indentation.
- Updated dependencies
  - @patternmode/system@0.2.1

## 0.9.0

### Minor Changes

- `Swatch` gains an `atmosphere` texture for qualitative color blending, with density and gravity controls for shaping the color pools.

## 0.8.0

### Minor Changes

- `Swatch` gains a `flat` prop that renders a precise color block — no scrim gradient and no drop shadow — for data-visualisation cells where the fill must read as the exact color value.

## 0.7.1

### Patch Changes

- Fix `block` shape collapsing to zero width: it now fills its container (display:block, 100% width/height) so callers can size it with a single dimension (e.g. a height utility) or a flex utility.

## 0.7.0

### Minor Changes

- `Swatch` gains a `block` shape — an unconstrained swatch that fills the box the caller gives it (full-width rows, flex band segments, hero fills), with size and corner radius controlled via className/parent.

## 0.6.0

### Minor Changes

- `DistributionBar` accepts a `legend` prop (`"segments" | false`) to hide the per-segment legend, matching `DistributionDisplay`.

## 0.5.0

### Minor Changes

- `DistributionBar` and `DistributionDisplay` track height and segment corner radius are now themeable via `--patternmode-distribution-height` (default 40px) and `--patternmode-distribution-radius` (default 999px), so consumers can render compact or square-cornered bars without overriding internals.

## 0.4.1

### Patch Changes

- `DistributionDisplay` renders the selectable variant as a semantic `fieldset` (implicit group role) instead of a `div[role=group]`.

## 0.4.0

### Minor Changes

- `DistributionDisplay` gains optional segment selection: pass `onSegmentSelect` to render segments as buttons and `selectedSegmentId` to mark one with a ring. Segment width changes now animate (respecting `prefers-reduced-motion`), so distribution updates reveal smoothly.

## 0.3.0

### Minor Changes

- Add `DistributionDisplay` for non-interactive weighted distribution visuals.

## 0.2.1

### Patch Changes

- Update `DistributionBar` boundary handles so segment values and dimensions change continuously while dragging.

## 0.2.0

### Minor Changes

- Add `DistributionBar` for controlled weighted visual distributions with draggable boundary handles.
- Add distribution helpers for moving boundaries, updating segment metadata, and removing segments.
- Extend Swatch sizes through `7xl`.

### Patch Changes

- Make removable swatches expose an accessible remove request affordance.
- Document Swatch and Distribution Bar domain terms in `CONTEXT.md`.

## 0.1.1

### Patch Changes

- 0e5ada8: Add shared Patternmode sizing, responsive, object sizing, and class composition utilities, then reuse them across component packages.
- Updated dependencies [0e5ada8]
  - @patternmode/system@0.2.0
