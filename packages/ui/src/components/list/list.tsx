import { Icon } from "../icon/icon";
import { cx } from "../../lib/utils";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const listVariants = tv({
  base: "list-none space-y-1",
  variants: {
    variant: {
      marker:
        "list-disc list-inside marker:text-zinc-400 dark:marker:text-zinc-500",
      plain: "",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    },
  },
  defaultVariants: {
    variant: "marker",
    align: "start",
  },
});

const listItemVariants = tv({
  base: "text-zinc-700 dark:text-zinc-300",
  variants: {
    variant: {
      marker: "",
      plain: "flex gap-2",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    },
  },
  defaultVariants: {
    variant: "marker",
    align: "start",
  },
});

const indicatorVariants = tv({
  base: "shrink-0",
  variants: {
    variant: {
      marker: "hidden",
      plain: "block",
    },
  },
  defaultVariants: {
    variant: "marker",
  },
});

export interface ListProps extends VariantProps<typeof listVariants> {
  /** The underlying element to render (ul, ol, etc.) */
  as?: React.ElementType;
  /** Whether to remove the component's style */
  unstyled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** The list items */
  children: React.ReactNode;
}

export interface ListItemProps extends VariantProps<typeof listItemVariants> {
  /** Whether to remove the component's style */
  unstyled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** The list item content */
  children: React.ReactNode;
}

export interface ListIndicatorProps
  extends VariantProps<typeof indicatorVariants> {
  /** The icon component to render */
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /** Icon size */
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  /** Whether to remove the component's style */
  unstyled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** The indicator content */
  children?: React.ReactNode;
}

/**
 * List component for displaying ordered and unordered lists
 *
 * @example
 * ```tsx
 * // Basic unordered list
 * <List>
 *   <ListItem>Item 1</ListItem>
 *   <ListItem>Item 2</ListItem>
 * </List>
 *
 * // Ordered list
 * <List as="ol">
 *   <ListItem>First item</ListItem>
 *   <ListItem>Second item</ListItem>
 * </List>
 *
 * // With custom indicators
 * <List variant="plain" align="center">
 *   <ListItem>
 *     <ListIndicator icon={CheckCircle} />
 *     Completed task
 *   </ListItem>
 *   <ListItem>
 *     <ListIndicator icon={Circle} />
 *     Pending task
 *   </ListItem>
 * </List>
 * ```
 */
/**
 * List
 *
 * @id list
 * @name List
 */
export function List({
  as: Component = "ul",
  variant,
  align,
  unstyled,
  className,
  children,
  ...props
}: ListProps) {
  return (
    <Component
      className={cx(!unstyled && listVariants({ variant, align }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * List item component
 */
export function ListItem({
  variant,
  align,
  unstyled,
  className,
  children,
  ...props
}: ListItemProps) {
  return (
    <li
      className={cx(
        !unstyled && listItemVariants({ variant, align }),
        className
      )}
      {...props}
    >
      {children}
    </li>
  );
}

/**
 * List indicator component for custom markers or icons
 */
export function ListIndicator({
  icon: IconComponent,
  size = "base",
  variant,
  unstyled,
  className,
  children,
  ...props
}: ListIndicatorProps) {
  return (
    <span
      className={cx(!unstyled && indicatorVariants({ variant }), className)}
      {...props}
    >
      {IconComponent ? <Icon icon={IconComponent} size={size} /> : children}
    </span>
  );
}

export type { VariantProps as ListVariantProps } from "tailwind-variants";
export { indicatorVariants, listItemVariants, listVariants };
