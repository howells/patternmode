import { cx } from "../../lib/utils";
import React from "react";
import { Grid, GridCell } from "../grid/grid";
import { HStack, Stack } from "../stack/stack";
import { Subheading } from "../subheading/subheading";
import { Text } from "../text/text";

// Base container for the stacked list (Entity.List equivalent)
interface StackedListProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * Whether to show dividers between items
 * @example
 * ```tsx
 * <StackedListRoot>Content</StackedListRoot>
 * ```
   */
  showDividers?: boolean;
  /**
   * Gap between items (4px grid scale: 0-24)
   */
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
  /**
   * Padding for each item (4px grid scale: 0-24)
   */
  padding?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
}

/**
 * Stacked List
 *
 * @component
 * @id stacked-list
 * @name Stacked List
 */
const StackedListRoot = React.forwardRef<HTMLUListElement, StackedListProps>(
  (
    {
      showDividers = true,
      gap = 0,
      padding = 4,
      className,
      children,
      ...props
    },
    ref
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
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === StackedListItem) {
            return React.cloneElement(child, {
              // @ts-expect-error - we know this is a StackedListItem
              padding,
              isFirst: index === 0,
              isLast: index === React.Children.count(children) - 1,
            });
          }
          return child;
        })}
      </Stack>
    );
  }
);

StackedListRoot.displayName = "StackedListRoot";

// Individual list item - following Vercel's Entity pattern
interface StackedListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Content for the left side (avatar, icon, checkbox, etc.)
   */
  left?: React.ReactNode;
  /**
   * Content for the right side (actions, buttons, text, etc.)
   */
  right?: React.ReactNode;
  /**
   * HTML element or component to render as
   */
  as?: React.ElementType;
  /**
   * Whether the item is clickable
   */
  href?: string;
  /**
   * Whether the item is currently active/selected
   */
  active?: boolean;
  /**
   * Internal props passed from StackedList
   */
  padding?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
  isFirst?: boolean;
  isLast?: boolean;
}

const StackedListItem = React.forwardRef<HTMLLIElement, StackedListItemProps>(
  (
    {
      left,
      right,
      as: Component = "li",
      href,
      active = false,
      padding = 4,
      isFirst = false,
      isLast = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isInteractive = !!(href || props.onClick || Component === "button");

    const itemContent = (
      <HStack
        gap={4}
        align="center"
        className={cx(
          "w-full",
          // Padding using Stack's padding system
          padding === 0 && "p-0",
          padding === 1 && "p-1",
          padding === 2 && "p-2",
          padding === 3 && "p-3",
          padding === 4 && "p-4",
          padding === 5 && "p-5",
          padding === 6 && "p-6",
          padding === 8 && "p-8",
          padding === 10 && "p-10",
          padding === 12 && "p-12",
          padding === 16 && "p-16",
          padding === 20 && "p-20",
          padding === 24 && "p-24",
          // Interactive states
          isInteractive && [
            "cursor-pointer transition-colors",
            "hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset",
          ],
          // Active state
          active && "bg-blue-50 dark:bg-blue-950/50"
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
      className: className,
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
  }
);

StackedListItem.displayName = "StackedListItem";

// Content component (Entity.Content equivalent)
interface StackedListContentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * Primary title
   */
  title: React.ReactNode;
  /**
   * Secondary description
   */
  description?: React.ReactNode;
  /**
   * Whether to fill available space
   */
  fill?: boolean;
}

const StackedListContent = React.forwardRef<
  HTMLDivElement,
  StackedListContentProps
>(({ title, description, fill = true, className, ...props }, ref) => {
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
});

StackedListContent.displayName = "StackedListContent";

// Header component for sections
interface StackedListHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Header title
   */
  title: string;
  /**
   * Header description
   */
  description?: string;
  /**
   * Action elements for the header
   */
  actions?: React.ReactNode;
}

const StackedListHeader = React.forwardRef<
  HTMLDivElement,
  StackedListHeaderProps
>(({ title, description, actions, className, ...props }, ref) => {
  return (
    <Grid
      ref={ref}
      columns={2}
      rows={1}
      gap={0}
      minHeight="none"
      className={cx(
        "border-b border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/50",
        className
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
});

StackedListHeader.displayName = "StackedListHeader";

// Empty state component
interface StackedListEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Empty state title
   */
  title?: string;
  /**
   * Empty state description
   */
  description?: string;
  /**
   * Icon or any visual element for empty state
   */
  icon?: React.ReactNode;
  /**
   * Action element (button, link, etc.)
   */
  action?: React.ReactNode;
}

const StackedListEmpty = React.forwardRef<
  HTMLDivElement,
  StackedListEmptyProps
>(
  (
    {
      title = "No items",
      description = "There are no items to display.",
      icon,
      action,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cx(
          "flex flex-col items-center justify-center py-12 text-center",
          className
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
  }
);

StackedListEmpty.displayName = "StackedListEmpty";

// Compound component setup (like Entity.List, Entity.Content)
const StackedList = Object.assign(StackedListRoot, {
  Item: StackedListItem,
  Content: StackedListContent,
  Header: StackedListHeader,
  Empty: StackedListEmpty,
});

export {
  StackedList,
  StackedListContent,
  StackedListEmpty,
  StackedListHeader,
  StackedListItem,
  type StackedListContentProps,
  type StackedListEmptyProps,
  type StackedListHeaderProps,
  type StackedListItemProps,
  type StackedListProps,
};
