"use client";
"use no memo";

import { Menu } from "@base-ui/react/menu";
import { PageRange, ToolbarControl, ToolbarPages } from "@patternmode/filters";
import type { RowData } from "@tanstack/react-table";
import { Check, ChevronDown } from "lucide-react";

import type { DataGridTableInstance } from "./features";
import { DEFAULT_PAGE_SIZES } from "./state";

export interface DataGridPagingProps<TData extends RowData> {
  /** Whether the table renders hierarchical tree rows (counts root rows per page). */
  isTree?: boolean | undefined;
  /** Rows-per-page choices shown in the menu. */
  pageSizes?: readonly number[] | undefined;
  table: DataGridTableInstance<TData>;
}

/**
 * The rows on show, "1–25 of 312", which also sets rows per page, then previous
 * and next page controls. Handles server `rowCount` and tree root counting.
 */
export const DataGridPaging = <TData extends RowData>({
  isTree = false,
  pageSizes = DEFAULT_PAGE_SIZES,
  table,
}: DataGridPagingProps<TData>) => {
  const total = table.getRowCount();
  const { pageIndex, pageSize } = table.state.pagination;
  const { rows } = table.getRowModel();
  const pageItemCount = isTree ? rows.filter((row) => row.depth === 0).length : rows.length;
  const start = pageItemCount === 0 ? 0 : pageIndex * pageSize + 1;

  return (
    <ToolbarPages
      next={
        table.getCanNextPage()
          ? {
              onClick: () => {
                table.nextPage();
              },
            }
          : null
      }
      previous={
        table.getCanPreviousPage()
          ? {
              onClick: () => {
                table.previousPage();
              },
            }
          : null
      }
      range={
        <Menu.Root>
          <Menu.Trigger render={<ToolbarControl className="tabular-nums" />}>
            <PageRange count={pageItemCount} start={start} total={total} />
            <ChevronDown aria-hidden="true" className="patternmode-datagrid-icon-xs" />
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner align="end" className="patternmode-datagrid-positioner" sideOffset={4}>
              <Menu.Popup className="patternmode-datagrid-menu">
                <Menu.Group>
                  <Menu.GroupLabel className="patternmode-datagrid-menu__label">
                    Rows per page
                  </Menu.GroupLabel>
                  <Menu.RadioGroup
                    onValueChange={(value) => {
                      table.setPageSize(Number(value));
                    }}
                    value={String(pageSize)}
                  >
                    {pageSizes.map((size) => (
                      <Menu.RadioItem
                        className="patternmode-datagrid-menu__item"
                        key={size}
                        value={String(size)}
                      >
                        <span className="patternmode-datagrid-menu__indicator">
                          <Menu.RadioItemIndicator>
                            <Check aria-hidden="true" className="patternmode-datagrid-icon-xs" />
                          </Menu.RadioItemIndicator>
                        </span>
                        {size}
                      </Menu.RadioItem>
                    ))}
                  </Menu.RadioGroup>
                </Menu.Group>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      }
    />
  );
};
