---
"@patternmode/tags": patch
---

Accessibility, composability, and input-handling fixes for TagSelector from the
component review:

- The option list now renders as a real `role="listbox"`, and the search input
  declares `role="combobox"` with `aria-expanded`, so the semantics the trigger
  and search already announced (`aria-haspopup`, `aria-controls`,
  `aria-activedescendant`) point at elements that exist.
- Consumer-provided `TagSelector.List` children now win over the generated
  options, making the exported `TagSelector.Option` part composable; the list
  only falls back to generated options when no children are passed. Standalone
  `TagSelector.Option` ids now use the root's `{listboxId}-option-{id}` scheme
  so active-option highlighting and `aria-activedescendant` work in composable
  layouts.
- Async `onCreateItem` resolution now merges created items into the latest
  selection instead of a pre-await snapshot, so selections made while creation
  is in flight survive.
- Pasted duplicate labels are deduped by normalized label before resolving, so
  one paste can no longer create duplicate items.
- Enter and separator keydowns are ignored while an IME composition is in
  progress, so composition commits no longer create tags.
- Keyboard navigation now scrolls the active option into view.
- Packaging: the `"use client"` directive now survives into `dist/index.mjs`
  (it previously lived on inner modules only, which tsdown drops), so the
  package imports cleanly from React Server Components.
