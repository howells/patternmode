# @patternmode/halo

## 0.2.1

### Patch Changes

- b8e0048: Use `@instruments/colorscope` for color math instead of hand-rolled helpers, and
  upgrade colorscope to `^3.5.0` (the previously pinned `2.0.1` was deprecated).
  Swatch now derives light/dark tone from perceptual OKLab lightness and builds
  atmosphere alpha via colorscope conversion; Halo delegates its HSL→hex
  conversion to colorscope while keeping its defensive input clamping. Halo and
  atmosphere output are unchanged; only swatch tone selection on borderline colors
  may shift to the perceptual model.

## 0.2.0

### Minor Changes

- Add a `placement` prop to HaloPicker ("bottom" | "top" | "left" | "right") that rotates the hue arc to any side of the pad. The value readout follows the arc for "top". Geometry helpers gain an optional placement parameter (back-compatible defaults), and `getHaloGeometry` / `HaloPlacement` / `HaloGeometry` are exported.

## 0.1.1

### Patch Changes

- 73001b8: Fix the saturation/lightness pad being undraggable: the hue arc's svg overlays the whole stage and its blank root swallowed the pad's pointer events in every browser. The svg is now pointer-transparent except for the arc path and handle.
