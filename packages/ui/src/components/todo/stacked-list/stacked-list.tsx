/**
 * Stacked List Components.
 *
 * Comprehensive components for building structured lists with consistent styling
 * and interactive states. Inspired by Vercel's Entity pattern, provides a flexible
 * system for displaying lists of items with optional dividers, headers, and empty states.
 *
 * Features:
 * - Flexible compound component pattern (StackedList.Item, StackedList.Content, etc.)
 * - Interactive items with hover and focus states
 * - Optional dividers between items
 * - Configurable padding and spacing
 * - Left and right content slots for flexible layouts
 * - Header component for section titles and actions
 * - Empty state component with customizable messaging
 * - Active/selected state support
 * - Accessible focus management and keyboard navigation.
 *
 * @category data
 * @icon List
 * @example
 * ```tsx
 * // Basic stacked list
 * <StackedList>
 *   <StackedList.Item>
 *     <StackedList.Content
 *       title="John Doe"
 *       description="Software Engineer"
 *     />
 *   </StackedList.Item>
 *   <StackedList.Item>
 *     <StackedList.Content
 *       title="Jane Smith"
 *       description="Product Designer"
 *     />
 *   </StackedList.Item>
 * </StackedList>
 *
 * // List with header and actions
 * <div>
 *   <StackedList.Header
 *     title="Team Members"
 *     description="Manage your team members and their roles"
 *     actions={<Button size="sm">Add Member</Button>}
 *   />
 *   <StackedList>
 *     <StackedList.Item
 *       left={<Avatar src="/avatar1.jpg" />}
 *       right={<Button size="sm" variant="outline">Edit</Button>}
 *     >
 *       <StackedList.Content
 *         title="John Doe"
 *         description="john.doe@company.com"
 *       />
 *     </StackedList.Item>
 *   </StackedList>
 * </div>
 *
 * // Interactive list with navigation
 * <StackedList>
 *   <StackedList.Item href="/dashboard" active>
 *     <StackedList.Content
 *       title="Dashboard"
 *       description="Overview and analytics"
 *     />
 *   </StackedList.Item>
 *   <StackedList.Item href="/projects">
 *     <StackedList.Content
 *       title="Projects"
 *       description="Manage your projects"
 *     />
 *   </StackedList.Item>
 * </StackedList>
 *
 * // List with empty state
 * <div>
 *   <StackedList.Header title="Recent Activity" />
 *   <StackedList>
 *     <StackedList.Empty
 *       title="No recent activity"
 *       description="Your recent activity will appear here"
 *       icon={<ActivityIcon />}
 *       action={<Button>View All Activity</Button>}
 *     />
 *   </StackedList>
 * </div>
 *
 * // Complex list with multiple content types
 * <StackedList showDividers padding={6}>
 *   <StackedList.Item
 *     left={<StatusIndicator status="success" />}
 *     right={<Badge>Active</Badge>}
 *   >
 *     <StackedList.Content
 *       title="Production Server"
 *       description="All systems operational"
 *     />
 *   </StackedList.Item>
 *   <StackedList.Item
 *     left={<StatusIndicator status="warning" />}
 *     right={<Badge variant="warning">Maintenance</Badge>}
 *   >
 *     <StackedList.Content
 *       title="Staging Server"
 *       description="Scheduled maintenance in progress"
 *     />
 *   </StackedList.Item>
 * </StackedList>
 * ```
 */

import React from "react";

import { cx } from "../../../lib/utils";
import { Grid, GridCell } from "../grid/grid";
import { HStack, Stack } from "../stack/stack";
import { Subheading } from "../subheading/subheading";
import { Text } from "../text/text";

// Base container for the stacked list (Entity.List equivalent)
type StackedListProps = {
  /**
   * Whether to show dividers between items.
   * @example
   * ```tsx
   * <StackedListRoot>Content</StackedListRoot>
   * ```
   */
  showDividers?: boolean;
  /**
   * Gap between items (4px grid scale: 0-24).
   */
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
  /**
   * Padding for each item (4px grid scale: 0-24).
   */
  padding?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
} & React.HTMLAttributes<HTMLUListElement>;

/**
 * Vertically stacked list component for displaying related items with consistent spacing.
 *
 * @id stacked-list
 * @name StackedList
 * @icon List
 * @category data
 * @component
 * @param props - Component properties.
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
};

StackedListRoot.displayName = "StackedListRoot";

// Individual list item - following Vercel's Entity pattern
type StackedListItemProps = {
  /**
   * Content for the left side (avatar, icon, checkbox, etc.).
   */
  left?: React.ReactNode;
  /**
   * Content for the right side (actions, buttons, text, etc.).
   */
  right?: React.ReactNode;
  /**
   * HTML element or component to render as.
   */
  as?: React.ElementType;
  /**
   * Whether the item is clickable.
   */
  href?: string;
  /**
   * Whether the item is currently active/selected.
   */
  active?: boolean;
  /**
   * Internal props passed from StackedList.
   */
  padding?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
  isFirst?: boolean;
  isLast?: boolean;
} & React.HTMLAttributes<HTMLLIElement>;

const StackedListItem = (
  { ref, left, right, as: Component = "li", href, active = false, padding = 4, isFirst = false, isLast = false, className, children, ...props }: StackedListItemProps & { ref?: React.RefObject<HTMLLIElement | null> },
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

// Content component (Entity.Content equivalent)
type StackedListContentProps = {
  /**
   * Primary title.
   */
  title: React.ReactNode;
  /**
   * Secondary description.
   */
  description?: React.ReactNode;
  /**
   * Whether to fill available space.
   */
  fill?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "title">;

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
   */
  title: string;
  /**
   * Header description.
   */
  description?: string;
  /**
   * Action elements for the header.
   */
  actions?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const StackedListHeader = ({ ref, title, description, actions, className, ...props }: StackedListHeaderProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <Grid
      ref={ref}
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
   */
  title?: string;
  /**
   * Empty state description.
   */
  description?: string;
  /**
   * Icon or any visual element for empty state.
   */
  icon?: React.ReactNode;
  /**
   * Action element (button, link, etc.).
   */
  action?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

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
 *
 * @id stacked-list
 * @name StackedList
 * @icon List
 * @category data
 * @component
 * @param props - Component properties.
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
