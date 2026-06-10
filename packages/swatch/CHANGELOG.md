# @patternmode/swatch

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
