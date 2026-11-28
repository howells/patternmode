# @patternmode/filters

Composable filter toolbar, debounced search field, sentence filter chips, option pickers, and typed rule editors for React. Powers `@patternmode/datagrid` and stands alone for any filtered list.

## Install

```sh
pnpm add @patternmode/filters lucide-react
```

```tsx
import "@patternmode/filters/styles.css";
import {
  AddFilter,
  FilterChip,
  FilterToolbar,
  RuleEditor,
  SearchField,
  ToolbarPages,
} from "@patternmode/filters";
```

## Supported rule kinds

- **Text:** `contains`, `not_contains`, `is`, `is_not`, `empty`, `set`
- **Number:** `eq`, `neq`, `gt`, `gte`, `lt`, `lte`, `between`, `empty`, `set`
- **Date:** `on`, `before`, `after`, `between_dates`, `empty`, `set`
- **Boolean:** `is_true`, `is_false`
- **Option:** `any_of`, `none_of`

## Server-safe rule engine (`@patternmode/filters/state`)

Import schemas, cell normalization, and compiled predicates (`compileRule`, `matchesRule`, `filterRuleSchema`, `readCellValue`) from `@patternmode/filters/state` in Server Components, API routes, or workers (no `"use client"`, zero React/DOM imports).
