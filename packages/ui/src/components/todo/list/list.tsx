/**
 * List Components.
 *
 * Flexible components for creating ordered and unordered lists with custom styling,
 * indicators, and alignment options. Supports traditional bullet/number lists as well
 * as custom icon-based lists for enhanced visual presentation.
 *
 * Features:
 * - Ordered and unordered list support
 * - Custom icon indicators with flexible sizing
 * - Multiple alignment options (start, center, end)
 * - Marker and plain list variants
 * - Consistent spacing and typography
 * - Dark mode support
 * - Unstyled option for custom styling.
 *
 * @category data
 * @icon List
 * @example
 * ```tsx
 * // Basic unordered list with markers
 * <List>
 *   <ListItem>First item</ListItem>
 *   <ListItem>Second item</ListItem>
 *   <ListItem>Third item</ListItem>
 * </List>
 *
 * // Ordered list
 * <List as="ol">
 *   <ListItem>Step one</ListItem>
 *   <ListItem>Step two</ListItem>
 *   <ListItem>Step three</ListItem>
 * </List>
 *
 * // Custom icon indicators
 * <List variant="plain" align="center">
 *   <ListItem>
 *     <ListIndicator icon={CheckCircle} />
 *     Completed task
 *   </ListItem>
 *   <ListItem>
 *     <ListIndicator icon={Clock} />
 *     In progress task
 *   </ListItem>
 *   <ListItem>
 *     <ListIndicator icon={Circle} />
 *     Pending task
 *   </ListItem>
 * </List>
 *
 * // Feature list with icons
 * <List variant="plain">
 *   <ListItem>
 *     <ListIndicator icon={Shield} size="sm" />
 *     Secure authentication
 *   </ListItem>
 *   <ListItem>
 *     <ListIndicator icon={Zap} size="sm" />
 *     Lightning fast performance
 *   </ListItem>
 *   <ListItem>
 *     <ListIndicator icon={Users} size="sm" />
 *     Team collaboration
 *   </ListItem>
 * </List>
 *
 * // Navigation list
 * <List variant="plain" align="start">
 *   <ListItem>
 *     <ListIndicator icon={Home} />
 *     <a href="/">Dashboard</a>
 *   </ListItem>
 *   <ListItem>
 *     <ListIndicator icon={Settings} />
 *     <a href="/settings">Settings</a>
 *   </ListItem>
 *   <ListItem>
 *     <ListIndicator icon={User} />
 *     <a href="/profile">Profile</a>
 *   </ListItem>
 * </List>
 * ```
 */

import type { VariantProps } from "tailwind-variants";

import React from "react";
import { tv } from "tailwind-variants";

import { cx } from "../../../lib/utils";
import { Icon } from "../icon/icon";

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

/**
 * Props for the List component.
 *
 * Configuration for list behavior, styling, and structure.
 */
export type ListProps = {
  /**
   * The underlying element to render (ul, ol, etc.).
   */
  as?: React.ElementType;
  /**
   * Whether to remove the component's style.
   */
  unstyled?: boolean;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * The list items.
   */
  children: React.ReactNode;
} & VariantProps<typeof listVariants>;

/**
 * Props for the ListItem component.
 *
 * Configuration for individual list item styling and content.
 */
export type ListItemProps = {
  /**
   * Whether to remove the component's style.
   */
  unstyled?: boolean;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * The list item content.
   */
  children: React.ReactNode;
} & VariantProps<typeof listItemVariants>;

/**
 * Props for the ListIndicator component.
 *
 * Configuration for custom list indicators and icons.
 */
export type ListIndicatorProps = {
  /**
   * The icon component to render.
   */
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /**
   * Icon size.
   */
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  /**
   * Whether to remove the component's style.
   */
  unstyled?: boolean;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * The indicator content.
   */
  children?: React.ReactNode;
} & VariantProps<typeof indicatorVariants>;

/**
 * Root list component for ordered and unordered lists.
 *
 * Flexible container that supports both traditional HTML lists (ul, ol) and
 * custom styled lists with icon indicators. Provides consistent spacing,
 * alignment options, and theming support.
 *
 * @param as - HTML element type (ul, ol, etc.).
 * @param variant - List style variant (marker or plain).
 * @param align - Content alignment (start, center, end).
 * @param unstyled - Remove default styling.
 * @param className - Additional CSS classes.
 * @param children - List items content.
 */
/**
 * List component for displaying structured data items with flexible layouts.
 *
 * @id list
 * @name List
 * @icon List
 * @category data
 * @component
 * @param props - Component properties.
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
 * Individual list item component.
 *
 * Container for list item content with consistent styling and alignment.
 * Supports both marker and plain variants to match the parent List component.
 *
 * @param variant - Item style variant (marker or plain).
 * @param align - Content alignment (start, center, end).
 * @param unstyled - Remove default styling.
 * @param className - Additional CSS classes.
 * @param children - Item content.
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
        className,
      )}
      {...props}
    >
      {children}
    </li>
  );
}

/**
 * Custom indicator component for list items.
 *
 * Provides flexible markers for list items using icons or custom content.
 * Automatically handles sizing and positioning for consistent visual alignment.
 *
 * @param icon - Icon component to render as indicator.
 * @param size - Icon size (xs, sm, base, lg, xl, 2xl, 3xl).
 * @param variant - Indicator style variant (marker or plain).
 * @param unstyled - Remove default styling.
 * @param className - Additional CSS classes.
 * @param children - Custom indicator content (used when no icon provided).
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
