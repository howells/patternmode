import type { ColumnDef, SortingState, Table, VisibilityState } from "@tanstack/react-table";

/**
 * DataTable public props.
 *
 * @template TData Row data type
 */
export interface DataTableProps<TData> {
  /** Column definitions compatible with TanStack Table */
  columns: ColumnDef<TData, unknown>[];
  /** Row data array */
  data: readonly TData[];
  /** Enable global search input */
  enableSearch?: boolean;
  /** Placeholder for the global search input */
  searchPlaceholder?: string;
  /** Initial page size */
  initialPageSize?: number;
  /** Selectable rows toggle */
  enableRowSelection?: boolean;
  /** Custom page size options */
  pageSizes?: readonly number[];
  /** Initial column visibility map */
  initialColumnVisibility?: VisibilityState;
  /** Initial sorting state */
  initialSorting?: SortingState;
  /** Optional test id override (defaults to "data-table") */
  testId?: string;
  /** Expose TanStack table instance to parent for advanced control. */
  onTableReady?: (table: Table<TData>) => void;
}
