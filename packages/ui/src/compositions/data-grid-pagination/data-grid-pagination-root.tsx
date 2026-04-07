import { Button } from "@patternmode/ui/components/button";
import { SelectContent } from "@patternmode/ui/components/select/select-content";
import { SelectItem } from "@patternmode/ui/components/select/select-item";
import { Select } from "@patternmode/ui/components/select/select-root";
import { SelectTrigger } from "@patternmode/ui/components/select/select-trigger";
import { SelectValue } from "@patternmode/ui/components/select/select-value";
import { Skeleton } from "@patternmode/ui/components/skeleton";
import { useDataGrid } from "@patternmode/ui/compositions/data-grid";
import { cn } from "@patternmode/ui/utils/cn";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { ReactNode } from "react";

interface DataGridPaginationProps {
  /** CSS class name */
  className?: string;
  /** Ellipsis text */
  ellipsisText?: string;
  info?: string;
  /** Info skeleton */
  infoSkeleton?: ReactNode;
  more?: boolean;
  /** More limit */
  moreLimit?: number;
  /** Next page label */
  nextPageLabel?: string;
  /** Previous page label */
  previousPageLabel?: string;
  /** Rows per page label */
  rowsPerPageLabel?: string;
  /** Component size */
  sizes?: number[];
  /** Component size */
  sizesDescription?: string;
  /** Component size */
  sizesInfo?: string;
  /** Component size */
  sizesLabel?: string;
  /** Component size */
  sizesSkeleton?: ReactNode;
}

/**
 * DataGridPagination UI component.
 * Import from "@patternmode/ui/compositions/data-grid-pagination".
 */
function DataGridPagination(props: DataGridPaginationProps) {
  const { table, recordCount, isLoading } = useDataGrid();

  const defaultProps: Partial<DataGridPaginationProps> = {
    /** Component size */
    sizes: [5, 10, 25, 50, 100],
    /** Component size */
    sizesLabel: "Show",
    /** Component size */
    sizesDescription: "per page",
    /** Component size */
    sizesSkeleton: <Skeleton className="h-8 w-44" />,
    /** More limit */
    moreLimit: 5,
    more: false,
    info: "{from} - {to} of {count}",
    /** Info skeleton */
    infoSkeleton: <Skeleton className="h-8 w-60" />,
    /** Rows per page label */
    rowsPerPageLabel: "Rows per page",
    /** Previous page label */
    previousPageLabel: "Go to previous page",
    /** Next page label */
    nextPageLabel: "Go to next page",
    /** Ellipsis text */
    ellipsisText: "...",
  };

  const mergedProps: DataGridPaginationProps = { ...defaultProps, ...props };

  const btnBaseClasses = "size-7 p-0 text-sm";
  const btnArrowClasses = `${btnBaseClasses} rtl:transform rtl:rotate-180`;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const from = pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, recordCount);
  const pageCount = table.getPageCount();

  // Replace placeholders in paginationInfo
  const paginationInfo = mergedProps?.info
    ? mergedProps.info
        .replace("{from}", from.toString())
        .replace("{to}", to.toString())
        .replace("{count}", recordCount.toString())
    : `${from} - ${to} of ${recordCount}`;

  // Pagination limit logic
  const paginationMoreLimit = mergedProps?.moreLimit || 5;

  // Determine the start and end of the pagination group
  const currentGroupStart =
    Math.floor(pageIndex / paginationMoreLimit) * paginationMoreLimit;
  const currentGroupEnd = Math.min(
    currentGroupStart + paginationMoreLimit,
    pageCount,
  );

  // Render page buttons based on the current group
  const renderPageButtons = () => {
    const buttons: React.JSX.Element[] = [];
    for (let i = currentGroupStart; i < currentGroupEnd; i++) {
      buttons.push(
        <Button
          appearance="ghost"
          className={cn(btnBaseClasses, "text-muted-foreground", {
            "bg-accent text-accent-foreground": pageIndex === i,
          })}
          key={`page-${i + 1}`}
          onClick={() => {
            if (pageIndex !== i) {
              table.setPageIndex(i);
            }
          }}
          size="sm"
        >
          {i + 1}
        </Button>,
      );
    }
    return buttons;
  };

  // Render a "previous" ellipsis button if there are previous pages to show
  const renderEllipsisPrevButton = () => {
    if (currentGroupStart > 0) {
      return (
        <Button
          appearance="ghost"
          className={btnBaseClasses}
          onClick={() => table.setPageIndex(currentGroupStart - 1)}
          size="sm"
        >
          {mergedProps.ellipsisText}
        </Button>
      );
    }
    return null;
  };

  // Render a "next" ellipsis button if there are more pages to show after the current group
  const renderEllipsisNextButton = () => {
    if (currentGroupEnd < pageCount) {
      return (
        <Button
          appearance="ghost"
          className={btnBaseClasses}
          onClick={() => table.setPageIndex(currentGroupEnd)}
          size="sm"
        >
          {mergedProps.ellipsisText}
        </Button>
      );
    }
    return null;
  };

  return (
    <div
      className={cn(
        "flex grow flex-col flex-wrap items-center justify-between gap-2.5 py-2.5 sm:flex-row sm:py-0",
        mergedProps?.className,
      )}
      data-component="data-grid-pagination"
      data-slot="data-grid-pagination"
    >
      <div className="order-2 flex flex-wrap items-center space-x-2.5 pb-2.5 sm:order-1 sm:pb-0">
        {isLoading ? (
          mergedProps?.sizesSkeleton
        ) : (
          <>
            <div className="text-muted-foreground text-sm">
              {mergedProps.rowsPerPageLabel}
            </div>
            <Select
              onValueChange={(value) => {
                const newPageSize = Number(value);
                table.setPageSize(newPageSize);
              }}
              value={`${pageSize}`}
            >
              <SelectTrigger className="w-fit" size="sm">
                <SelectValue placeholder={`${pageSize}`} />
              </SelectTrigger>
              <SelectContent className="min-w-[50px]" side="top">
                {mergedProps?.sizes?.map((size: number) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
      </div>
      <div className="order-1 flex flex-col items-center justify-center gap-2.5 pt-2.5 sm:order-2 sm:flex-row sm:justify-end sm:pt-0">
        {isLoading ? (
          mergedProps?.infoSkeleton
        ) : (
          <>
            <div className="order-2 text-nowrap text-muted-foreground text-sm sm:order-1">
              {paginationInfo}
            </div>
            {pageCount > 1 && (
              <div className="order-1 flex items-center space-x-1 sm:order-2">
                <Button
                  appearance="ghost"
                  className={btnArrowClasses}
                  disabled={!table.getCanPreviousPage()}
                  icon={ChevronLeftIcon}
                  onClick={() => table.previousPage()}
                  size="icon-sm"
                >
                  <span className="sr-only">
                    {mergedProps.previousPageLabel}
                  </span>
                </Button>

                {renderEllipsisPrevButton()}

                {renderPageButtons()}

                {renderEllipsisNextButton()}

                <Button
                  appearance="ghost"
                  className={btnArrowClasses}
                  disabled={!table.getCanNextPage()}
                  icon={ChevronRightIcon}
                  onClick={() => table.nextPage()}
                  size="icon-sm"
                >
                  <span className="sr-only">{mergedProps.nextPageLabel}</span>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export { DataGridPagination, type DataGridPaginationProps };
