---
"@patternmode/channel": major
---

ChannelSlider takes its size scale from `@patternmode/system` and no longer depends on `@patternmode/swatch`.

- **Breaking:** `size` is typed as `PatternmodeExtendedSize` from `@patternmode/system` (the same `2xs` … `7xl` tokens) instead of Swatch's removed `SwatchSize`.
