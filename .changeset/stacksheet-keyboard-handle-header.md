---
"@patternmode/stacksheet": minor
---

Keyboard-aware bottom sheets, handle placement, and a lighter default chrome.

- **`repositionInputs`** (default `true`): when a field inside a mobile bottom
  sheet is focused, the sheet clears the on-screen keyboard instead of relying
  on the browser's native scroll-into-view. Plain sheets stay anchored at the
  bottom and pad their content up — the panel surface extends under the
  keyboard so no backdrop gap shows above iOS Safari's floating chrome.
  Snap-point sheets lift via `bottom` and keep their viewport-driven sizing.
  Focus-gated (fields inside the sheet only) and rAF-throttled.
- **`handle: "inside" | "outside"`** (default `"inside"`): `"outside"` floats
  the bottom sheet's drag handle above the panel on the backdrop.
- **Header bar removed.** Classic mode now renders floating corner controls
  (close top-right, back top-left when nested) instead of a bordered header
  row; `Sheet.Header` loses its fixed height and divider, and `Sheet.Close`
  floats in the panel corner by default. `classNames.header` is deprecated and
  ignored.
- `Sheet.Handle` is side-aware: it renders nothing on left/right sheets, whose
  handle lives on the interior-facing edge. The auto bottom handle no longer
  renders in composable layout — `Sheet.Handle` owns the pill there.
- The panel container no longer shows a focus outline when focused
  programmatically on open.
