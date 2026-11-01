---
"@patternmode/deck": patch
---

Keyboard focus on a Deck is now visible. The active card, or `Deck.Empty` once a finite deck runs out, shows a `--ring` outline while the Deck has keyboard focus. Before, focus went to a hidden control and nothing on screen changed. Pointer users don't see the ring.

Screen readers now hear the active card by its place in the deck, such as "Card 2 of 6", instead of its internal id (a React key or a generated id). A `Deck.Card` with an `aria-label` is announced by that name, such as "Light study, 2 of 6", and is exposed as a labelled group. The slider's value also reports the card's real position after a cycle-mode deck wraps round. The README now documents the Left and Right arrow keys.
