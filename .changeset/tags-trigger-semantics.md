---
"@patternmode/tags": minor
---

TagSelector keyboard and semantics fixes.

- `renderTag`'s `removeProps` now describe a non-interactive remove mark (`aria-hidden`, `title`, `onClick`) for a `<span>`, because the trigger is already a button and buttons cannot nest. Spreading them onto an element still type-checks.
- The trigger uses Base UI's `disabled` handling, and the search field focuses when the popup opens.
- Arrow keys and Enter track the highlighted option by id. A highlight whose option disappears is cleared.
- Pasted text splits on the configured `separators`.
