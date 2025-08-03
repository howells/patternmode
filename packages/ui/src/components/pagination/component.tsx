import type React from "react";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { cx } from "../../lib/utils";
import { Button } from "../button";

type PaginationProps = {
  /**
   * Accessible label for screen readers describing the pagination navigation.
   */
  "aria-label"?: string;
  /**
   * Additional CSS classes for styling customization.
   */
  "className"?: string;
  /**
   * Pagination controls including previous/next buttons and page list.
   */
  "children"?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"nav">;

/**
 * Root pagination component for navigation container with proper accessibility.
 */
export function Pagination({
  "aria-label": ariaLabel = "Page navigation",
  className,
  ...props
}: PaginationProps) {
  return (
    <nav
      aria-label={ariaLabel}
      {...props}
      className={cx("flex items-center justify-center gap-2", className)}
    />
  );
}

type PaginationPreviousProps = {
  /**
   * URL for the previous page. When undefined, button is disabled.
   */
  href?: string;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
  /**
   * Whether the button should be disabled regardless of href.
   */
  disabled?: boolean;
  /**
   * Button text content for the previous button.
   */
  children?: React.ReactNode;
};

/**
 * Previous page navigation button with automatic disabled state handling.
 */
export function PaginationPrevious({
  href,
  className,
  children = "Previous",
  disabled = false,
}: PaginationPreviousProps) {
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

type PaginationNextProps = {
  /**
   * URL for the next page. When undefined, button is disabled.
   */
  href?: string;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
  /**
   * Whether the button should be disabled regardless of href.
   */
  disabled?: boolean;
  /**
   * Button text content for the next button.
   */
  children?: React.ReactNode;
};

/**
 * Next page navigation button with automatic disabled state handling.
 */
export function PaginationNext({
  href,
  className,
  children = "Next",
  disabled = false,
}: PaginationNextProps) {
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

type PaginationListProps = {
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
  /**
   * Page buttons and gap indicators to display in the list.
   */
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"ul">;

/**
 * List container for page number buttons with semantic markup.
 */
export function PaginationList({ className, ...props }: PaginationListProps) {
  return <ul {...props} className={cx("flex items-center gap-1", className)} />;
}

type PaginationPageProps = {
  /**
   * URL for this page navigation.
   */
  href: string;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
  /**
   * Whether this is the current active page with distinct styling.
   */
  current?: boolean;
  /**
   * Page number or content to display within the button.
   */
  children?: React.ReactNode;
};

/**
 * Individual page number button with current page state support.
 */
export function PaginationPage({
  href,
  className,
  current = false,
  children,
}: PaginationPageProps) {
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

type PaginationGapProps = {
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
  /**
   * Gap content to display (defaults to MoreHorizontal icon).
   */
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"span">;

/**
 * Gap indicator for truncated page ranges showing omitted pages.
 */
export function PaginationGap({
  className,
  children = <MoreHorizontal className="h-4 w-4" />,
  ...props
}: PaginationGapProps) {
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

export type { PaginationProps };
