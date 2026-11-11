---
"@patternmode/system": major
---

`isLightColor` no longer guesses. It returns `null` for a color it cannot parse (other named colors, `hwb()`, `var()`, `color-mix()` …) instead of `false`, so the caller decides what an unknown tone means. It now also reads 4- and 8-digit hex, ignoring alpha as it already did for `rgb()`/`hsl()`.

- **Breaking:** `isLightColor` returns `boolean | null`.
- **Breaking:** removed `hexLightness`, which turned any non-hex string into lightness `0`. Use `getColorLightness` (`number | null`) or `hexToOklab(hex)?.L`.
- Added `getColorLightness`, the perceptual lightness behind `isLightColor`, or `null`.
- `deriveDistribution` also returns `edges`: cumulative percentages, one more than there are weights, ending at exactly `100` (all `0` for an all-zero distribution).
- Added `clamp` and `wrapHue`, the one copy of each for the catalog.
- Added the extended size scale `PATTERNMODE_EXTENDED_SIZES`, `PATTERNMODE_EXTENDED_SIZE_VALUES` and `PatternmodeExtendedSize` (`2xs` … `7xl`), shared by Swatch and ChannelSlider.
- `toCssSize` returns `string` when given a defined size.
