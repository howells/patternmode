---
"@patternmode/swatch": patch
"@patternmode/halo": patch
"@patternmode/briolette": patch
---

Use `@instruments/colorscope` for color math instead of hand-rolled helpers, and
upgrade colorscope to `^3.5.0` (the previously pinned `2.0.1` was deprecated).
Swatch now derives light/dark tone from perceptual OKLab lightness and builds
atmosphere alpha via colorscope conversion; Halo delegates its HSL→hex
conversion to colorscope while keeping its defensive input clamping. Halo and
atmosphere output are unchanged; only swatch tone selection on borderline colors
may shift to the perceptual model.
