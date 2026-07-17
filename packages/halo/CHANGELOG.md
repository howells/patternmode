# @patternmode/halo

## 0.3.0

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

## 0.2.2

### Patch Changes

- a45df85: Review fixes: real keyboard support, pointer guards, and canonical red.
  - The hue slider is now functional — the range input's dead `readOnly` (which
    doesn't apply to range inputs) is replaced with an `onChange` that updates
    hue, so its arrow keys work.
  - The saturation/lightness pad is keyboard-operable: focusable
    (`tabIndex={0}`), `role="slider"` with an `aria-valuetext` announcing
    "Saturation X%, Lightness Y%", ArrowLeft/Right adjust saturation and
    ArrowUp/Down adjust lightness (Shift for 10× steps), clamped to the pad's
    pointer range. The shipped `:focus-visible` styles now actually fire — the
    arc's ring is drawn when its hidden slider has focus.
  - Pointer guards: pointerdown ignores non-primary buttons (right-click no
    longer commits a color), and the move handlers drop the `buttons === 1`
    fallback — pointer capture already delivers legitimate drags, so drags
    that started elsewhere are ignored.
  - `haloAngleToHue` emits the canonical `0` instead of `360` at the arc's red
    end and in the gap snap, so consumers see one red and `aria-valuenow`
    stays within 0–359.
  - README: documented the full prop surface (`value`, `onChange`,
    `placement`, `label`, `showValue`).

  Also includes the packaging fix already applied on `src/index.ts`: the
  `"use client"` directive survives into `dist/index.mjs`, so the package
  imports cleanly from React Server Components.

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
