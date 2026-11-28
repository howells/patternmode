# @patternmode/datagrid

Composable, high-performance React data grid built on TanStack Table v9, TanStack Virtual, Base UI, and `@patternmode/filters`.

Use `<DataGrid>` as a batteries-included preset, or compose `useDataGrid()` with individual building blocks (`DataGridToolbar`, `DataGridSelectionBar`, `DataGridTable`, `DataGridPaging`) when a project only needs part of the stack.

## Install

```sh
pnpm add @patternmode/datagrid @patternmode/filters lucide-react
```

Import the compiled stylesheets (layered inside `@layer components`, no Tailwind setup required):

```tsx
import "@patternmode/filters/styles.css";
import "@patternmode/datagrid/styles.css";
```

## Quick start

Keep `columns` and `data` referentially stable (module scope or memoised) so TanStack Table does not rebuild row/column models on unrelated parent renders. Always supply `getRowId` when using row selection, foldable trees, or async refreshes.

```tsx
import { DataGrid, DataGridCellText } from "@patternmode/datagrid";
import type { DataGridColumnDef } from "@patternmode/datagrid";

interface SpecRow {
  id: string;
  name: string;
  status: "draft" | "ordered" | "ready";
  price: number;
  deliveryDate: string;
  approved: boolean;
}

const columns: DataGridColumnDef<SpecRow>[] = [
  { accessorKey: "name", header: "Item", meta: { pinned: "left", width: 200 } },
  {
    accessorKey: "status",
    header: "Status",
    meta: {
      filter: {
        kind: "option",
        options: [
          { value: "ready", label: "Spec ready", tone: "positive" },
          { value: "ordered", label: "Ordered", tone: "info" },
          { value: "draft", label: "Draft", tone: "warning" },
        ],
      },
      width: 130,
    },
  },
  {
    accessorKey: "deliveryDate",
    header: "Delivery",
    meta: { filter: { kind: "date" }, width: 130 },
  },
  {
    accessorKey: "approved",
    header: "Approved",
    meta: { filter: { kind: "boolean" }, width: 100 },
  },
  { accessorKey: "price", header: "Price", meta: { align: "right", pinned: "right", width: 110 } },
];

export function Schedule({ rows }: { rows: readonly SpecRow[] }) {
  return (
    <DataGrid
      columns={columns}
      data={rows}
      getRowId={(row) => row.id}
      resizable
      selectable
      urlState
    />
  );
}
```

## Opt-in capabilities

Every feature is opt-in so lightweight tables stay minimal:

| Feature                       | How to enable                                                                                                                                  |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Row selection & bulk bar**  | `selectable`, `getRowId`, `selectionActions`                                                                                                   |
| **Column resizing**           | `resizable` (drag, double-click reset, keyboard arrows)                                                                                        |
| **Start & end pinning**       | `meta.pinned: "left" \| "right" \| "start" \| "end"` or column header menu                                                                     |
| **Row virtualisation**        | `virtualize="auto"` (default: activates above 100 rows), `true`, or `false`                                                                    |
| **Server / manual mode**      | `manual` (or `manualFiltering` / `manualSorting` / `manualPagination`), `rowCount`, `onQueryChange`, `loading`, `fetching`, `error`, `onRetry` |
| **SSR-safe URL sync**         | `urlState`, `initialParams` (from `@patternmode/datagrid/state`), `urlPrefix` for multi-grid pages, or custom `address`                        |
| **Foldable trees / sections** | `getSubRows`, `sectionOf`, `getRowId`                                                                                                          |
| **Accessible row links**      | `getRowHref`, optional `onNavigate`                                                                                                            |
| **Density presets**           | `density="compact" \| "comfortable" \| "spacious"`                                                                                             |
| **Custom layout**             | `useDataGrid()` + `DataGridToolbar` / `DataGridSelectionBar` / `DataGridTable`                                                                 |

## Server Components & SSR (`@patternmode/datagrid/state`)

Import URL parsing and serialization helpers from `@patternmode/datagrid/state` inside Server Components or route handlers (zero `"use client"`, zero React/DOM imports):

```ts
import {
  readGridSearchParams,
  parseFiltersParam,
  parseSortingParam,
} from "@patternmode/datagrid/state";
```

Pass the parsed `initialParams` into `<DataGrid urlState initialParams={initialParams} />` so SSR and client hydration match with zero mismatch.
