---
"@patternmode/stacksheet": major
---

Migrate from Radix UI to Base UI (`@base-ui/react`). Radix is in maintenance; Base UI is its successor. Stacksheet's hand-rolled dialog behaviour (focus trap, scroll lock, escape/back handling) is unchanged — only the Radix Portal and ScrollArea it used internally, plus the `asChild` prop on sheet parts, move to Base UI.

**Breaking — `asChild` → `render`.** Every sheet part (`Sheet.Header`, `Sheet.Body`, `Sheet.Title`, `Sheet.Close`, etc.) replaces `asChild` with Base UI's `render` prop.

```tsx
// Before
<Sheet.Close asChild>
  <MyButton>Done</MyButton>
</Sheet.Close>

// After
<Sheet.Close render={<MyButton />}>Done</Sheet.Close>
```

If you use the function form of `render`, spread every prop from the first argument (including `ref`) onto your element or its wiring is silently lost.

Other changes:

- The body scroll area now emits Base UI's ScrollArea DOM. Its viewport no longer carries a `data-radix-scroll-area-viewport` attribute or the Radix inner `display:table` wrapper — restyle any selectors that targeted those.
- Scrollbar visibility is now CSS-driven from `data-hovering` / `data-scrolling`.
- The internal focus-trap now also recognises Base UI overlays (`data-base-ui-focus-guard`, `[data-open]` dialogs) layered on top of a sheet; the Radix selectors are kept for third-party Radix content.
