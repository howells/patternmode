import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative w-full overflow-auto" data-slot="table-wrapper">
        <table
          className={cn(
            "w-full caption-bottom text-body text-foreground",
            className
          )}
          data-slot="table"
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Table.displayName = "Table";

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return (
    <thead
      className={cn("[&_tr]:border-border/80 [&_tr]:border-b", className)}
      data-slot="table-header"
      ref={ref}
      {...props}
    />
  );
});

TableHeader.displayName = "TableHeader";

const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return (
    <tbody
      className={cn("[&_tr:last-child]:border-0", className)}
      data-slot="table-body"
      ref={ref}
      {...props}
    />
  );
});

TableBody.displayName = "TableBody";

const TableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return (
    <tfoot
      className={cn(
        "border-border/80 border-t bg-secondary/40 font-medium",
        className
      )}
      data-slot="table-footer"
      ref={ref}
      {...props}
    />
  );
});

TableFooter.displayName = "TableFooter";

const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => {
  return (
    <tr
      className={cn(
        "border-border/80 border-b transition-colors [&:has(td)]:hover:bg-secondary/35",
        className
      )}
      data-slot="table-row"
      ref={ref}
      {...props}
    />
  );
});

TableRow.displayName = "TableRow";

const TableHead = forwardRef<
  HTMLTableCellElement,
  HTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  return (
    <th
      className={cn(
        "h-11 px-4 text-left align-middle font-medium text-[0.85rem] text-muted-foreground uppercase tracking-[0.08em]",
        className
      )}
      data-slot="table-head"
      ref={ref}
      {...props}
    />
  );
});

TableHead.displayName = "TableHead";

const TableCell = forwardRef<
  HTMLTableCellElement,
  HTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  return (
    <td
      className={cn("px-4 py-3 align-middle", className)}
      data-slot="table-cell"
      ref={ref}
      {...props}
    />
  );
});

TableCell.displayName = "TableCell";

const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => {
  return (
    <caption
      className={cn("mt-4 text-body text-muted-foreground", className)}
      data-slot="table-caption"
      ref={ref}
      {...props}
    />
  );
});

TableCaption.displayName = "TableCaption";

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
