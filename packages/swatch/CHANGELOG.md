# @patternmode/swatch

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
