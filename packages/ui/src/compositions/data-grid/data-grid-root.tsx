"use client";

import type { Table } from "@tanstack/react-table";
import { createContext, useContext, useEffect, useRef } from "react";
import type { DataGridProps } from "./data-grid-types";

/**
 * Context uses `any` because React Context with generics requires type erasure
 * at the context creation site. Type safety is enforced through:
 * 1. DataGridProvider accepting properly typed props
 * 2. useDataGrid hook casting to the correct generic type at call sites
 *
 * This is the standard pattern for generic React contexts.
 * See: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/
 */
const DataGridContext = createContext<unknown>(undefined);

/**
 * Hook to access DataGrid context.
 * Must be used within a DataGrid component.
 */
export function useDataGrid() {
  const context = useContext(DataGridContext);
  if (!context) {
    throw new Error("useDataGrid must be used within a DataGridProvider");
  }
  return context;
}

/**
 * DataGridProvider UI component.
 * Import from "@patternmode/ui/compositions/data-grid".
 */
export function DataGridProvider<TData extends object>({
  children,
  table,
  ...props
}: DataGridProps<TData> & { table: Table<TData> }) {
  return (
    <DataGridContext.Provider
      value={{
        props,
        table,
        recordCount: props.recordCount,
        isLoading: props.isLoading,
      }}
    >
      {children}
    </DataGridContext.Provider>
  );
}

/**
 * DataGrid root component with context management.
 * Wraps TanStack Table with our UI layer and provides context to children.
 *
 * @example
 * ```tsx
 * const table = useReactTable({
 *   data,
 *   columns,
 *   getCoreRowModel: getCoreRowModel(),
 * });
 *
 * <DataGrid table={table} recordCount={data.length}>
 *   <DataGridContainer>
 *     <DataGridTable />
 *   </DataGridContainer>
 * </DataGrid>
 * ```
 */
export function DataGrid<TData extends object>({
  children,
  table,
  initialColumnPinning,
  ...props
}: DataGridProps<TData>) {
  const hasAppliedInitialPinning = useRef(false);

  const defaultProps: Partial<DataGridProps<TData>> = {
    loadingMode: "skeleton",
    tableLayout: {
      dense: false,
      cellBorder: false,
      rowBorder: true,
      rowRounded: false,
      striped: false,
      headerSticky: true,
      headerBackground: true,
      headerBorder: true,
      width: "fixed",
      columnsVisibility: false,
      columnsResizable: false,
      columnsPinnable: Boolean(initialColumnPinning),
      columnsMovable: false,
      columnsDraggable: false,
      rowsDraggable: false,
    },
    tableClassNames: {
      base: "",
      header: "",
      headerRow: "",
      headerSticky: "sticky top-0 z-10 glass-surface",
      body: "",
      bodyRow: "",
      footer: "",
      edgeCell: "",
    },
    virtualization: {
      enabled: true,
      estimateSize: 94,
      overscan: 5,
    },
  };

  const mergedProps: DataGridProps<TData> = {
    ...defaultProps,
    ...props,
    tableLayout: {
      ...defaultProps.tableLayout,
      ...(props.tableLayout || {}),
    },
    tableClassNames: {
      ...defaultProps.tableClassNames,
      ...(props.tableClassNames || {}),
    },
    virtualization: {
      ...defaultProps.virtualization,
      ...(props.virtualization || {}),
    },
  };

  // Ensure table is provided
  if (!table) {
    throw new Error('DataGrid requires a "table" prop');
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
