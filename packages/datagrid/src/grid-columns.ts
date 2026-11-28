"use client";
"use no memo";
// oxlint-disable react-doctor/react-compiler-no-manual-memoization -- "use no memo" opts out of React Compiler for TanStack Table column identity, so manual useMemo is load-bearing

import type { RowData } from "@tanstack/react-table";
import type { RefObject } from "react";
import { useMemo } from "react";

import type { DataGridColumnDef } from "./features";
import { SELECTION_COLUMN_ID, createSelectionColumn } from "./selection-column";
import { columnIdFromDef, normalizePinSide, parsePxWidth } from "./state";

const subColumns = <TData extends RowData>(
  column: DataGridColumnDef<TData>,
): readonly DataGridColumnDef<TData>[] | undefined =>
  "columns" in column && column.columns !== undefined ? column.columns : undefined;

const leafColumns = <TData extends RowData>(
  columns: readonly DataGridColumnDef<TData>[],
): DataGridColumnDef<TData>[] =>
  columns.flatMap((column) => {
    const children = subColumns(column);

    return children === undefined ? [column] : leafColumns(children);
  });

const applySizing = <TData extends RowData>(
  target: DataGridColumnDef<TData>,
  source: DataGridColumnDef<TData>,
): DataGridColumnDef<TData> => {
  const size = source.size ?? parsePxWidth(source.meta?.width);
  const minSize = source.minSize ?? parsePxWidth(source.meta?.minWidth);
  const maxSize = source.maxSize ?? parsePxWidth(source.meta?.maxWidth);

  if (size !== undefined) {
    target.size = size;
  }

  if (minSize !== undefined) {
    target.minSize = minSize;
  }

  if (maxSize !== undefined) {
    target.maxSize = maxSize;
  }

  return target;
};

const gridColumn = <TData extends RowData>(
  column: DataGridColumnDef<TData>,
): DataGridColumnDef<TData> => {
  const children = subColumns(column);

  if (children !== undefined) {
    return { ...column, columns: children.map((child) => gridColumn(child)) };
  }

  const filterFn = column.filterFn ?? "rule";
  const pinSide = normalizePinSide(column.meta?.pinned);

  if (column.meta?.filterOnly === true) {
    return applySizing({ ...column, enableHiding: false, enableSorting: false, filterFn }, column);
  }

  if (pinSide !== undefined) {
    return applySizing({ ...column, enableHiding: false, filterFn }, column);
  }

  return applySizing({ ...column, filterFn }, column);
};

const collectInitialPinned = <TData extends RowData>(
  leaves: readonly DataGridColumnDef<TData>[],
  hasSelection: boolean,
) => {
  const start: string[] = hasSelection ? [SELECTION_COLUMN_ID] : [];
  const end: string[] = [];

  for (const column of leaves) {
    const id = columnIdFromDef(column);
    const side = normalizePinSide(column.meta?.pinned);

    if (id !== undefined && side === "start") {
      start.push(id);
    } else if (id !== undefined && side === "end") {
      end.push(id);
    }
  }

  return { end, start };
};

/** Normalises user columns, injects the optional selection column, and extracts grid column flags. */
export const useColumnFlags = <TData extends RowData>(
  columns: DataGridColumnDef<TData>[],
  selectable: boolean,
  lastSelectedIndexRef: RefObject<number | null>,
) => {
  const selectionColumn = useMemo(
    () => (selectable ? createSelectionColumn<TData>(lastSelectedIndexRef) : null),
    [lastSelectedIndexRef, selectable],
  );

  const gridColumns = useMemo(() => {
    const normalized = columns.map(gridColumn);

    return selectionColumn === null ? normalized : [selectionColumn, ...normalized];
  }, [columns, selectionColumn]);

  const userLeaves = useMemo(
    () =>
      leafColumns(gridColumns).filter((column) => columnIdFromDef(column) !== SELECTION_COLUMN_ID),
    [gridColumns],
  );

  const columnIds = useMemo(
    () => userLeaves.flatMap((column) => columnIdFromDef(column) ?? []),
    [userLeaves],
  );

  const phoneHidden = useMemo(
    () =>
      Object.fromEntries(
        userLeaves.flatMap((column) => {
          const id = columnIdFromDef(column);

          return id !== undefined && column.meta?.hideOnPhone === true ? [[id, false]] : [];
        }),
      ),
    [userLeaves],
  );

  const filterOnly = useMemo(
    () =>
      Object.fromEntries(
        userLeaves.flatMap((column) => {
          const id = columnIdFromDef(column);

          return id !== undefined && column.meta?.filterOnly === true ? [[id, false]] : [];
        }),
      ),
    [userLeaves],
  );

  const filterOnlyIds = useMemo(() => new Set(Object.keys(filterOnly)), [filterOnly]);

  const nonHideableIds = useMemo(
    () =>
      new Set(
        userLeaves.flatMap((column) => {
          const id = columnIdFromDef(column);

          return id !== undefined &&
            column.enableHiding === false &&
            column.meta?.filterOnly !== true
            ? [id]
            : [];
        }),
      ),
    [userLeaves],
  );

  const initialPinned = useMemo(
    () => collectInitialPinned(userLeaves, selectionColumn !== null),
    [selectionColumn, userLeaves],
  );

  return {
    columnIds,
    filterOnly,
    filterOnlyIds,
    gridColumns,
    initialPinned,
    nonHideableIds,
    phoneHidden,
  };
};
