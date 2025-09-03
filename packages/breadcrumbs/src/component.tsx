import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cx } from "@patternmode/utils/cx";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import type {
  BreadcrumbEllipsisProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbPageProps,
  BreadcrumbSeparatorProps,
  BreadcrumbsProps,
} from "./types";
import { breadcrumbVariants } from "./variants";

/**
 * Root breadcrumb navigation container showing the current page location within a site hierarchy.
 */
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

/**
 * Ordered list container for breadcrumb items.
 */
const BreadcrumbList = ({ ref, className, ...props }: BreadcrumbListProps) => {
  const { list } = breadcrumbVariants();
  return <ol className={cx(list(), className)} ref={ref} {...props} />;
};
BreadcrumbList.displayName = "BreadcrumbList";

/**
 * Individual breadcrumb item container.
 */
const BreadcrumbItem = ({ ref, className, ...props }: BreadcrumbItemProps) => {
  const { item } = breadcrumbVariants();
  return <li className={cx(item(), className)} ref={ref} {...props} />;
};
BreadcrumbItem.displayName = "BreadcrumbItem";

/**
 * Clickable breadcrumb link component.
 */
const BreadcrumbLink = ({
  ref,
  className,
  render,
  ...props
}: BreadcrumbLinkProps) => {
  const { link } = breadcrumbVariants();

  const element = useRender({
    render: render ?? (
      <a href="/">
        <span className="sr-only">Breadcrumb link</span>
      </a>
    ),
    ref,
    props: mergeProps<"a">({ className: cx(link(), className) }, props),
  });

  return element;
};
BreadcrumbLink.displayName = "BreadcrumbLink";

/**
 * Current page indicator for breadcrumbs.
 */
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

export {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  Breadcrumbs,
  BreadcrumbSeparator,
};
