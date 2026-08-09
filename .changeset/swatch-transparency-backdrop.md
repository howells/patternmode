---
"@patternmode/swatch": minor
---

Adds `transparencyBackdrop` — a visible backdrop behind the fill so a transparent Visual Value reads as transparent.

A partially transparent fill composites against whatever is behind it, so on a white page a 40% colour renders as a pale solid, indistinguishable from a lighter opaque colour or from an empty swatch. `transparencyBackdrop` puts a chequerboard behind it.

CONTEXT.md has named this concept and this prop since the Swatch vocabulary was written; the code never had it.

**Explicit, never inferred.** Alpha cannot be detected across everything a swatch accepts — a gradient, a `color-mix()`, a CSS variable or child media can all carry alpha the component cannot see — so a swatch that guessed would be right sometimes and silently wrong the rest of the time. The domain language already said as much: "depending only on automatic CSS alpha detection" is the thing to avoid.

Three custom properties tune it — `--patternmode-swatch-backdrop-size`, `-color` and `-base` — all read at the point of use with a `var()` fallback, so a consumer can set them on any ancestor. Declaring defaults on the element itself would have beaten an inherited value and made them inert, which is exactly how verge's knobs failed. The colour defaults resolve through `--border` and `--card`, so the backdrop follows a dark theme with no work.
