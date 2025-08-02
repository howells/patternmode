/**
 * Pagination Components.
 *
 * A comprehensive pagination system for navigating through large datasets.
 * Built with Next.js Link integration for client-side routing and proper
 * accessibility support for screen readers.
 *
 * Features:
 * - Next.js Link integration for optimized navigation
 * - Accessible ARIA attributes and screen reader support
 * - Previous/Next navigation buttons with disabled states
 * - Individual page number buttons with current state
 * - Gap indicators for truncated page ranges
 * - Responsive design with mobile optimizations
 * - Keyboard navigation support
 * - Dark mode compatible styling.
 *
 * @example
 * ```tsx
 * // Basic pagination
 * <Pagination>
 *   <PaginationPrevious href="/page/1" />
 *   <PaginationList>
 *     <PaginationPage href="/page/1">1</PaginationPage>
 *     <PaginationPage href="/page/2" current>2</PaginationPage>
 *     <PaginationPage href="/page/3">3</PaginationPage>
 *     <PaginationGap />
 *     <PaginationPage href="/page/10">10</PaginationPage>
 *   </PaginationList>
 *   <PaginationNext href="/page/3" />
 * </Pagination>
 *
 * // Advanced pagination with state management
 * const currentPage = 5;
 * const totalPages = 20;
 *
 * <Pagination aria-label="Search results pagination">
 *   <PaginationPrevious
 *     href={currentPage > 1 ? `/search?page=${currentPage - 1}` : undefined}
 *     disabled={currentPage === 1}
 *   />
 *   <PaginationList>
 *     <PaginationPage href="/search?page=1" current={currentPage === 1}>
 *       1
 *     </PaginationPage>
 *
 *     {currentPage > 3 && <PaginationGap />}
 *
 *     // Current page neighbors
 *     {Array.from({ length: 3 }, (_, i) => {
 *       const page = currentPage - 1 + i;
 *       if (page > 1 && page < totalPages) {
 *         return (
 *           <PaginationPage
 *             key={page}
 *             href={`/search?page=${page}`}
 *             current={page === currentPage}
 *           >
 *             {page}
 *           </PaginationPage>
 *         );
 *       }
 *       return null;
 *     })}
 *
 *     {currentPage < totalPages - 2 && <PaginationGap />}
 *
 *     <PaginationPage
 *       href={`/search?page=${totalPages}`}
 *       current={currentPage === totalPages}
 *     >
 *       {totalPages}
 *     </PaginationPage>
 *   </PaginationList>
 *   <PaginationNext
 *     href={currentPage < totalPages ? `/search?page=${currentPage + 1}` : undefined}
 *     disabled={currentPage === totalPages}
 *   />
 * </Pagination>
 *
 * // Table pagination
 * <div className="flex items-center justify-between">
 *   <p className="text-sm text-zinc-600">
 *     Showing {startItem} to {endItem} of {totalItems} results
 *   </p>
 *   <Pagination>
 *     <PaginationPrevious href={prevHref} disabled={!hasPrev} />
 *     <PaginationList>
 *       {pageNumbers.map(page => (
 *         <PaginationPage
 *           key={page}
 *           href={`/data?page=${page}`}
 *           current={page === currentPage}
 *         >
 *           {page}
 *         </PaginationPage>
 *       ))}
 *     </PaginationList>
 *     <PaginationNext href={nextHref} disabled={!hasNext} />
 *   </Pagination>
 * </div>
 * ```
 */

import type React from "react";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { cx } from "../../../lib/utils";
import { Button } from "../button/button";

/**
 * Root pagination component for navigation container.
 *
 * Creates the main navigation container with proper ARIA labeling
 * and centered layout for pagination controls.
 *
 * @param aria-label - Accessible label for screen readers.
 * @param className - Additional CSS classes.
 * @param props - Additional HTML nav element props.
 *
 * @component
 * @example
 * ```tsx
 * <Pagination aria-label="Search results navigation">
 *   <PaginationPrevious href="/page/1" />
 *   <PaginationList>
 *     <PaginationPage href="/page/2" current>2</PaginationPage>
 *   </PaginationList>
 *   <PaginationNext href="/page/3" />
 * </Pagination>
 * ```
 */
/**
 * Pagination.
 *
 * @component
 * @id pagination
 * @name Pagination
 * @category navigation
 * @icon MoreHorizontal
 */
/**
 * Page navigation component with previous/next controls and page indicators.
 *
 * @id pagination
 * @name Pagination
 * @icon MoreHorizontal
 * @category navigation
 * @component
 * @param props - Component properties.
 * @param props.aria-label - Accessible label for screen readers (defaults to "Page navigation").
 * @param props.className - Additional CSS classes.
 * @param props.children - Pagination controls including previous/next buttons and page list.
 */
export function Pagination({
  "aria-label": ariaLabel = "Page navigation",
  className,
  ...props
}: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      aria-label={ariaLabel}
      {...props}
      className={cx("flex items-center justify-center gap-2", className)}
    />
  );
}

/**
 * Previous page navigation button.
 *
 * Button for navigating to the previous page with automatic disabled
 * state when on first page or no href provided.
 *
 * @param href - URL for the previous page (undefined disables button).
 * @param className - Additional CSS classes.
 * @param children - Button text content (default: "Previous").
 * @param disabled - Whether the button should be disabled.
 *
 * @component
 * @example
 * ```tsx
 * // Active previous button
 * <PaginationPrevious href="/page/1" />
 *
 * // Disabled previous button (first page)
 * <PaginationPrevious disabled />
 *
 * // Custom text
 * <PaginationPrevious href="/page/1">‹ Prev</PaginationPrevious>
 * ```
 */
export function PaginationPrevious({
  href,
  className,
  children = "Previous",
  disabled = false,
}: React.PropsWithChildren<{
  /**
   * URL for the previous page.
   */
  href?: string;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Whether the button should be disabled.
   */
  disabled?: boolean;
}>) {
  if (disabled || !href) {
    return (
      <Button
        variant="secondary"
        disabled={true}
        aria-label="Previous page"
        leftIcon={ChevronLeft}
        className={className}
      >
        <span className="sr-only sm:not-sr-only">{children}</span>
      </Button>
    );
  }

  return (
    <Button
      render={<Link href={href} aria-label="Previous page" />}
      variant="secondary"
      leftIcon={ChevronLeft}
      className={className}
    >
      <span className="sr-only sm:not-sr-only">{children}</span>
    </Button>
  );
}

/**
 * Next page navigation button.
 *
 * Button for navigating to the next page with automatic disabled
 * state when on last page or no href provided.
 *
 * @param href - URL for the next page (undefined disables button).
 * @param className - Additional CSS classes.
 * @param children - Button text content (default: "Next").
 * @param disabled - Whether the button should be disabled.
 *
 * @component
 * @example
 * ```tsx
 * // Active next button
 * <PaginationNext href="/page/3" />
 *
 * // Disabled next button (last page)
 * <PaginationNext disabled />
 *
 * // Custom text
 * <PaginationNext href="/page/3">Next ›</PaginationNext>
 * ```
 */
export function PaginationNext({
  href,
  className,
  children = "Next",
  disabled = false,
}: React.PropsWithChildren<{
  /**
   * URL for the next page.
   */
  href?: string;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Whether the button should be disabled.
   */
  disabled?: boolean;
}>) {
  if (disabled || !href) {
    return (
      <Button
        variant="secondary"
        disabled={true}
        aria-label="Next page"
        rightIcon={ChevronRight}
        className={className}
      >
        <span className="sr-only sm:not-sr-only">{children}</span>
      </Button>
    );
  }

  return (
    <Button
      render={<Link href={href} aria-label="Next page" />}
      variant="secondary"
      rightIcon={ChevronRight}
      className={className}
    >
      <span className="sr-only sm:not-sr-only">{children}</span>
    </Button>
  );
}

/**
 * List container for page number buttons.
 *
 * Semantic list container for organizing page number buttons
 * with consistent spacing and alignment.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional HTML ul element props.
 *
 * @component
 * @example
 * ```tsx
 * <PaginationList>
 *   <PaginationPage href="/page/1">1</PaginationPage>
 *   <PaginationPage href="/page/2" current>2</PaginationPage>
 *   <PaginationPage href="/page/3">3</PaginationPage>
 *   <PaginationGap />
 *   <PaginationPage href="/page/10">10</PaginationPage>
 * </PaginationList>
 * ```
 */
export function PaginationList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"ul">) {
  return <ul {...props} className={cx("flex items-center gap-1", className)} />;
}

/**
 * Individual page number button.
 *
 * Clickable page number with distinct styling for current page.
 * Automatically handles ARIA attributes for accessibility.
 *
 * @param href - URL for this page.
 * @param className - Additional CSS classes.
 * @param current - Whether this is the current active page.
 * @param children - Page number or content.
 *
 * @component
 * @example
 * ```tsx
 * // Regular page button
 * <PaginationPage href="/page/1">1</PaginationPage>
 *
 * // Current page button
 * <PaginationPage href="/page/2" current>2</PaginationPage>
 *
 * // Custom content
 * <PaginationPage href="/page/last" className="font-bold">
 *   Last
 * </PaginationPage>
 * ```
 */
export function PaginationPage({
  href,
  className,
  current = false,
  children,
}: React.PropsWithChildren<{
  /**
   * URL for this page.
   */
  href: string;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Whether this is the current active page.
   */
  current?: boolean;
}>) {
  if (current) {
    return (
      <li>
        <Button
          variant="default"
          aria-label={`Page ${children}`}
          aria-current="page"
          className={cx("min-w-10", className)}
        >
          {children}
        </Button>
      </li>
    );
  }

  return (
    <li>
      <Button
        render={<Link href={href} aria-label={`Page ${children}`} />}
        variant="ghost"
        className={cx("min-w-10", className)}
      >
        {children}
      </Button>
    </li>
  );
}

/**
 * Gap indicator for truncated page ranges.
 *
 * Visual indicator showing that pages have been omitted from display.
 * Typically shows ellipsis or dots to indicate missing pages.
 *
 * @param className - Additional CSS classes.
 * @param children - Gap content (default: MoreHorizontal icon).
 * @param props - Additional HTML span element props.
 *
 * @component
 * @example
 * ```tsx
 * // Default ellipsis gap
 * <PaginationGap />
 *
 * // Custom gap content
 * <PaginationGap>...</PaginationGap>
 *
 * // Styled gap
 * <PaginationGap className="text-blue-500">
 *   <span>•••</span>
 * </PaginationGap>
 *
 * // In context
 * <PaginationList>
 *   <PaginationPage href="/page/1">1</PaginationPage>
 *   <PaginationGap />
 *   <PaginationPage href="/page/5" current>5</PaginationPage>
 *   <PaginationGap />
 *   <PaginationPage href="/page/10">10</PaginationPage>
 * </PaginationList>
 * ```
 */
export function PaginationGap({
  className,
  children = <MoreHorizontal className="h-4 w-4" />,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      aria-hidden="true"
      {...props}
      className={cx(
        "flex h-9 w-9 items-center justify-center text-zinc-500 dark:text-zinc-400",
        className,
      )}
    >
      {children}
    </span>
  );
}
