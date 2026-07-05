---
"@patternmode/stacksheet": minor
---

Keyboard-aware bottom sheets, handle placement, and a lighter default chrome.

- **`repositionInputs`** (default `true`): when a field inside a mobile bottom
  sheet is focused, the sheet lifts above the on-screen keyboard via a CSS
  `bottom` offset instead of relying on the browser's native scroll-into-view.
  Focus-gated and rAF-throttled; snap-point sheets lift but keep their
  viewport-driven sizing.
- **`handle: "inside" | "outside"`** (default `"inside"`): `"outside"` floats
  the bottom sheet's drag handle above the panel on the backdrop.
- **Header bar removed.** Classic mode now renders floating corner controls
  (close top-right, back top-left when nested) instead of a bordered header
  row; `Sheet.Header` loses its fixed height and divider, and `Sheet.Close`
  floats in the panel corner by default. `classNames.header` is deprecated and
  ignored.
- `Sheet.Handle` is side-aware: it renders nothing on left/right sheets, whose
  handle lives on the interior-facing edge.
- The panel container no longer shows a focus outline when focused
  programmatically on open.
