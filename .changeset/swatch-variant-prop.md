---
"@patternmode/swatch": major
---

Rename Swatch's `shape` prop to `variant`. `SwatchShape` is now `SwatchVariant`, `SWATCH_SHAPES` is now `SWATCH_VARIANTS`, and the rendered `data-shape` attribute is now `data-variant`. The values (`circle`, `pill`, `square`, `block`) and the `circle` default are unchanged. Replace `shape=` with `variant=` at each call site, and any CSS that selects `[data-shape]` with `[data-variant]`.
