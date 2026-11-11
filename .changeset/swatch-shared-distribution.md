---
"@patternmode/swatch": major
---

Distribution Segments and weighted `colors` fills now derive their shares through `@patternmode/system`'s `deriveDistribution` instead of re-implementing the sanitize/total/percentage arithmetic. Rendered output is unchanged, including the two all-zero policies: a Distribution Bar or Display draws every segment at 0%, and a weighted `colors` fill falls back to equal bands.

A plain `color` the tone analysis cannot parse (`var()`, `color-mix()`, most named colors) still renders with the dark tone; pass `isLight` for such a fill when it is light. Colors with 4- or 8-digit hex now get a tone from their channels.

- **Breaking:** removed the `DistributionBarSegment` and `DistributionBarSegmentUpdate` aliases. Use `DistributionSegment` and `DistributionSegmentUpdate`.
- **Breaking:** removed `SWATCH_SIZES`, `SWATCH_SIZE_VALUES` and `SwatchSize`. The scale lives in `@patternmode/system` as `PATTERNMODE_EXTENDED_SIZES`, `PATTERNMODE_EXTENDED_SIZE_VALUES` and `PatternmodeExtendedSize`.
- `getDistributionBoundaryPercent` with an index past the last segment returns the end of the bar.
