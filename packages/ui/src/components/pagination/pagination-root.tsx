import type { ComponentSize } from "../../lib/size";
import { cn } from "../../utils/cn";
import { Button } from "../button";
import { getPageRange } from "./pagination-utils";

function ChevronLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-full"
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m10 4-4 4 4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-full"
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m6 4 4 4-4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export interface PaginationProps {
  className?: string;
  disabled?: boolean;
  onPageChange: (page: number) => void;
  page: number;
  size?: ComponentSize;
  totalPages: number;
}

function Pagination({
  className,
  disabled = false,
  onPageChange,
  page,
  size = "sm",
  totalPages,
}: PaginationProps) {
  const currentPage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
  const pageRange = getPageRange(currentPage, totalPages);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  let ellipsisCount = 0;

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "flex flex-wrap items-center justify-between gap-3",
        className
      )}
      data-slot="pagination"
    >
      <Button
        disabled={disabled || isFirstPage}
        onClick={() => onPageChange(currentPage - 1)}
        size={size}
        type="button"
        variant="ghost"
      >
        <span className="size-4">
          <ChevronLeftIcon />
        </span>
        Previous
      </Button>

      <div className="flex flex-wrap items-center justify-center gap-1">
        {pageRange.map((item) => {
          if (item === "ellipsis") {
            ellipsisCount += 1;

            return (
              <span
                aria-hidden="true"
                className="flex min-w-8 items-center justify-center px-1 text-body text-muted-foreground"
                key={`ellipsis-${ellipsisCount}`}
              >
                ...
              </span>
            );
          }

          const isActive = item === currentPage;

          return (
            <Button
              aria-current={isActive ? "page" : undefined}
              key={item}
              onClick={() => onPageChange(item)}
              size={size}
              type="button"
              variant={isActive ? "default" : "ghost"}
            >
              {item}
            </Button>
          );
        })}
      </div>

      <Button
        disabled={disabled || isLastPage}
        onClick={() => onPageChange(currentPage + 1)}
        size={size}
        type="button"
        variant="ghost"
      >
        Next
        <span className="size-4">
          <ChevronRightIcon />
        </span>
      </Button>
    </nav>
  );
}

export { Pagination };
