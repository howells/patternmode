"use client";
"use no memo";

import { ToolbarControl } from "@patternmode/filters";
import { flexRender } from "@tanstack/react-table";
import type { RowData } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ChevronRight, RotateCcw } from "lucide-react";
import type { MouseEvent, ReactNode, RefObject } from "react";
import { useId } from "react";

import { getCellProps } from "./cell-props";
import type { DataGridColumn, DataGridRow } from "./features";
import { SELECTION_COLUMN_ID } from "./selection-column";
import type { DataGridSectionRender } from "./types";

const isModifiedClick = (event: MouseEvent<HTMLAnchorElement>): boolean =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

const SectionRow = <TData extends RowData>({
  heading,
  row,
  rowIndex,
  span,
}: {
  heading: ReactNode;
  row: DataGridRow<TData>;
  rowIndex?: number | undefined;
  span: number;
}) => {
  const headingId = useId();
  const folds = row.getCanExpand();
  const expanded = row.getIsExpanded();

  return (
    <tr
      aria-rowindex={rowIndex}
      className="patternmode-datagrid__section-row"
      data-depth={row.depth}
    >
      <td className="patternmode-datagrid__section-cell" colSpan={span}>
        <div className="patternmode-datagrid__section-inner">
          {folds ? (
            <button
              aria-expanded={expanded}
              aria-labelledby={headingId}
              className="patternmode-datagrid__fold-btn"
              onClick={row.getToggleExpandedHandler()}
              type="button"
            >
              <ChevronRight
                aria-hidden="true"
                className="patternmode-datagrid__fold-icon"
                data-expanded={expanded ? "" : undefined}
              />
            </button>
          ) : null}
          <span className="patternmode-datagrid__section-heading" id={headingId}>
            {heading}
          </span>
        </div>
      </td>
    </tr>
  );
};

const DataRow = <TData extends RowData>({
  fixed,
  href,
  onNavigate,
  row,
  rowIndex,
}: {
  fixed: boolean;
  href: string | null | undefined;
  onNavigate?: ((href: string) => void) | undefined;
  row: DataGridRow<TData>;
  rowIndex?: number | undefined;
}) => {
  const opens = href !== undefined && href !== null && href !== "";
  const cells = row.getVisibleCells();
  const linkCellIndex = opens
    ? cells.findIndex((cell) => cell.column.id !== SELECTION_COLUMN_ID)
    : -1;
  const selected = row.getIsSelected();

  return (
    <tr
      aria-rowindex={rowIndex}
      aria-selected={row.getCanSelect() ? selected : undefined}
      className="patternmode-datagrid__row"
      data-clickable={opens ? "" : undefined}
      data-selected={selected ? "" : undefined}
    >
      {cells.map((cell, cellIndex) => {
        const content = flexRender(cell.column.columnDef.cell, cell.getContext());
        const isLinkCell = opens && cellIndex === linkCellIndex;

        return (
          <td
            className="patternmode-datagrid__td"
            data-link-cell={isLinkCell ? "" : undefined}
            key={cell.id}
            {...getCellProps(cell.column, fixed)}
          >
            {isLinkCell ? (
              <a
                className="patternmode-datagrid__row-link"
                href={href}
                onClick={
                  onNavigate === undefined
                    ? undefined
                    : (event) => {
                        if (!isModifiedClick(event)) {
                          event.preventDefault();
                          onNavigate(href);
                        }
                      }
                }
              >
                {content}
              </a>
            ) : (
              content
            )}
          </td>
        );
      })}
    </tr>
  );
};

const SkeletonRows = <TData extends RowData>({
  columns,
  count,
  fixed,
}: {
  columns: readonly DataGridColumn<TData>[];
  count: number;
  fixed: boolean;
}) => (
  <>
    {Array.from({ length: count }, (_, rowIdx) => (
      <tr aria-hidden="true" className="patternmode-datagrid__row" key={`skeleton-${rowIdx}`}>
        {columns.map((column, colIdx) => (
          <td className="patternmode-datagrid__td" key={column.id} {...getCellProps(column, fixed)}>
            <span className="patternmode-datagrid__skeleton" data-variant={(rowIdx + colIdx) % 3} />
          </td>
        ))}
      </tr>
    ))}
  </>
);

const StatusRow = ({ children, span }: { children: ReactNode; span: number }) => (
  <tr className="patternmode-datagrid__status-row">
    <td className="patternmode-datagrid__status-cell" colSpan={Math.max(1, span)}>
      <div className="patternmode-datagrid__status-inner">{children}</div>
    </td>
  </tr>
);

const SpacerRow = ({ height, span }: { height: number; span: number }) => (
  <tr aria-hidden="true" className="patternmode-datagrid__spacer">
    <td aria-hidden="true" colSpan={span} style={{ height: `${height}px`, padding: 0 }}>
      <span className="patternmode-datagrid-sr-only">Spacer</span>
    </td>
  </tr>
);

const VirtualizedRows = <TData extends RowData>({
  estimateRowHeight,
  fixed,
  getRowHref,
  onNavigate,
  rows,
  scrollRef,
  sectionOf,
  span,
}: {
  estimateRowHeight: number;
  fixed: boolean;
  getRowHref?: ((row: TData) => string | null | undefined) | undefined;
  onNavigate?: ((href: string) => void) | undefined;
  rows: readonly DataGridRow<TData>[];
  scrollRef: RefObject<HTMLDivElement | null>;
  sectionOf?: DataGridSectionRender<TData> | undefined;
  span: number;
}) => {
  // oxlint-disable-next-line react/incompatible-library -- file uses "use no memo" to opt out of React Compiler for TanStack Virtual
  const virtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => estimateRowHeight,
    getScrollElement: () => scrollRef.current,
    overscan: 10,
  });

  const items = virtualizer.getVirtualItems();
  const topPadding = items.length > 0 ? (items[0]?.start ?? 0) : 0;
  const bottomPadding =
    items.length > 0 ? Math.max(0, virtualizer.getTotalSize() - (items.at(-1)?.end ?? 0)) : 0;

  return (
    <>
      {topPadding > 0 ? <SpacerRow height={topPadding} span={span} /> : null}
      {items.map((virtualRow) => {
        const row = rows[virtualRow.index];

        if (row === undefined) {
          return null;
        }

        const heading = sectionOf?.(row.original, row.depth) ?? null;
        const rowIndex = virtualRow.index + 2;

        return heading === null ? (
          <DataRow
            fixed={fixed}
            href={getRowHref?.(row.original)}
            key={row.id}
            onNavigate={onNavigate}
            row={row}
            rowIndex={rowIndex}
          />
        ) : (
          <SectionRow heading={heading} key={row.id} row={row} rowIndex={rowIndex} span={span} />
        );
      })}
      {bottomPadding > 0 ? <SpacerRow height={bottomPadding} span={span} /> : null}
    </>
  );
};

const renderEmptyOrError = ({
  emptyDataMessage,
  emptyMessage,
  error,
  hasActiveFilters,
  onClearFilters,
  onRetry,
  span,
}: {
  emptyDataMessage: ReactNode;
  emptyMessage: ReactNode;
  error: ReactNode;
  hasActiveFilters: boolean;
  onClearFilters?: (() => void) | undefined;
  onRetry?: (() => void) | undefined;
  span: number;
}): ReactNode => {
  if (error !== undefined && error !== null && error !== false) {
    return (
      <StatusRow span={span}>
        <div className="patternmode-datagrid__error-text">{error}</div>
        {onRetry === undefined ? null : (
          <ToolbarControl onClick={onRetry}>
            <RotateCcw aria-hidden="true" className="patternmode-datagrid-icon" />
            Try again
          </ToolbarControl>
        )}
      </StatusRow>
    );
  }

  return (
    <StatusRow span={span}>
      <div className="patternmode-datagrid__empty-text">
        {hasActiveFilters ? emptyMessage : emptyDataMessage}
      </div>
      {hasActiveFilters && onClearFilters !== undefined ? (
        <ToolbarControl onClick={onClearFilters}>Clear filters</ToolbarControl>
      ) : null}
    </StatusRow>
  );
};

export interface DataGridBodyProps<TData extends RowData> {
  columns: readonly DataGridColumn<TData>[];
  emptyDataMessage?: ReactNode | undefined;
  emptyMessage?: ReactNode | undefined;
  error?: ReactNode | undefined;
  estimateRowHeight?: number | undefined;
  fixed: boolean;
  getRowHref?: ((row: TData) => string | null | undefined) | undefined;
  hasActiveFilters?: boolean | undefined;
  loading?: boolean | undefined;
  onClearFilters?: (() => void) | undefined;
  onNavigate?: ((href: string) => void) | undefined;
  onRetry?: (() => void) | undefined;
  rows: readonly DataGridRow<TData>[];
  scrollRef?: RefObject<HTMLDivElement | null> | undefined;
  sectionOf?: DataGridSectionRender<TData> | undefined;
  skeletonRows?: number | undefined;
  span: number;
  virtualize?: boolean | undefined;
}

const PlainRows = <TData extends RowData>({
  fixed,
  getRowHref,
  onNavigate,
  rows,
  sectionOf,
  span,
}: {
  fixed: boolean;
  getRowHref?: ((row: TData) => string | null | undefined) | undefined;
  onNavigate?: ((href: string) => void) | undefined;
  rows: readonly DataGridRow<TData>[];
  sectionOf?: DataGridSectionRender<TData> | undefined;
  span: number;
}) => (
  <>
    {rows.map((row) => {
      const heading = sectionOf?.(row.original, row.depth) ?? null;

      return heading === null ? (
        <DataRow
          fixed={fixed}
          href={getRowHref?.(row.original)}
          key={row.id}
          onNavigate={onNavigate}
          row={row}
        />
      ) : (
        <SectionRow heading={heading} key={row.id} row={row} span={span} />
      );
    })}
  </>
);

const isErrorPresent = (error: ReactNode): boolean =>
  error !== undefined && error !== null && error !== false;

/**
 * The table body: loading skeletons, error/retry, empty states (keeping headers
 * mounted), flat or section/tree rows, and optional `@tanstack/react-virtual`
 * row virtualisation.
 */
export const DataGridBody = <TData extends RowData>(props: DataGridBodyProps<TData>) => {
  const {
    columns,
    emptyDataMessage = "No rows yet",
    emptyMessage = "No matching rows",
    error,
    estimateRowHeight = 41,
    fixed,
    getRowHref,
    hasActiveFilters = false,
    loading = false,
    onClearFilters,
    onNavigate,
    onRetry,
    rows,
    scrollRef,
    sectionOf,
    skeletonRows = 8,
    span,
    virtualize = false,
  } = props;

  if (loading && rows.length === 0) {
    return (
      <tbody className="patternmode-datagrid__tbody">
        <SkeletonRows columns={columns} count={skeletonRows} fixed={fixed} />
      </tbody>
    );
  }

  if (isErrorPresent(error) || rows.length === 0) {
    return (
      <tbody className="patternmode-datagrid__tbody">
        {renderEmptyOrError({
          emptyDataMessage,
          emptyMessage,
          error,
          hasActiveFilters,
          onClearFilters,
          onRetry,
          span,
        })}
      </tbody>
    );
  }

  return (
    <tbody className="patternmode-datagrid__tbody">
      {virtualize && scrollRef !== undefined ? (
        <VirtualizedRows
          estimateRowHeight={estimateRowHeight}
          fixed={fixed}
          getRowHref={getRowHref}
          onNavigate={onNavigate}
          rows={rows}
          scrollRef={scrollRef}
          sectionOf={sectionOf}
          span={span}
        />
      ) : (
        <PlainRows
          fixed={fixed}
          getRowHref={getRowHref}
          onNavigate={onNavigate}
          rows={rows}
          sectionOf={sectionOf}
          span={span}
        />
      )}
    </tbody>
  );
};
