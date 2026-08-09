---
"@patternmode/halo": patch
---

`HaloPicker` now moves focus to the control you pressed, so the keyboard keeps working after a click.

Both pointer handlers call `preventDefault` — the pad to stop text selection mid-drag, the arc likewise — and that suppresses the compatibility `mousedown` along with the default action that moves focus. The pad advertises arrow-key adjustment through `role="slider"` and `tabIndex={0}`, and the arc through a visually hidden range input; neither was reachable after a pointer interaction. Click the pad, press an arrow key, nothing happened. Nothing was thrown and nothing appeared in the console.

The pad now focuses itself on pointerdown and the arc focuses its range input. Pointer capture was not the cause — an uncaptured `preventDefault` loses focus the same way, which was measured both ways in a browser. `BriolettePicker` already did this; halo is catching up with its sibling.
