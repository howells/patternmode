"use client";
"use no memo";

import { FilterToolbar, SearchField, ToolbarControl } from "@patternmode/filters";
import type { FilterSpec, ShortcutScope } from "@patternmode/filters";
import type { RowData } from "@tanstack/react-table";
import type { ReactNode } from "react";
import { useEffect, useEffectEvent, useState } from "react";

import { DataGridColumns } from "./columns-picker";
import type { DataGridTableInstance } from "./features";
import { DataGridFilters } from "./filters-bar";
import { DataGridPaging } from "./paging";
import { DataGridSort } from "./sort-picker";
import type { OpenFilterChannel } from "./use-data-grid";

export interface DataGridToolbarProps<TData extends RowData> {
  globalFilter: string;
  inline?: boolean | undefined;
  isTree?: boolean | undefined;
  /** Optional channel so column header menus can open a chip without re-rendering the table body. */
  openFilterChannel?: OpenFilterChannel | undefined;
  /** Optional controlled open filter ID. */
  openFilterId?: string | null | undefined;
  onOpenFilterChange?: ((columnId: string | null) => void) | undefined;
  pageSizes?: readonly number[] | undefined;
  paging: boolean;
  scopeRef?: ShortcutScope;
  searchPlaceholder?: string | undefined;
  shortcuts?: boolean | undefined;
  specs: ReadonlyMap<string, FilterSpec>;
  start?: ReactNode | undefined;
  table: DataGridTableInstance<TData>;
}

/**
 * The grid's one row of controls: search, filter chips and "Filter", then Sort,
 * Columns and paging at the right end. Keeps filter popover open-state local so
 * opening a chip never re-renders the table body.
 */
export const DataGridToolbar = <TData extends RowData>({
  globalFilter,
  inline = false,
  isTree = false,
  onOpenFilterChange,
  openFilterChannel,
  openFilterId: controlledOpenId,
  pageSizes,
  paging,
  scopeRef,
  searchPlaceholder = "Search",
  shortcuts = true,
  specs,
  start,
  table,
}: DataGridToolbarProps<TData>) => {
  const [localOpenId, setLocalOpenId] = useState<string | null>(null);
  const openId = controlledOpenId === undefined ? localOpenId : controlledOpenId;

  const setOpenId = (next: string | null) => {
    if (controlledOpenId === undefined) {
      setLocalOpenId(next);
    }

    onOpenFilterChange?.(next);
  };

  const handleChannelOpen = useEffectEvent((columnId: string) => {
    if (controlledOpenId === undefined) {
      setLocalOpenId(columnId);
    }

    onOpenFilterChange?.(columnId);
  });

  useEffect(() => {
    if (openFilterChannel === undefined) {
      return () => {
        // No channel subscribed.
      };
    }

    return openFilterChannel.subscribe(handleChannelOpen);
  }, [openFilterChannel]);

  return (
    <FilterToolbar
      className={inline ? "patternmode-datagrid-toolbar--inline" : undefined}
      end={
        <>
          <DataGridSort specs={specs} table={table} />
          <DataGridColumns table={table} />
          {paging ? (
            <>
              <span aria-hidden="true" className="patternmode-datagrid-toolbar__divider" />
              <DataGridPaging isTree={isTree} pageSizes={pageSizes} table={table} />
            </>
          ) : null}
        </>
      }
    >
      <SearchField
        delayMs={150}
        label="Search"
        onSearch={(value) => {
          table.setGlobalFilter(value);
        }}
        placeholder={searchPlaceholder}
        scopeRef={scopeRef}
        shortcut={shortcuts}
        value={globalFilter}
      />
      {start}
      <DataGridFilters
        onOpenChange={setOpenId}
        openId={openId}
        scopeRef={scopeRef}
        shortcut={shortcuts}
        specs={specs}
        table={table}
      />
      {table.state.columnFilters.every(
        ({ id }) => table.getColumn(id)?.columnDef.meta?.filterOnly === true,
      ) ? null : (
        <ToolbarControl
          onClick={() => {
            table.setColumnFilters((filters) =>
              filters.filter(({ id }) => table.getColumn(id)?.columnDef.meta?.filterOnly === true),
            );
          }}
        >
          Clear
        </ToolbarControl>
      )}
    </FilterToolbar>
  );
};
