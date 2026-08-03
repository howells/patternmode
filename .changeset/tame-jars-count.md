---
"@patternmode/swatch": patch
---

README documents all 30 exports, not 6 of them.

`DistributionDisplay`, `getSwatchColorsBackground`,
`getSwatchAtmosphereBackground`, `getSwatchSizeVariableStyle`,
`getDistributionTotal`, `getDistributionBoundaryPercent` and the four
`SWATCH_*` constants shipped undocumented, so npm actively denied they existed
to anyone checking the first place a consumer looks. Adds a
`DistributionDisplay` section explaining when it is the right one rather than
the editor, and an Exports section covering every public name.
