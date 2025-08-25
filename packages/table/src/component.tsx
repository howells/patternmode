"use client";

import { cx } from "@patternmode/utils/cx";
import type React from "react";

// Lightweight table primitives based on semantic HTML elements, inspired by Kibo UI

export const Table = ({ className, ...props }: React.ComponentPropsWithoutRef<"table">) => (
  <table
    data-testid="table"
    className={cx("w-full caption-bottom text-sm", className)}
    {...props}
  />
);

export const TableHeader = ({ className, ...props }: React.ComponentPropsWithoutRef<"thead">) => (
  <thead className={cx("[&_tr]:border-b", className)} {...props} />
);

export const TableBody = ({ className, ...props }: React.ComponentPropsWithoutRef<"tbody">) => (
  <tbody className={cx("[&_tr:last-child]:border-0", className)} {...props} />
);

export const TableFooter = ({ className, ...props }: React.ComponentPropsWithoutRef<"tfoot">) => (
  <tfoot className={cx("bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800", className)} {...props} />
);

export const TableRow = ({ className, ...props }: React.ComponentPropsWithoutRef<"tr">) => (
  <tr className={cx("border-b transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50", className)} {...props} />
);

export const TableHead = ({ className, ...props }: React.ComponentPropsWithoutRef<"th">) => (
  <th className={cx("h-12 px-4 text-left align-middle font-medium text-zinc-500 dark:text-zinc-400", className)} {...props} />
);

export const TableCell = ({ className, ...props }: React.ComponentPropsWithoutRef<"td">) => (
  <td className={cx("p-4 align-middle", className)} {...props} />
);

export const TableCaption = ({ className, ...props }: React.ComponentPropsWithoutRef<"caption">) => (
  <caption className={cx("mt-4 text-sm text-zinc-500", className)} {...props} />
);
