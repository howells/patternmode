// Tremor Table [v1.0.0]

import React from "react";

import { cx } from "../../lib/utils";

/**
 * Root container for tables with responsive overflow handling.
 *
 * Provides a responsive wrapper that enables horizontal scrolling on smaller
 * screens while maintaining proper table layout. Essential for tables with
 * many columns or wide content that may overflow container bounds.
 *
 *
 * @id table
 * @name Table
 * @example
 * ```tsx
 * <TableRoot>
 *   <Table>
 *     <TableHead>
 *       <TableRow>
 *         <TableHeaderCell>Name</TableHeaderCell>
 *         <TableHeaderCell>Email</TableHeaderCell>
 *       </TableRow>
 *     </TableHead>
 *     <TableBody>
 *       <TableRow>
 *         <TableCell>John Doe</TableCell>
 *         <TableCell>john@example.com</TableCell>
 *       </TableRow>
 *     </TableBody>
 *   </Table>
 * </TableRoot>
 * ```
 */
/**
 * A data table component for displaying tabular data with headers and rows.
 *
 * @id table
 * @name Table
 * @component
 */
const TableRoot = ({ ref: forwardedRef, className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) => (
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
 * Main table element with Tremor-inspired styling.
 *
 * Provides a clean, professional table design with proper border styling
 * and dark mode support. Features consistent spacing and typography that
 * integrates seamlessly with other Tremor components.
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableHead>
 *     <TableRow>
 *       <TableHeaderCell>Product</TableHeaderCell>
 *       <TableHeaderCell>Price</TableHeaderCell>
 *       <TableHeaderCell>Status</TableHeaderCell>
 *     </TableRow>
 *   </TableHead>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>Widget</TableCell>
 *       <TableCell>$29.99</TableCell>
 *       <TableCell>Available</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
const Table = ({ ref: forwardedRef, className, ...props }: React.TableHTMLAttributes<HTMLTableElement> & { ref?: React.RefObject<HTMLTableElement | null> }) => (
    <table
      ref={forwardedRef}
      tremor-id="tremor-raw"
      className={cx(
      // base
        "w-full caption-bottom border-b",
        // border color
        "border-zinc-200 dark:border-zinc-800",
        className,
      )}
      {...props}
    />
  );

Table.displayName = "Table";

/**
 * Table header section container.
 *
 * Semantic container for table header rows and cells. Provides proper
 * accessibility structure and allows for consistent styling of header content.
 *
 * @example
 * ```tsx
 * <TableHead>
 *   <TableRow>
 *     <TableHeaderCell>Column 1</TableHeaderCell>
 *     <TableHeaderCell>Column 2</TableHeaderCell>
 *   </TableRow>
 * </TableHead>
 * ```
 */
const TableHead = ({ ref: forwardedRef, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement> & { ref?: React.RefObject<HTMLTableSectionElement | null> }) => (
    <thead ref={forwardedRef} className={cx(className)} {...props} />
  );

TableHead.displayName = "TableHead";

/**
 * Individual header cell for table columns.
 *
 * Styled table header cell with semibold text and proper spacing.
 * Features bottom border separation and supports sorting indicators
 * and other interactive header content.
 *
 * @example
 * ```tsx
 * <TableHeaderCell>Product Name</TableHeaderCell>
 * <TableHeaderCell>Price</TableHeaderCell>
 * <TableHeaderCell className="text-right">Actions</TableHeaderCell>
 * ```
 */
const TableHeaderCell = ({ ref: forwardedRef, className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement> & { ref?: React.RefObject<HTMLTableCellElement | null> }) => (
    <th
      ref={forwardedRef}
      className={cx(
      // base
        "border-b px-4 py-3.5 text-left text-sm font-semibold",
        // text color
        "text-zinc-900 dark:text-zinc-50",
        // border color
        "border-zinc-200 dark:border-zinc-800",
        className,
      )}
      {...props}
    />
  );

TableHeaderCell.displayName = "TableHeaderCell";

/**
 * Table body section container with row dividers.
 *
 * Semantic container for table data rows with visual separation between rows.
 * Provides consistent spacing and divider styling that maintains readability
 * across different data densities.
 *
 * @example
 * ```tsx
 * <TableBody>
 *   <TableRow>
 *     <TableCell>Data 1</TableCell>
 *     <TableCell>Data 2</TableCell>
 *   </TableRow>
 *   <TableRow>
 *     <TableCell>Data 3</TableCell>
 *     <TableCell>Data 4</TableCell>
 *   </TableRow>
 * </TableBody>
 * ```
 */
const TableBody = ({ ref: forwardedRef, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement> & { ref?: React.RefObject<HTMLTableSectionElement | null> }) => (
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
 *
 * Provides proper horizontal padding for first and last cells to maintain
 * consistent table spacing. Supports hover states and selection styling
 * for interactive table rows.
 *
 * @example
 * ```tsx
 * <TableRow>
 *   <TableCell>John Doe</TableCell>
 *   <TableCell>john@example.com</TableCell>
 *   <TableCell>Admin</TableCell>
 * </TableRow>
 *
 * // With hover styling
 * <TableRow className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
 *   <TableCell>Jane Smith</TableCell>
 *   <TableCell>jane@example.com</TableCell>
 *   <TableCell>User</TableCell>
 * </TableRow>
 * ```
 */
const TableRow = ({ ref: forwardedRef, className, ...props }: React.HTMLAttributes<HTMLTableRowElement> & { ref?: React.RefObject<HTMLTableRowElement | null> }) => (
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
 * Individual data cell within table rows.
 *
 * Standard table cell with consistent padding and muted text coloring.
 * Supports various content types including text, numbers, badges, buttons,
 * and other interactive elements.
 *
 * @example
 * ```tsx
 * <TableCell>Regular text content</TableCell>
 * <TableCell className="font-mono">CODE123</TableCell>
 * <TableCell className="text-right">$99.99</TableCell>
 * <TableCell>
 *   <Badge variant="success">Active</Badge>
 * </TableCell>
 * ```
 */
const TableCell = ({ ref: forwardedRef, className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement> & { ref?: React.RefObject<HTMLTableCellElement | null> }) => (
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
 *
 * Semantic container for table footer content with top border separation.
 * Typically used for summary data, totals, or additional table metadata.
 * Features medium font weight to distinguish from regular table data.
 *
 * @example
 * ```tsx
 * <TableFoot>
 *   <TableRow>
 *     <TableCell className="font-semibold">Total</TableCell>
 *     <TableCell className="font-semibold">$1,234.56</TableCell>
 *     <TableCell></TableCell>
 *   </TableRow>
 * </TableFoot>
 * ```
 */
const TableFoot = ({ ref: forwardedRef, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement> & { ref?: React.RefObject<HTMLTableSectionElement | null> }) => {
    return (
      <tfoot
        ref={forwardedRef}
        className={cx(
        // base
          "border-t text-left font-medium",
          // text color
          "text-zinc-900 dark:text-zinc-50",
          // border color
          "border-zinc-200 dark:border-zinc-800",
          className,
        )}
        {...props}
      />
    );
  };

TableFoot.displayName = "TableFoot";

/**
 * Table caption for accessibility and context.
 *
 * Provides semantic description of table content for screen readers and
 * visual context for users. Positioned below the table with muted styling
 * to provide helpful information without overwhelming the main content.
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableCaption>
 *     User management data as of {new Date().toLocaleDateString()}
 *   </TableCaption>
 *   <TableHead>
 *     <TableRow>
 *       <TableHeaderCell>Name</TableHeaderCell>
 *       <TableHeaderCell>Role</TableHeaderCell>
 *     </TableRow>
 *   </TableHead>
 * </Table>
 * ```
 */
const TableCaption = ({ ref: forwardedRef, className, ...props }: React.HTMLAttributes<HTMLTableCaptionElement> & { ref?: React.RefObject<HTMLTableCaptionElement | null> }) => (
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
    TableCaption,
    TableCell,
    TableFoot,
    TableHead,
    TableHeaderCell,
    TableRoot,
    TableRow
};
