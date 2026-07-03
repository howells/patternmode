# @patternmode/tags

Tag and tag input primitives for React.

Tags ships a shadcn-compatible `Badge`, a removable `Tag` chip, and `TagSelector` — a
combobox-style Tag Selector for choosing, creating, and removing Tag Items from a known
or open set.

```bash
npm install @patternmode/tags
```

Peer dependencies: `react >= 19`, `react-dom >= 19`.

## Quick start

`TagSelector` is controlled: pass the available `options`, the selected `value`, and an
`onChange` that receives the complete next selection. Every option and selection is a
Tag Item — an object with a stable `id` and a display `label` — never a plain string.

```tsx
import { TagSelector } from "@patternmode/tags";
import "@patternmode/tags/styles.css";
import { useState } from "react";
import type { TagItem } from "@patternmode/tags";

const options: TagItem[] = [
  { id: "accessible", label: "Accessible" },
  { id: "keyboard", label: "Keyboard first" },
];

export function Example() {
  const [value, setValue] = useState<TagItem[]>([]);

  return (
    <TagSelector
      aria-label="Project tags"
      onChange={setValue}
      options={options}
      placeholder="Select tags"
      value={value}
    />
  );
}
```

The classic layout renders the standard trigger, selected-tag display, search input, and
option listbox for you. Selected tags scroll horizontally inside the trigger; the popover
contains a filtering search and the option list.

## Creating tags

Pass `onCreateItem` to allow an open set. When the search draft matches no existing
option, a `Create "…"` option appears; committing it calls `onCreateItem` with the
normalized label and adds the returned Tag Item to the selection. `onCreateItem` may be
async. Pasting comma- or newline-separated text creates or selects each label in one go —
duplicate labels in a single paste are deduped before creation.

```tsx
<TagSelector
  aria-label="Project tags"
  onChange={setValue}
  onCreateItem={(label) => ({ id: crypto.randomUUID(), label })}
  options={options}
  value={value}
/>
```

Use `name` to render hidden form inputs for each selected Tag Item (serialized with
`serializeItem`, which defaults to the item id), `filterOption` to customize search
filtering, `searchValue`/`onSearchChange` for a controlled query, and
`renderTag`/`renderOption` to customize selected-tag and option rendering.

## Composable layout

When the classic layout doesn't fit, own the structure with Tag Selector Parts. State,
context, and accessibility wiring live on `TagSelector.Root`; children you pass to
`TagSelector.List` replace the generated options.

```tsx
<TagSelector.Root aria-label="Project tags" onChange={setValue} options={options} value={value}>
  <TagSelector.Trigger placeholder="Pick tags" />
  <TagSelector.Content>
    <TagSelector.Search />
    <TagSelector.List>
      {options.map((item) => (
        <TagSelector.Option item={item} key={item.id} />
      ))}
    </TagSelector.List>
  </TagSelector.Content>
</TagSelector.Root>
```

`TagSelector.Empty` renders an empty message; leave `TagSelector.List` childless to fall
back to the generated, filtered option list.

## Keyboard behavior

- `Enter` / `Space` on the trigger opens the popover and focuses the search.
- `ArrowDown` / `ArrowUp` move the active option; the active option is scrolled into
  view and announced via `aria-activedescendant`.
- `Enter` selects the active option, or commits the current draft when no option is
  active. `,` also commits drafts (configurable via `separators`). Commits are ignored
  while an IME composition is in progress.
- `Backspace` in an empty search removes the last selected tag.

## Styling

Import the stylesheet once:

```tsx
import "@patternmode/tags/styles.css";
```

Every part carries a `patternmode-tag*` class and a `data-slot` attribute
(`tag`, `badge`, `tag-selector`, `tag-selector-trigger`, `tag-selector-content`,
`tag-selector-search`, `tag-selector-list`, `tag-selector-option`, `tag-selector-empty`)
for targeted overrides.
