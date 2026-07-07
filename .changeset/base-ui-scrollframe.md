---
"@patternmode/scrollframe": major
---

Migrate from Radix UI to Base UI (`@base-ui/react`). Radix is in maintenance; Base UI is its successor. This also removes the Radix ScrollArea types that previously leaked into ScrollFrame's published `.d.ts`.

**Breaking changes:**

- **`asChild` → `render`** on movement controls (`ScrollFrame.Previous` / `ScrollFrame.Next`). Use Base UI's `render` prop; if you use its function form, spread every prop from the first argument (including `ref`).
- **Scrollbar visibility is now CSS-driven.** Base UI's ScrollArea has no `type` prop, so the `scrollbars` modes are reimplemented with `keepMounted` plus CSS keyed on the scrollbar's `data-scrolling` / `data-hovering` state (Base UI keeps `data-scrolling` for ~500ms after a scroll stops, standing in for Radix's hide delay). `hidden` and `always` keep the plumbing mounted; `auto` and `hover` reveal on scroll / hover. If you restyle the scrollbar, target those data attributes.
- **Viewport DOM change.** The Base UI viewport is a plain scrolling div with no Radix inner wrapper — selectors like `viewport > div` no longer apply. ScrollFrame still renders its own `.patternmode-scrollframe__content` wrapper.
- **Prop types are now self-contained** (declared over the underlying `div` element) rather than extending Radix ScrollArea types, so no third-party types ship in the public API. `ScrollFrame.Corner` is now a thin wrapper rather than a direct Radix re-export.
