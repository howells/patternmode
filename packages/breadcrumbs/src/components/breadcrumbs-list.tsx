import { cx } from "@patternmode/utils/cx";
import type { BreadcrumbListProps } from "../types";
import { breadcrumbVariants } from "../variants";

const BreadcrumbList = ({ ref, className, ...props }: BreadcrumbListProps) => {
  const { list } = breadcrumbVariants();
  return <ol className={cx(list(), className)} ref={ref} {...props} />;
};

BreadcrumbList.displayName = "BreadcrumbList";

export { BreadcrumbList };
