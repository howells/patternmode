"use client";
"use no memo";

import { Menu } from "@base-ui/react/menu";
import type { FilterSpec } from "@patternmode/filters";
import type { RowData } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  EyeOff,
  ListFilter,
  Pin,
  PinOff,
  X,
} from "lucide-react";
import type { ReactNode } from "react";

import type { DataGridColumn, DataGridTableInstance } from "./features";
import { directionLabels, orderedColumns } from "./fields";
import { startFilter } from "./filter-state";
import { moveId } from "./reorder";
import { getOrderedVisibleLeafColumns } from "./shape";
import { setColumnSort } from "./sort-state";

const moveColumn = <TData extends RowData>(
  table: DataGridTableInstance<TData>,
  column: DataGridColumn<TData>,
  step: -1 | 1,
) => {
  const shown = getOrderedVisibleLeafColumns(table).filter(
    (candidate) => candidate.getIsPinned() === false,
  );
  const neighbour = shown[shown.indexOf(column) + step];

  if (neighbour !== undefined) {
    table.setColumnOrder(
      moveId(
        orderedColumns(table).map((candidate) => candidate.id),
        column.id,
        neighbour.id,
      ),
    );
  }
};

const ColumnTrigger = ({
  filtered,
  name,
  sortIndex,
  sorted,
}: {
  filtered: boolean;
  name: ReactNode;
  sortIndex: number | null;
  sorted: false | "asc" | "desc";
}) => (
  <Menu.Trigger
    className="patternmode-datagrid-column-trigger"
    data-active={sorted !== false || filtered ? "" : undefined}
    data-column-menu=""
  >
    <span className="patternmode-datagrid-column-trigger__name">{name}</span>
    {filtered ? (
      <ListFilter aria-label="Filtered" className="patternmode-datagrid-column-trigger__filtered" />
    ) : null}
    {sorted === false ? (
      <ChevronDown aria-hidden="true" className="patternmode-datagrid-column-trigger__chevron" />
    ) : (
      <span className="patternmode-datagrid-column-trigger__sort">
        {sorted === "asc" ? (
          <ArrowUp aria-hidden="true" className="patternmode-datagrid-icon-xs" />
        ) : (
          <ArrowDown aria-hidden="true" className="patternmode-datagrid-icon-xs" />
        )}
        {sortIndex === null ? null : (
          <span className="patternmode-datagrid-column-trigger__sort-index">{sortIndex}</span>
        )}
      </span>
    )}
  </Menu.Trigger>
);

const SortMenuItems = <TData extends RowData>({
  ascending,
  column,
  descending,
  sorted,
  table,
}: {
  ascending: string;
  column: DataGridColumn<TData>;
  descending: string;
  sorted: false | "asc" | "desc";
  table: DataGridTableInstance<TData>;
}) => (
  <>
    <Menu.Item
      className="patternmode-datagrid-menu__item"
      onClick={() => {
        setColumnSort(table, column.id, false);
      }}
    >
      <ArrowUp aria-hidden="true" className="patternmode-datagrid-icon" />
      Sort {ascending}
    </Menu.Item>
    <Menu.Item
      className="patternmode-datagrid-menu__item"
      onClick={() => {
        setColumnSort(table, column.id, true);
      }}
    >
      <ArrowDown aria-hidden="true" className="patternmode-datagrid-icon" />
      Sort {descending}
    </Menu.Item>
    {sorted === false ? null : (
      <Menu.Item
        className="patternmode-datagrid-menu__item"
        onClick={() => {
          column.clearSorting();
        }}
      >
        <X aria-hidden="true" className="patternmode-datagrid-icon" />
        Remove sort
      </Menu.Item>
    )}
  </>
);

const LayoutMenuItems = <TData extends RowData>({
  column,
  pinState,
  table,
}: {
  column: DataGridColumn<TData>;
  pinState: false | "end" | "start";
  table: DataGridTableInstance<TData>;
}) => (
  <>
    {column.getCanPin() ? (
      <>
        {pinState === "start" ? null : (
          <Menu.Item
            className="patternmode-datagrid-menu__item"
            onClick={() => {
              column.pin("start");
            }}
          >
            <Pin aria-hidden="true" className="patternmode-datagrid-icon" />
            Pin to start
          </Menu.Item>
        )}
        {pinState === "end" ? null : (
          <Menu.Item
            className="patternmode-datagrid-menu__item"
            onClick={() => {
              column.pin("end");
            }}
          >
            <Pin aria-hidden="true" className="patternmode-datagrid-icon" />
            Pin to end
          </Menu.Item>
        )}
        {pinState === false ? null : (
          <Menu.Item
            className="patternmode-datagrid-menu__item"
            onClick={() => {
              column.pin(false);
            }}
          >
            <PinOff aria-hidden="true" className="patternmode-datagrid-icon" />
            Unpin
          </Menu.Item>
        )}
      </>
    ) : null}
    {pinState === false ? (
      <>
        <Menu.Item
          className="patternmode-datagrid-menu__item"
          onClick={() => {
            moveColumn(table, column, -1);
          }}
        >
          <ArrowLeft aria-hidden="true" className="patternmode-datagrid-icon" />
          Move left
        </Menu.Item>
        <Menu.Item
          className="patternmode-datagrid-menu__item"
          onClick={() => {
            moveColumn(table, column, 1);
          }}
        >
          <ArrowRight aria-hidden="true" className="patternmode-datagrid-icon" />
          Move right
        </Menu.Item>
      </>
    ) : null}
    {column.getCanHide() ? (
      <Menu.Item
        className="patternmode-datagrid-menu__item"
        onClick={() => {
          column.toggleVisibility(false);
        }}
      >
        <EyeOff aria-hidden="true" className="patternmode-datagrid-icon" />
        Hide column
      </Menu.Item>
    ) : null}
  </>
);

/** A column's header and its menu: sort, filter by it, pin start/end, move, hide. */
export const ColumnHeader = <TData extends RowData>({
  column,
  name,
  onOpenFilter,
  spec,
  table,
}: {
  column: DataGridColumn<TData>;
  name: ReactNode;
  onOpenFilter: (columnId: string) => void;
  spec: FilterSpec | undefined;
  table: DataGridTableInstance<TData>;
}) => {
  const sorted = column.getIsSorted();
  const pinState = column.getIsPinned();
  const [ascending, descending] = directionLabels(spec);
  const sortCount = table.state.sorting.length;

  return (
    <Menu.Root>
      <ColumnTrigger
        filtered={column.getIsFiltered()}
        name={name}
        sortIndex={sortCount > 1 ? column.getSortIndex() + 1 : null}
        sorted={sorted}
      />
      <Menu.Portal>
        <Menu.Positioner
          align={column.columnDef.meta?.align === "right" ? "end" : "start"}
          className="patternmode-datagrid-positioner"
          sideOffset={4}
        >
          <Menu.Popup className="patternmode-datagrid-menu">
            {column.getCanSort() ? (
              <SortMenuItems
                ascending={ascending}
                column={column}
                descending={descending}
                sorted={sorted}
                table={table}
              />
            ) : null}
            {spec === undefined ? null : (
              <>
                <Menu.Separator className="patternmode-datagrid-menu__separator" />
                <Menu.Item
                  className="patternmode-datagrid-menu__item"
                  onClick={() => {
                    startFilter(column, spec, onOpenFilter);
                  }}
                >
                  <ListFilter aria-hidden="true" className="patternmode-datagrid-icon" />
                  Filter
                </Menu.Item>
              </>
            )}
            <Menu.Separator className="patternmode-datagrid-menu__separator" />
            <LayoutMenuItems column={column} pinState={pinState} table={table} />
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
};
