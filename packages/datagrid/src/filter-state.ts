"use no memo";

import { initialRule } from "@patternmode/filters";
import type { FilterSpec } from "@patternmode/filters";
import type { RowData } from "@tanstack/react-table";

import type { DataGridColumn, DataGridTableInstance } from "./features";
import { filterSpecOf } from "./fields";

/** Adds a filter on a column, or returns to the one it has, and opens it. */
export const startFilter = <TData extends RowData>(
  column: DataGridColumn<TData>,
  spec: FilterSpec,
  open: (columnId: string) => void,
) => {
  if (column.getFilterValue() === undefined) {
    column.setFilterValue(initialRule(spec.kind));
  }

  open(column.id);
};

/**
 * Every filterable column's spec, keyed by column ID. Option counts come from
 * TanStack's memoised faceted unique values (`column.getFacetedUniqueValues()`)
 * so they reflect other active filters without manually rescanning rows.
 */
export const useFilterSpecs = <TData extends RowData>(
  table: DataGridTableInstance<TData>,
): ReadonlyMap<string, FilterSpec> => {
  const coreRows = table.getCoreRowModel().flatRows;
  const columns = table.getAllLeafColumns();
  const specs = new Map<string, FilterSpec>();

  for (const column of columns) {
    const spec = filterSpecOf(coreRows, column);

    if (spec !== null) {
      specs.set(column.id, spec);
    }
  }

  return specs;
};
