import { cellValues, compileRule, readCellValue } from "@patternmode/filters/state";
import type { Cell, CellInput, FilterRule } from "@patternmode/filters/state";
import {
  columnFacetingFeature,
  columnFilteringFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createExpandedRowModel,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  globalFilteringFeature,
  metaHelper,
  rowExpandingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
} from "@tanstack/react-table";
import type {
  Column,
  ColumnDef,
  ReactTable,
  Row,
  RowData,
  TableFeatures,
} from "@tanstack/react-table";

import type { DataGridColumnMeta } from "./types";

const isCellPrimitive = (raw: unknown): raw is CellInput =>
  raw === null ||
  raw === undefined ||
  // oxlint-disable-next-line anti-slop/no-runtime-typeof -- hot-path cell narrowing avoids per-cell Zod allocations across 50k+ rows
  typeof raw === "string" ||
  // oxlint-disable-next-line anti-slop/no-runtime-typeof -- hot-path cell narrowing avoids per-cell Zod allocations across 50k+ rows
  typeof raw === "number" ||
  // oxlint-disable-next-line anti-slop/no-runtime-typeof -- hot-path cell narrowing avoids per-cell Zod allocations across 50k+ rows
  typeof raw === "boolean" ||
  raw instanceof Date ||
  Array.isArray(raw);

/** Fast hot-path reader converting a TanStack row cell into a filterable `Cell`. */
export const readRowCell = <TFeatures extends TableFeatures, TData extends RowData>(
  row: Row<TFeatures, TData>,
  columnId: string,
): Cell => {
  const raw: unknown = row.getValue(columnId);

  return isCellPrimitive(raw) ? readCellValue(raw) : { kind: "other" };
};

/** The grid's compiled column filter function: every column filters by a rule. */
export const filterFn_rule = <TFeatures extends TableFeatures, TData extends RowData>(
  row: Row<TFeatures, TData>,
  columnId: string,
  rule: FilterRule,
): boolean => {
  const compiled = compileRule(rule);

  return compiled.active ? compiled.test(readRowCell(row, columnId)) : true;
};

filterFn_rule.autoRemove = (rule: FilterRule | undefined): boolean => rule === undefined;

const matchOptionLabel = (
  meta: DataGridColumnMeta | undefined,
  rawText: string,
  needle: string,
): boolean => {
  if (
    meta?.searchText !== undefined &&
    meta.searchText(rawText).toLocaleLowerCase().includes(needle)
  ) {
    return true;
  }

  if (meta?.filter !== undefined && meta.filter !== false && meta.filter.kind === "option") {
    const matched = meta.filter.options.find((option) => option.value === rawText);

    if (matched !== undefined && matched.label.toLocaleLowerCase().includes(needle)) {
      return true;
    }
  }

  return false;
};

const readColumnMeta = <TFeatures extends TableFeatures, TData extends RowData>(
  row: Row<TFeatures, TData>,
  columnId: string,
): DataGridColumnMeta | undefined => {
  const rawMeta: unknown = row.table.getColumn(columnId)?.columnDef.meta;

  if (rawMeta === null || rawMeta === undefined) {
    return undefined;
  }

  // SAFETY: `filterFn_gridSearch` is only registered in `dataGridFeatures`, whose `columnMeta` is `DataGridColumnMeta`.
  return rawMeta;
};

/**
 * Global search filter matching raw cell text plus declared `meta.filter` option
 * labels (e.g. searching "Spec ready" matches `status: "ready"`) and `meta.searchText`.
 */
export const filterFn_gridSearch = <TFeatures extends TableFeatures, TData extends RowData>(
  row: Row<TFeatures, TData>,
  columnId: string,
  filterValue: string,
): boolean => {
  const needle = filterValue.trim().toLocaleLowerCase();

  if (needle === "") {
    return true;
  }

  const cell = readRowCell(row, columnId);
  const values = cellValues(cell);

  if (values.length === 0) {
    return false;
  }

  const meta = readColumnMeta(row, columnId);

  for (const value of values) {
    if (value.toLocaleLowerCase().includes(needle) || matchOptionLabel(meta, value, needle)) {
      return true;
    }
  }

  return false;
};

/**
 * The features every `<DataGrid>` registers. Consumers type their columns with
 * `DataGridColumnDef<Row>`.
 */
export const dataGridFeatures = tableFeatures({
  columnFacetingFeature,
  columnFilteringFeature,
  columnMeta: metaHelper<DataGridColumnMeta>(),
  columnOrderingFeature,
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  expandedRowModel: createExpandedRowModel(),
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
  filterFns: {
    gridSearch: filterFn_gridSearch,
    includesString: filterFn_includesString,
    rule: filterFn_rule,
  },
  filteredRowModel: createFilteredRowModel(),
  globalFilteringFeature,
  paginatedRowModel: createPaginatedRowModel(),
  rowExpandingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    datetime: sortFn_datetime,
    text: sortFn_text,
  },
  sortedRowModel: createSortedRowModel(),
});

export type DataGridFeatures = typeof dataGridFeatures;

export type DataGridColumnDef<TData extends RowData> = ColumnDef<DataGridFeatures, TData>;

export type DataGridColumn<TData extends RowData> = Column<DataGridFeatures, TData>;

export type DataGridRow<TData extends RowData> = Row<DataGridFeatures, TData>;

export type DataGridTableInstance<TData extends RowData> = ReactTable<DataGridFeatures, TData>;
