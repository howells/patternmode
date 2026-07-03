---
"@patternmode/stacksheet": patch
---

Accessibility, dismissal, and drag fixes from the component review:

- Respect `closeOnEscape: false` on Chromium — the CloseWatcher is no longer created when Escape dismissal is disabled (this also disables Android back-gesture dismissal in that configuration, since CloseWatcher cannot distinguish sources).
- Ignore Escape presses already consumed by an inner layer (popover, select) instead of also dismissing the sheet, and only `preventDefault()` when the sheet actually dismisses.
- Animate the background un-scale on close — the `shouldScaleBackground` close path previously snapped back instantly; it now transitions out with a `transitionend` listener plus timeout fallback.
- Composable sheets without a `Sheet.Title` are no longer unnamed dialogs: `Sheet.Title` now registers its presence, and a sheet's `ariaLabel` option is used as `aria-label` when no title is mounted (no more dangling `aria-labelledby`).
- Move initial focus into the sheet panel on open so screen readers announce the dialog.
- Defer `setPointerCapture` until a drag actually commits past the dead zone, so plain taps on non-native clickable children keep their clicks.
- Compute swipe release velocity from a sliding ~100ms window of pointer samples instead of the whole-gesture average, so pause-then-flick gestures dismiss as expected.
- Memoize the sheet panel context so `Sheet.Description`/`Sheet.Title` effects stop re-running on every drag re-render.
- Fall back to a generated id when `crypto.randomUUID` is unavailable (non-secure origins such as plain-HTTP LAN dev servers).
- Correct the `snapPointIndex` docs: it is resolved once at `createStacksheet()` and cannot be changed after creation (it is not a controlled prop).
