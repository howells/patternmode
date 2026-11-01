---
"@patternmode/status": patch
---

A mark now always draws in its own colour. The arc and fill use `currentColor`, which was taken from the mark's root `<span>`, so a host rule meant for a nearby label, such as `.legend-item span { color: … }`, repainted the mark in label ink. A selected mark could turn near-black instead of its tone. The colour is now resolved on the mark's SVG, so only `color`, `tone` and `--patternmode-status-color` decide it.
