/** biome-ignore-all lint/performance/noBarrelFile: needed for ui package */
"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type {
  ColumnFiltersState,
  ColumnPinningState,
  SortingState,
  Table,
} from "@tanstack/react-table";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";
/** Data grid api fetch params type definition */

export interface DataGridApiFetchParams {
  filters?: ColumnFiltersState;
  /** Page index */
  pageIndex: number;
  /** Page size */
  pageSize: number;
  /** Search query */
  searchQuery?: string;
  sorting?: SortingState;
}
/** Data grid api response type definition */

export interface DataGridApiResponse<T> {
  data: T[];
  empty: boolean;
  pagination: {
    total: number;
    page: number;
  };
}

export interface DataGridContextProps<TData extends object> {
  /** Whether in loading state */
  isLoading?: boolean;
  props: DataGridProps<TData>;
  /** Record count */
  recordCount: number;
  table: Table<TData>;
}
/** Data grid request params type definition */

export interface DataGridRequestParams {
  /** Column filters */
  columnFilters?: ColumnFiltersState;
  /** Page index */
  pageIndex: number;
  /** Page size */
  pageSize: number;
  sorting?: SortingState;
}

export interface DataGridProps<TData extends object> {
  /** Child elements */
  children?: ReactNode;
  /** CSS class name */
  className?: string;
  /** Empty message */
  emptyMessage?: ReactNode | string;
  /** Distance from bottom (px) to trigger onEndReached. Default 200. */
  endReachedThreshold?: number;
  /** Initial pinned columns (applied once). */
  initialColumnPinning?: ColumnPinningState;
  /** Whether in loading state */
  isLoading?: boolean;
  /** Loading state */
  loadingMessage?: ReactNode | string;
  /** Loading state */
  loadingMode?: "skeleton" | "spinner";
  /** Called when scroll reaches the bottom (for infinite scroll). */
  onEndReached?: () => void;
  /** On row click */
  onRowClick?: (row: TData) => void;
  /** Record count */
  recordCount: number;
  table?: Table<TData>;
  /** Table class names */
  tableClassNames?: {
    base?: string;
    header?: string;
    /** Header row */
    headerRow?: string;
    /** Header sticky */
    headerSticky?: string;
    body?: string;
    /** Body row */
    bodyRow?: string;
    footer?: string;
    /** Edge cell */
    edgeCell?: string;
  };
  /** Table layout */
  tableLayout?: {
    dense?: boolean;
    /** Cell border */
    cellBorder?: boolean;
    /** Row border */
    rowBorder?: boolean;
    /** Row rounded */
    rowRounded?: boolean;
    striped?: boolean;
    /** Header background */
    headerBackground?: boolean;
    /** Header border */
    headerBorder?: boolean;
    /** Header sticky */
    headerSticky?: boolean;
    width?: "auto" | "fixed";
    /** Columns visibility */
    columnsVisibility?: boolean;
    /** Columns resizable */
    columnsResizable?: boolean;
    /** Columns pinnable */
    columnsPinnable?: boolean;
    /** Columns movable */
    columnsMovable?: boolean;
    /** Columns draggable */
    columnsDraggable?: boolean;
    /** Rows draggable */
    rowsDraggable?: boolean;
    /** Row height */
    rowHeight?: number;
    /** Expanded row height */
    expandedRowHeight?: number;
  };
  virtualization?: {
    enabled?: boolean;
    /** Estimate size */
    estimateSize?: number;
    overscan?: number;
  };
}

/**
 * Context uses `any` because React Context with generics requires type erasure
 * at the context creation site. Type safety is enforced through:
 * 1. DataGridProvider accepting properly typed props
 * 2. useDataGrid hook casting to the correct generic type at call sites
 *
 * This is the standard pattern for generic React contexts.
 */
const DataGridContext = createContext<unknown>(undefined);

function useDataGrid<TData extends object>() {
  const context = useContext(DataGridContext) as
    | DataGridContextProps<TData>
    | undefined;
  if (!context) {
    throw new Error("useDataGrid must be used within a DataGridProvider");
  }
  return context;
}

function DataGridProvider<TData extends object>({
  children,
  table,
  ...props
}: DataGridProps<TData> & { table: Table<TData> }) {
  return (
    <DataGridContext.Provider
      value={{
        props,
        table,
        /** Record count */
        recordCount: props.recordCount,
        /** Whether in loading state */
        isLoading: props.isLoading,
      }}
    >
      {children}
    </DataGridContext.Provider>
  );
}

function DataGrid<TData extends object>({
  children,
  table,
  initialColumnPinning,
  ...props
}: DataGridProps<TData>) {
  const hasAppliedInitialPinning = useRef(false);

  const defaultProps: Partial<DataGridProps<TData>> = {
    /** Loading state */
    loadingMode: "skeleton",
    /** Table layout */
    tableLayout: {
      dense: false,
      /** Cell border */
      cellBorder: false,
      /** Row border */
      rowBorder: true,
      /** Row rounded */
      rowRounded: false,
      striped: false,
      /** Header sticky */
      headerSticky: true,
      /** Header background */
      headerBackground: true,
      /** Header border */
      headerBorder: true,
      /** Row height */
      rowHeight: 52,
      width: "fixed",
      /** Columns visibility */
      columnsVisibility: false,
      /** Columns resizable */
      columnsResizable: false,
      /** Columns pinnable */
      columnsPinnable: Boolean(initialColumnPinning),
      /** Columns movable */
      columnsMovable: false,
      /** Columns draggable */
      columnsDraggable: false,
      /** Rows draggable */
      rowsDraggable: false,
    },
    /** Table class names */
    tableClassNames: {
      base: "",
      header: "",
      /** Header row */
      headerRow: "",
      /** Header sticky */
      headerSticky: "sticky top-0 z-10 bg-card",
      body: "",
      /** Body row */
      bodyRow: "",
      footer: "",
      /** Edge cell */
      edgeCell: "",
    },
  };

  const mergedProps: DataGridProps<TData> = {
    ...defaultProps,
    ...props,
    /** Table layout */
    tableLayout: {
      ...defaultProps.tableLayout,
      ...(props.tableLayout || {}),
    },
    /** Table class names */
    tableClassNames: {
      ...defaultProps.tableClassNames,
      ...(props.tableClassNames || {}),
    },
  };

  // Ensure table is provided
  if (!table) {
    throw new Error("DataGrid requires the `table` prop.");
  }

  const columnsPinnable = mergedProps.tableLayout?.columnsPinnable === true;

  useEffect(() => {
    if (!columnsPinnable) {
      return;
    }

    table.setOptions((prev) => ({
      ...prev,
      enableColumnPinning: true,
    }));
  }, [columnsPinnable, table]);

  useEffect(() => {
    if (hasAppliedInitialPinning.current || !initialColumnPinning) {
      return;
    }

    hasAppliedInitialPinning.current = true;
    table.setColumnPinning(initialColumnPinning);
  }, [initialColumnPinning, table]);

  return (
    <DataGridProvider table={table} {...mergedProps}>
      {children}
    </DataGridProvider>
  );
}

function DataGridContainer({
  children,
  className,
  border = "solid",
  ref,
}: {
  /** Child elements */
  children: ReactNode;
  /** CSS class name */
  className?: string;
  /** Border style. Options: "solid" (default), "none", "dashed". */
  border?: "none" | "solid" | "dashed";
  /** Ref to the container element */
  ref?: React.Ref<HTMLDivElement>;
}) {
  let borderClasses: string;
  if (border === "none") {
    borderClasses = "border-0";
  } else if (border === "dashed") {
    borderClasses = "border border-dashed border-muted-foreground/25";
  } else {
    borderClasses = "border border-border";
  }

  return (
    <div
      className={cn(
        "grid w-full overflow-hidden rounded-lg bg-card",
        borderClasses,
        className,
      )}
      data-component="data-grid"
      data-slot="data-grid"
      ref={ref}
    >
      {children}
    </div>
  );
}

export {
  createSelectionColumn,
  DataGridCheckbox,
  DataGridRowSelect,
  DataGridRowSelectAll,
} from "./data-grid/data-grid-checkbox";
export {
  DataGridEditableCell,
  type DataGridEditableCellProps,
} from "./data-grid/data-grid-editable-cell";
export {
  createExpanderColumn,
  DataGridExpandToggle,
} from "./data-grid/data-grid-expand";
export {
  DataGridFilterableHeader,
  type FilterOption,
} from "./data-grid/data-grid-filterable-header";
export {
  DataGridScrollSentinel,
  type DataGridScrollSentinelProps,
} from "./data-grid/data-grid-scroll-sentinel";
export { DataGrid, DataGridContainer, DataGridProvider, useDataGrid };
