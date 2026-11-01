---
"@patternmode/scrollframe": patch
---

Movement controls no longer lose keyboard focus, and their focus ring is visible.

- When a focused Previous or Next control reaches its edge and hides (`auto`) or disables itself (`disabled`), focus moves to the opposite control, or to the viewport if there isn't one. Before, focus fell back to the top of the page.
- The focus ring uses `--ring` instead of `--border`, which measured about 1.3:1 against the card.
- On touch screens the controls' tap area grows to 44px without changing how they look.
- The README now names `--card` as the default fade colour and lists the theme tokens the controls actually read.
