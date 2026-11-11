---
"@patternmode/swatch": patch
"@patternmode/channel": patch
"@patternmode/deck": patch
"@patternmode/tags": patch
"@patternmode/aperto": patch
---

Motion fixes.

- Swatch: a Distribution Bar boundary moved by key lands at once; the settle transition no longer lags a held arrow key.
- Channel: the active thumb's core scales on a plain ease-out, without overshoot or delay.
- Deck: a leaving card fades on a linear curve, not ease-in.
- Tags and Aperto: hover styles apply only on devices that hover with a fine pointer, so a tap no longer leaves them stuck.
