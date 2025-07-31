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
 * @example
 * ```tsx
 * <Breadcrumbs>
 *  <BreadcrumbItem href="/">Home</BreadcrumbItem>
 *  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
 *  <BreadcrumbItem>Current Page</BreadcrumbItem>
 *  </Breadcrumbs>
 * ```
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

/**
 * Root breadcrumb navigation container.
 *
 * Provides semantic navigation structure with proper ARIA labeling.
 * Acts as the container for the entire breadcrumb trail.
 *
 *
 * @id breadcrumbs
 * @name Breadcrumbs
 * @component
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Current Page</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 */
/**
 * A navigation component that shows the current page.
 *
 * @id breadcrumbs
 * @name Breadcrumbs
 * @component
 */
const /**
       *
       */
  Breadcrumb = ({ ref, className, ...props }: React.ComponentProps<"nav"> & { ref?: React.RefObject<HTMLElement | null> }) => {
    const { root } = breadcrumbVariants();
    return (
      <nav
        ref={ref}
        aria-label="breadcrumb"
        className={cx(root(), className)}
        {...props}
      />
    );
  };
Breadcrumb.displayName = "Breadcrumb";

/**
 * Ordered list container for breadcrumb items.
 *
 * Provides the structural list element that contains all breadcrumb items
 * and separators in proper hierarchical order.
 *
 * @example
 * ```tsx
 * <BreadcrumbList>
 *   <BreadcrumbItem>
 *     <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
 *   </BreadcrumbItem>
 *   <BreadcrumbSeparator />
 *   <BreadcrumbItem>
 *     <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
 *   </BreadcrumbItem>
 *   <BreadcrumbSeparator />
 *   <BreadcrumbItem>
 *     <BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
 *   </BreadcrumbItem>
 * </BreadcrumbList>
 * ```
 */
const /**
       *
       */
  BreadcrumbList = ({ ref, className, ...props }: React.ComponentProps<"ol"> & { ref?: React.RefObject<HTMLOListElement | null> }) => {
    const { list } = breadcrumbVariants();
    return <ol ref={ref} className={cx(list(), className)} {...props} />;
  };
BreadcrumbList.displayName = "BreadcrumbList";

/**
 * Individual breadcrumb item container.
 *
 * Wraps a single breadcrumb link or page indicator. Provides proper
 * list item semantics and layout styling.
 *
 * @example
 * ```tsx
 * <BreadcrumbItem>
 *   <BreadcrumbLink href="/products">Products</BreadcrumbLink>
 * </BreadcrumbItem>
 *
 * <BreadcrumbItem>
 *   <BreadcrumbPage>Product Details</BreadcrumbPage>
 * </BreadcrumbItem>
 * ```
 */
const /**
       *
       */
  BreadcrumbItem = ({ ref, className, ...props }: React.ComponentProps<"li"> & { ref?: React.RefObject<HTMLLIElement | null> }) => {
    const { item } = breadcrumbVariants();
    return <li ref={ref} className={cx(item(), className)} {...props} />;
  };
BreadcrumbItem.displayName = "BreadcrumbItem";

/**
 * Clickable breadcrumb link component.
 *
 * Uses Base UI's render prop pattern for maximum flexibility while maintaining
 * consistent styling. Supports custom elements (like Next.js Link) via the render prop.
 *
 * @param render - Custom element to render (defaults to anchor tag).
 *
 * @example
 * ```tsx
 * // Standard link
 * <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
 *
 * // With Next.js Link
 * <BreadcrumbLink render={<Link href="/settings" />}>
 *   Settings
 * </BreadcrumbLink>
 *
 * // With React Router Link
 * <BreadcrumbLink render={<RouterLink to="/profile" />}>
 *   Profile
 * </BreadcrumbLink>
 * ```
 */
const /**
       *
       */
  BreadcrumbLink: React.ForwardRefExoticComponent<
  useRender.ComponentProps<"a"> & React.RefAttributes<HTMLAnchorElement>
> = ({ ref, className, render = <a />, ...props }: useRender.ComponentProps<"a"> & { ref?: React.RefObject<HTMLAnchorElement | null> }) => {
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
 *
 * Represents the current page in the breadcrumb trail. Non-clickable with
 * proper ARIA attributes to indicate current location. Visually distinct
 * from clickable links.
 *
 * @example
 * ```tsx
 * <BreadcrumbItem>
 *   <BreadcrumbPage>User Profile</BreadcrumbPage>
 * </BreadcrumbItem>
 *
 * // In a complete breadcrumb trail
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/users">Users</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>John Doe</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 */
const /**
       *
       */
  BreadcrumbPage = ({ ref, className, ...props }: React.ComponentProps<"span"> & { ref?: React.RefObject<HTMLSpanElement | null> }) => {
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
 *
 * Displays a separator icon (defaults to chevron right) between breadcrumb
 * items. Properly hidden from screen readers with ARIA attributes.
 *
 * @param children - Custom separator content (defaults to ChevronRight icon).
 *
 * @example
 * ```tsx
 * // Default chevron separator
 * <BreadcrumbSeparator />
 *
 * // Custom separator
 * <BreadcrumbSeparator>
 *   <span>/</span>
 * </BreadcrumbSeparator>
 *
 * // Different icon
 * <BreadcrumbSeparator>
 *   <ArrowRight className="h-4 w-4" />
 * </BreadcrumbSeparator>
 * ```
 */
const /**
       *
       */
  BreadcrumbSeparator = ({ ref, children, className, ...props }: React.ComponentProps<"li"> & { ref?: React.RefObject<HTMLLIElement | null> }) => {
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
 *
 * Shows when breadcrumb paths are collapsed or truncated to save space.
 * Provides visual indication that there are hidden intermediate levels.
 * Includes screen reader text for accessibility.
 *
 * @example
 * ```tsx
 * // Truncated breadcrumb path
 * <BreadcrumbList>
 *   <BreadcrumbItem>
 *     <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *   </BreadcrumbItem>
 *   <BreadcrumbSeparator />
 *   <BreadcrumbItem>
 *     <BreadcrumbEllipsis />
 *   </BreadcrumbItem>
 *   <BreadcrumbSeparator />
 *   <BreadcrumbItem>
 *     <BreadcrumbLink href="/products/electronics">Electronics</BreadcrumbLink>
 *   </BreadcrumbItem>
 *   <BreadcrumbSeparator />
 *   <BreadcrumbItem>
 *     <BreadcrumbPage>Laptop</BreadcrumbPage>
 *   </BreadcrumbItem>
 * </BreadcrumbList>
 * ```
 */
const /**
       *
       */
  BreadcrumbEllipsis = ({ ref, className, ...props }: React.ComponentProps<"span"> & { ref?: React.RefObject<HTMLSpanElement | null> }) => {
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
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
