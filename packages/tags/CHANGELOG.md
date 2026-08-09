# @patternmode/tags

## 2.0.2

### Patch Changes

- Updated dependencies [fb9ef78]
  - @patternmode/scrollframe@2.0.2

## 2.0.1

### Patch Changes

- Updated dependencies [c55e9be]
  - @patternmode/system@0.6.0
  - @patternmode/scrollframe@2.0.1

## 2.0.0

### Major Changes

- ae67cf0: Re-release the theme variable rename as a major.

  The move to shadcn's theme variable vocabulary was previously staged as a minor. It is a breaking change: its own notes tell consumers who set the old custom properties that they must migrate, and a consumer who themed Tags through the old names gets the package's built-in fallbacks instead once it lands.

  Shipping that on a minor meant any consumer on a `^1.0.0` caret absorbed it silently on their next install, for reasons unrelated to this package. That is the failure it is most important to avoid, so it ships as a major and consumers upgrade deliberately.

  Two of the renames are worth reading carefully, because the old name survives with a different meaning rather than failing loudly:

  - **`--muted`** previously meant muted _foreground_ (text). It now means a muted _surface_.
  - **`--accent`** previously meant the accent colour. Tags no longer reads it at all — set `--ring` instead.

  Old values are preserved as `var()` fallbacks, so nothing renders differently out of the box. Consumers already using shadcn's variables pick Tags up with no configuration.

### Patch Changes

- ae67cf0: Read the standard `--border` theme variable instead of `--border-subtle`.

  `--border-subtle` was the one custom property in Patternmode's CSS vocabulary that is not part of the shadcn theme token set, so a consumer wiring up a stock shadcn theme got every other Tags colour themed and this one silently falling back to a hardcoded hex. It now reads `--border`, which shadcn defines.

  Fallback values are unchanged, so nothing renders differently out of the box. **Consumers who set `--border-subtle` to theme Tags must set `--border` instead** — and if they already define `--border` for shadcn, Tags now picks it up with no configuration.

- Updated dependencies [ae67cf0]
  - @patternmode/scrollframe@2.0.0

## 1.1.1

### Patch Changes

- Updated dependencies [f7463da]
- Updated dependencies [f7463da]
- Updated dependencies [f7463da]
  - @patternmode/scrollframe@1.1.1
  - @patternmode/system@0.5.0

## 1.1.0

### Minor Changes

- eda5188: Component CSS now reads the standard shadcn theme variable vocabulary instead of this project's earlier ad hoc token names. The previous hex defaults are preserved as fallback values on every `var(...)` reference, so nothing renders differently out of the box — only the custom property names that drive the look changed.

  | Old name         | New name             |
  | ---------------- | -------------------- |
  | `--ink`          | `--foreground`       |
  | `--muted`        | `--muted-foreground` |
  | `--accent`       | `--ring`             |
  | `--accent-soft`  | `--accent`           |
  | `--surface`      | `--card`             |
  | `--surface-soft` | `--muted`            |
  | `--border-soft`  | `--border-subtle`    |
  | `--quiet`        | `--muted-foreground` |

  Consumers who set any of the old custom properties (`--ink`, `--muted`, `--accent`, `--surface`, `--surface-soft`, `--border-soft`, `--quiet`) to theme these components must migrate to the new names above. Consumers already using shadcn's own theme variables (`--foreground`, `--muted-foreground`, `--ring`, `--accent`, `--card`, `--muted`, `--border-subtle`) will now pick these components up automatically with no changes required.

### Patch Changes

- Updated dependencies [c105cb1]
- Updated dependencies [eda5188]
  - @patternmode/system@0.4.1
  - @patternmode/scrollframe@1.1.0

## 1.0.0

### Major Changes

- 5985325: Migrate from Radix UI to Base UI (`@base-ui/react`). Radix is in maintenance; Base UI is its successor.

  **Breaking changes:**

  - **`asChild` → `render`** on `Badge`. Use Base UI's `render` prop; if you use its function form, spread every prop from the first argument (including `ref`).
  - **New popover DOM.** The popover content is now built from Base UI's `Popover.Positioner` wrapping `Popover.Popup` (an extra positioning element between the portal and the content). Descendant selectors targeting the content still work via `[data-slot="tag-selector-content"]`, but structural (direct-child) selectors may need updating.
  - **CSS variable renames.** If you override the popover stylesheet, `--radix-popover-content-available-height` is now `--available-height` and `--radix-popover-trigger-width` is now `--anchor-width` (both exposed on the Positioner).
  - The popover popup no longer carries `role="dialog"` — it is a plain container hosting the combobox/listbox pattern (unchanged behaviour, cleaner semantics for screen readers).

### Patch Changes

- Updated dependencies [5985325]
  - @patternmode/scrollframe@1.0.0

## 0.2.3

### Patch Changes

- ad2c305: Accessibility, composability, and input-handling fixes for TagSelector from the
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

- Updated dependencies [f35ca73]
- Updated dependencies [b2ae98e]
- Updated dependencies [094bdf0]
  - @patternmode/system@0.4.0
  - @patternmode/scrollframe@0.3.0

## 0.2.2

### Patch Changes

- Updated dependencies [2aa9530]
- Updated dependencies [8141b17]
  - @patternmode/system@0.3.0
  - @patternmode/scrollframe@0.2.3

## 0.2.1

### Patch Changes

- Updated dependencies
  - @patternmode/scrollframe@0.2.1

## 0.2.0

### Minor Changes

- Align public package documentation, lint configuration, and React 19 release metadata.

### Patch Changes

- Updated dependencies
  - @patternmode/scrollframe@0.2.0
  - @patternmode/system@0.2.3

## 0.1.2

### Patch Changes

- Switch package linting and formatting to the `@howells/lint` Ox lane.
- Updated dependencies
  - @patternmode/scrollframe@0.1.4
  - @patternmode/system@0.2.2

## 0.1.1

### Patch Changes

- Configure `@howells/lint` across the monorepo, adopt Biome presets, and reformat source with 2-space indentation.
- Updated dependencies
  - @patternmode/scrollframe@0.1.3
  - @patternmode/system@0.2.1
