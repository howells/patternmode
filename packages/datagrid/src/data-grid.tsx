"use client";
"use no memo";

import type { RowData } from "@tanstack/react-table";
import { cn } from "cn";
import type { ReactNode } from "react";

import type { DataGridTableInstance } from "./features";
import { DataGridSelectionBar } from "./selection-bar";
import { DataGridTable } from "./table";
import { DataGridToolbar } from "./toolbar";
import type { DataGridDensity, DataGridSectionRender } from "./types";
import { useDataGrid } from "./use-data-grid";
import type { DataGridSelectionRenderer, UseDataGridOptions } from "./use-data-grid";

export interface DataGridProps<TData extends RowData> extends UseDataGridOptions<TData> {
  className?: string | undefined;
  /** Whether each column header opens its action menu. Defaults to true. */
  columnMenus?: boolean | undefined;
  /** Row vertical density. Defaults to "comfortable". */
  density?: DataGridDensity | undefined;
  disableToolbar?: boolean | undefined;
  /** Rendered when the underlying dataset has zero rows (no filters active). */
  emptyDataMessage?: ReactNode | undefined;
  /** Rendered when search or filters match zero rows. */
  emptyMessage?: ReactNode | undefined;
  /** Error message rendered inside the table frame when a server query fails. */
  error?: ReactNode | undefined;
  /** Estimated row height in px when virtualisation is active. Defaults to 41. */
  estimateRowHeight?: number | undefined;
  /** Non-destructive background refetch indicator (keeps existing rows visible). */
  fetching?: boolean | undefined;
  getRowHref?: ((row: TData) => string | null | undefined) | undefined;
  layout?: "full" | "inline" | undefined;
  /** Shows skeleton rows when initial data is loading and `data` is empty. */
  loading?: boolean | undefined;
  /** Custom navigation handler for `getRowHref` plain left-clicks. */
  onNavigate?: ((href: string) => void) | undefined;
  /** Retry callback displayed beside `error`. */
  onRetry?: (() => void) | undefined;
  searchPlaceholder?: string | undefined;
  /** Heading across the table for a row that heads others; null for an ordinary row. */
  sectionOf?: DataGridSectionRender<TData> | undefined;
  /** Bulk actions rendered in the selection bar when rows are selected. */
  selectionActions?: DataGridSelectionRenderer<TData> | undefined;
  /** Enable scoped `/` and `F` keyboard shortcuts. Defaults to true. */
  shortcuts?: boolean | undefined;
  /** Number of skeleton placeholder rows shown while `loading`. Defaults to 8. */
  skeletonRows?: number | undefined;
  /** Consumer controls rendered in the toolbar right after Search. */
  toolbarStart?: ((table: DataGridTableInstance<TData>) => ReactNode) | undefined;
  /** Row virtualisation: `"auto"` activates above 100 rendered rows, `true` forces, `false` disables. */
  virtualize?: boolean | "auto" | undefined;
}

/**
 * Kitchen-sink DataGrid on TanStack Table v9 and Patternmode Filters: search,
 * typed column filter rules (text, number, option, date, boolean), multi-sort,
 * start & end column pinning, drag & keyboard reorder, column resizing, row
 * selection & bulk actions, foldable sections, sticky headers & footers,
 * virtualisation, server/manual mode, async loading/error states, and SSR-safe URL sync.
 *
 * Need a custom layout? Compose `useDataGrid` with `DataGridToolbar`,
 * `DataGridSelectionBar`, and `DataGridTable` directly.
 */
export const DataGrid = <TData extends RowData>({
  className,
  columnMenus = true,
  density = "comfortable",
  disableToolbar = false,
  emptyDataMessage,
  emptyMessage = "No matching rows",
  error,
  estimateRowHeight,
  fetching = false,
  getRowHref,
  layout = "full",
  loading = false,
  onNavigate,
  onRetry,
  searchPlaceholder,
  sectionOf,
  selectionActions,
  shortcuts = true,
  skeletonRows,
  toolbarStart,
  virtualize = "auto",
  ...engineOptions
}: DataGridProps<TData>): React.ReactElement => {
  const { bindScope, ...grid } = useDataGrid(engineOptions);
  const inline = layout === "inline";

  const handleClearSelection = () => {
    grid.clearSelection();
  };

  const handleClearFilters = () => {
    grid.clearFilters();
  };

  const handleOpenFilter = (columnId: string) => {
    grid.openFilterChannel.open(columnId);
  };

  return (
    <div
      className={cn("patternmode-datagrid", className)}
      data-density={density}
      data-layout={inline ? "inline" : "full"}
      ref={(node) => {
        bindScope(node);
      }}
    >
      {disableToolbar ? null : (
        <DataGridToolbar
          globalFilter={grid.state.globalFilter}
          inline={inline}
          isTree={grid.isTree}
          openFilterChannel={grid.openFilterChannel}
          pageSizes={grid.pageSizes}
          paging={grid.paged}
          scopeRef={grid.scopeElement}
          searchPlaceholder={searchPlaceholder}
          shortcuts={shortcuts}
          specs={grid.specs}
          start={toolbarStart?.(grid.table)}
          table={grid.table}
        />
      )}
      {grid.selectable ? (
        <DataGridSelectionBar
          actions={selectionActions?.({
            clearSelection: grid.clearSelection,
            selectedIds: grid.selectedIds,
            selectedRows: grid.selectedRows,
            table: grid.table,
          })}
          onClear={handleClearSelection}
          selectedCount={grid.selectedCount}
        />
      ) : null}
      <div className="patternmode-datagrid__body">
        <DataGridTable
          columnMenus={columnMenus}
          emptyDataMessage={emptyDataMessage}
          emptyMessage={emptyMessage}
          error={error}
          estimateRowHeight={estimateRowHeight}
          fetching={fetching}
          getRowHref={getRowHref}
          hasActiveFilters={grid.hasActiveFilters}
          inline={inline}
          loading={loading}
          onClearFilters={handleClearFilters}
          onNavigate={onNavigate}
          onOpenFilter={handleOpenFilter}
          onRetry={onRetry}
          resizable={grid.resizable}
          sectionOf={sectionOf}
          skeletonRows={skeletonRows}
          specs={grid.specs}
          table={grid.table}
          virtualize={virtualize}
        />
      </div>
    </div>
  );
};
