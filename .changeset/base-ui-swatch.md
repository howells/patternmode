---
"@patternmode/swatch": major
---

Migrate from Radix UI to Base UI (`@base-ui/react`). Radix is in maintenance; Base UI is its successor, and this removes the last `@radix-ui/*` dependency from Swatch.

**Breaking — `asChild` → `render`.** Swatch's `asChild` prop is replaced by Base UI's `render` prop. This is an API *reshape* for Swatch specifically, not a rename: previously the content lived inside the slotted child; now the `render` element must be **childless** and the content moves to Swatch's own `children`.

```tsx
// Before
<Swatch asChild color="#315c4b">
  <button type="button">A1</button>
</Swatch>

// After
<Swatch color="#315c4b" render={<button type="button" />}>
  A1
</Swatch>
```

If you pass the function form of `render`, you must spread every prop from the first argument (including `ref`) onto your element, or the swatch's data attributes and styling are silently lost. A dev-mode warning fires if the `render` element carries its own children (which would override the swatch's fill layers).

The exported type `SwatchAsChildProps` is renamed to `SwatchRenderProps`.
