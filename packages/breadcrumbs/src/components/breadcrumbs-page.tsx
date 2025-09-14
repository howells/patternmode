import { cx } from "@patternmode/utils/cx";
import type { BreadcrumbPageProps } from "../types";
import { breadcrumbVariants } from "../variants";

const BreadcrumbPage = ({ ref, className, ...props }: BreadcrumbPageProps) => {
  const { page } = breadcrumbVariants();
  return (
    <span
      aria-current="page"
      className={cx(page(), className)}
      ref={ref}
      {...props}
    />
  );
};

BreadcrumbPage.displayName = "BreadcrumbPage";

export { BreadcrumbPage };
