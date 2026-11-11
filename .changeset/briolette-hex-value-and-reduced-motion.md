---
"@patternmode/briolette": major
---

`BriolettePicker` follows the reduced-motion setting live through `@howells/motion/react`'s `usePrefersReducedMotion`: centring glides, release inertia and cut morphs all respect a change made while the picker is mounted.

- **Breaking:** a `value` that is not a hex color (`#rgb` or `#rrggbb`) now throws. It used to anchor silently on the first facet around a grey stand-in.
- **Breaking:** `brioletteColorDistance`, `nearestBrioletteFace` and `brioletteNeighborColor` (and so `buildBriolettePalette`) throw on a color that is not hex, instead of measuring it as distance `0` or substituting a grey anchor.
