"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type { Row } from "@tanstack/react-table";
import type * as React from "react";
import { ExpandButton } from "../expand-button";

export interface DataGridExpandToggleProps<TData> {
  /** CSS class name */
  className?: string;
  /** Collapsed icon */
  collapsedIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Expanded icon */
  expandedIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  row: Row<TData>;
}

/**
 * Toggle button for expanding/collapsing rows in a DataGrid.
 * Automatically shows/hides based on whether the row can be expanded.
 *
 * @example
 * ```tsx
 * {
 *   id: 'expander',
 *   header: () => null,
 *   cell: ({ row }) => <DataGridExpandToggle row={row} />,
 *   size: 48,
 * }
 * ```
 */
export function DataGridExpandToggle<TData>({
  row,
  className,
  /** Expanded icon */
  expandedIcon: ExpandedIcon,
  /** Collapsed icon */
  collapsedIcon: CollapsedIcon,
}: DataGridExpandToggleProps<TData>) {
  if (!row.getCanExpand()) {
    return null;
  }

  const isExpanded = row.getIsExpanded();

  return (
    <ExpandButton
      aria-label={isExpanded ? "Collapse row" : "Expand row"}
      className={cn(
        "rounded-sm border-muted-foreground/40 bg-card align-[inherit] shadow-xs",
        className,
      )}
      collapsedIcon={CollapsedIcon}
      expanded={isExpanded}
      expandedIcon={ExpandedIcon}
      onClick={row.getToggleExpandedHandler()}
      size="xs"
    />
  );
}

/**
 * Helper to create a standard expander column definition.
 * Place this as the first column in your columns array.
 *
 * @example
 * ```tsx
 * const columns = useMemo<ColumnDef<MyData>[]>(() => [
 *   createExpanderColumn(),
 *   { accessorKey: 'name', header: 'Name' },
 *   // ... other columns
 * ], []);
 * ```
 */
export function createExpanderColumn<TData>() {
  return {
    id: "expander",
    header: () => null,
    cell: ({ row }: { row: Row<TData> }) => <DataGridExpandToggle row={row} />,
    /** Component size */
    size: 40,
    /** Enable sorting */
    enableSorting: false,
    /** Enable hiding */
    enableHiding: false,
    meta: {
      /** Header class name */
      headerClassName: "w-10 px-1 text-center",
      /** Cell class name */
      cellClassName: "w-10 px-1 text-center",
    },
  };
}
