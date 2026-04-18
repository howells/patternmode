import { useDataGrid } from "@patternmode/ui/compositions/data-grid";
import type { Cell, HeaderGroup, Row } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Fragment, useRef } from "react";
import { DataGridScrollSentinel } from "../data-grid/data-grid-scroll-sentinel";
import {
  DataGridTableBody,
  DataGridTableBodyRow,
  DataGridTableBodyRowCell,
  DataGridTableBodyRowExpandded,
  DataGridTableBodyRowSkeleton,
  DataGridTableBodyRowSkeletonCell,
  DataGridTableEmpty,
  DataGridTableFooter,
  DataGridTableRowSpacer,
  flexRender,
} from "./data-grid-table-body";
import {
  DataGridTableBase,
  DataGridTableHead,
  DataGridTableHeadRow,
  DataGridTableHeadRowCell,
  DataGridTableHeadRowCellResize,
} from "./data-grid-table-header";

function buildDataGridSkeletonRowKeys(count: number) {
  return Array.from(
    { length: count },
    (_, index) => `data-grid-skeleton-row-${index}`,
  );
}

function getInitialVisibleRowIndexes(rowCount: number) {
  return Array.from({ length: Math.min(rowCount, 10) }, (_, index) => index);
}

/**
 * DataGridTable UI component.
 * Import from "@patternmode/ui/compositions/data-grid-table".
 * Uses variant-based styling via class-variance-authority.
 */
function DataGridTable<TData extends object>() {
  const { table, isLoading, props } = useDataGrid<TData>();
  const pagination = table.getState().pagination;
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();

  // Get row height from props or use defaults
  const rowHeight = props.tableLayout?.rowHeight ?? 72;
  const expandedRowHeight = props.tableLayout?.expandedRowHeight ?? 400;

  // Set up virtualizer with dynamic measurement
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: (index) => {
      // Check if row is expanded to provide better estimate
      const row = rows[index];
      return row?.getIsExpanded() ? expandedRowHeight : rowHeight;
    },
    overscan: 5,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();
  const renderedRowIndexes =
    virtualRows.length > 0
      ? virtualRows.map((virtualRow) => virtualRow.index)
      : getInitialVisibleRowIndexes(rows.length);

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <div
      className="overflow-auto"
      ref={tableContainerRef}
      style={{ maxHeight: "calc(100vh - 8rem)" }}
    >
      <DataGridTableBase>
        <DataGridTableHead>
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<TData>) => (
            <DataGridTableHeadRow
              headerGroup={headerGroup}
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => {
                const { column } = header;

                return (
                  <DataGridTableHeadRowCell header={header} key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    {props.tableLayout?.columnsResizable &&
                      column.getCanResize() && (
                        <DataGridTableHeadRowCellResize header={header} />
                      )}
                  </DataGridTableHeadRowCell>
                );
              })}
            </DataGridTableHeadRow>
          ))}
        </DataGridTableHead>

        {(props.tableLayout?.striped || !props.tableLayout?.rowBorder) && (
          <DataGridTableRowSpacer />
        )}

        <DataGridTableBody>
          {(() => {
            // Determine which content to render based on loading and data state
            const isSkeletonLoading =
              isLoading &&
              props.loadingMode === "skeleton" &&
              pagination?.pageSize;
            const isSpinnerLoading =
              isLoading && props.loadingMode === "spinner";
            const hasRows = table.getRowModel().rows.length > 0;

            if (isSkeletonLoading) {
              const skeletonRowKeys = buildDataGridSkeletonRowKeys(
                pagination.pageSize,
              );
              // Show skeleton loading immediately
              return skeletonRowKeys.map((rowKey) => (
                <DataGridTableBodyRowSkeleton key={rowKey}>
                  {table.getVisibleFlatColumns().map((column) => (
                    <DataGridTableBodyRowSkeletonCell
                      column={column}
                      key={column.id}
                    >
                      {column.columnDef.meta?.skeleton}
                    </DataGridTableBodyRowSkeletonCell>
                  ))}
                </DataGridTableBodyRowSkeleton>
              ));
            }

            if (isSpinnerLoading) {
              // Show spinner loading immediately
              return (
                <tr>
                  <td
                    className="p-8"
                    colSpan={table.getVisibleFlatColumns().length}
                  >
                    <div className="flex items-center justify-center">
                      <svg
                        aria-hidden="true"
                        className="mr-3 -ml-1 h-5 w-5 animate-spin text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Loading spinner</title>
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          fill="currentColor"
                        />
                      </svg>
                      {props.loadingMessage || "Loading..."}
                    </div>
                  </td>
                </tr>
              );
            }

            if (hasRows) {
              return (
                <>
                  {paddingTop > 0 && (
                    <tr>
                      <td style={{ height: `${paddingTop}px` }} />
                    </tr>
                  )}
                  {renderedRowIndexes.map((rowIndex) => {
                    const row = rows[rowIndex] as Row<TData>;
                    return (
                      <Fragment key={row.id}>
                        <DataGridTableBodyRow
                          dataIndex={rowIndex}
                          dndRef={rowVirtualizer.measureElement}
                          row={row}
                        >
                          {row
                            .getVisibleCells()
                            .map((cell: Cell<TData, unknown>) => (
                              <DataGridTableBodyRowCell
                                cell={cell}
                                key={cell.id}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </DataGridTableBodyRowCell>
                            ))}
                        </DataGridTableBodyRow>
                        {row.getIsExpanded() && (
                          <DataGridTableBodyRowExpandded row={row} />
                        )}
                      </Fragment>
                    );
                  })}
                  {paddingBottom > 0 && (
                    <tr>
                      <td style={{ height: `${paddingBottom}px` }} />
                    </tr>
                  )}
                  {props.onEndReached && (
                    <tr>
                      <td colSpan={table.getVisibleFlatColumns().length}>
                        <DataGridScrollSentinel
                          onEndReached={props.onEndReached}
                          threshold={props.endReachedThreshold}
                        />
                      </td>
                    </tr>
                  )}
                </>
              );
            }

            // No data and not loading
            return <DataGridTableEmpty />;
          })()}
        </DataGridTableBody>

        <DataGridTableFooter />
      </DataGridTableBase>
    </div>
  );
}

export {
  DataGridTableBody,
  DataGridTableBodyRow,
  DataGridTableBodyRowCell,
  DataGridTableBodyRowExpandded,
  DataGridTableBodyRowSkeleton,
  DataGridTableBodyRowSkeletonCell,
  DataGridTableEmpty,
  DataGridTableFooter,
  DataGridTableLoader,
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
  DataGridTableRowSpacer,
} from "./data-grid-table-body";
export {
  DataGridTableBase,
  DataGridTableHead,
  DataGridTableHeadRow,
  DataGridTableHeadRowCell,
  DataGridTableHeadRowCellResize,
} from "./data-grid-table-header";
export { DataGridTable };
