import type { FilterOption } from "@patternmode/filters";
import type { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import type { ReactNode } from "react";

/**
 * How a column filters. A column without one filters as text, number, date, or
 * boolean by its values; `false` keeps it out of "Filter".
 */
export type DataGridFilter =
  | { readonly kind: "boolean" | "date" | "number" | "text" }
  | { readonly kind: "option"; readonly options: readonly FilterOption[] };

/** Logical or physical side to pin a column to. */
export type DataGridPinSide = "end" | "left" | "right" | "start";

/** Vertical density preset for table rows and cells. */
export type DataGridDensity = "comfortable" | "compact" | "spacious";

export interface DataGridColumnMeta {
  /** Render this column right-aligned (numbers, status). */
  align?: "left" | "right";
  /** Fixed column width as a CSS pixel length (e.g. "180px") or pixel number. */
  width?: number | string;
  /** Minimum column width as a CSS pixel length (e.g. "120px") or pixel number. */
  minWidth?: number | string;
  /** Maximum column width as a CSS pixel length (e.g. "420px") or pixel number. */
  maxWidth?: number | string;
  /** The column's name in menus, where its header is not plain text. */
  label?: string;
  filter?: DataGridFilter | false;
  /**
   * Freeze this column to the start or end edge during horizontal scroll.
   * Pinned columns cannot be hidden. Consecutive pinned columns stack.
   */
  pinned?: DataGridPinSide;
  /** Tint the column, head to foot, to set it apart from its neighbours. */
  highlight?: boolean;
  /** Start hidden on a phone; the column picker still shows it. */
  hideOnPhone?: boolean;
  /** Cell content fills edge to edge with no padding (swatches, whole-cell links). */
  fill?: boolean;
  /**
   * Filter-only column driven by a toolbar control: never drawn, never in the
   * column picker, never under "Filter" or "Sort", and kept by "Clear".
   */
  filterOnly?: boolean;
  /**
   * Optional string formatter used by global search when a column displays a
   * label different from its raw value. Declared `filter.options` labels are
   * matched automatically without setting this.
   */
  searchText?: (value: string) => string;
}

/** A section row's heading: the row it heads, and how deep it sits. */
export type DataGridSectionRender<TData> = (row: TData, depth: number) => ReactNode;

/** Serialised view state stored in the URL or external router. */
export interface GridAddressParams {
  cols: string;
  filters: string;
  page: number;
  pageSize: number | null;
  q: string;
  sort: string;
}

/** Values written back to the URL; null removes a parameter when it matches the default. */
export interface SerializedGridParams {
  cols: string | null;
  filters: string | null;
  page: number | null;
  pageSize: number | null;
  q: string | null;
  sort: string | null;
}

export type GridAddressHistoryMode = "push" | "replace";

export interface GridAddressWriteOptions {
  /** Whether to push a new history entry or replace the current one. Defaults to "replace". */
  history?: GridAddressHistoryMode;
}

/** External URL adapter (works with nuqs, Next router, or built-in History API). */
export interface GridAddress {
  params: GridAddressParams;
  write: (values: SerializedGridParams, options?: GridAddressWriteOptions) => void;
}

/** Current query parameters emitted for server-side / manual data fetching. */
export interface GridQueryState {
  columnFilters: ColumnFiltersState;
  globalFilter: string;
  pagination: PaginationState;
  sorting: SortingState;
}
