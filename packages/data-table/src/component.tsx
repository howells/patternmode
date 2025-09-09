"use client";

import { Button } from "@patternmode/button";
import { Checkbox } from "@patternmode/checkbox";
import { Input } from "@patternmode/input";
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@patternmode/menu";
import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from "@patternmode/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@patternmode/select";
import { Stack } from "@patternmode/stack";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@patternmode/table";
import { Text } from "@patternmode/text";
import { cx } from "@patternmode/utils/cx";
import { focusRing } from "@patternmode/utils/focus-ring";
import type {
  ColumnDef,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { create } from "zustand";
import type { DataTableProps } from "./types";

type RowSelectionState = Record<string, boolean>;

type StoreState<TData> = {
  columnVisibility: VisibilityState;
  sorting: SortingState;
  globalFilter: string;
  rowSelection: RowSelectionState;
  pageSize: number;
  setColumnVisibility: (v: VisibilityState) => void;
  setSorting: (v: SortingState) => void;
  setGlobalFilter: (v: string) => void;
  setRowSelection: (v: RowSelectionState) => void;
  setPageSize: (v: number) => void;
};

/**
 * Per-instance lightweight zustand store to keep table state without forcing parent re-renders.
 */
const useDataTableStore = <TData,>({
  initialColumnVisibility,
  initialSorting,
  initialPageSize,
}: {
  initialColumnVisibility?: VisibilityState;
  initialSorting?: SortingState;
  initialPageSize: number;
}) =>
  create<StoreState<TData>>((set) => ({
    columnVisibility: initialColumnVisibility ?? {},
    sorting: initialSorting ?? [],
    globalFilter: "",
    rowSelection: {},
    pageSize: initialPageSize,
    setColumnVisibility: (v) => set({ columnVisibility: v }),
    setSorting: (v) => set({ sorting: v }),
    setGlobalFilter: (v) => set({ globalFilter: v }),
    setRowSelection: (v) => set({ rowSelection: v }),
    setPageSize: (v) => set({ pageSize: v }),
  }));

/**
 * Global fuzzy filter: case-insensitive substring search across visible string values.
 */
const globalStringFilter = <TData,>(
  row: any,
  _columnId: string,
  filterValue: string
) => {
  if (!filterValue) return true;
  const q = String(filterValue).toLowerCase();
  const values: string[] = [];
  for (const cell of row.getVisibleCells()) {
    const v = cell.getValue();
    if (v == null) continue;
    const s =
      typeof v === "string" ? v : typeof v === "number" ? String(v) : "";
    if (s) values.push(s.toLowerCase());
  }
  return values.some((s) => s.includes(q));
};

/**
 * DataTable: Headless TanStack Table wired to Patternmode primitives.
 */
export const DataTable = <TData,>({
  columns: userColumns,
  data,
  enableSearch = true,
  searchPlaceholder = "Search...",
  initialPageSize = 10,
  enableRowSelection = true,
  pageSizes = [10, 20, 50, 100] as const,
  initialColumnVisibility,
  initialSorting,
  testId = "data-table",
  onTableReady,
}: DataTableProps<TData>) => {
  // Create a per-instance store once
  const storeRef = React.useRef<ReturnType<
    typeof useDataTableStore<TData>
  > | null>(null);
  if (!storeRef.current) {
    storeRef.current = useDataTableStore<TData>({
      initialColumnVisibility,
      initialSorting,
      initialPageSize,
    });
  }
  const useStore = storeRef.current;

  // Read/write table state from the store
  const columnVisibility = useStore((s) => s.columnVisibility);
  const sorting = useStore((s) => s.sorting);
  const globalFilter = useStore((s) => s.globalFilter);
  const rowSelection = useStore((s) => s.rowSelection);
  const pageSize = useStore((s) => s.pageSize);
  const setColumnVisibility = useStore((s) => s.setColumnVisibility);
  const setSorting = useStore((s) => s.setSorting);
  const setGlobalFilter = useStore((s) => s.setGlobalFilter);
  const setRowSelection = useStore((s) => s.setRowSelection);
  const setPageSize = useStore((s) => s.setPageSize);

  // Selection column (first)
  const selectionColumn = React.useMemo<ColumnDef<
    TData,
    unknown
  > | null>(() => {
    if (!enableRowSelection) return null;
    return {
      id: "_select",
      header: ({ table }) => (
        <Checkbox
          aria-label="Select all rows"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(Boolean(v))}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(Boolean(v))}
        />
      ),
      size: 40,
      enableSorting: false,
      enableHiding: false,
    } satisfies ColumnDef<TData, unknown>;
  }, [enableRowSelection]);

  const columns = React.useMemo(
    () => (selectionColumn ? [selectionColumn, ...userColumns] : userColumns),
    [selectionColumn, userColumns]
  );

  const table = useReactTable({
    data: data as TData[],
    columns,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: (updater) =>
      setSorting(
        typeof updater === "function"
          ? (updater as (old: SortingState) => SortingState)(sorting)
          : updater
      ),
    onGlobalFilterChange: (updater) =>
      setGlobalFilter(
        typeof updater === "function"
          ? (updater as (old: string) => string)(globalFilter)
          : String(updater ?? "")
      ),
    onColumnVisibilityChange: (updater) =>
      setColumnVisibility(
        typeof updater === "function"
          ? (updater as (old: VisibilityState) => VisibilityState)(
              columnVisibility
            )
          : updater
      ),
    onRowSelectionChange: (updater) =>
      setRowSelection(
        typeof updater === "function"
          ? (updater as (old: RowSelectionState) => RowSelectionState)(
              rowSelection
            )
          : updater
      ),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: globalStringFilter,
    enableRowSelection,
    // Improve perf for very large data sets
    defaultColumn: { size: 150 },
    columnResizeMode: "onChange",
  });

  React.useEffect(() => {
    onTableReady?.(table as unknown as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, onTableReady]);

  // Ensure pageSize syncs with table
  React.useEffect(() => {
    table.setPageSize(pageSize);
  }, [pageSize, table]);

  const totalRows = data.length;
  const selectedCount = table.getSelectedRowModel().rows.length;

  // Render
  return (
    <Stack data-testid={testId} gap={3}>
      <Stack
          align="center"
          className="gap-2 sm:flex-row"
          direction="vertical"
          justify="between"
        >
          <Stack
            align="center"
            className="w-full sm:w-auto"
            direction="horizontal"
            gap={2}
          >
            {enableSearch && (
              <div className="w-full sm:w-64">
                <Input
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder={searchPlaceholder}
                  type="search"
                  value={globalFilter}
                />
              </div>
            )}

            <Menu>
              <MenuTrigger>Filters</MenuTrigger>
              <MenuContent sideOffset={8}>
                <div className="p-2">
                  <Text className="px-1 py-1.5 text-zinc-500" size="xs">
                    Column filters
                  </Text>
                  {table
                    .getAllColumns()
                    .filter((c) => c.getCanFilter())
                    .map((column) => (
                      <div className="px-1 py-1.5" key={column.id}>
                        <Text
                          className="mb-1 block text-xs text-zinc-500 uppercase"
                          size="xs"
                        >
                          {column.columnDef.header as React.ReactNode}
                        </Text>
                        <Input
                          onChange={(e) => column.setFilterValue(e.target.value)}
                          placeholder={`Filter ${String(column.id)}`}
                          type="search"
                          value={(column.getFilterValue() as string) ?? ""}
                        />
                      </div>
                    ))}
                  {table.getAllColumns().filter((c) => c.getCanFilter()).length === 0 && (
                    <div className="px-1 py-2">
                      <Text className="text-zinc-500" size="sm">
                        No filterable columns.
                      </Text>
                    </div>
                  )}
                </div>
                <MenuSeparator />
                <div className="p-2">
                  <MenuItem
                    onSelect={() => {
                      table.resetColumnFilters();
                      setGlobalFilter("");
                    }}
                  >
                    Reset filters
                  </MenuItem>
                </div>
              </MenuContent>
            </Menu>

            <Menu>
              <MenuTrigger>View</MenuTrigger>
              <MenuContent sideOffset={8}>
                <div className="p-1">
                  {table.getAllLeafColumns().map((column) => {
                    if (column.id === "_select") return null;
                    return (
                      <MenuCheckboxItem
                        checked={column.getIsVisible()}
                        key={column.id}
                        onCheckedChange={(v) => column.toggleVisibility(Boolean(v))}
                      >
                        {String(column.columnDef.header ?? column.id)}
                      </MenuCheckboxItem>
                    );
                  })}
                </div>
              </MenuContent>
            </Menu>
          </Stack>

          <Stack align="center" direction="horizontal" gap={2}>
            <Text className="text-zinc-600 dark:text-zinc-400" size="sm">
              {selectedCount > 0
                ? `${selectedCount} selected`
                : `${table.getRowModel().rows.length} shown`}
              {selectedCount > 0 && totalRows
                ? ` • ${totalRows} total`
                : totalRows
                  ? ` / ${totalRows} total`
                  : ""}
            </Text>

            <div className="hidden h-5 w-px bg-zinc-200 sm:block dark:bg-zinc-800" />

            <Stack align="center" direction="horizontal" gap={1}>
              <Text className="text-zinc-600 dark:text-zinc-400" size="sm">
                Rows per page
              </Text>
              <Select
                onValueChange={(v) => setPageSize(Number(v))}
                value={String(pageSize)}
              >
                <SelectTrigger size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent sideOffset={6}>
                  {pageSizes.map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Stack>
          </Stack>
        </Stack>

      <div className="overflow-x-auto rounded-md border dark:border-zinc-800">
        <Table className="min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className="whitespace-nowrap"
                    colSpan={header.colSpan}
                    key={header.id}
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        className={cx(
                          "inline-flex items-center gap-1 font-medium text-zinc-600 transition-colors dark:text-zinc-300",
                          focusRing
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                        type="button"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{ asc: "▲", desc: "▼" }[
                          header.column.getIsSorted() as string
                        ] ?? null}
                      </button>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  data-state={row.getIsSelected() && "selected"}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="whitespace-nowrap" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center text-zinc-500"
                  colSpan={table.getAllColumns().length}
                >
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Stack
        align="center"
        className="w-full"
        direction="horizontal"
        justify="between"
      >
        <Text className="text-zinc-600 dark:text-zinc-400" size="sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount() || 1}
        </Text>
        <Pagination>
          <PaginationPrevious
            disabled={!table.getCanPreviousPage()}
            render={(props) => (
              <button
                {...(props as React.ComponentPropsWithoutRef<"button">)}
                onClick={() => table.previousPage()}
              />
            )}
          />
          <PaginationList>
            {(() => {
              const pages = table.getPageCount();
              const current = table.getState().pagination.pageIndex;
              const items: number[] = [];
              for (let i = 0; i < pages; i++) items.push(i);
              // compact: show first, last, current ±1
              const display = new Set<number>(
                [0, pages - 1, current - 1, current, current + 1].filter(
                  (n) => n >= 0 && n < pages
                )
              );
              const ordered = [...display].sort((a, b) => a - b);
              const nodes: React.ReactNode[] = [];
              for (let i = 0; i < ordered.length; i++) {
                const p = ordered[i];
                const prev = ordered[i - 1];
                if (i > 0 && prev !== undefined && p - prev > 1) {
                  nodes.push(<PaginationGap key={`gap-${prev}-${p}`} />);
                }
                nodes.push(
                  <PaginationPage
                    current={p === current}
                    key={p}
                    render={(props) => (
                      <button
                        {...(props as React.ComponentPropsWithoutRef<"button">)}
                        onClick={() => table.setPageIndex(p)}
                        type="button"
                      />
                    )}
                  >
                    {p + 1}
                  </PaginationPage>
                );
              }
              return nodes;
            })()}
          </PaginationList>
          <PaginationNext
            disabled={!table.getCanNextPage()}
            render={(props) => (
              <button
                {...(props as React.ComponentPropsWithoutRef<"button">)}
                onClick={() => table.nextPage()}
              />
            )}
          />
        </Pagination>
      </Stack>
    </Stack>
  );
};

DataTable.displayName = "DataTable";
