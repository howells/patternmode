"use client";
"use no memo";

import { Menu } from "@base-ui/react/menu";
import { Popover } from "@base-ui/react/popover";
import { ToolbarControl } from "@patternmode/filters";
import type { FilterSpec } from "@patternmode/filters";
import type { ColumnSort, RowData } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, ChevronUp, GripVertical, Plus, X } from "lucide-react";

import type { DataGridColumn, DataGridTableInstance } from "./features";
import { columnLabel, directionLabels } from "./fields";
import { moveId, useDragReorder } from "./reorder";
import { setColumnSort } from "./sort-state";

const Direction = ({
  labels,
  onChange,
  sort,
}: {
  labels: readonly [string, string];
  onChange: (desc: boolean) => void;
  sort: ColumnSort;
}) => (
  <div className="patternmode-datagrid-sort__dir">
    {[false, true].map((desc) => (
      <button
        aria-pressed={sort.desc === desc}
        className="patternmode-datagrid-sort__dir-btn"
        key={String(desc)}
        onClick={() => {
          onChange(desc);
        }}
        type="button"
      >
        {labels[desc ? 1 : 0]}
      </button>
    ))}
  </div>
);

const SortRow = <TData extends RowData>({
  canMoveDown,
  canMoveUp,
  column,
  dragProps,
  onMove,
  onRemove,
  onReplace,
  sort,
  spec,
  unused,
}: {
  canMoveDown: boolean;
  canMoveUp: boolean;
  column: DataGridColumn<TData>;
  dragProps: ReturnType<ReturnType<typeof useDragReorder>>;
  onMove: (delta: -1 | 1) => void;
  onRemove: () => void;
  onReplace: (next: ColumnSort) => void;
  sort: ColumnSort;
  spec: FilterSpec | undefined;
  unused: readonly DataGridColumn<TData>[];
}) => {
  const label = columnLabel(column);

  return (
    <li className="patternmode-datagrid-sort__row" {...dragProps}>
      <GripVertical aria-hidden="true" className="patternmode-datagrid-columns__grip" />
      <Menu.Root>
        <Menu.Trigger className="patternmode-datagrid-sort__column">
          <span className="patternmode-datagrid-sort__column-label">{label}</span>
          <ChevronDown aria-hidden="true" className="patternmode-datagrid-icon-xs" />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner align="start" className="patternmode-datagrid-positioner" sideOffset={4}>
            <Menu.Popup className="patternmode-datagrid-menu">
              {unused.map((candidate) => (
                <Menu.Item
                  className="patternmode-datagrid-menu__item"
                  key={candidate.id}
                  onClick={() => {
                    onReplace({ ...sort, id: candidate.id });
                  }}
                >
                  {columnLabel(candidate)}
                </Menu.Item>
              ))}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
      <Direction
        labels={directionLabels(spec)}
        onChange={(desc) => {
          onReplace({ ...sort, desc });
        }}
        sort={sort}
      />
      {canMoveUp || canMoveDown ? (
        <span className="patternmode-datagrid-reorder-steps">
          <button
            aria-label={`Move ${label} sort higher`}
            className="patternmode-datagrid-reorder-btn"
            disabled={!canMoveUp}
            onClick={() => {
              onMove(-1);
            }}
            type="button"
          >
            <ChevronUp aria-hidden="true" className="patternmode-datagrid-icon-xs" />
          </button>
          <button
            aria-label={`Move ${label} sort lower`}
            className="patternmode-datagrid-reorder-btn"
            disabled={!canMoveDown}
            onClick={() => {
              onMove(1);
            }}
            type="button"
          >
            <ChevronDown aria-hidden="true" className="patternmode-datagrid-icon-xs" />
          </button>
        </span>
      ) : null}
      <button
        aria-label={`Remove sort by ${label}`}
        className="patternmode-datagrid-sort__remove"
        onClick={onRemove}
        type="button"
      >
        <X aria-hidden="true" className="patternmode-datagrid-icon-xs" />
      </button>
    </li>
  );
};

export interface DataGridSortProps<TData extends RowData> {
  specs: ReadonlyMap<string, FilterSpec>;
  table: DataGridTableInstance<TData>;
}

/**
 * "Sort": the sorts in force, first to last. Each picks a column and a
 * direction; drag or use keyboard buttons to change priority.
 */
export const DataGridSort = <TData extends RowData>({ specs, table }: DataGridSortProps<TData>) => {
  const { sorting } = table.state;
  const sortable = table.getAllLeafColumns().filter((column) => column.getCanSort());
  const unused = sortable.filter((column) => !sorting.some((sort) => sort.id === column.id));
  const ids = sorting.map((sort) => sort.id);

  const applyOrder = (nextIds: readonly string[]) => {
    table.setSorting(nextIds.flatMap((id) => sorting.filter((sort) => sort.id === id)));
  };

  const reorder = useDragReorder(ids, applyOrder);

  const shift = (index: number, delta: -1 | 1) => {
    const current = ids[index];
    const target = ids[index + delta];

    if (current !== undefined && target !== undefined) {
      applyOrder(moveId(ids, current, target));
    }
  };

  const replace = (index: number, next: ColumnSort) => {
    table.setSorting(sorting.map((sort, at) => (at === index ? next : sort)));
  };

  if (sortable.length === 0) {
    return null;
  }

  return (
    <Popover.Root>
      <Popover.Trigger render={<ToolbarControl />}>
        <ArrowUpDown aria-hidden="true" className="patternmode-datagrid-icon" />
        Sort
        {sorting.length === 0 ? null : (
          <span className="patternmode-datagrid-sort__badge">{sorting.length}</span>
        )}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner align="end" className="patternmode-datagrid-positioner" sideOffset={6}>
          <Popover.Popup className="patternmode-datagrid-popover patternmode-datagrid-sort__popup">
            {sorting.length === 0 ? (
              <p className="patternmode-datagrid-sort__empty">
                Rows are in their own order. Add a sort to order them by a column.
              </p>
            ) : (
              <ol className="patternmode-datagrid-sort__list">
                {sorting.map((sort, index) => {
                  const column = table.getColumn(sort.id);

                  if (column === undefined) {
                    return null;
                  }

                  return (
                    <SortRow
                      canMoveDown={index < sorting.length - 1}
                      canMoveUp={index > 0}
                      column={column}
                      dragProps={reorder(sort.id)}
                      key={sort.id}
                      onMove={(delta) => {
                        shift(index, delta);
                      }}
                      onRemove={() => {
                        table.setSorting(sorting.filter((_, at) => at !== index));
                      }}
                      onReplace={(next) => {
                        replace(index, next);
                      }}
                      sort={sort}
                      spec={specs.get(sort.id)}
                      unused={unused}
                    />
                  );
                })}
              </ol>
            )}
            <div className="patternmode-datagrid-popover-footer patternmode-datagrid-sort__footer">
              <Menu.Root>
                <Menu.Trigger
                  disabled={unused.length === 0}
                  render={<ToolbarControl className="patternmode-datagrid-sort__add" />}
                >
                  <Plus aria-hidden="true" className="patternmode-datagrid-icon" />
                  Add sort
                </Menu.Trigger>
                <Menu.Portal>
                  <Menu.Positioner
                    align="start"
                    className="patternmode-datagrid-positioner"
                    sideOffset={4}
                  >
                    <Menu.Popup className="patternmode-datagrid-menu">
                      {unused.map((column) => (
                        <Menu.Item
                          className="patternmode-datagrid-menu__item"
                          key={column.id}
                          onClick={() => {
                            setColumnSort(table, column.id, false);
                          }}
                        >
                          {columnLabel(column)}
                        </Menu.Item>
                      ))}
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
              {sorting.length === 0 ? null : (
                <ToolbarControl
                  className="patternmode-datagrid-sort__add"
                  onClick={() => {
                    table.setSorting([]);
                  }}
                >
                  Clear
                </ToolbarControl>
              )}
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};
