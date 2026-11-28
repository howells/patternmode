import type { FilterKind, FilterSpec } from "@patternmode/filters";
import type { RowData } from "@tanstack/react-table";
import type { LucideIcon } from "lucide-react";
import { Calendar, Hash, ListChecks, ToggleLeft, Type } from "lucide-react";
import { z } from "zod";

import { readRowCell } from "./features";
import type { DataGridColumn, DataGridRow, DataGridTableInstance } from "./features";

/** A column's name in menus and chips. */
export const columnLabel = <TData extends RowData>(column: DataGridColumn<TData>): string => {
  const { header, meta } = column.columnDef;
  const text = z.string().safeParse(header);

  return meta?.label ?? (text.success ? text.data : column.id);
};

/** Each kind's glyph, and its name in "Filter": "Number", "Choice", "Date", "Yes / No", "Text". */
export const filterKinds: Record<FilterKind, { readonly hint: string; readonly icon: LucideIcon }> =
  {
    boolean: { hint: "Yes / No", icon: ToggleLeft },
    date: { hint: "Date", icon: Calendar },
    number: { hint: "Number", icon: Hash },
    option: { hint: "Choice", icon: ListChecks },
    text: { hint: "Text", icon: Type },
  };

const facetedOptionCounts = <TData extends RowData>(
  column: DataGridColumn<TData>,
): Map<string, number> => {
  const counts = new Map<string, number>();
  const faceted = column.getFacetedUniqueValues();

  for (const [key, count] of faceted.entries()) {
    if (key === null || key === undefined || key === "") {
      continue;
    }

    const label = String(key);
    counts.set(label, (counts.get(label) ?? 0) + count);
  }

  return counts;
};

const inferKindFromRows = <TData extends RowData>(
  rows: readonly DataGridRow<TData>[],
  columnId: string,
): FilterKind | null => {
  for (const row of rows) {
    const cell = readRowCell(row, columnId);

    if (
      cell.kind === "number" ||
      cell.kind === "text" ||
      cell.kind === "date" ||
      cell.kind === "boolean"
    ) {
      return cell.kind;
    }

    if (cell.kind !== "blank") {
      return null;
    }
  }

  return null;
};

/**
 * How a column filters: as its `meta.filter` says, or else inferred from its
 * cell values (`text`, `number`, `date`, `boolean`). Option counts come from
 * TanStack's memoised faceted unique values so they reflect other active filters.
 */
export const filterSpecOf = <TData extends RowData>(
  rows: readonly DataGridRow<TData>[],
  column: DataGridColumn<TData>,
): FilterSpec | null => {
  const declared = column.columnDef.meta?.filter;

  if (declared === false || column.columnDef.meta?.filterOnly === true || !column.getCanFilter()) {
    return null;
  }

  if (declared?.kind === "option") {
    const counts = facetedOptionCounts(column);

    return {
      kind: "option",
      options: declared.options.map((option) => ({
        ...option,
        count: counts.get(option.value) ?? 0,
      })),
    };
  }

  if (declared !== undefined) {
    return { kind: declared.kind, options: [] };
  }

  const inferred = inferKindFromRows(rows, column.id);

  return inferred === null ? null : { kind: inferred, options: [] };
};

/** Every column in display order, hidden ones included; filter-only and internal selection columns are left out. */
export const orderedColumns = <TData extends RowData>(
  table: DataGridTableInstance<TData>,
): DataGridColumn<TData>[] => {
  const columns = table
    .getAllLeafColumns()
    .filter((column) => column.columnDef.meta?.filterOnly !== true && column.id !== "__select__");

  const { columnOrder } = table.state;

  if (columnOrder.length === 0) {
    return columns;
  }

  const at = (column: DataGridColumn<TData>) => {
    const index = columnOrder.indexOf(column.id);

    return index === -1 ? columnOrder.length : index;
  };

  return columns.toSorted((a, b) => at(a) - at(b));
};

/** Human sort direction labels per filter kind. */
export const directionLabels = (spec: FilterSpec | undefined): readonly [string, string] => {
  if (spec?.kind === "number") {
    return ["1→9", "9→1"];
  }

  if (spec?.kind === "date") {
    return ["Oldest", "Newest"];
  }

  if (spec?.kind === "boolean") {
    return ["False→True", "True→False"];
  }

  return ["A→Z", "Z→A"];
};
