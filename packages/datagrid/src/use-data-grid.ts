"use client";
"use no memo";
// oxlint-disable react-doctor/react-compiler-no-manual-memoization -- "use no memo" opts out of React Compiler for TanStack Table instance identity, so manual useMemo is load-bearing

import { useTable } from "@tanstack/react-table";
import type {
  ColumnFiltersState,
  ColumnPinningState,
  ColumnSizingState,
  ColumnVisibilityState,
  ExpandedState,
  PaginationState,
  Row,
  RowData,
  RowSelectionState,
  SortingState,
  TableOptions,
  Updater,
} from "@tanstack/react-table";
import type { ReactNode } from "react";
import { useEffect, useEffectEvent, useMemo, useRef, useState } from "react";

import { dataGridFeatures } from "./features";
import type { DataGridColumnDef, DataGridFeatures, DataGridTableInstance } from "./features";
import { useFilterSpecs } from "./filter-state";
import { useColumnFlags } from "./grid-columns";
import { useGridViewState } from "./grid-view-state";
import type { ManagedGridState } from "./grid-view-state";
import { DEFAULT_PAGE_SIZES, MAX_PAGE_SIZE, useBrowserGridAddress } from "./query-state";
import { SELECTION_COLUMN_ID } from "./selection-column";
import type { GridAddress, GridAddressParams, GridQueryState } from "./types";
import { useIsMobile } from "./use-is-mobile";

export interface OpenFilterChannel {
  open: (columnId: string) => void;
  subscribe: (listener: (columnId: string) => void) => () => void;
}

export interface DataGridSelectionContext<TData extends RowData> {
  clearSelection: () => void;
  selectedIds: readonly string[];
  selectedRows: readonly TData[];
  table: DataGridTableInstance<TData>;
}

export interface UseDataGridOptions<TData extends RowData> {
  /** Custom URL adapter (e.g. nuqs or router search params). Overrides `urlState`. */
  address?: GridAddress | undefined;
  columns: DataGridColumnDef<TData>[];
  data: readonly TData[];
  /** Column filters the grid opens with (e.g. a filter-only column default). */
  defaultColumnFilters?: ColumnFiltersState | undefined;
  defaultSorting?: SortingState | undefined;
  /** Stable record ID accessor; strongly recommended for tree folding, selection, and updates. */
  getRowId?:
    | ((originalRow: TData, index: number, parent?: Row<DataGridFeatures, TData>) => string)
    | undefined;
  /** Sub-rows under a row for foldable trees; rows start expanded. */
  getSubRows?: ((row: TData) => readonly TData[] | undefined) | undefined;
  /** Server-rendered initial URL params so `urlState` hydrates with zero mismatch. */
  initialParams?: GridAddressParams | undefined;
  initialPageSize?: number | undefined;
  /** Shorthand to enable `manualFiltering`, `manualSorting`, and `manualPagination`. */
  manual?: boolean | undefined;
  manualFiltering?: boolean | undefined;
  manualPagination?: boolean | undefined;
  manualSorting?: boolean | undefined;
  /** Maximum allowed page size parsed from URLs or menus. Defaults to 250. */
  maxPageSize?: number | undefined;
  /** Controlled column filters callback. */
  onColumnFiltersChange?: ((updater: Updater<ColumnFiltersState>) => void) | undefined;
  /** Controlled global search callback. */
  onGlobalFilterChange?: ((updater: Updater<string>) => void) | undefined;
  /** Controlled pagination callback. */
  onPaginationChange?: ((updater: Updater<PaginationState>) => void) | undefined;
  /** Fires whenever search, filters, sorting, or pagination change (ideal for server fetching). */
  onQueryChange?: ((query: GridQueryState) => void) | undefined;
  /** Controlled row selection callback. */
  onRowSelectionChange?: ((updater: Updater<RowSelectionState>) => void) | undefined;
  /** Controlled sorting callback. */
  onSortingChange?: ((updater: Updater<SortingState>) => void) | undefined;
  /** Available rows-per-page menu options. Always includes `initialPageSize`. */
  pageSizes?: readonly number[] | undefined;
  /** Explicit paging toggle; omitted pages automatically when rows exceed `initialPageSize`. */
  paging?: boolean | undefined;
  /** Enable interactive column width resizing. Defaults to false. */
  resizable?: boolean | undefined;
  /** Total row count for server / manual pagination. */
  rowCount?: number | undefined;
  /** Controlled row selection state. */
  rowSelection?: RowSelectionState | undefined;
  /** Opt-in row selection checkboxes (boolean or per-row predicate). */
  selectable?: boolean | ((row: Row<DataGridFeatures, TData>) => boolean) | undefined;
  /** Optional query param prefix so multiple `urlState` grids can share one page. */
  urlPrefix?: string | undefined;
  /** Keeps search, filters, sorts, columns, and page synced in the browser URL. */
  urlState?: boolean | undefined;
}

const NO_SORTING: SortingState = [];
const NO_FILTERS: ColumnFiltersState = [];
const NO_HIDDEN: ColumnVisibilityState = {};

const createOpenFilterChannel = (): OpenFilterChannel => {
  const listeners = new Set<(columnId: string) => void>();

  return {
    open: (columnId: string) => {
      for (const listener of listeners) {
        listener(columnId);
      }
    },
    subscribe: (listener: (columnId: string) => void) => {
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
      };
    },
  };
};

const computePageSizes = (
  custom: readonly number[] | undefined,
  initialPageSize: number,
  maxPageSize: number,
): readonly number[] => {
  const merged = new Set<number>([...(custom ?? DEFAULT_PAGE_SIZES), initialPageSize]);

  return [...merged].filter((size) => size > 0 && size <= maxPageSize).toSorted((a, b) => a - b);
};

const ensureSelectionPinned = (
  pinning: ColumnPinningState,
  selectionEnabled: boolean,
): ColumnPinningState => {
  if (!selectionEnabled) {
    return pinning;
  }

  const start = pinning.start ?? [];

  return start.includes(SELECTION_COLUMN_ID)
    ? pinning
    : { ...pinning, start: [SELECTION_COLUMN_ID, ...start] };
};

const buildTableOptions = <TData extends RowData>(
  base: TableOptions<DataGridFeatures, TData>,
  getRowId: UseDataGridOptions<TData>["getRowId"],
  rowCount: number | undefined,
): TableOptions<DataGridFeatures, TData> => {
  const options = { ...base };

  if (getRowId !== undefined) {
    options.getRowId = getRowId;
  }

  if (rowCount !== undefined) {
    options.rowCount = rowCount;
  }

  return options;
};

const resolveEngineConfig = <TData extends RowData>(options: UseDataGridOptions<TData>) => {
  const initialPageSize = options.initialPageSize ?? 25;
  const manual = options.manual ?? false;
  const selectable = options.selectable ?? false;

  return {
    effectiveMaxPageSize: Math.max(
      options.maxPageSize ?? MAX_PAGE_SIZE,
      initialPageSize,
      ...(options.pageSizes ?? []),
    ),
    initialPageSize,
    manualFiltering: options.manualFiltering ?? manual,
    manualPagination: options.manualPagination ?? manual,
    manualSorting: options.manualSorting ?? manual,
    resizable: options.resizable ?? false,
    selectable,
    selectionEnabled: selectable !== false,
  };
};

const clearGridFilters = <TData extends RowData>(
  table: DataGridTableInstance<TData>,
  state: ManagedGridState,
  filterOnlyIds: ReadonlySet<string>,
) => {
  if (state.globalFilter !== "") {
    table.setGlobalFilter("");
  }

  if (state.columnFilters.some(({ id }) => !filterOnlyIds.has(id))) {
    table.setColumnFilters((filters) => filters.filter(({ id }) => filterOnlyIds.has(id)));
  }
};

const useClampPageIndex = (
  paged: boolean,
  manualPagination: boolean,
  pageCount: number,
  pageIndex: number,
  onPaginationChange: (updater: Updater<PaginationState>) => void,
) => {
  const clamp = useEffectEvent((maxIndex: number) => {
    onPaginationChange((current) => ({ ...current, pageIndex: maxIndex }));
  });

  useEffect(() => {
    if (paged && !manualPagination && pageCount > 0 && pageIndex >= pageCount) {
      clamp(Math.max(0, pageCount - 1));
    }
  }, [manualPagination, pageCount, paged, pageIndex]);
};

export interface DataGridController<TData extends RowData> {
  /** Callback ref to bind the grid's container element for scoped `/` and `F` shortcuts. */
  bindScope: (node: HTMLDivElement | null) => void;
  clearFilters: () => void;
  clearSelection: () => void;
  hasActiveFilters: boolean;
  isTree: boolean;
  openFilterChannel: OpenFilterChannel;
  paged: boolean;
  pageSizes: readonly number[];
  queryState: GridQueryState;
  resizable: boolean;
  scopeElement: HTMLDivElement | null;
  selectable: boolean;
  selectedCount: number;
  selectedIds: readonly string[];
  selectedRows: readonly TData[];
  specs: ReturnType<typeof useFilterSpecs<TData>>;
  state: ManagedGridState;
  table: DataGridTableInstance<TData>;
}

const useGridAuxState = (initialPinned: ColumnPinningState) => {
  const [expanded, setExpanded] = useState<ExpandedState>(true);
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
  const [localRowSelection, setLocalRowSelection] = useState<RowSelectionState>({});
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>(() => initialPinned);

  return {
    columnPinning,
    columnSizing,
    expanded,
    localRowSelection,
    setColumnPinning,
    setColumnSizing,
    setExpanded,
    setLocalRowSelection,
  };
};

const assembleTableOptions = <TData extends RowData>({
  aux,
  config,
  flags,
  handlers,
  mergedPinning,
  mergedVisibility,
  options,
  paged,
  state,
}: {
  aux: ReturnType<typeof useGridAuxState>;
  config: ReturnType<typeof resolveEngineConfig<TData>>;
  flags: ReturnType<typeof useColumnFlags<TData>>;
  handlers: ReturnType<typeof useGridViewState>["handlers"];
  mergedPinning: ColumnPinningState;
  mergedVisibility: ColumnVisibilityState;
  options: UseDataGridOptions<TData>;
  paged: boolean;
  state: ManagedGridState;
}): TableOptions<DataGridFeatures, TData> =>
  buildTableOptions(
    {
      ...handlers,
      autoResetExpanded: false,
      autoResetPageIndex: false,
      columnResizeMode: "onChange",
      columns: flags.gridColumns,
      data: options.data,
      enableColumnPinning: true,
      enableColumnResizing: config.resizable,
      enableRowSelection: config.selectable,
      features: dataGridFeatures,
      filterFromLeafRows: true,
      getSubRows: (row) => options.getSubRows?.(row),
      globalFilterFn: "gridSearch",
      manualFiltering: config.manualFiltering,
      manualPagination: config.manualPagination || !paged,
      manualSorting: config.manualSorting,
      onColumnPinningChange: aux.setColumnPinning,
      onColumnSizingChange: aux.setColumnSizing,
      onExpandedChange: aux.setExpanded,
      onRowSelectionChange: (updater) => {
        options.onRowSelectionChange?.(updater);
        if (options.rowSelection === undefined) {
          aux.setLocalRowSelection(updater);
        }
      },
      paginateExpandedRows: false,
      state: {
        ...state,
        columnPinning: mergedPinning,
        columnSizing: aux.columnSizing,
        columnVisibility: mergedVisibility,
        expanded: aux.expanded,
        rowSelection: options.rowSelection ?? aux.localRowSelection,
      },
    },
    options.getRowId,
    options.rowCount,
  );

/**
 * Composable headless engine for `@patternmode/datagrid`. Wire the returned
 * controller into `DataGridToolbar`, `DataGridSelectionBar`, `DataGridTable`,
 * or your own custom layout — or use `<DataGrid>` as the batteries-included preset.
 */
export const useDataGrid = <TData extends RowData>(
  options: UseDataGridOptions<TData>,
): DataGridController<TData> => {
  const config = resolveEngineConfig(options);
  const [scopeElement, setScopeElement] = useState<HTMLDivElement | null>(null);
  const openFilterChannel = useMemo(() => createOpenFilterChannel(), []);
  const lastSelectedIndexRef = useRef<number | null>(null);

  const browserAddress = useBrowserGridAddress({
    initialParams: options.initialParams,
    maxPageSize: config.effectiveMaxPageSize,
    prefix: options.urlPrefix,
  });
  const activeAddress = options.address ?? (options.urlState === true ? browserAddress : null);

  const flags = useColumnFlags(options.columns, config.selectionEnabled, lastSelectedIndexRef);
  const aux = useGridAuxState(flags.initialPinned);
  const isMobile = useIsMobile();

  const { handlers, state } = useGridViewState({
    address: activeAddress,
    columnIds: flags.columnIds,
    defaultColumnFilters: options.defaultColumnFilters ?? NO_FILTERS,
    defaultSorting: options.defaultSorting ?? NO_SORTING,
    externalHandlers: {
      onColumnFiltersChange: options.onColumnFiltersChange,
      onGlobalFilterChange: options.onGlobalFilterChange,
      onPaginationChange: options.onPaginationChange,
      onQueryChange: options.onQueryChange,
      onSortingChange: options.onSortingChange,
    },
    filterOnlyIds: flags.filterOnlyIds,
    initialPageSize: config.initialPageSize,
    maxPageSize: config.effectiveMaxPageSize,
    nonHideableIds: flags.nonHideableIds,
    startingVisibility: isMobile ? flags.phoneHidden : NO_HIDDEN,
  });

  const paged =
    options.paging ??
    (config.manualPagination ||
      options.data.length > config.initialPageSize ||
      state.pagination.pageIndex > 0);
  const mergedVisibility = useMemo(
    () => ({ ...state.columnVisibility, ...flags.filterOnly }),
    [flags.filterOnly, state.columnVisibility],
  );
  const mergedPinning = useMemo(
    () => ensureSelectionPinned(aux.columnPinning, config.selectionEnabled),
    [aux.columnPinning, config.selectionEnabled],
  );

  const table = useTable(
    assembleTableOptions({
      aux,
      config,
      flags,
      handlers,
      mergedPinning,
      mergedVisibility,
      options,
      paged,
      state,
    }),
  );

  useClampPageIndex(
    paged,
    config.manualPagination,
    table.getPageCount(),
    state.pagination.pageIndex,
    handlers.onPaginationChange,
  );

  const specs = useFilterSpecs(table);
  const pageSizes = useMemo(
    () => computePageSizes(options.pageSizes, config.initialPageSize, config.effectiveMaxPageSize),
    [config.effectiveMaxPageSize, config.initialPageSize, options.pageSizes],
  );
  const queryState: GridQueryState = useMemo(
    () => ({
      columnFilters: state.columnFilters,
      globalFilter: state.globalFilter,
      pagination: state.pagination,
      sorting: state.sorting,
    }),
    [state.columnFilters, state.globalFilter, state.pagination, state.sorting],
  );
  const selectedModel = config.selectionEnabled ? table.getSelectedRowModel().flatRows : [];

  return {
    bindScope: setScopeElement,
    clearFilters: () => {
      clearGridFilters(table, state, flags.filterOnlyIds);
    },
    clearSelection: () => {
      table.resetRowSelection();
    },
    hasActiveFilters:
      state.globalFilter.trim() !== "" ||
      state.columnFilters.some(({ id }) => !flags.filterOnlyIds.has(id)),
    isTree: options.getSubRows !== undefined,
    openFilterChannel,
    pageSizes,
    paged,
    queryState,
    resizable: config.resizable,
    scopeElement,
    selectable: config.selectionEnabled,
    selectedCount: selectedModel.length,
    selectedIds: selectedModel.map((row) => row.id),
    selectedRows: selectedModel.map((row) => row.original),
    specs,
    state,
    table,
  };
};

export type DataGridSelectionRenderer<TData extends RowData> = (
  context: DataGridSelectionContext<TData>,
) => ReactNode;
