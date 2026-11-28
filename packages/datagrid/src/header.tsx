"use client";
"use no memo";

import type { FilterSpec } from "@patternmode/filters";
import { flexRender } from "@tanstack/react-table";
import type { Header, RowData } from "@tanstack/react-table";
import type { ReactNode } from "react";

import { ariaSortFor, getCellProps } from "./cell-props";
import { ColumnHeader } from "./column-menu";
import type { DataGridColumn, DataGridFeatures, DataGridTableInstance } from "./features";
import { columnLabel } from "./fields";
import { hasActions, placeHeaders } from "./shape";

export interface DataGridHeaderProps<TData extends RowData> {
  columnMenus: boolean;
  fixed: boolean;
  onOpenFilter: (columnId: string) => void;
  specs: ReadonlyMap<string, FilterSpec>;
  table: DataGridTableInstance<TData>;
}

const LeafName = <TData extends RowData>({
  column,
  name,
  ...props
}: DataGridHeaderProps<TData> & { column: DataGridColumn<TData>; name: ReactNode }) => {
  const spec = props.specs.get(column.id);

  return props.columnMenus && hasActions(column, spec) ? (
    <ColumnHeader
      column={column}
      name={name}
      onOpenFilter={props.onOpenFilter}
      spec={spec}
      table={props.table}
    />
  ) : (
    <span className="patternmode-datagrid__th-label">{name}</span>
  );
};

const ResizeHandle = <TData extends RowData>({
  header,
  table,
}: {
  header: Header<DataGridFeatures, TData>;
  table: DataGridTableInstance<TData>;
}) => {
  const { column } = header;

  if (!column.getCanResize()) {
    return null;
  }

  const label = columnLabel(column);
  const resizing = column.getIsResizing();

  return (
    <button
      aria-label={`Resize ${label} column`}
      className="patternmode-datagrid__resize-handle"
      data-resizing={resizing ? "" : undefined}
      onDoubleClick={() => {
        column.resetSize();
      }}
      onKeyDown={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
          return;
        }

        event.preventDefault();
        const delta = (event.shiftKey ? 48 : 16) * (event.key === "ArrowRight" ? 1 : -1);
        const min = column.columnDef.minSize ?? 48;
        const max = column.columnDef.maxSize ?? 1200;
        const nextSize = Math.min(Math.max(column.getSize() + delta, min), max);

        table.setColumnSizing((current) => ({ ...current, [column.id]: nextSize }));
      }}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      type="button"
    />
  );
};

/**
 * Sticky table header supporting grouped column headers, start & end pinned
 * columns, per-column action menus, and optional drag/keyboard column resizing.
 */
export const DataGridHeader = <TData extends RowData>(props: DataGridHeaderProps<TData>) => (
  <thead className="patternmode-datagrid__thead">
    {placeHeaders(props.table.getHeaderGroups()).map(({ cells, id }) => (
      <tr className="patternmode-datagrid__header-row" key={id}>
        {cells.map(({ header, rowSpan }) => {
          const { column } = header;
          const group = header.subHeaders.length > 0 && !header.isPlaceholder;
          const name = flexRender(column.columnDef.header, header.getContext());

          return (
            <th
              aria-sort={
                group ? undefined : ariaSortFor(column.getIsSorted(), column.getSortIndex())
              }
              className="patternmode-datagrid__th"
              colSpan={header.colSpan > 1 ? header.colSpan : undefined}
              data-group={group ? "" : undefined}
              data-span={rowSpan > 1 ? "" : undefined}
              key={header.id}
              rowSpan={rowSpan > 1 ? rowSpan : undefined}
              scope={group ? "colgroup" : "col"}
              {...(group ? {} : getCellProps(column, props.fixed))}
            >
              {group ? name : <LeafName {...props} column={column} name={name} />}
              {group ? null : <ResizeHandle header={header} table={props.table} />}
            </th>
          );
        })}
      </tr>
    ))}
  </thead>
);
