# @patternmode/system

## 0.4.0

### Minor Changes

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

### Patch Changes

- 094bdf0: Constrain `isResponsiveValue`'s generic to `number | string` so arbitrary
  object values can no longer be misclassified as responsive breakpoint maps,
  and declare `"sideEffects": false` for better tree-shaking.

  `isLightColor` now parses `rgb()`/`rgba()` (comma and space syntax),
  `hsl()`/`hsla()`, `oklab()`/`oklch()` (via the leading L channel), and the
  named colors `white`, `black`, and `transparent`, all through the same
  perceptual OKLab lightness threshold. Unknown formats still read as dark.

## 0.3.0

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

## 0.2.3

### Patch Changes

- Align public package documentation, lint configuration, and React 19 release metadata.

## 0.2.2

### Patch Changes

- Switch package linting and formatting to the `@howells/lint` Ox lane.

## 0.2.1

### Patch Changes

- Configure `@howells/lint` across the monorepo, adopt Biome presets, and reformat source with 2-space indentation.

## 0.2.0

### Minor Changes

- 0e5ada8: Add shared Patternmode sizing, responsive, object sizing, and class composition utilities, then reuse them across component packages.
