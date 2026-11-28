"use client";
"use no memo";

import { Checkbox } from "@base-ui/react/checkbox";
import type { RowData, Table } from "@tanstack/react-table";
import { Check, Minus } from "lucide-react";
import type { RefObject } from "react";

import type { DataGridColumnDef, DataGridFeatures } from "./features";

export const SELECTION_COLUMN_ID = "__select__";

const selectRange = <TData extends RowData>(
  table: Table<DataGridFeatures, TData>,
  fromIndex: number,
  toIndex: number,
  checked: boolean,
) => {
  const { rows } = table.getRowModel();
  const start = Math.min(fromIndex, toIndex);
  const end = Math.max(fromIndex, toIndex);
  const affected = new Set<string>();

  for (let index = start; index <= end; index += 1) {
    const target = rows[index];

    if (target !== undefined && target.getCanSelect()) {
      affected.add(target.id);
    }
  }

  table.setRowSelection((current) => {
    const next: Record<string, true> = {};

    for (const [id, value] of Object.entries(current)) {
      if (value && (checked || !affected.has(id))) {
        next[id] = true;
      }
    }

    if (checked) {
      for (const id of affected) {
        next[id] = true;
      }
    }

    return next;
  });
};

/** Built-in pinned-start checkbox column with tri-state header and Shift+Click range selection. */
export const createSelectionColumn = <TData extends RowData>(
  lastSelectedIndexRef: RefObject<number | null>,
): DataGridColumnDef<TData> => ({
  cell: ({ row, table }) => {
    const checked = row.getIsSelected();
    const disabled = !row.getCanSelect();

    return (
      <div className="patternmode-datagrid-select-cell">
        <Checkbox.Root
          aria-label={`Select row ${row.index + 1}`}
          checked={checked}
          className="patternmode-datagrid-checkbox"
          disabled={disabled}
          onCheckedChange={(next) => {
            row.toggleSelected(next);
          }}
          onClick={(event) => {
            const visibleIndex = table
              .getRowModel()
              .rows.findIndex((candidate) => candidate.id === row.id);

            if (event.shiftKey && lastSelectedIndexRef.current !== null && visibleIndex !== -1) {
              event.preventDefault();
              selectRange(table, lastSelectedIndexRef.current, visibleIndex, !checked);
            }

            if (visibleIndex !== -1) {
              lastSelectedIndexRef.current = visibleIndex;
            }
          }}
        >
          <Checkbox.Indicator className="patternmode-datagrid-checkbox__indicator">
            <Check aria-hidden="true" className="patternmode-datagrid-icon-xs" />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
    );
  },
  enableColumnFilter: false,
  enableGlobalFilter: false,
  enableHiding: false,
  enablePinning: false,
  enableResizing: false,
  enableSorting: false,
  header: ({ table }) => {
    const allSelected = table.getIsAllPageRowsSelected();
    const someSelected = table.getIsSomePageRowsSelected();

    return (
      <div className="patternmode-datagrid-select-cell">
        <Checkbox.Root
          aria-label="Select all rows on page"
          checked={allSelected}
          className="patternmode-datagrid-checkbox"
          indeterminate={!allSelected && someSelected}
          onCheckedChange={(next) => {
            table.toggleAllPageRowsSelected(next);
          }}
        >
          <Checkbox.Indicator
            className="patternmode-datagrid-checkbox__indicator"
            render={(props, state) => (
              <span {...props}>
                {state.indeterminate ? (
                  <Minus aria-hidden="true" className="patternmode-datagrid-icon-xs" />
                ) : (
                  <Check aria-hidden="true" className="patternmode-datagrid-icon-xs" />
                )}
              </span>
            )}
          />
        </Checkbox.Root>
      </div>
    );
  },
  id: SELECTION_COLUMN_ID,
  maxSize: 40,
  meta: { filter: false, label: "Select", pinned: "start", width: 40 },
  minSize: 40,
  size: 40,
});
