---
"@patternmode/tags": major
---

Migrate from Radix UI to Base UI (`@base-ui/react`). Radix is in maintenance; Base UI is its successor.

**Breaking changes:**

- **`asChild` → `render`** on `Badge`. Use Base UI's `render` prop; if you use its function form, spread every prop from the first argument (including `ref`).
- **New popover DOM.** The popover content is now built from Base UI's `Popover.Positioner` wrapping `Popover.Popup` (an extra positioning element between the portal and the content). Descendant selectors targeting the content still work via `[data-slot="tag-selector-content"]`, but structural (direct-child) selectors may need updating.
- **CSS variable renames.** If you override the popover stylesheet, `--radix-popover-content-available-height` is now `--available-height` and `--radix-popover-trigger-width` is now `--anchor-width` (both exposed on the Positioner).
- The popover popup no longer carries `role="dialog"` — it is a plain container hosting the combobox/listbox pattern (unchanged behaviour, cleaner semantics for screen readers).
