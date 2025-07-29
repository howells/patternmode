"use client";

import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from "@patternmode/ui";

export function PaginationExample({
  currentPage = 3,
  totalPages = 10,
  maxVisible = 7,
  showPreviousNext = true,
  previousLabel = "Previous",
  nextLabel = "Next",
  ...props
}: {
  currentPage?: number;
  totalPages?: number;
  maxVisible?: number;
  showPreviousNext?: boolean;
  previousLabel?: string;
  nextLabel?: string;
  [key: string]: unknown;
}) {
  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationPage
            key={i}
            href={`#page-${i}`}
            current={i === currentPage}
          >
            {i}
          </PaginationPage>
        );
      }
    } else {
      // Show condensed pagination with gaps
      pages.push(
        <PaginationPage key={1} href="#page-1" current={1 === currentPage}>
          1
        </PaginationPage>
      );

      if (currentPage > 3) {
        pages.push(<PaginationGap key="gap-start" />);
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(
          <PaginationPage
            key={i}
            href={`#page-${i}`}
            current={i === currentPage}
          >
            {i}
          </PaginationPage>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(<PaginationGap key="gap-end" />);
      }

      pages.push(
        <PaginationPage
          key={totalPages}
          href={`#page-${totalPages}`}
          current={totalPages === currentPage}
        >
          {totalPages}
        </PaginationPage>
      );
    }

    return pages;
  };

  return (
    <Pagination {...props}>
      {showPreviousNext && (
        <PaginationPrevious
          href={currentPage > 1 ? `#page-${currentPage - 1}` : undefined}
          disabled={currentPage <= 1}
        >
          {previousLabel}
        </PaginationPrevious>
      )}
      <PaginationList>{renderPageNumbers()}</PaginationList>
      {showPreviousNext && (
        <PaginationNext
          href={
            currentPage < totalPages ? `#page-${currentPage + 1}` : undefined
          }
          disabled={currentPage >= totalPages}
        >
          {nextLabel}
        </PaginationNext>
      )}
    </Pagination>
  );
}
