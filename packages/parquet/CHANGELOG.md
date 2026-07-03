# @patternmode/parquet

## 0.1.1

### Patch Changes

- f35ca73: Add a shared **Distribution Normalization** to `@patternmode/system`: `sanitizeWeight`,
  `deriveDistribution` (sanitized weights, total, and unrounded percentages), and
  `isLightColor` (the perceptual OKLab contrast decision, owning the single lightness
  threshold). Parquet and Swatch's Distribution Bar now derive their total, percentages,
  and light treatment through this one module instead of each re-implementing the math, so
  the same weighted color reads the same way in one and two dimensions.

  Zero-weight handling stays caller policy: Parquet drops zero-weight Tiles, while a
  Distribution Bar keeps an identity-bearing Distribution Segment at zero width. No public
  API or behavior change for either consumer. `@patternmode/system` now depends on
  `@instruments/colorscope` for the lightness math.

- Updated dependencies [f35ca73]
- Updated dependencies [094bdf0]
  - @patternmode/system@0.4.0

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
