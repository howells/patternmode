"use client";
"use no memo";
// oxlint-disable react-doctor/react-compiler-no-manual-memoization -- "use no memo" opts out of React Compiler for TanStack Table state stability, so manual useMemo is load-bearing

import { functionalUpdate } from "@tanstack/react-table";
import type {
  ColumnFiltersState,
  ColumnOrderState,
  ColumnVisibilityState,
  PaginationState,
  SortingState,
  Updater,
} from "@tanstack/react-table";
import { useMemo, useRef, useState } from "react";

import {
  EMPTY_GRID_PARAMS,
  parseColumnsParam,
  parseFiltersParam,
  parseSortingParam,
  serializeGridState,
} from "./state";
import type { GridAddress, GridAddressParams, GridQueryState } from "./types";

export interface ManagedGridState {
  columnFilters: ColumnFiltersState;
  columnOrder: ColumnOrderState;
  columnVisibility: ColumnVisibilityState;
  globalFilter: string;
  pagination: PaginationState;
  sorting: SortingState;
}

export interface GridViewExternalHandlers {
  onColumnFiltersChange?: ((updater: Updater<ColumnFiltersState>) => void) | undefined;
  onGlobalFilterChange?: ((updater: Updater<string>) => void) | undefined;
  onPaginationChange?: ((updater: Updater<PaginationState>) => void) | undefined;
  onQueryChange?: ((query: GridQueryState) => void) | undefined;
  onSortingChange?: ((updater: Updater<SortingState>) => void) | undefined;
}

interface PendingBatch {
  renderState: ManagedGridState;
  state: ManagedGridState;
  visibilityForUrl: ColumnVisibilityState;
}

const mergeVisibility = (
  starting: ColumnVisibilityState,
  override: ColumnVisibilityState,
  nonHideableIds: ReadonlySet<string>,
): ColumnVisibilityState => {
  const merged: ColumnVisibilityState = { ...starting, ...override };

  for (const id of nonHideableIds) {
    if (merged[id] === false) {
      merged[id] = true;
    }
  }

  return merged;
};

const toQueryState = (state: ManagedGridState): GridQueryState => ({
  columnFilters: state.columnFilters,
  globalFilter: state.globalFilter,
  pagination: state.pagination,
  sorting: state.sorting,
});

const applyStateKey = <K extends keyof ManagedGridState>(
  current: ManagedGridState,
  key: K,
  value: ManagedGridState[K],
  resetsPage: boolean,
): ManagedGridState => {
  const next: ManagedGridState = { ...current, [key]: value };

  if (resetsPage) {
    next.pagination = { pageIndex: 0, pageSize: current.pagination.pageSize };
  }

  return next;
};

const useLocalGridState = (
  defaultColumnFilters: ColumnFiltersState,
  defaultSorting: SortingState,
  initialPageSize: number,
  maxPageSize: number,
) => {
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(defaultColumnFilters);
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: Math.min(initialPageSize, maxPageSize),
  });

  return {
    columnFilters,
    columnOrder,
    columnVisibility,
    globalFilter,
    pagination,
    setColumnFilters,
    setColumnOrder,
    setColumnVisibility,
    setGlobalFilter,
    setPagination,
    setSorting,
    sorting,
  };
};

const useParsedUrlState = ({
  columnIds,
  defaultColumnFilters,
  defaultSorting,
  filterOnlyIds,
  initialPageSize,
  maxPageSize,
  nonHideableIds,
  urlParams,
}: {
  columnIds: readonly string[];
  defaultColumnFilters: ColumnFiltersState;
  defaultSorting: SortingState;
  filterOnlyIds: ReadonlySet<string>;
  initialPageSize: number;
  maxPageSize: number;
  nonHideableIds: ReadonlySet<string>;
  urlParams: GridAddressParams;
}) => {
  const filters = useMemo(
    () => parseFiltersParam(urlParams.filters, columnIds, defaultColumnFilters, filterOnlyIds),
    [columnIds, defaultColumnFilters, filterOnlyIds, urlParams.filters],
  );
  const columns = useMemo(
    () => parseColumnsParam(urlParams.cols, columnIds, nonHideableIds),
    [columnIds, nonHideableIds, urlParams.cols],
  );
  const sorting = useMemo(
    () => parseSortingParam(urlParams.sort, columnIds, defaultSorting),
    [columnIds, defaultSorting, urlParams.sort],
  );
  const pagination = useMemo(
    () => ({
      pageIndex: Math.max(0, urlParams.page - 1),
      pageSize: Math.min(urlParams.pageSize ?? initialPageSize, maxPageSize),
    }),
    [initialPageSize, maxPageSize, urlParams.page, urlParams.pageSize],
  );

  return { columns, filters, pagination, sorting };
};

interface GridViewStateOptions {
  address: GridAddress | null;
  columnIds: readonly string[];
  defaultColumnFilters: ColumnFiltersState;
  defaultSorting: SortingState;
  externalHandlers: GridViewExternalHandlers;
  filterOnlyIds: ReadonlySet<string>;
  initialPageSize: number;
  maxPageSize: number;
  nonHideableIds: ReadonlySet<string>;
  startingVisibility: ColumnVisibilityState;
}

const resolveActiveState = (
  address: GridAddress | null,
  local: ReturnType<typeof useLocalGridState>,
  url: ReturnType<typeof useParsedUrlState>,
  urlQuery: string,
  activeVisibility: ColumnVisibilityState,
): ManagedGridState =>
  address === null
    ? {
        columnFilters: local.columnFilters,
        columnOrder: local.columnOrder,
        columnVisibility: activeVisibility,
        globalFilter: local.globalFilter,
        pagination: local.pagination,
        sorting: local.sorting,
      }
    : {
        columnFilters: url.filters,
        columnOrder: url.columns.columnOrder,
        columnVisibility: activeVisibility,
        globalFilter: urlQuery,
        pagination: url.pagination,
        sorting: url.sorting,
      };

type CommitFn = <K extends keyof ManagedGridState>(
  key: K,
  updater: Updater<ManagedGridState[K]>,
  setLocal: (next: Updater<ManagedGridState[K]>) => void,
  resetsPage: boolean,
  isQueryKey: boolean,
  external?: (next: Updater<ManagedGridState[K]>) => void,
) => void;

const writeBatchToAddress = (
  options: GridViewStateOptions,
  nextState: ManagedGridState,
  nextUrlVisibility: ColumnVisibilityState,
  key: keyof ManagedGridState,
) => {
  options.address?.write(
    serializeGridState({
      ...nextState,
      columnIds: options.columnIds,
      columnVisibility: nextUrlVisibility,
      defaultColumnFilters: options.defaultColumnFilters,
      defaultPageSize: options.initialPageSize,
      defaultSorting: options.defaultSorting,
      maxPageSize: options.maxPageSize,
      nonHideableIds: options.nonHideableIds,
    }),
    { history: key === "pagination" ? "push" : "replace" },
  );
};

/**
 * Manages the grid's view state (either local or URL-backed). Batches multiple
 * synchronous setters fired in the same event handler (e.g. Reset calling
 * `resetColumnVisibility` + `resetColumnOrder`) without reading or mutating
 * refs during render.
 */
export const useGridViewState = (options: GridViewStateOptions) => {
  const { address, columnIds, defaultColumnFilters, defaultSorting, externalHandlers } = options;
  const { filterOnlyIds, initialPageSize, maxPageSize, nonHideableIds, startingVisibility } =
    options;
  const urlParams = address?.params ?? EMPTY_GRID_PARAMS;
  const local = useLocalGridState(
    defaultColumnFilters,
    defaultSorting,
    initialPageSize,
    maxPageSize,
  );
  const url = useParsedUrlState({
    columnIds,
    defaultColumnFilters,
    defaultSorting,
    filterOnlyIds,
    initialPageSize,
    maxPageSize,
    nonHideableIds,
    urlParams,
  });

  const rawOverrideVisibility =
    address === null ? local.columnVisibility : url.columns.columnVisibility;
  const activeVisibility = useMemo(
    () => mergeVisibility(startingVisibility, rawOverrideVisibility, nonHideableIds),
    [nonHideableIds, rawOverrideVisibility, startingVisibility],
  );
  const state = useMemo(
    () => resolveActiveState(address, local, url, urlParams.q, activeVisibility),
    [activeVisibility, address, local, url, urlParams.q],
  );
  const batchRef = useRef<PendingBatch | null>(null);

  const commitChange: CommitFn = (key, updater, setLocal, resetsPage, isQueryKey, external) => {
    external?.(updater);
    const existing = batchRef.current;
    const batch =
      existing !== null && existing.renderState === state
        ? existing
        : { renderState: state, state, visibilityForUrl: rawOverrideVisibility };
    const nextState = applyStateKey(
      batch.state,
      key,
      functionalUpdate(updater, batch.state[key]),
      resetsPage,
    );
    const nextUrlVisibility =
      key === "columnVisibility" ? nextState.columnVisibility : batch.visibilityForUrl;

    batchRef.current = {
      renderState: state,
      state: nextState,
      visibilityForUrl: nextUrlVisibility,
    };

    if (isQueryKey) {
      externalHandlers.onQueryChange?.(toQueryState(nextState));
    }

    if (address === null) {
      setLocal(updater);
      if (resetsPage) {
        local.setPagination((current) => ({ ...current, pageIndex: 0 }));
      }
      return;
    }

    writeBatchToAddress(options, nextState, nextUrlVisibility, key);
  };

  return {
    handlers: {
      onColumnFiltersChange: (u: Updater<ColumnFiltersState>) => {
        commitChange(
          "columnFilters",
          u,
          local.setColumnFilters,
          true,
          true,
          externalHandlers.onColumnFiltersChange,
        );
      },
      onColumnOrderChange: (u: Updater<ColumnOrderState>) => {
        commitChange("columnOrder", u, local.setColumnOrder, false, false);
      },
      onColumnVisibilityChange: (u: Updater<ColumnVisibilityState>) => {
        commitChange("columnVisibility", u, local.setColumnVisibility, false, false);
      },
      onGlobalFilterChange: (u: Updater<string>) => {
        commitChange(
          "globalFilter",
          u,
          local.setGlobalFilter,
          true,
          true,
          externalHandlers.onGlobalFilterChange,
        );
      },
      onPaginationChange: (u: Updater<PaginationState>) => {
        commitChange(
          "pagination",
          u,
          local.setPagination,
          false,
          true,
          externalHandlers.onPaginationChange,
        );
      },
      onSortingChange: (u: Updater<SortingState>) => {
        commitChange("sorting", u, local.setSorting, true, true, externalHandlers.onSortingChange);
      },
    },
    state,
  };
};
