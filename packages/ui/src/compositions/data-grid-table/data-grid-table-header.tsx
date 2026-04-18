import { useDataGrid } from "@patternmode/ui/compositions/data-grid";
import { cn } from "@patternmode/ui/utils/cn";
import type { Header, HeaderGroup } from "@tanstack/react-table";
import type * as React from "react";
import type { CSSProperties, ReactNode } from "react";
import "../data-grid/data-grid-types";
import {
  getPinningStyles,
  headerCellSpacingVariants,
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

function DataGridTableBase({ children }: { children: ReactNode }) {
  const { props } = useDataGrid();

  return (
    <table
      className={cn(
        "w-full caption-bottom text-left align-middle font-normal text-foreground text-sm rtl:text-right",
        !props.tableLayout?.columnsDraggable &&
          "border-separate border-spacing-0",
        props.tableLayout?.width === "fixed" ? "table-fixed" : "table-auto",
        props.tableClassNames?.base,
      )}
      data-component="data-grid-table"
      data-slot="data-grid-table"
    >
      {children}
    </table>
  );
}

function DataGridTableHead({ children }: { children: ReactNode }) {
  const { props } = useDataGrid();

  return (
    <thead
      className={cn(
        props.tableClassNames?.header,
        props.tableLayout?.headerSticky && props.tableClassNames?.headerSticky,
      )}
    >
      {children}
    </thead>
  );
}

function DataGridTableHeadRow<TData extends object>({
  children,
  headerGroup,
}: {
  children: ReactNode;
  headerGroup: HeaderGroup<TData>;
}) {
  const { props } = useDataGrid<TData>();

  return (
    <tr
      className={cn(
        props.tableLayout?.headerBackground === false
          ? "bg-transparent"
          : "bg-card",
        props.tableLayout?.headerBorder &&
          "[&>th]:border-border [&>th]:border-b-[0.5px]",
        props.tableLayout?.cellBorder && "[&_>:last-child]:border-e-0",
        props.tableClassNames?.headerRow,
      )}
      key={headerGroup.id}
    >
      {children}
    </tr>
  );
}

function DataGridTableHeadRowCell<TData extends object>({
  children,
  header,
  dndRef,
  dndStyle,
}: {
  children: ReactNode;
  header: Header<TData, unknown>;
  dndRef?: React.Ref<HTMLTableCellElement>;
  dndStyle?: CSSProperties;
}) {
  const { props } = useDataGrid<TData>();

  const { column } = header;
  const isPinned = column.getIsPinned();
  const isLastLeftPinned =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinned =
    isPinned === "right" && column.getIsFirstColumn("right");
  const headerCellSpacing = headerCellSpacingVariants({
    size: props.tableLayout?.dense ? "dense" : "default",
  });

  return (
    <th
      className={cn(
        "relative text-left align-middle font-normal text-muted-foreground text-sm rtl:text-right",
        headerCellSpacing,
        props.tableLayout?.cellBorder && "border-e",
        props.tableLayout?.columnsResizable &&
          column.getCanResize() &&
          "truncate",
        props.tableLayout?.columnsPinnable &&
          column.getCanPin() &&
          "data-pinned:bg-card [&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0 [&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=left][data-last-col=left]]:border-e-[0.5px]! [&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=right][data-last-col=right]]:border-s-[0.5px]! [&[data-pinned][data-last-col]]:border-gray-200",
        header.column.columnDef.meta?.headerClassName,
        column.getIndex() === 0 ||
          column.getIndex() === header.headerGroup.headers.length - 1
          ? props.tableClassNames?.edgeCell
          : "",
      )}
      data-last-col={getPinnedEdgePosition(
        isLastLeftPinned,
        isFirstRightPinned,
      )}
      data-pinned={isPinned || undefined}
      key={header.id}
      ref={dndRef}
      style={{
        ...(props.tableLayout?.width === "fixed" && {
          width: `${header.getSize()}px`,
        }),
        ...(props.tableLayout?.columnsPinnable &&
          column.getCanPin() &&
          getPinningStyles(column)),
        ...(dndStyle ? dndStyle : null),
      }}
    >
      {children}
    </th>
  );
}

function DataGridTableHeadRowCellResize<TData>({
  header,
}: {
  header: Header<TData, unknown>;
}) {
  const { column } = header;

  return (
    <div
      {...{
        onDoubleClick: () => column.resetSize(),
        onMouseDown: header.getResizeHandler(),
        onTouchStart: header.getResizeHandler(),
        className:
          "absolute top-0 h-full w-4 cursor-col-resize user-select-none touch-none -end-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:-translate-x-px",
      }}
    />
  );
}

export { flexRender } from "@tanstack/react-table";
export {
  DataGridTableBase,
  DataGridTableHead,
  DataGridTableHeadRow,
  DataGridTableHeadRowCell,
  DataGridTableHeadRowCellResize,
};
