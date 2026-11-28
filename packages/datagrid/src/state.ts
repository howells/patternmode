import { filterEntrySchema, filterRuleSchema } from "@patternmode/filters/state";
import type {
  ColumnFiltersState,
  ColumnOrderState,
  ColumnVisibilityState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { z } from "zod";

import type { DataGridPinSide, GridAddressParams, SerializedGridParams } from "./types";

const NO_SORT = "none";
const NO_FILTERS = "none";

export const DEFAULT_PAGE_SIZES = [25, 50, 100, 250] as const;
export const MAX_PAGE_SIZE = 250;

export const EMPTY_GRID_PARAMS: GridAddressParams = {
  cols: "",
  filters: "",
  page: 1,
  pageSize: null,
  q: "",
  sort: "",
};

const PX_PATTERN = /^(?<px>\d+(?:\.\d+)?)(?:px)?$/u;

/** Parses a pixel width (`180`, `"180px"`, `"180"`) into a finite positive number. */
export const parsePxWidth = (raw: number | string | undefined): number | undefined => {
  if (raw === undefined) {
    return undefined;
  }

  // oxlint-disable-next-line anti-slop/no-runtime-typeof -- narrows union `number | string` cleanly
  if (typeof raw === "number") {
    return Number.isFinite(raw) && raw > 0 ? raw : undefined;
  }

  const match = PX_PATTERN.exec(raw.trim());

  if (match?.groups?.px === undefined) {
    return undefined;
  }

  const parsed = Number(match.groups.px);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
};

/** Normalizes physical ("left" | "right") or logical ("start" | "end") pin sides. */
export const normalizePinSide = (
  side: DataGridPinSide | undefined,
): "end" | "start" | undefined => {
  if (side === "left" || side === "start") {
    return "start";
  }

  if (side === "right" || side === "end") {
    return "end";
  }

  return undefined;
};

/**
 * Resolves a column definition's ID using TanStack Table's exact algorithm:
 * explicit `id`, else `accessorKey` with `.` replaced by `_`, else string `header`.
 */
export const columnIdFromDef = (column: {
  accessorKey?: PropertyKey | undefined;
  header?: unknown;
  id?: string | undefined;
}): string | undefined => {
  if (column.id !== undefined && column.id !== "") {
    return column.id;
  }

  if (column.accessorKey !== undefined) {
    return String(column.accessorKey).replaceAll(".", "_");
  }

  // oxlint-disable-next-line anti-slop/no-runtime-typeof -- matches TanStack Table's constructColumn string header fallback
  if (typeof column.header === "string" && column.header !== "") {
    return column.header;
  }

  return undefined;
};

export const parseSortingParam = (
  sort: string,
  columnIds: readonly string[],
  defaultSorting: SortingState,
): SortingState => {
  if (sort === "") {
    return defaultSorting;
  }

  if (sort === NO_SORT) {
    return [];
  }

  const known = new Set(columnIds);

  const parsed = sort.split(",").flatMap((part) => {
    const [id = "", dir] = part.split(".");

    return known.has(id) ? [{ desc: dir !== "asc", id }] : [];
  });

  return parsed.length > 0 ? parsed : defaultSorting;
};

const sortText = (state: SortingState): string =>
  state.map((sort) => `${sort.id}.${sort.desc ? "desc" : "asc"}`).join(",");

const sortingParam = (sorting: SortingState, defaultSorting: SortingState): string | null => {
  if (sortText(sorting) === sortText(defaultSorting)) {
    return null;
  }

  return sorting.length === 0 ? NO_SORT : sortText(sorting);
};

const filterEntriesSchema = z.array(filterEntrySchema);

const serializeFilterEntries = (filters: ColumnFiltersState): string => {
  const entries = filters.flatMap((filter) => {
    const parsed = filterRuleSchema.safeParse(filter.value);

    return parsed.success ? [{ id: filter.id, ...parsed.data }] : [];
  });

  return entries.length > 0 ? JSON.stringify(entries) : "";
};

const mergeFilterOnlyDefaults = (
  parsed: ColumnFiltersState,
  defaultColumnFilters: ColumnFiltersState,
  filterOnlyIds: ReadonlySet<string>,
): ColumnFiltersState => {
  if (filterOnlyIds.size === 0) {
    return parsed;
  }

  const present = new Set(parsed.map((filter) => filter.id));
  const missing = defaultColumnFilters.filter(
    (filter) => filterOnlyIds.has(filter.id) && !present.has(filter.id),
  );

  return missing.length > 0 ? [...missing, ...parsed] : parsed;
};

/**
 * Rules from the address. Empty param falls back to `defaultColumnFilters`;
 * `"none"` clears user filters while keeping `filterOnly` defaults.
 */
export const parseFiltersParam = (
  filters: string,
  columnIds: readonly string[],
  defaultColumnFilters: ColumnFiltersState = [],
  filterOnlyIds: ReadonlySet<string> = new Set(),
): ColumnFiltersState => {
  if (filters === "") {
    return defaultColumnFilters;
  }

  if (filters === NO_FILTERS) {
    return defaultColumnFilters.filter((filter) => filterOnlyIds.has(filter.id));
  }

  let json: unknown;

  try {
    json = JSON.parse(filters);
  } catch {
    return defaultColumnFilters;
  }

  const entries = filterEntriesSchema.safeParse(json);

  if (!entries.success) {
    return defaultColumnFilters;
  }

  const known = new Set(columnIds);
  const parsed = entries.data.flatMap(({ id, ...rule }) =>
    known.has(id) ? [{ id, value: rule }] : [],
  );

  return mergeFilterOnlyDefaults(parsed, defaultColumnFilters, filterOnlyIds);
};

const filtersParam = (
  columnFilters: ColumnFiltersState,
  defaultColumnFilters: ColumnFiltersState,
): string | null => {
  const serialized = serializeFilterEntries(columnFilters);
  const defaultSerialized = serializeFilterEntries(defaultColumnFilters);

  if (serialized === defaultSerialized) {
    return null;
  }

  return serialized === "" ? NO_FILTERS : serialized;
};

/** The shown columns in order; the rest are hidden and follow them. */
export interface GridColumnsState {
  columnOrder: ColumnOrderState;
  columnVisibility: ColumnVisibilityState;
}

export const parseColumnsParam = (
  cols: string,
  columnIds: readonly string[],
  nonHideableIds: ReadonlySet<string> = new Set(),
): GridColumnsState => {
  const known = new Set(columnIds);
  const parsed = cols.split(",").filter((id) => known.has(id));

  if (parsed.length === 0) {
    return { columnOrder: [], columnVisibility: {} };
  }

  const shown = new Set(parsed);

  for (const id of nonHideableIds) {
    if (known.has(id)) {
      shown.add(id);
    }
  }

  const hidden = columnIds.filter((id) => !shown.has(id));
  const visibility: ColumnVisibilityState = {};

  for (const id of shown) {
    visibility[id] = true;
  }

  for (const id of hidden) {
    visibility[id] = false;
  }

  return {
    columnOrder: [...shown, ...hidden],
    columnVisibility: visibility,
  };
};

const columnsParam = (
  columnOrder: ColumnOrderState,
  columnVisibility: ColumnVisibilityState,
  columnIds: readonly string[],
  nonHideableIds: ReadonlySet<string>,
): string | null => {
  const ordered = columnOrder.length === 0 ? columnIds : columnOrder;
  const shown = ordered.filter((id) => nonHideableIds.has(id) || columnVisibility[id] !== false);

  return shown.join(",") === columnIds.join(",") ? null : shown.join(",");
};

export const serializeGridState = ({
  columnFilters,
  columnIds,
  columnOrder,
  columnVisibility,
  defaultColumnFilters = [],
  defaultPageSize,
  defaultSorting,
  globalFilter,
  maxPageSize = MAX_PAGE_SIZE,
  nonHideableIds = new Set(),
  pagination,
  sorting,
}: {
  columnFilters: ColumnFiltersState;
  columnIds: readonly string[];
  columnOrder: ColumnOrderState;
  columnVisibility: ColumnVisibilityState;
  defaultColumnFilters?: ColumnFiltersState;
  defaultPageSize: number;
  defaultSorting: SortingState;
  globalFilter: string;
  maxPageSize?: number;
  nonHideableIds?: ReadonlySet<string>;
  pagination: PaginationState;
  sorting: SortingState;
}): SerializedGridParams => {
  const clampedPageSize = Math.min(Math.max(1, pagination.pageSize), maxPageSize);

  return {
    cols: columnsParam(columnOrder, columnVisibility, columnIds, nonHideableIds),
    filters: filtersParam(columnFilters, defaultColumnFilters),
    page: pagination.pageIndex > 0 ? pagination.pageIndex + 1 : null,
    pageSize: clampedPageSize === defaultPageSize ? null : clampedPageSize,
    q: globalFilter.trim() || null,
    sort: sortingParam(sorting, defaultSorting),
  };
};

const parsePositiveInt = (raw: string | null): number | null => {
  if (raw === null || raw === "") {
    return null;
  }

  const parsed = Math.trunc(Number(raw));

  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

export const paramKey = (key: keyof SerializedGridParams, prefix?: string): string =>
  prefix === undefined || prefix === "" ? key : `${prefix}_${key}`;

export interface ReadGridSearchParamsOptions {
  /** Upper bound for parsed `pageSize` to prevent unbounded DOM mounts. Defaults to 250. */
  maxPageSize?: number;
  /** Optional parameter prefix (e.g. `"orders"` reads `orders_q`, `orders_sort`). */
  prefix?: string;
}

/** Reads grid parameters from a `URLSearchParams` instance (safe in SSR / Server Components). */
export const readGridSearchParams = (
  params: URLSearchParams,
  options?: ReadGridSearchParamsOptions,
): GridAddressParams => {
  const prefix = options?.prefix;
  const maxPageSize = options?.maxPageSize ?? MAX_PAGE_SIZE;
  const rawPageSize = parsePositiveInt(params.get(paramKey("pageSize", prefix)));

  return {
    cols: params.get(paramKey("cols", prefix)) ?? "",
    filters: params.get(paramKey("filters", prefix)) ?? "",
    page: parsePositiveInt(params.get(paramKey("page", prefix))) ?? 1,
    pageSize: rawPageSize === null ? null : Math.min(rawPageSize, maxPageSize),
    q: params.get(paramKey("q", prefix)) ?? "",
    sort: params.get(paramKey("sort", prefix)) ?? "",
  };
};

export type {
  DataGridColumnMeta,
  DataGridDensity,
  DataGridFilter,
  DataGridPinSide,
  DataGridSectionRender,
  GridAddress,
  GridAddressHistoryMode,
  GridAddressParams,
  GridAddressWriteOptions,
  GridQueryState,
  SerializedGridParams,
} from "./types";
