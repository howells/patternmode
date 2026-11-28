import type { RowData } from "@tanstack/react-table";

import type { DataGridTableInstance } from "./features";

/** Sorts by a column, replacing its own direction if already sorted or adding it after the rest. */
export const setColumnSort = <TData extends RowData>(
  table: DataGridTableInstance<TData>,
  id: string,
  desc: boolean,
) => {
  const { sorting } = table.state;
  const sort = { desc, id };

  table.setSorting(
    sorting.some((other) => other.id === id)
      ? sorting.map((other) => (other.id === id ? sort : other))
      : [...sorting, sort],
  );
};
