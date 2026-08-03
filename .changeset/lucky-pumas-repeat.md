---
"@patternmode/swatch": minor
---

`DistributionDisplay` is no longer filed inside the editor it is not.

The read-only sibling lived in `src/DistributionBar/`, was exported from the
editor's barrel, and was typed on `DistributionBarSegment` — three signals
telling readers it was the editor. Two separate consumers concluded the catalog
had no read-only distribution strip and reported the territory unserved.

- new `DistributionSegment` / `DistributionSegmentUpdate` types, named for the
  shape rather than for the editor. `DistributionBarSegment` and
  `DistributionBarSegmentUpdate` remain as aliases of identical shape, so
  nothing breaks.
- `DistributionDisplay` moves to its own module; the parts both components draw
  move to a neutral `Distribution` module. No runtime, DOM, class-name or prop
  changes — the styling contract (`patternmode-distribution-bar__*`) is
  untouched.
