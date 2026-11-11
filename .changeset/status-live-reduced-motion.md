---
"@patternmode/status": major
---

`StatusMark` follows the reduced-motion setting live through `@howells/motion/react`'s `usePrefersReducedMotion`. Motion's `useReducedMotion` read it once, so a mark mounted before the setting changed kept animating.

- **Breaking:** removed the `STATUS_MARK_STATUSES` and `StatusMarkStatus` aliases. Use `STATUS_MARK_PROGRESS_STEPS` and `StatusMarkProgressStep`.
- `size` is typed as `PatternmodeSize` from `@patternmode/system`; the accepted tokens are unchanged.
