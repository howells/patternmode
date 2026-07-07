---
"@patternmode/aperto": major
---

Migrate from Radix UI to Base UI (`@base-ui/react`). Radix is in maintenance; Base UI is its successor. This also removes the Radix Dialog types that previously leaked into Aperto's published `.d.ts`.

The public component names are unchanged — `Aperto.Overlay` is now backed by Base UI's Dialog `Backdrop`, and `Aperto.Content` by its `Popup`, but the compound API is the same.

**Breaking changes:**

- **`asChild` → `render`** on `Aperto.Trigger`, `Aperto.Overlay`, and `Aperto.Content` (used internally to compose Motion elements). If you compose these with the function form of `render`, spread every prop from the first argument (including `ref`).
- **`forceMount` is replaced by `keepMounted`** on `Aperto.Portal`, following Base UI's Dialog API.
- **`onOpenChange`** now receives Base UI's `(open, eventDetails)` signature. The extra `eventDetails` argument is additive; existing one-argument handlers keep working.
- **Data attribute change.** Base UI emits `data-open` / `data-closed` instead of Radix's `data-state="open"`; the internal `data-radix-*` attributes are gone. Update any styling or selectors that relied on them.

**Note for Motion:** Aperto's exit animations and shared-element morph are driven by Motion, whose animations are invisible to Base UI's `getAnimations()`-based unmount detection. Aperto handles this internally (`keepMounted` portal + a `hidden` override so the content stays visible while Motion plays the exit); no consumer action is required.
