# @patternmode/halo

## 0.1.1

### Patch Changes

- 73001b8: Fix the saturation/lightness pad being undraggable: the hue arc's svg overlays the whole stage and its blank root swallowed the pad's pointer events in every browser. The svg is now pointer-transparent except for the arc path and handle.
