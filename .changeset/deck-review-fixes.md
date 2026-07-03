---
"@patternmode/deck": patch
---

Component review fixes for Deck:

- Drag advance thresholds now measure the active card's real width. The
  drag-end event's `currentTarget` is gone by the time Motion dispatches it,
  so the previous `width: 1` fallback made the default `distanceThreshold`
  of `0.35` mean 0.35 pixels — every release advanced. The card element is
  now measured via a ref captured at drag start, with a 320px fallback when
  layout cannot be measured.
- `onAdvanceEnd` now fires after the accepted card's exit animation
  completes (via `AnimatePresence` `onExitComplete`), matching its
  documented contract, and still fires exactly once per advance when no
  exit animation runs.
- Background cards are now `inert` as well as `aria-hidden`, so their
  focusable content is unreachable by keyboard and assistive technology.
- Generated ids for keyless cards use a running counter across the child
  traversal, so keyless cards in sibling fragments no longer collide.
