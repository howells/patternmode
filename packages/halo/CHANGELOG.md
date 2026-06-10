# @patternmode/halo

## 0.2.0

### Minor Changes

- Add a `placement` prop to HaloPicker ("bottom" | "top" | "left" | "right") that rotates the hue arc to any side of the pad. The value readout follows the arc for "top". Geometry helpers gain an optional placement parameter (back-compatible defaults), and `getHaloGeometry` / `HaloPlacement` / `HaloGeometry` are exported.

## 0.1.1

### Patch Changes

- 73001b8: Fix the saturation/lightness pad being undraggable: the hue arc's svg overlays the whole stage and its blank root swallowed the pad's pointer events in every browser. The svg is now pointer-transparent except for the arc path and handle.
