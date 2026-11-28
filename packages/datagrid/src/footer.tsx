"use client";
"use no memo";

import { flexRender } from "@tanstack/react-table";
import type { RowData } from "@tanstack/react-table";

import { getCellProps } from "./cell-props";
import type { DataGridTableInstance } from "./features";

export interface DataGridFooterProps<TData extends RowData> {
  fixed?: boolean | undefined;
  table: DataGridTableInstance<TData>;
}

/** Sticky bottom row of footers under the columns: totals, scores, counts. */
export const DataGridFooter = <TData extends RowData>({
  fixed = false,
  table,
}: DataGridFooterProps<TData>) => {
  const leaves = table.getFooterGroups().at(0);

  if (leaves === undefined) {
    return null;
  }

  return (
    <tfoot className="patternmode-datagrid__tfoot">
      <tr className="patternmode-datagrid__footer-row">
        {leaves.headers.map((footer) => (
          <td
            className="patternmode-datagrid__tf"
            key={footer.id}
            {...getCellProps(footer.column, fixed)}
          >
            {footer.isPlaceholder
              ? null
              : flexRender(footer.column.columnDef.footer, footer.getContext())}
          </td>
        ))}
      </tr>
    </tfoot>
  );
};
