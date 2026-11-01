---
"@patternmode/swatch": patch
"@patternmode/parquet": patch
---

Pick up the retuned `isLightColor` from `@patternmode/system`. On mid-tone colours, roughly OKLCH lightness 0.56 to 0.62, the Swatch selected icon and the Parquet light-tile flag now choose dark ink, which has more contrast there than white.
