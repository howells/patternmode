---
"@patternmode/system": minor
"@patternmode/swatch": patch
"@patternmode/parquet": patch
---

Add a shared **Distribution Normalization** to `@patternmode/system`: `sanitizeWeight`,
`deriveDistribution` (sanitized weights, total, and unrounded percentages), and
`isLightColor` (the perceptual OKLab contrast decision, owning the single lightness
threshold). Parquet and Swatch's Distribution Bar now derive their total, percentages,
and light treatment through this one module instead of each re-implementing the math, so
the same weighted color reads the same way in one and two dimensions.

Zero-weight handling stays caller policy: Parquet drops zero-weight Tiles, while a
Distribution Bar keeps an identity-bearing Distribution Segment at zero width. No public
API or behavior change for either consumer. `@patternmode/system` now depends on
`@instruments/colorscope` for the lightness math.
