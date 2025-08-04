import type { SpacingValue } from "../../lib/spacing-utils";

import React from "react";
import { getPaddingClass } from "../../lib/spacing-utils";
import { cx } from "../../lib/utils";
import { Grid, GridCell } from "../grid";
import { HStack, Stack } from "../stack";
import { Subheading } from "../subheading";
import { Text } from "../text";

// Individual list item - following Vercel's Entity pattern
type StackedListItemProps = {
  /**
   * Content for the left side (avatar, icon, checkbox, etc.).
   * Displays additional context or visual elements before the main content.
   */
  left?: React.ReactNode;
  /**
   * Content for the right side (actions, buttons, text, etc.).
   * Provides space for actions, metadata, or status indicators.
   */
  right?: React.ReactNode;
  /**
   * HTML element or component to render as.
   * Allows semantic flexibility (li, div, button, a, etc.) based on use case.
   */
  as?: React.ElementType;
  /**
   * Whether the item is clickable.
   * When provided, makes the entire item interactive and navigable.
   */
  href?: string;
  /**
   * Whether the item is currently active/selected.
   * Applies active styling to indicate current selection or focus.
   */
  active?: boolean;
  /**
   * Internal props passed from StackedList.
   * These are automatically provided by the parent component.
   */
  padding?: SpacingValue;
} & React.HTMLAttributes<HTMLLIElement>;

/**
 * Individual item within the stacked list with flexible layout options.
 */
const StackedListItem = (
  { ref, left, right, as: Component = "li", href, active = false, padding = 4, className, children, ...props }: StackedListItemProps & { ref?: React.RefObject<HTMLLIElement | null> },
) => {
  const isInteractive = !!(href || props.onClick || Component === "button");

  const itemContent = (
    <HStack
      gap={4}
      align="center"
      className={cx(
        "w-full",
        // Padding using shared spacing utility
        getPaddingClass(padding),
        // Interactive states
        isInteractive && [
          "cursor-pointer transition-colors",
          "hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset",
        ],
        // Active state
        active && "bg-blue-50 dark:bg-blue-950/50",
      )}
    >
      {/* Left content */}
      {left && <div className="flex shrink-0 items-center">{left}</div>}

      {/* Main content */}
      <div className="min-w-0 flex-1">{children}</div>

      {/* Right content */}
      {right && <div className="flex shrink-0 items-center">{right}</div>}
    </HStack>
  );

  const componentProps = {
    ref,
    className,
    ...(Component === "button" && { type: "button" }),
    ...props,
  };

  if (href) {
    return (
      <Component {...componentProps} href={href} as={href ? "a" : undefined}>
        {itemContent}
      </Component>
    );
  }

  return <Component {...componentProps}>{itemContent}</Component>;
};

StackedListItem.displayName = "StackedListItem";

// Base container for the stacked list (Entity.List equivalent)
type StackedListProps = {
  /**
   * Whether to show dividers between items.
   * When true, adds subtle borders between list items for visual separation.
   */
  showDividers?: boolean;
  /**
   * Gap between items (4px grid scale: 0-24).
   * Controls the vertical spacing between list items using the 4px grid system.
   */
  gap?: SpacingValue;
  /**
   * Padding for each item (4px grid scale: 0-24).
   * Sets the internal padding for each list item using the 4px grid system.
   */
  padding?: SpacingValue;
} & React.HTMLAttributes<HTMLUListElement>;

/**
 * Vertically stacked list component for displaying related items with consistent spacing.
 */
const StackedListRoot = (
  { ref, showDividers = true, gap = 0, padding = 4, className, children, ...props }: StackedListProps & { ref?: React.RefObject<HTMLUListElement | null> },
) => {
  return (
    <Stack
      as="ul"
      ref={ref}
      direction="vertical"
      gap={gap}
      className={cx(
        // Base styles
        "overflow-hidden",
        // Dividers
        showDividers && "divide-y divide-zinc-200 dark:divide-zinc-800",
        className,
      )}
      data-testid="stacked-list"
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === StackedListItem) {
          return React.cloneElement(child, {
            padding,
          });
        }
        return child;
      })}
    </Stack>
  );
};

StackedListRoot.displayName = "StackedListRoot";

// Content component (Entity.Content equivalent)
type StackedListContentProps = {
  /**
   * Primary title.
   * The main heading or name for the list item.
   */
  title: React.ReactNode;
  /**
   * Secondary description.
   * Additional context or details about the list item.
   */
  description?: React.ReactNode;
  /**
   * Whether to fill available space.
   * Controls if the content should expand to fill the container width.
   */
  fill?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "title">;

/**
 * Content component for displaying title and description within list items.
 */
const StackedListContent = ({ ref, title, description, fill = true, className, ...props }: StackedListContentProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <div
      ref={ref}
      className={cx("min-w-0", fill && "flex-1", className)}
      {...props}
    >
      <Text
        size="sm"
        className="truncate font-medium text-zinc-900 dark:text-zinc-50"
      >
        {title}
      </Text>
      {description && (
        <Text
          size="sm"
          className="mt-1 truncate text-zinc-600 dark:text-zinc-400"
        >
          {description}
        </Text>
      )}
    </div>
  );
};

StackedListContent.displayName = "StackedListContent";

// Header component for sections
type StackedListHeaderProps = {
  /**
   * Header title.
   * The main heading for the list section.
   */
  title: string;
  /**
   * Header description.
   * Additional context or instructions for the list section.
   */
  description?: string;
  /**
   * Action elements for the header.
   * Buttons, links, or other interactive elements for list-level actions.
   */
  actions?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Header component for list sections with title, description, and actions.
 */
const StackedListHeader = ({ title, description, actions, className, ...props }: StackedListHeaderProps) => {
  return (
    <Grid
      columns={2}
      rows={1}
      gap={0}
      minHeight="none"
      className={cx(
        "border-b border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/50",
        className,
      )}
      {...props}
    >
      <GridCell className="flex flex-col">
        <Subheading level={3} className="text-zinc-900 dark:text-zinc-50">
          {title}
        </Subheading>
        {description && (
          <Text size="sm" className=" text-zinc-600 dark:text-zinc-400">
            {description}
          </Text>
        )}
      </GridCell>
      {actions && (
        <GridCell className="flex items-center justify-end">
          <div className="flex items-center gap-2">{actions}</div>
        </GridCell>
      )}
    </Grid>
  );
};

StackedListHeader.displayName = "StackedListHeader";

// Empty state component
type StackedListEmptyProps = {
  /**
   * Empty state title.
   * The main message when the list has no items.
   */
  title?: string;
  /**
   * Empty state description.
   * Additional context or guidance for the empty state.
   */
  description?: string;
  /**
   * Icon or any visual element for empty state.
   * Visual element to enhance the empty state message.
   */
  icon?: React.ReactNode;
  /**
   * Action element (button, link, etc.).
   * Primary action to help users add content or navigate elsewhere.
   */
  action?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Empty state component for lists with no items.
 */
const StackedListEmpty = (
  { ref, title = "No items", description = "There are no items to display.", icon, action, className, ...props }: StackedListEmptyProps & { ref?: React.RefObject<HTMLDivElement | null> },
) => {
  return (
    <div
      ref={ref}
      className={cx(
        "flex flex-col items-center justify-center py-12 text-center",
        className,
      )}
      {...props}
    >
      {icon && (
        <div className="mb-4 text-zinc-400 dark:text-zinc-600">{icon}</div>
      )}
      <Subheading level={3} className="text-zinc-900 dark:text-zinc-50">
        {title}
      </Subheading>
      <Text size="sm" className="mt-1 text-zinc-600 dark:text-zinc-400">
        {description}
      </Text>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

StackedListEmpty.displayName = "StackedListEmpty";

// Compound component setup (like Entity.List, Entity.Content)
/**
 * Vertically stacked list component for displaying related items with consistent spacing.
 */
const StackedList = Object.assign(StackedListRoot, {
  Item: StackedListItem,
  Content: StackedListContent,
  Header: StackedListHeader,
  Empty: StackedListEmpty,
});

export {
  StackedList,
  StackedListContent,
  type StackedListContentProps,
  StackedListEmpty,
  type StackedListEmptyProps,
  StackedListHeader,
  type StackedListHeaderProps,
  StackedListItem,
  type StackedListItemProps,
  type StackedListProps,
};
