import type { RowData } from "@tanstack/react-table";

import type { DataGridColumn } from "./features";
import { parsePxWidth } from "./state";

const resolveWidth = <TData extends RowData>(
  column: DataGridColumn<TData>,
  fixed: boolean,
): string | undefined => {
  const { meta } = column.columnDef;
  const hasNumericSize =
    fixed || column.columnDef.size !== undefined || parsePxWidth(meta?.width) !== undefined;

  if (hasNumericSize) {
    return `${column.getSize()}px`;
  }

  // oxlint-disable-next-line anti-slop/no-runtime-typeof -- supports non-px CSS width strings like "20%" when unfixed
  return typeof meta?.width === "string" ? meta.width : undefined;
};

const resolveMinWidth = <TData extends RowData>(
  column: DataGridColumn<TData>,
): number | string | undefined => {
  if (column.columnDef.minSize === undefined) {
    return column.columnDef.meta?.minWidth;
  }

  return `${column.columnDef.minSize}px`;
};

const resolvePinAttribute = (pinned: false | "end" | "start"): "end" | "start" | undefined =>
  pinned === false ? undefined : pinned;

/**
 * A cell's alignment, tint, pinning and width from its column, for header,
 * body, or footer cells. Uses TanStack's `column.getSize()` / `getStart()` /
 * `getAfter()` as the single authoritative sizing & sticky-offset model.
 */
export const getCellProps = <TData extends RowData>(
  column: DataGridColumn<TData>,
  fixed = false,
) => {
  const { meta } = column.columnDef;
  const pinned = column.getIsPinned();
  const isStart = pinned === "start";
  const isEnd = pinned === "end";

  return {
    "data-align": meta?.align,
    "data-fill": meta?.fill === true ? "" : undefined,
    "data-highlight": meta?.highlight === true ? "" : undefined,
    "data-pinned": resolvePinAttribute(pinned),
    "data-pinned-first": isEnd && column.getIsFirstColumn("end") ? "" : undefined,
    "data-pinned-last": isStart && column.getIsLastColumn("start") ? "" : undefined,
    style: {
      left: isStart ? `${column.getStart("start")}px` : undefined,
      minWidth: resolveMinWidth(column),
      right: isEnd ? `${column.getAfter("end")}px` : undefined,
      width: resolveWidth(column, fixed),
    },
  };
};

/** The header's `aria-sort` for the primary sorted column only (ARIA spec). */
export const ariaSortFor = (
  dir: false | "asc" | "desc",
  sortIndex: number,
): "ascending" | "descending" | undefined => {
  if (sortIndex !== 0) {
    return undefined;
  }

  if (dir === "asc") {
    return "ascending";
  }

  if (dir === "desc") {
    return "descending";
  }

  return undefined;
};
