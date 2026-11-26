---
"@patternmode/swatch": minor
---

Swatch no longer needs `motion`: the peer dependency is removed.

- Passing `onRemove` together with `render` now throws. The types already rejected the pair and the docs called it unsupported; before, the remove control was silently dropped.
- `getSwatchSizeVariableStyle` now delegates to `getSizeVariableStyle` from `@patternmode/system`. Its signature and output are unchanged.
- DistributionBar handles drag with pointer events and pointer capture instead of Motion's drag.
