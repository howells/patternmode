"use client";

import { Checkbox } from "@patternmode/ui/components/checkbox";
import type { ComponentSize } from "@patternmode/ui/lib/size";
import { cn } from "@patternmode/ui/utils/cn";
import type { ColumnDef, Row, Table } from "@tanstack/react-table";
import type * as React from "react";

type DataGridControlSize = Extract<ComponentSize, "xs" | "sm">;

export type DataGridCheckboxProps = Omit<
  React.ComponentProps<typeof Checkbox>,
  "size"
> & {
  size?: DataGridControlSize;
};

export function DataGridCheckbox({
  size = "xs",
  className,
  ...props
}: DataGridCheckboxProps) {
  return (
    <Checkbox
      className={cn(
        "rounded-sm border-muted-foreground/40 bg-card align-[inherit] shadow-xs",
        className,
      )}
      size={size}
      {...props}
    />
  );
}

export interface DataGridRowSelectAllProps<TData> {
  disabled?: boolean;
  table: Table<TData>;
}

export function DataGridRowSelectAll<TData>({
  table,
  disabled,
}: DataGridRowSelectAllProps<TData>) {
  const isAllSelected = table.getIsAllPageRowsSelected();
  const isSomeSelected = table.getIsSomePageRowsSelected();

  return (
    <DataGridCheckbox
      aria-label="Select all"
      checked={isAllSelected}
      disabled={disabled === true}
      indeterminate={!isAllSelected && isSomeSelected}
      onCheckedChange={(value) =>
        table.toggleAllPageRowsSelected(value === true)
      }
    />
  );
}

export interface DataGridRowSelectProps<TData> {
  disabled?: boolean;
  row: Row<TData>;
}

export function DataGridRowSelect<TData>({
  row,
  disabled,
}: DataGridRowSelectProps<TData>) {
  const rowWithSomeSelected = row as Row<TData> & {
    getIsSomeSelected?: () => boolean;
  };

  return (
    <DataGridCheckbox
      aria-label="Select row"
      checked={row.getIsSelected()}
      disabled={disabled === true}
      indeterminate={rowWithSomeSelected.getIsSomeSelected?.() === true}
      onCheckedChange={(value) => row.toggleSelected(value === true)}
    />
  );
}

export function createSelectionColumn<TData>(): ColumnDef<TData> {
  return {
    id: "select",
    header: ({ table }) => (
      <DataGridRowSelectAll
        disabled={table.getRowModel().rows.length === 0}
        table={table}
      />
    ),
    cell: ({ row }) => (
      <DataGridRowSelect disabled={row.getCanSelect() === false} row={row} />
    ),
    size: 40,
    enableSorting: false,
    enableHiding: false,
    meta: {
      headerClassName: "w-10 pl-4 pr-1.5",
      cellClassName: "w-10 pl-4 pr-1.5",
    },
  };
}
