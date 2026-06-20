# @patternmode/parquet

## 0.1.0

### Minor Changes

- 2aa9530: Add `@patternmode/parquet`: a controlled, proportional color mosaic. Each tile's
  area encodes its weight via a squarified treemap, and the layout re-tiles and
  morphs (largest weight always holds the first slot) whenever the palette
  changes — the two-dimensional, read-only counterpart to Swatch's
  `DistributionBar`. Labels are contrast-aware via colorscope, with a `renderTile`
  override.

  Introduces a shared `WeightedColorSegment` (`{ color, value, label? }`) in
  `@patternmode/system` that both Parquet tiles and Swatch distribution segments
  build on; `DistributionBarSegment` now extends it (a non-breaking change).

### Patch Changes

- Updated dependencies [2aa9530]
  - @patternmode/system@0.3.0
