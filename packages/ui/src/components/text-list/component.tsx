import type { VariantProps } from "tailwind-variants";

import React from "react";
import { tv } from "tailwind-variants";

import { cx } from "../../lib/utils";
import { Icon } from "../icon";

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
 * Props for the TextList component.
 */
export type TextListProps = {
  /**
   * The underlying HTML element to render for the list container.
   * Commonly 'ul' for unordered lists or 'ol' for ordered lists.
   * Defaults to 'ul' if not specified.
   */
  as?: React.ElementType;
  /**
   * The visual style variant for the list display.
   * 'marker' shows traditional bullet points or numbers,
   * 'plain' removes default markers for custom styling.
   */
  variant?: "marker" | "plain";
  /**
   * Controls the alignment of list items within the container.
   * 'start' aligns to the beginning, 'center' centers items,
   * 'end' aligns to the end of the container.
   */
  align?: "start" | "center" | "end";
  /**
   * Whether to remove all default component styling.
   * When true, only user-provided className styles are applied.
   */
  unstyled?: boolean;
  /**
   * Additional CSS classes to apply to the list container.
   * Merged with component's default styling unless unstyled is true.
   */
  className?: string;
  /**
   * The list items and content to display within the list.
   * Typically contains ListItem components but can include any valid React nodes.
   */
  children: React.ReactNode;
} & VariantProps<typeof listVariants>;

/**
 * Props for the TextListItem component.
 */
export type TextListItemProps = {
  /**
   * The visual style variant that should match the parent List component.
   * 'marker' for traditional list styling, 'plain' for custom indicator styling.
   */
  variant?: "marker" | "plain";
  /**
   * Controls the alignment of content within the list item.
   * Should typically match the parent List component's align prop.
   */
  align?: "start" | "center" | "end";
  /**
   * Whether to remove all default component styling.
   * When true, only user-provided className styles are applied.
   */
  unstyled?: boolean;
  /**
   * Additional CSS classes to apply to the list item.
   * Merged with component's default styling unless unstyled is true.
   */
  className?: string;
  /**
   * The content to display within the list item.
   * Can include text, ListIndicator components, links, or other React nodes.
   */
  children: React.ReactNode;
} & VariantProps<typeof listItemVariants>;

/**
 * Props for the TextListIndicator component.
 */
export type TextListIndicatorProps = {
  /**
   * The icon component to render as the list item indicator.
   * Should be a Lucide React icon or similar component that accepts className and strokeWidth props.
   * When provided, this takes precedence over children content.
   */
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /**
   * The size of the icon indicator when using the icon prop.
   * Controls both width and height of the rendered icon.
   */
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  /**
   * The visual style variant that should match the parent List component.
   * 'marker' hides the indicator (for traditional lists), 'plain' shows it.
   */
  variant?: "marker" | "plain";
  /**
   * Whether to remove all default component styling.
   * When true, only user-provided className styles are applied.
   */
  unstyled?: boolean;
  /**
   * Additional CSS classes to apply to the indicator container.
   * Merged with component's default styling unless unstyled is true.
   */
  className?: string;
  /**
   * Custom content to display as the indicator when no icon is provided.
   * Can be text, symbols, or other React nodes to serve as list markers.
   */
  children?: React.ReactNode;
} & VariantProps<typeof indicatorVariants>;

/**
 * Flexible list component for creating ordered and unordered lists with custom styling.
 *
 * @component
 * @example
 * ```tsx
 * <TextList variant="plain">
 *   <TextListItem>
 *     <TextListIndicator icon={CheckIcon} />
 *     First item
 *   </TextListItem>
 * </TextList>
 * ```
 */
export function TextList({
  as: Component = "ul",
  variant,
  align,
  unstyled,
  className,
  children,
  ...props
}: TextListProps) {
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
 * Individual list item component with consistent styling and alignment.
 *
 * @component
 */
export function TextListItem({
  variant,
  align,
  unstyled,
  className,
  children,
  ...props
}: TextListItemProps) {
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
 * Custom indicator component for list items with flexible icon or content support.
 */
/**
 * Indicator component for list items with icon or custom content support.
 *
 * @component
 */
export function TextListIndicator({
  icon: IconComponent,
  size = "base",
  variant,
  unstyled,
  className,
  children,
  ...props
}: TextListIndicatorProps) {
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
