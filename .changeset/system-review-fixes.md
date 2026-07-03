---
"@patternmode/system": patch
---

Constrain `isResponsiveValue`'s generic to `number | string` so arbitrary
object values can no longer be misclassified as responsive breakpoint maps,
and declare `"sideEffects": false` for better tree-shaking.

`isLightColor` now parses `rgb()`/`rgba()` (comma and space syntax),
`hsl()`/`hsla()`, `oklab()`/`oklch()` (via the leading L channel), and the
named colors `white`, `black`, and `transparent`, all through the same
perceptual OKLab lightness threshold. Unknown formats still read as dark.
