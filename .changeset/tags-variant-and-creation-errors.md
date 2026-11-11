---
"@patternmode/tags": major
---

Creation failures reach the consumer, and Tag takes only `variant`.

- **Fix:** a throwing or rejecting `onCreateItem` used to become an unhandled rejection from Enter, paste or the create option, and one failure in a paste discarded every label. Each failed label now produces a `TagCreationError` (exported, with `label` and the original error as `cause`) passed to the new `onCreateItemError` prop. Labels that were created are still selected, and an Enter-committed draft stays in the search for a retry. Without `onCreateItemError` the error is rethrown, as before.
- **Breaking:** removed the deprecated `tone` prop on `Tag` and the `TagTone` type. Use `variant`; a Tag without one is still `"secondary"`.
- **Breaking:** `TagSelector.Option` takes a required `item`. Its undocumented `option` prop is removed, and rendering it with neither is no longer possible.
- `separators` now defaults to `[","]` and lists only the keys that commit in addition to Enter, which always commits. Behaviour is unchanged: Enter already committed whatever `separators` held.
