"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

/**
 * Table UI component.
 * Import from "@patternmode/ui/components/table".
 */
function Table({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div
      className="relative w-full overflow-auto"
      data-component="table-wrapper"
      data-slot="table-wrapper"
    >
      <table
        className={cn(
          "w-full caption-bottom text-foreground text-sm",
          className,
        )}
        data-component="table"
        data-slot="table"
        {...props}
      />
    </div>
  );
}
/** table header section */

function TableHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn("[&_tr]:border-b", className)}
      data-component="table-header"
      data-slot="table-header"
      {...props}
    />
  );
}

/**
 * TableBody UI component.
 * Import from "@patternmode/ui/components/table".
 */
function TableBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={cn("[&_tr:last-child]:border-0", className)}
      data-component="table-body"
      data-slot="table-body"
      {...props}
    />
  );
}

/**
 * TableFooter UI component.
 * Import from "@patternmode/ui/components/table".
 */
function TableFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tfoot
      className={cn(
        "border-t bg-muted/50 font-medium last:[&>tr]:border-b-0",
        className,
      )}
      data-component="table-footer"
      data-slot="table-footer"
      {...props}
    />
  );
}

/**
 * TableRow UI component.
 * Import from "@patternmode/ui/components/table".
 */
function TableRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "border-b transition-colors data-[state=selected]:bg-muted [&:has(td):hover]:bg-muted/50",
        className,
      )}
      data-component="table-row"
      data-slot="table-row"
      {...props}
    />
  );
}

/**
 * TableHead UI component.
 * Import from "@patternmode/ui/components/table".
 */
function TableHead({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "h-12 px-4 text-left align-middle font-normal text-muted-foreground rtl:text-right [&:has([role=checkbox])]:pe-0",
        className,
      )}
      data-component="table-head"
      data-slot="table-head"
      {...props}
    />
  );
}

/**
 * TableCell UI component.
 * Import from "@patternmode/ui/components/table".
 */
function TableCell({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn(
        "p-4 align-middle [&:has([role=checkbox])]:pe-0",
        className,
      )}
      data-component="table-cell"
      data-slot="table-cell"
      {...props}
    />
  );
}

/**
 * TableCaption UI component.
 * Import from "@patternmode/ui/components/table".
 */
function TableCaption({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return (
    <caption
      className={cn("mt-4 text-muted-foreground text-sm", className)}
      data-component="table-caption"
      data-slot="table-caption"
      {...props}
    />
  );
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
