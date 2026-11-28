"use client";
"use no memo";

import { Popover } from "@base-ui/react/popover";
import { Switch } from "@base-ui/react/switch";
import { ToolbarControl } from "@patternmode/filters";
import type { RowData } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, Columns3, GripVertical, Lock } from "lucide-react";

import type { DataGridTableInstance } from "./features";
import { columnLabel, orderedColumns } from "./fields";
import { moveId, useDragReorder } from "./reorder";

export interface DataGridColumnsProps<TData extends RowData> {
  table: DataGridTableInstance<TData>;
}

/**
 * The column picker: every column in its order, each shown or hidden with its
 * switch; drag or use keyboard buttons to reorder. Pinned columns stay shown.
 */
export const DataGridColumns = <TData extends RowData>({ table }: DataGridColumnsProps<TData>) => {
  const columns = orderedColumns(table);
  const shown = columns.filter((column) => column.getIsVisible()).length;
  const ids = columns.map((column) => column.id);

  const reorder = useDragReorder(ids, (nextIds) => {
    table.setColumnOrder(nextIds);
  });

  const shift = (index: number, delta: -1 | 1) => {
    const current = ids[index];
    const target = ids[index + delta];

    if (current !== undefined && target !== undefined) {
      table.setColumnOrder(moveId(ids, current, target));
    }
  };

  return (
    <Popover.Root>
      <Popover.Trigger render={<ToolbarControl />}>
        <Columns3 aria-hidden="true" className="patternmode-datagrid-icon" />
        <span className="patternmode-datagrid-hide-mobile-label">Columns</span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner align="end" className="patternmode-datagrid-positioner" sideOffset={6}>
          <Popover.Popup className="patternmode-datagrid-popover patternmode-datagrid-columns__popup">
            <ul className="patternmode-datagrid-columns__list">
              {columns.map((column, index) => {
                const label = columnLabel(column);

                return (
                  <li
                    className="patternmode-datagrid-columns__row"
                    key={column.id}
                    {...reorder(column.id)}
                  >
                    {column.getCanHide() ? (
                      <GripVertical
                        aria-hidden="true"
                        className="patternmode-datagrid-columns__grip"
                      />
                    ) : (
                      <Lock aria-hidden="true" className="patternmode-datagrid-columns__lock" />
                    )}
                    <span className="patternmode-datagrid-columns__label">{label}</span>
                    {column.getCanHide() ? (
                      <span className="patternmode-datagrid-reorder-steps">
                        <button
                          aria-label={`Move ${label} up`}
                          className="patternmode-datagrid-reorder-btn"
                          disabled={index === 0}
                          onClick={() => {
                            shift(index, -1);
                          }}
                          type="button"
                        >
                          <ChevronUp aria-hidden="true" className="patternmode-datagrid-icon-xs" />
                        </button>
                        <button
                          aria-label={`Move ${label} down`}
                          className="patternmode-datagrid-reorder-btn"
                          disabled={index === columns.length - 1}
                          onClick={() => {
                            shift(index, 1);
                          }}
                          type="button"
                        >
                          <ChevronDown
                            aria-hidden="true"
                            className="patternmode-datagrid-icon-xs"
                          />
                        </button>
                      </span>
                    ) : null}
                    {column.getCanHide() ? (
                      <Switch.Root
                        aria-label={`Show ${label}`}
                        checked={column.getIsVisible()}
                        className="patternmode-datagrid-switch"
                        onCheckedChange={(checked) => {
                          column.toggleVisibility(checked);
                        }}
                      >
                        <Switch.Thumb className="patternmode-datagrid-switch__thumb" />
                      </Switch.Root>
                    ) : (
                      <span className="patternmode-datagrid-columns__always">Always shown</span>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="patternmode-datagrid-popover-footer">
              <span>
                {shown} of {columns.length} shown
              </span>
              <button
                className="patternmode-datagrid-popover-footer__action"
                onClick={() => {
                  table.resetColumnVisibility();
                  table.resetColumnOrder();
                }}
                type="button"
              >
                Reset
              </button>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};
