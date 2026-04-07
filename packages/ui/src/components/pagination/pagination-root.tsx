import { cn } from "@patternmode/ui/utils/cn";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { ComponentSize } from "../../lib/size";
import { Button } from "../button";
import { getPageRange } from "./pagination-utils";

interface PaginationProps {
  /** Additional className for the nav wrapper */
  className?: string;
  /** Disable all controls */
  disabled?: boolean;
  /** Page button to render in loading state */
  loadingPage?: number;
  /** Called when page changes */
  onPageChange: (page: number) => void;
  /** Current page (1-indexed) */
  page: number;
  /** Button size (default: "sm") */
  size?: Extract<ComponentSize, "xs" | "sm" | "base">;
  /** Total number of pages */
  totalPages: number;
}

/**
 * Standalone pagination component.
 * Works with any data source — not coupled to react-table.
 *
 * @example
 * ```tsx
 * <Pagination page={2} totalPages={13} onPageChange={setPage} />
 * ```
 */
function Pagination({
  page,
  totalPages,
  onPageChange,
  loadingPage,
  size = "sm",
  disabled = false,
  className,
}: PaginationProps) {
  const pages = getPageRange(page, totalPages);
  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;

  let ellipsisCount = 0;
  const pageElements = pages.map((item) => {
    if (item === "ellipsis") {
      ellipsisCount += 1;
      return (
        <span
          aria-hidden="true"
          className="flex min-w-8 items-center justify-center text-muted-foreground text-sm"
          key={`ellipsis-${ellipsisCount}`}
        >
          &hellip;
        </span>
      );
    }

    const isActive = item === page;
    const isLoadingPage = item === loadingPage;
    return (
      <Button
        appearance={isActive ? "input" : undefined}
        aria-current={isActive ? "page" : undefined}
        aria-label={`Go to page ${item}`}
        disabled={disabled}
        key={item}
        loading={isLoadingPage}
        onClick={() => onPageChange(item)}
        size={size}
        variant="ghost"
      >
        {item}
      </Button>
    );
  });

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-between", className)}
      data-component="pagination"
      data-slot="pagination"
    >
      <Button
        aria-label="Go to previous page"
        disabled={disabled || isFirstPage}
        icon={ChevronLeftIcon}
        onClick={() => onPageChange(page - 1)}
        size={size}
        variant="ghost"
      >
        Previous
      </Button>

      <div className="flex items-center gap-0.5">{pageElements}</div>

      <Button
        aria-label="Go to next page"
        disabled={disabled || isLastPage}
        onClick={() => onPageChange(page + 1)}
        size={size}
        suffixIcon={ChevronRightIcon}
        variant="ghost"
      >
        Next
      </Button>
    </nav>
  );
}

export { Pagination, type PaginationProps };
