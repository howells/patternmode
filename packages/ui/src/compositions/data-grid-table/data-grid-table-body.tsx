/** biome-ignore-all lint/performance/noBarrelFile: intentional package or module entrypoint */
import { useDataGrid } from "@patternmode/ui/compositions/data-grid";
import type { ComponentSize } from "@patternmode/ui/lib/size";
import { cn } from "@patternmode/ui/utils/cn";
import type { Cell, Column, Row } from "@tanstack/react-table";
import type * as React from "react";
import type { CSSProperties, ReactNode } from "react";
import "../data-grid/data-grid-types";
import { DataGridCheckbox } from "../data-grid/data-grid-checkbox";
import {
  bodyCellSpacingVariants,
  getPinningStyles,
} from "./data-grid-table-styles";

function getPinnedEdgePosition(
  isLastLeftPinned: boolean,
  isFirstRightPinned: boolean,
) {
  if (isLastLeftPinned) {
    return "left";
  }

  if (isFirstRightPinned) {
    return "right";
  }

  return undefined;
}

function DataGridTableRowSpacer() {
  return <tbody aria-hidden="true" className="h-2" />;
}

function DataGridTableBody({ children }: { children: ReactNode }) {
  const { props } = useDataGrid();

  return (
    <tbody
      className={cn(
        "[&_tr:last-child_td]:border-b-0",
        props.tableLayout?.rowRounded &&
          "[&_td:first-child]:rounded-s-lg [&_td:last-child]:rounded-e-lg",
        props.tableClassNames?.body,
      )}
    >
      {children}
    </tbody>
  );
}

function DataGridTableBodyRowSkeleton({ children }: { children: ReactNode }) {
  const { table, props } = useDataGrid();
  const rowHeight = props.tableLayout?.rowHeight ?? 72;

  return (
    <tr
      className={cn(
        "hover:bg-muted/10 data-[state=selected]:bg-muted/15",
        props.onRowClick && "cursor-pointer",
        props.tableLayout?.cellBorder && "[&_>:last-child]:border-e-0",
        props.tableLayout?.striped && "odd:bg-muted/5 hover:bg-muted/10",
        table.options.enableRowSelection && "[&_>:first-child]:relative",
        props.tableClassNames?.bodyRow,
      )}
      style={{ height: `${rowHeight}px` }}
    >
      {children}
    </tr>
  );
}

function DataGridTableBodyRowSkeletonCell<TData extends object>({
  children,
  column,
}: {
  children: ReactNode;
  column: Column<TData>;
}) {
  const { props, table } = useDataGrid<TData>();
  const rowHeight = props.tableLayout?.rowHeight ?? 72;
  const bodyCellSpacing = bodyCellSpacingVariants({
    size: props.tableLayout?.dense ? "dense" : "default",
  });

  // Cell content height should account for padding (default: py-3 = 24px total)
  const cellContentHeight = rowHeight - 24;

  return (
    <td
      className={cn(
        "align-middle",
        bodyCellSpacing,
        !props.tableLayout?.striped &&
          props.tableLayout?.rowBorder &&
          "border-gray-200 border-b-[0.5px]",
        props.tableLayout?.cellBorder && "border-e",
        props.tableLayout?.columnsResizable &&
          column.getCanResize() &&
          "truncate",
        column.columnDef.meta?.cellClassName,
        props.tableLayout?.columnsPinnable &&
          column.getCanPin() &&
          "data-pinned:bg-card [&[data-pinned=left][data-last-col=left]]:border-e-[0.5px]! [&[data-pinned=right][data-last-col=right]]:border-s-[0.5px]! [&[data-pinned][data-last-col]]:border-gray-200",
        column.getIndex() === 0 ||
          column.getIndex() === table.getVisibleFlatColumns().length - 1
          ? props.tableClassNames?.edgeCell
          : "",
      )}
      style={{ minHeight: `${rowHeight}px` }}
    >
      <div style={{ minHeight: `${cellContentHeight}px` }}>{children}</div>
    </td>
  );
}

function DataGridTableBodyRow<TData extends object>({
  children,
  row,
  dndRef,
  dndStyle,
  dataIndex,
}: {
  children: ReactNode;
  row: Row<TData>;
  dndRef?: React.Ref<HTMLTableRowElement>;
  dndStyle?: CSSProperties;
  dataIndex?: number;
}) {
  const { props, table } = useDataGrid<TData>();
  const rowHeight = props.tableLayout?.rowHeight ?? 72;

  return (
    <tr
      className={cn(
        "group/row hover:bg-muted/10 data-[state=selected]:bg-muted/15",
        props.onRowClick && "cursor-pointer",
        props.tableLayout?.cellBorder && "[&_>:last-child]:border-e-0",
        props.tableLayout?.striped && "odd:bg-muted/5 hover:bg-muted/10",
        table.options.enableRowSelection && "[&_>:first-child]:relative",
        props.tableClassNames?.bodyRow,
      )}
      data-index={dataIndex}
      data-state={
        table.options.enableRowSelection && row.getIsSelected()
          ? "selected"
          : undefined
      }
      onClick={() => props.onRowClick?.(row.original)}
      ref={dndRef}
      style={{ height: `${rowHeight}px`, ...(dndStyle ? dndStyle : null) }}
    >
      {children}
    </tr>
  );
}

function DataGridTableBodyRowExpandded<TData extends object>({
  row,
}: {
  row: Row<TData>;
}) {
  const { table } = useDataGrid<TData>();

  return (
    <tr className="bg-gray-100">
      <td className="p-0" colSpan={row.getVisibleCells().length}>
        {table
          .getAllColumns()
          .find((column) => column.columnDef.meta?.expandedContent)
          ?.columnDef.meta?.expandedContent?.(row.original)}
      </td>
    </tr>
  );
}

function DataGridTableBodyRowCell<TData extends object>({
  children,
  cell,
  dndRef,
  dndStyle,
}: {
  children: ReactNode;
  cell: Cell<TData, unknown>;
  dndRef?: React.Ref<HTMLTableCellElement>;
  dndStyle?: CSSProperties;
}) {
  const { props } = useDataGrid<TData>();

  const { column, row } = cell;
  const isPinned = column.getIsPinned();
  const isLastLeftPinned =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinned =
    isPinned === "right" && column.getIsFirstColumn("right");
  const bodyCellSpacing = bodyCellSpacingVariants({
    size: props.tableLayout?.dense ? "dense" : "default",
  });

  // Hide bottom border when row is expanded (seamless transition to expanded content)
  const isRowExpanded = row.getIsExpanded();

  return (
    <td
      key={cell.id}
      ref={dndRef}
      {...(props.tableLayout?.columnsDraggable && !isPinned ? { cell } : {})}
      className={cn(
        "align-middle",
        bodyCellSpacing,
        !props.tableLayout?.striped &&
          props.tableLayout?.rowBorder &&
          !isRowExpanded &&
          "border-gray-200 border-b-[0.5px]",
        props.tableLayout?.cellBorder && "border-e",
        props.tableLayout?.columnsResizable &&
          column.getCanResize() &&
          "truncate",
        cell.column.columnDef.meta?.cellClassName,
        props.tableLayout?.columnsPinnable &&
          column.getCanPin() &&
          "data-pinned:bg-card [&[data-pinned=left][data-last-col=left]]:border-e-[0.5px]! [&[data-pinned=right][data-last-col=right]]:border-s-[0.5px]! [&[data-pinned][data-last-col]]:border-gray-200",
        column.getIndex() === 0 ||
          column.getIndex() === row.getVisibleCells().length - 1
          ? props.tableClassNames?.edgeCell
          : "",
      )}
      data-last-col={getPinnedEdgePosition(
        isLastLeftPinned,
        isFirstRightPinned,
      )}
      data-pinned={isPinned || undefined}
      style={{
        ...(props.tableLayout?.columnsPinnable &&
          column.getCanPin() &&
          getPinningStyles(column)),
        ...(dndStyle ? dndStyle : null),
      }}
    >
      {children}
    </td>
  );
}

function DataGridTableEmpty() {
  const { table, props } = useDataGrid();
  const totalColumns = table.getAllColumns().length;

  return (
    <tr>
      <td
        className="py-6 text-center text-muted-foreground"
        colSpan={totalColumns}
      >
        {props.emptyMessage || "No data available"}
      </td>
    </tr>
  );
}

function DataGridTableLoader() {
  const { props } = useDataGrid();

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex items-center gap-2 rounded-md border bg-card px-4 py-2 font-medium text-muted-foreground text-sm leading-none shadow-xs">
        <svg
          aria-hidden="true"
          className="-ml-1 h-5 w-5 animate-spin text-muted-foreground"
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
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"
          />
        </svg>
        {props.loadingMessage || "Loading..."}
      </div>
    </div>
  );
}

function DataGridTableRowSelect<TData>({
  row,
  size,
}: {
  row: Row<TData>;
  size?: ComponentSize;
}) {
  const isSmOrLarger = size ? size !== "2xs" && size !== "xs" : false;
  const dataGridSize = isSmOrLarger ? "sm" : "xs";
  const rowWithSomeSelected = row as Row<TData> & {
    getIsSomeSelected?: () => boolean;
  };

  return (
    <>
      <div
        className={cn(
          "absolute start-0 top-0 bottom-0 hidden w-[2px] bg-primary",
          row.getIsSelected() && "block",
        )}
      />
      <DataGridCheckbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        indeterminate={rowWithSomeSelected.getIsSomeSelected?.() === true}
        onCheckedChange={(value) => row.toggleSelected(value === true)}
        size={dataGridSize}
      />
    </>
  );
}

function DataGridTableRowSelectAll({ size }: { size?: ComponentSize }) {
  const { table, recordCount, isLoading } = useDataGrid();
  const isSmOrLarger = size ? size !== "2xs" && size !== "xs" : false;
  const dataGridSize = isSmOrLarger ? "sm" : "xs";
  const isAllSelected = table.getIsAllPageRowsSelected();
  const isSomeSelected = table.getIsSomePageRowsSelected();

  return (
    <DataGridCheckbox
      aria-label="Select all"
      checked={isAllSelected}
      disabled={isLoading || recordCount === 0}
      indeterminate={!isAllSelected && isSomeSelected}
      onCheckedChange={(value) =>
        table.toggleAllPageRowsSelected(value === true)
      }
      size={dataGridSize}
    />
  );
}

export { flexRender } from "@tanstack/react-table";
export {
  DataGridTableBody,
  DataGridTableBodyRow,
  DataGridTableBodyRowCell,
  DataGridTableBodyRowExpandded,
  DataGridTableBodyRowSkeleton,
  DataGridTableBodyRowSkeletonCell,
  DataGridTableEmpty,
  DataGridTableLoader,
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
  DataGridTableRowSpacer,
};
