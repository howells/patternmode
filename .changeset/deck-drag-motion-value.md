---
"@patternmode/deck": major
---

Dragging a card no longer re-renders the Deck. The drag offset is a Motion value shared by the stack: background cards derive their response with `useTransform` and follow it on their existing springs, and the active card's tilt follows the pointer directly, so React renders once per advance, not once per pointer move.

- **Breaking:** removed the `CardStack` alias. Use `Deck`.
- **Breaking:** removed internal helpers from the public entry: `getAdvanceDecision`, `getNextDeckIndex`, `getVisibleDeckItems`, `getVisualDepth` (deleted outright), `resolveCardRotation`, and the `AdvanceDecision`, `AdvanceDecisionInput` and `DeckItem` types.
- **Breaking:** a drag that ends on a card that was never measured now throws, instead of assuming a 320px card. A card the pointer can grab always has a width in a browser.
