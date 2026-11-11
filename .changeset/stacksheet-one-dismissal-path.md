---
"@patternmode/stacksheet": major
---

One dismissal path, Sheets typed by key or component, and no compatibility aliases.

- **Fix:** `onCloseComplete` now reports the reason for the dismissal that actually closed the stack. A `close()` or `pop()` from `useSheet()` after an earlier swipe, Escape or backdrop close used to report that earlier reason.
- **Breaking:** the raw `store` no longer holds `isOpen`; it is `stack.length > 0`. `useStacksheetState()` still returns `isOpen`. The store's state type is exported as `StacksheetStoreState`.
- **Breaking:** a Sheet opened by component has that component as its `type`, where it used to have a generated `__adhoc_N` key. `SheetItem["type"]` is `string | SheetContentComponent`, and `SheetItem` is no longer generic.
- **Breaking:** a Sheet whose `type` is not in the `sheets` map throws; it used to render an empty Panel.
- **Breaking:** removed the `renderHeader={false}` alias for `layout="composable"`, the deprecated `classNames.header`, and the `__ariaLabel` data field (use the `ariaLabel` presentation option). `renderHeader` is only accepted with the classic layout.
- The inline-component warning is no longer limited to non-production builds.
- `HandlePosition` and `StacksheetLayoutProps` are exported.
