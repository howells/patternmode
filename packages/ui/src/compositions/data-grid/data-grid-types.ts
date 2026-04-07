import type {
  ColumnFiltersState,
  ColumnPinningState,
  RowData,
  SortingState,
  Table,
} from "@tanstack/react-table";
import type { ReactNode } from "react";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    cellClassName?: string;
    expandedContent?: (row: TData) => ReactNode;
    headerClassName?: string;
    headerTitle?: string;
    skeleton?: ReactNode;
  }
}

export interface DataGridApiFetchParams {
  filters?: ColumnFiltersState;
  pageIndex: number;
  pageSize: number;
  searchQuery?: string;
  sorting?: SortingState;
}

export interface DataGridApiResponse<T> {
  data: T[];
  empty: boolean;
  pagination: {
    total: number;
    page: number;
  };
}

export interface DataGridContextProps<TData extends object> {
  isLoading?: boolean;
  props: DataGridProps<TData>;
  recordCount: number;
  table: Table<TData>;
}

export interface DataGridRequestParams {
  columnFilters?: ColumnFiltersState;
  pageIndex: number;
  pageSize: number;
  sorting?: SortingState;
}

export interface DataGridProps<TData extends object> {
  children?: ReactNode;
  className?: string;
  emptyMessage?: ReactNode | string;
  /** Initial pinned columns (applied once). */
  initialColumnPinning?: ColumnPinningState;
  isLoading?: boolean;
  loadingMessage?: ReactNode | string;
  loadingMode?: "skeleton" | "spinner";
  onRowClick?: (row: TData) => void;
  recordCount: number;
  table?: Table<TData>;
  tableClassNames?: {
    base?: string;
    header?: string;
    headerRow?: string;
    headerSticky?: string;
    body?: string;
    bodyRow?: string;
    footer?: string;
    edgeCell?: string;
  };
  tableLayout?: {
    dense?: boolean;
    cellBorder?: boolean;
    rowBorder?: boolean;
    rowRounded?: boolean;
    striped?: boolean;
    headerBackground?: boolean;
    headerBorder?: boolean;
    headerSticky?: boolean;
    width?: "auto" | "fixed";
    columnsVisibility?: boolean;
    columnsResizable?: boolean;
    columnsPinnable?: boolean;
    columnsMovable?: boolean;
    columnsDraggable?: boolean;
    rowsDraggable?: boolean;
    rowHeight?: number;
    expandedRowHeight?: number;
  };
  virtualization?: {
    enabled?: boolean;
    estimateSize?: number;
    overscan?: number;
  };
}
