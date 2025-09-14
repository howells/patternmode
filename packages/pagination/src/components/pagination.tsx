// Framework-agnostic: do not import Next.js here
import { Button } from "@patternmode/button";
import type { ButtonProps } from "@patternmode/button/types";
import { cx } from "@patternmode/utils/cx";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import type React from "react";

type PaginationProps = {
  "aria-label"?: string;
  className?: string;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"nav">;

export const Pagination = ({
  "aria-label": ariaLabel = "Page navigation",
  className,
  ...props
}: PaginationProps) => {
  return (
    <nav
      aria-label={ariaLabel}
      data-testid="pagination"
      {...props}
      className={cx("flex items-center justify-center gap-2", className)}
    />
  );
};

type PaginationPreviousProps = {
  href?: string;
  render?: ButtonProps["render"];
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
};
export const PaginationPrevious = ({
  href,
  render,
  className,
  children = "Previous",
  disabled = false,
}: PaginationPreviousProps) => {
  if (disabled || !(href || render)) {
    return (
      <Button
        aria-label="Previous page"
        className={className}
        disabled={true}
        leftIcon={ChevronLeft}
        variant="secondary"
      >
        <span className="sr-only sm:not-sr-only">{children}</span>
      </Button>
    );
  }
  return (
    <Button
      className={className}
      leftIcon={ChevronLeft}
      render={
        render ||
        ((props) => (
          <a
            href={href}
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          />
        ))
      }
      variant="secondary"
    >
      <span className="sr-only sm:not-sr-only">{children}</span>
    </Button>
  );
};

type PaginationNextProps = {
  href?: string;
  render?: ButtonProps["render"];
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
};
export const PaginationNext = ({
  href,
  render,
  className,
  children = "Next",
  disabled = false,
}: PaginationNextProps) => {
  if (disabled || !(href || render)) {
    return (
      <Button
        aria-label="Next page"
        className={className}
        disabled={true}
        rightIcon={ChevronRight}
        variant="secondary"
      >
        <span className="sr-only sm:not-sr-only">{children}</span>
      </Button>
    );
  }
  return (
    <Button
      className={className}
      render={
        render ||
        ((props) => (
          <a
            href={href}
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          />
        ))
      }
      rightIcon={ChevronRight}
      variant="secondary"
    >
      <span className="sr-only sm:not-sr-only">{children}</span>
    </Button>
  );
};

type PaginationListProps = {
  className?: string;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"ul">;
export const PaginationList = ({
  className,
  ...props
}: PaginationListProps) => {
  return <ul {...props} className={cx("flex items-center gap-1", className)} />;
};

type PaginationPageProps = {
  href?: string;
  render?: ButtonProps["render"];
  className?: string;
  current?: boolean;
  children?: React.ReactNode;
};
export const PaginationPage = ({
  href,
  render,
  className,
  current = false,
  children,
}: PaginationPageProps) => {
  if (current) {
    return (
      <li>
        <Button
          aria-current="page"
          aria-label={`Page ${children}`}
          className={cx("min-w-10", className)}
          variant="primary"
        >
          {children}
        </Button>
      </li>
    );
  }
  return (
    <li>
      <Button
        className={cx("min-w-10", className)}
        render={
          render ||
          ((props) => (
            <a
              href={href}
              {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            />
          ))
        }
        variant="ghost"
      >
        {children}
      </Button>
    </li>
  );
};

type PaginationGapProps = {
  className?: string;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"span">;
export const PaginationGap = ({
  className,
  children = <MoreHorizontal className="h-4 w-4" />,
  ...props
}: PaginationGapProps) => {
  return (
    <span
      aria-hidden="true"
      {...props}
      className={cx(
        "flex h-9 w-9 items-center justify-center text-zinc-500 dark:text-zinc-400",
        className
      )}
    >
      {children}
    </span>
  );
};

export type {
  PaginationGapProps,
  PaginationListProps,
  PaginationNextProps,
  PaginationPageProps,
  PaginationPreviousProps,
  PaginationProps,
};
