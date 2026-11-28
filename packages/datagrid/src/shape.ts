import type { FilterSpec } from "@patternmode/filters";
import type { Header, RowData } from "@tanstack/react-table";

import type { DataGridColumn, DataGridFeatures, DataGridTableInstance } from "./features";
import { parsePxWidth } from "./state";

type GridHeader<TData extends RowData> = Header<DataGridFeatures, TData>;

/**
 * Visible leaf columns in rendered order: start-pinned, then center, then
 * end-pinned — matching `getHeaderGroups()` and `row.getVisibleCells()`.
 */
export const getOrderedVisibleLeafColumns = <TData extends RowData>(
  table: DataGridTableInstance<TData>,
): DataGridColumn<TData>[] => [
  ...table.getPinnedVisibleLeafColumns("start"),
  ...table.getPinnedVisibleLeafColumns("center"),
  ...table.getPinnedVisibleLeafColumns("end"),
];

/** Whether a column's menu has anything in it: a sort, a filter, a pin or a hide. */
export const hasActions = <TData extends RowData>(
  column: DataGridColumn<TData>,
  spec: FilterSpec | undefined,
): boolean =>
  column.getCanSort() || spec !== undefined || column.getCanPin() || column.getCanHide();

/** Whether any shown column has a footer, such as a total. */
export const hasFooter = <TData extends RowData>(table: DataGridTableInstance<TData>): boolean =>
  getOrderedVisibleLeafColumns(table).some((column) => column.columnDef.footer !== undefined);

/**
 * Whether every shown column declares a fixed width (via `size` or pixel
 * `meta.width`) or column resizing is active, so the table uses `table-fixed`
 * with `<colgroup>` driven by `column.getSize()`.
 */
export const hasFixedWidths = <TData extends RowData>(
  table: DataGridTableInstance<TData>,
  resizable = false,
): boolean => {
  if (resizable) {
    return true;
  }

  const leaves = getOrderedVisibleLeafColumns(table);

  return (
    leaves.length > 0 &&
    leaves.every(
      (column) =>
        column.columnDef.size !== undefined ||
        parsePxWidth(column.columnDef.meta?.width) !== undefined,
    )
  );
};

/** One header cell to draw: the header, and how many header rows it spans. */
export interface PlacedHeader<TData extends RowData> {
  header: GridHeader<TData>;
  rowSpan: number;
}

/**
 * Each header row's cells. A column under no group, beside grouped ones, is one
 * cell spanning every header row, level with the other columns' names.
 */
export const placeHeaders = <TData extends RowData>(
  groups: readonly { id: string; headers: readonly GridHeader<TData>[] }[],
): { id: string; cells: PlacedHeader<TData>[] }[] => {
  const spanned = new Set<string>();

  return groups.map((group, index) => ({
    cells: group.headers.flatMap((header) => {
      const leaf = header.subHeaders.length === 0 || header.isPlaceholder;

      if (leaf && spanned.has(header.column.id)) {
        return [];
      }

      if (header.isPlaceholder) {
        spanned.add(header.column.id);

        return [{ header, rowSpan: groups.length - index }];
      }

      return [{ header, rowSpan: 1 }];
    }),
    id: group.id,
  }));
};
