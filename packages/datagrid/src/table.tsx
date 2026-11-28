"use client";
"use no memo";

import type { FilterSpec } from "@patternmode/filters";
import type { RowData } from "@tanstack/react-table";
import type { ReactNode } from "react";
import { useRef } from "react";

import { DataGridBody } from "./body";
import type { DataGridColumn, DataGridRow, DataGridTableInstance } from "./features";
import { DataGridFooter } from "./footer";
import { DataGridHeader } from "./header";
import { getOrderedVisibleLeafColumns, hasFixedWidths, hasFooter } from "./shape";
import type { DataGridSectionRender } from "./types";

const AUTO_VIRTUALIZE_THRESHOLD = 100;

export interface DataGridTableProps<TData extends RowData> {
  columnMenus?: boolean | undefined;
  emptyDataMessage?: ReactNode | undefined;
  emptyMessage?: ReactNode | undefined;
  error?: ReactNode | undefined;
  estimateRowHeight?: number | undefined;
  fetching?: boolean | undefined;
  getRowHref?: ((row: TData) => string | null | undefined) | undefined;
  hasActiveFilters?: boolean | undefined;
  inline?: boolean | undefined;
  loading?: boolean | undefined;
  onClearFilters?: (() => void) | undefined;
  onNavigate?: ((href: string) => void) | undefined;
  onOpenFilter: (columnId: string) => void;
  onRetry?: (() => void) | undefined;
  resizable?: boolean | undefined;
  rows?: readonly DataGridRow<TData>[] | undefined;
  sectionOf?: DataGridSectionRender<TData> | undefined;
  skeletonRows?: number | undefined;
  specs: ReadonlyMap<string, FilterSpec>;
  table: DataGridTableInstance<TData>;
  /** Row virtualisation: `"auto"` activates above 100 rendered rows, `true` forces, `false` disables. */
  virtualize?: boolean | "auto" | undefined;
}

const ColGroup = <TData extends RowData>({
  fixed,
  leaves,
}: {
  fixed: boolean;
  leaves: readonly DataGridColumn<TData>[];
}) =>
  fixed ? (
    <colgroup>
      {leaves.map((column) => (
        <col key={column.id} style={{ width: `${column.getSize()}px` }} />
      ))}
    </colgroup>
  ) : null;

const isVirtualized = (mode: boolean | "auto", rowCount: number): boolean =>
  mode === true || (mode === "auto" && rowCount > AUTO_VIRTUALIZE_THRESHOLD);

const buildTableAttributes = ({
  fetching,
  fixed,
  loading,
  rowCount,
  shouldVirtualize,
  totalSize,
}: {
  fetching: boolean;
  fixed: boolean;
  loading: boolean;
  rowCount: number;
  shouldVirtualize: boolean;
  totalSize: number;
}) => ({
  "aria-busy": loading || fetching ? true : undefined,
  "aria-rowcount": shouldVirtualize ? rowCount + 1 : undefined,
  className: "patternmode-datagrid__table",
  "data-fetching": fetching ? "" : undefined,
  "data-fixed": fixed ? "" : undefined,
  style: fixed ? { width: `${totalSize}px` } : undefined,
});

/**
 * The HTML table: sticky header rows, data/section rows, optional footer,
 * pin-ordered `<colgroup>` driven by TanStack sizing, fetching indicator, and
 * optional `@tanstack/react-virtual` virtualisation.
 */
export const DataGridTable = <TData extends RowData>(
  props: DataGridTableProps<TData>,
): React.ReactElement => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const fetching = props.fetching ?? false;
  const inline = props.inline ?? false;
  const loading = props.loading ?? false;
  const resizable = props.resizable ?? false;
  const rows = props.rows ?? props.table.getRowModel().rows;
  const fixed = hasFixedWidths(props.table, resizable);
  const leaves = getOrderedVisibleLeafColumns(props.table);
  const shouldVirtualize = isVirtualized(props.virtualize ?? "auto", rows.length);
  const frameClass = inline ? "patternmode-datagrid__inline-scroll" : "patternmode-datagrid__frame";
  const tableAttrs = buildTableAttributes({
    fetching,
    fixed,
    loading,
    rowCount: rows.length,
    shouldVirtualize,
    totalSize: props.table.getTotalSize(),
  });

  return (
    <div className={frameClass} data-fetching={fetching ? "" : undefined} ref={scrollRef}>
      {fetching ? <div aria-hidden="true" className="patternmode-datagrid__progress" /> : null}
      <table {...tableAttrs}>
        <ColGroup fixed={fixed} leaves={leaves} />
        <DataGridHeader
          columnMenus={props.columnMenus ?? true}
          fixed={fixed}
          onOpenFilter={props.onOpenFilter}
          specs={props.specs}
          table={props.table}
        />
        <DataGridBody
          columns={leaves}
          emptyDataMessage={props.emptyDataMessage}
          emptyMessage={props.emptyMessage}
          error={props.error}
          estimateRowHeight={props.estimateRowHeight}
          fixed={fixed}
          getRowHref={props.getRowHref}
          hasActiveFilters={props.hasActiveFilters}
          loading={loading}
          onClearFilters={props.onClearFilters}
          onNavigate={props.onNavigate}
          onRetry={props.onRetry}
          rows={rows}
          scrollRef={scrollRef}
          sectionOf={props.sectionOf}
          skeletonRows={props.skeletonRows}
          span={leaves.length}
          virtualize={shouldVirtualize}
        />
        {hasFooter(props.table) ? <DataGridFooter fixed={fixed} table={props.table} /> : null}
      </table>
    </div>
  );
};
