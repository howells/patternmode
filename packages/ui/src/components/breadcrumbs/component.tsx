import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";
import { tv } from "tailwind-variants";

import { cx } from "../../lib/utils";

/**
 * Style variants for breadcrumb navigation components.
 *
 * Defines consistent styling for all breadcrumb elements including
 * navigation structure, links, separators, and truncation indicators.
 */
const breadcrumbVariants = tv({
  slots: {
    /**
     * Root navigation container styling.
     */
    root: [
      // base
      "w-full",
    ],
    /**
     * Breadcrumb list container styling.
     */
    list: [
      // base
      "flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
      // text color
      "text-zinc-500 dark:text-zinc-400",
    ],
    /**
     * Individual breadcrumb item styling.
     */
    item: [
      // base
      "inline-flex items-center gap-1.5",
    ],
    /**
     * Clickable breadcrumb link styling.
     */
    link: [
      // base
      "transition-colors",
      // hover
      "hover:text-zinc-900 dark:hover:text-zinc-50",
      // focus
      "focus:outline-none focus:text-zinc-900 dark:focus:text-zinc-50",
    ],
    /**
     * Current page (non-clickable) styling.
     */
    page: [
      // base
      "font-normal",
      // text color
      "text-zinc-900 dark:text-zinc-50",
    ],
    /**
     * Separator icon styling.
     */
    separator: [
      // base
      "[&>svg]:size-3.5",
      // text color
      "text-zinc-400 dark:text-zinc-500",
    ],
    /**
     * Ellipsis indicator for truncated paths.
     */
    ellipsis: [
      // base
      "flex size-9 items-center justify-center",
      // text color
      "text-zinc-400 dark:text-zinc-500",
    ],
  },
});

type BreadcrumbsProps = React.ComponentProps<"nav"> & {
  /**
   * Optional ref to the nav element.
   * Provides direct access to the underlying navigation element for advanced use cases.
   */
  ref?: React.RefObject<React.ElementRef<"nav"> | null>;
};

type BreadcrumbListProps = React.ComponentProps<"ol"> & {
  /**
   * Optional ref to the ordered list element.
   * Provides direct access to the underlying list element for advanced use cases.
   */
  ref?: React.RefObject<HTMLOListElement | null>;
};

type BreadcrumbItemProps = React.ComponentProps<"li"> & {
  /**
   * Optional ref to the list item element.
   * Provides direct access to the underlying list item element for advanced use cases.
   */
  ref?: React.RefObject<HTMLLIElement | null>;
};

type BreadcrumbLinkProps = useRender.ComponentProps<"a"> & {
  /**
   * Optional ref to the anchor element.
   * Provides direct access to the underlying anchor element for advanced use cases.
   */
  ref?: React.RefObject<HTMLAnchorElement | null>;

  /**
   * Custom element to render (defaults to anchor tag).
   * Supports custom elements like Next.js Link or React Router Link via the render prop pattern.
   * When provided, the custom element will receive all props and styling.
   */
  render?: React.ReactElement;
};

type BreadcrumbPageProps = React.ComponentProps<"span"> & {
  /**
   * Optional ref to the span element.
   * Provides direct access to the underlying span element for advanced use cases.
   */
  ref?: React.RefObject<HTMLSpanElement | null>;
};

type BreadcrumbSeparatorProps = React.ComponentProps<"li"> & {
  /**
   * Optional ref to the list item element.
   * Provides direct access to the underlying separator list item element for advanced use cases.
   */
  ref?: React.RefObject<HTMLLIElement | null>;

  /**
   * Custom separator content (defaults to ChevronRight icon).
   * Can be text, custom icons, or any React element to display between breadcrumb items.
   * The separator is automatically hidden from screen readers with proper ARIA attributes.
   */
  children?: React.ReactNode;
};

type BreadcrumbEllipsisProps = React.ComponentProps<"span"> & {
  /**
   * Optional ref to the span element.
   * Provides direct access to the underlying ellipsis span element for advanced use cases.
   */
  ref?: React.RefObject<HTMLSpanElement | null>;
};

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
