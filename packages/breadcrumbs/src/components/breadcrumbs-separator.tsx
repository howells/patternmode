import { cx } from "@patternmode/utils/cx";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbSeparatorProps } from "../types";
import { breadcrumbVariants } from "../variants";

const BreadcrumbSeparator = ({
  ref,
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) => {
  const { separator } = breadcrumbVariants();
  return (
    <li
      aria-hidden="true"
      className={cx(separator(), className)}
      ref={ref}
      role="presentation"
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
};

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export { BreadcrumbSeparator };
