import type React from "react";

import { cx } from "../../lib/utils";

type SkeletonProps = {
  /**
   * Additional CSS classes for custom sizing and styling.
   * Commonly used to set dimensions like "h-4 w-full", "h-12 w-12 rounded-full", etc.
   */
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Loading placeholder component with pulse animation.
 */
function Skeleton({
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cx(
        "animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800",
        className,
      )}
      data-testid="skeleton"
      {...props}
    />
  );
}

export { Skeleton, type SkeletonProps };
