import { cx } from "@patternmode/utils/cx";
import type { BreadcrumbsProps } from "../types";
import { breadcrumbVariants } from "../variants";

const Breadcrumbs = ({ ref, className, ...props }: BreadcrumbsProps) => {
  const { root } = breadcrumbVariants();
  return (
    <nav
      aria-label="breadcrumb"
      className={cx(root(), className)}
      data-testid="breadcrumbs"
      ref={ref}
      {...props}
    />
  );
};

Breadcrumbs.displayName = "Breadcrumbs";

export { Breadcrumbs };
