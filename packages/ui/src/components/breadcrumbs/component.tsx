import type {
  BreadcrumbEllipsisProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbPageProps,
  BreadcrumbSeparatorProps,
  BreadcrumbsProps,
} from "./types";
import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cx } from "@patternmode/ui/cx";

import { ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";
import { breadcrumbVariants } from "./variants";

/**
 * Root breadcrumb navigation container showing the current page location within a site hierarchy.
 */
const Breadcrumbs = ({
  ref,
  className,
  ...props
}: BreadcrumbsProps) => {
  const { root } = breadcrumbVariants();
  return (
    <nav
      ref={ref}
      aria-label="breadcrumb"
      className={cx(root(), className)}
      data-testid="breadcrumbs"
      {...props}
    />
  );
};
Breadcrumbs.displayName = "Breadcrumbs";

/**
 * Ordered list container for breadcrumb items.
 */
const BreadcrumbList = ({
  ref,
  className,
  ...props
}: BreadcrumbListProps) => {
  const { list } = breadcrumbVariants();
  return <ol ref={ref} className={cx(list(), className)} {...props} />;
};
BreadcrumbList.displayName = "BreadcrumbList";

/**
 * Individual breadcrumb item container.
 */
const BreadcrumbItem = ({
  ref,
  className,
  ...props
}: BreadcrumbItemProps) => {
  const { item } = breadcrumbVariants();
  return <li ref={ref} className={cx(item(), className)} {...props} />;
};
BreadcrumbItem.displayName = "BreadcrumbItem";

/**
 * Clickable breadcrumb link component.
 */
const BreadcrumbLink = ({
  ref,
  className,
  render = <a />,
  ...props
}: BreadcrumbLinkProps) => {
  const { link } = breadcrumbVariants();

  const element = useRender({
    render,
    ref,
    props: mergeProps<"a">({ className: cx(link(), className) }, props),
  });

  return element;
};
BreadcrumbLink.displayName = "BreadcrumbLink";

/**
 * Current page indicator for breadcrumbs.
 */
const BreadcrumbPage = ({
  ref,
  className,
  ...props
}: BreadcrumbPageProps) => {
  const { page } = breadcrumbVariants();
  return (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cx(page(), className)}
      {...props}
    />
  );
};
BreadcrumbPage.displayName = "BreadcrumbPage";

/**
 * Visual separator between breadcrumb items.
 */
const BreadcrumbSeparator = ({
  ref,
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) => {
  const { separator } = breadcrumbVariants();
  return (
    <li
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cx(separator(), className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
};
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

/**
 * Ellipsis indicator for truncated breadcrumb paths.
 */
const BreadcrumbEllipsis = ({
  ref,
  className,
  ...props
}: BreadcrumbEllipsisProps) => {
  const { ellipsis } = breadcrumbVariants();
  return (
    <span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cx(ellipsis(), className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
};
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  BreadcrumbEllipsis,
  type BreadcrumbEllipsisProps,
  BreadcrumbItem,
  type BreadcrumbItemProps,
  BreadcrumbLink,
  type BreadcrumbLinkProps,
  BreadcrumbList,
  type BreadcrumbListProps,
  BreadcrumbPage,
  type BreadcrumbPageProps,
  Breadcrumbs,
  BreadcrumbSeparator,
  type BreadcrumbSeparatorProps,
  type BreadcrumbsProps,
};
