import { cx } from "@patternmode/utils/cx";
import { MoreHorizontal } from "lucide-react";
import type { BreadcrumbEllipsisProps } from "../types";
import { breadcrumbVariants } from "../variants";

const BreadcrumbEllipsis = ({
  ref,
  className,
  ...props
}: BreadcrumbEllipsisProps) => {
  const { ellipsis } = breadcrumbVariants();
  return (
    <span
      aria-hidden="true"
      className={cx(ellipsis(), className)}
      ref={ref}
      role="presentation"
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
};

BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export { BreadcrumbEllipsis };
