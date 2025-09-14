import { cx } from "@patternmode/utils/cx";
import type { BreadcrumbItemProps } from "../types";
import { breadcrumbVariants } from "../variants";

const BreadcrumbItem = ({ ref, className, ...props }: BreadcrumbItemProps) => {
  const { item } = breadcrumbVariants();
  return <li className={cx(item(), className)} ref={ref} {...props} />;
};

BreadcrumbItem.displayName = "BreadcrumbItem";

export { BreadcrumbItem };
