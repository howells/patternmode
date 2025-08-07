import { cx } from "@patternmode/ui/cx";

import React from "react";

type TableRootProps = React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.RefObject<HTMLDivElement | null>;
};

type TableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  ref?: React.RefObject<HTMLTableElement | null>;
};

type TableHeadProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.RefObject<HTMLTableSectionElement | null>;
};

type TableHeaderCellProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
  ref?: React.RefObject<HTMLTableCellElement | null>;
};

type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.RefObject<HTMLTableSectionElement | null>;
};

type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> & {
  ref?: React.RefObject<HTMLTableRowElement | null>;
};

type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
  ref?: React.RefObject<HTMLTableCellElement | null>;
};

type TableFootProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.RefObject<HTMLTableSectionElement | null>;
};

type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement> & {
  ref?: React.RefObject<HTMLTableCaptionElement | null>;
};

/**
 * Root container for table with responsive horizontal scrolling.
 */
const TableRoot = ({ ref: forwardedRef, className, children, ...props }: TableRootProps) => (
  <div
    ref={forwardedRef}
    // Activate if table is used in a float environment
    // className="flow-root"
  >
    <div
      // make table scrollable on mobile
      className={cx("w-full overflow-auto whitespace-nowrap", className)}
      {...props}
    >
      {children}
    </div>
  </div>
);

TableRoot.displayName = "TableRoot";

/**
 * Main table element with professional styling and dark mode support.
 */
const Table = ({ ref: forwardedRef, className, ...props }: TableProps) => (
  <table
    ref={forwardedRef}
    tremor-id="tremor-raw"
    className={cx(
      // base
      "w-full caption-bottom border-b",
      // border color
      " dark:border-zinc-800",
      className,
    )}
    data-testid="table"
    {...props}
  />
);

Table.displayName = "Table";

/**
 * Table header section container for column headers.
 */
const TableHead = ({ ref: forwardedRef, className, ...props }: TableHeadProps) => (
  <thead ref={forwardedRef} className={cx(className)} {...props} />
);

TableHead.displayName = "TableHead";

/**
 * Header cell for table columns with semibold styling.
 */
const TableHeaderCell = ({ ref: forwardedRef, className, ...props }: TableHeaderCellProps) => (
  <th
    ref={forwardedRef}
    className={cx(
      // base
      "border-b px-4 py-3.5 text-left text-sm font-semibold",
      // text color
      "text-zinc-900 dark:text-zinc-50",
      // border color
      " dark:border-zinc-800",
      className,
    )}
    {...props}
  />
);

TableHeaderCell.displayName = "TableHeaderCell";

/**
 * Table body section container with row dividers.
 */
const TableBody = ({ ref: forwardedRef, className, ...props }: TableBodyProps) => (
  <tbody
    ref={forwardedRef}
    className={cx(
      // base
      "divide-y",
      // divide color
      "divide-zinc-200 dark:divide-zinc-800",
      className,
    )}
    {...props}
  />
);

TableBody.displayName = "TableBody";

/**
 * Table row container with consistent cell padding.
 */
const TableRow = ({ ref: forwardedRef, className, ...props }: TableRowProps) => (
  <tr
    ref={forwardedRef}
    className={cx(
      "[&_td:last-child]:pr-4 [&_th:last-child]:pr-4",
      "[&_td:first-child]:pl-4 [&_th:first-child]:pl-4",
      className,
    )}
    {...props}
  />
);

TableRow.displayName = "TableRow";

/**
 * Individual data cell with muted text styling.
 */
const TableCell = ({ ref: forwardedRef, className, ...props }: TableCellProps) => (
  <td
    ref={forwardedRef}
    className={cx(
      // base
      "p-4 text-sm",
      // text color
      "text-zinc-600 dark:text-zinc-400",
      className,
    )}
    {...props}
  />
);

TableCell.displayName = "TableCell";

/**
 * Table footer section for summary rows or totals.
 */
const TableFoot = ({ ref: forwardedRef, className, ...props }: TableFootProps) => {
  return (
    <tfoot
      ref={forwardedRef}
      className={cx(
        // base
        "border-t text-left font-medium",
        // text color
        "text-zinc-900 dark:text-zinc-50",
        // border color
        " dark:border-zinc-800",
        className,
      )}
      {...props}
    />
  );
};

TableFoot.displayName = "TableFoot";

/**
 * Table caption for accessibility and context.
 */
const TableCaption = ({ ref: forwardedRef, className, ...props }: TableCaptionProps) => (
  <caption
    ref={forwardedRef}
    className={cx(
      // base
      "mt-3 px-3 text-center text-sm",
      // text color
      "text-zinc-500 dark:text-zinc-500",
      className,
    )}
    {...props}
  />
);

TableCaption.displayName = "TableCaption";

export {
  Table,
  TableBody,
  type TableBodyProps,
  TableCaption,
  type TableCaptionProps,
  TableCell,
  type TableCellProps,
  TableFoot,
  type TableFootProps,
  TableHead,
  TableHeaderCell,
  type TableHeaderCellProps,
  type TableHeadProps,
  type TableProps,
  TableRoot,
  type TableRootProps,
  TableRow,
  type TableRowProps,
};
