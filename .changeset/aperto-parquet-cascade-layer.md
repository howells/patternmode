---
"@patternmode/aperto": patch
"@patternmode/parquet": patch
---

Component styles now sit in `@layer components` instead of shipping layerless, so a consumer can override them.

Both packages emitted their rules outside every cascade layer — 51 style rules in aperto, 12 in parquet, counted by brace depth in the published `dist/styles.css`. A layerless declaration outranks every rule in a named layer regardless of specificity, so a consumer's own Tailwind utility lost to the component rule no matter what they tried, and no amount of extra specificity on their side would have helped. This is the same defect stacksheet carried until 2.0.4.

Both stylesheets now declare `@layer theme, base, components, utilities;` before `@reference` — the position is load-bearing, because a layer is registered the first time it is seen and a later statement cannot move one that already exists — and wrap their rules in `@layer components`.

Measured rather than assumed. In a browser, a `.rounded-none` rule in `@layer utilities` now overrides `.patternmode-parquet`'s radius (8px → 0px); against a layerless rule of identical specificity the same utility loses and the radius stays 8px. Rule counts across the change went 103 → 104 and 26 → 27, the single added brace, so nothing moved or was dropped, and aperto's `@media (max-width: 560px)` block is confirmed still inside the layer and still parsing in the page.
