"use client";

import { Table as BaseTable } from "@base-ui-components/react/table";
import { cx } from "@patternmode/utils/cx";
import React from "react";

const Table = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof BaseTable.Root>) => (
  <BaseTable.Root className={cx("w-full caption-bottom text-sm", className)} {...props} />
);

const TableHeader = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof BaseTable.Header>) => (
  <BaseTable.Header className={cx("[&_tr]:border-b", className)} {...props} />
);

const TableBody = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof BaseTable.Body>) => (
  <BaseTable.Body className={cx("[&_tr:last-child]:border-0", className)} {...props} />
);

const TableFooter = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof BaseTable.Footer>) => (
  <BaseTable.Footer className={cx("bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800", className)} {...props} />
);

const TableRow = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof BaseTable.Row>) => (
  <BaseTable.Row className={cx("border-b transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50", className)} {...props} />
);

const TableHead = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof BaseTable.ColumnHeaderCell>) => (
  <BaseTable.ColumnHeaderCell className={cx("h-12 px-4 text-left align-middle font-medium text-zinc-500 dark:text-zinc-400", className)} {...props} />
);

const TableCell = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof BaseTable.Cell>) => (
  <BaseTable.Cell className={cx("p-4 align-middle", className)} {...props} />
);

const TableCaption = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof BaseTable.Caption>) => (
  <BaseTable.Caption className={cx("mt-4 text-sm text-zinc-500", className)} {...props} />
);

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };

