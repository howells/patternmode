/**
 * Tab Navigation Components.
 *
 * A navigation component system built on Base UI NavigationMenu for creating
 * tab-style navigation with active states and hover effects. Perfect for
 * page-level navigation, content sections, and horizontal navigation patterns.
 *
 * Features:
 * - Base UI NavigationMenu integration for accessibility
 * - Tab-style visual design with underline indicators
 * - Active state management with visual feedback
 * - Hover effects and smooth transitions
 * - Disabled state support
 * - Keyboard navigation and focus management
 * - Horizontal scrolling for overflow
 * - Dark mode compatibility
 * - Clean border styling with customizable colors.
 *
 * @example
 * ```tsx
 * // Basic tab navigation
 * <TabNavigation>
 *   <TabNavigationLink href="/dashboard">Dashboard</TabNavigationLink>
 *   <TabNavigationLink href="/analytics" data-active>Analytics</TabNavigationLink>
 *   <TabNavigationLink href="/settings">Settings</TabNavigationLink>
 * </TabNavigation>
 *
 * // With disabled link
 * <TabNavigation>
 *   <TabNavigationLink href="/overview">Overview</TabNavigationLink>
 *   <TabNavigationLink href="/details">Details</TabNavigationLink>
 *   <TabNavigationLink disabled>Coming Soon</TabNavigationLink>
 * </TabNavigation>
 *
 * // Page section navigation
 * <TabNavigation className="mb-6">
 *   <TabNavigationLink href="/profile/general" data-active>
 *     General
 *   </TabNavigationLink>
 *   <TabNavigationLink href="/profile/security">
 *     Security
 *   </TabNavigationLink>
 *   <TabNavigationLink href="/profile/notifications">
 *     Notifications
 *   </TabNavigationLink>
 *   <TabNavigationLink href="/profile/billing">
 *     Billing
 *   </TabNavigationLink>
 * </TabNavigation>
 * ```
 */

// Tremor TabNavigation [v1.0.0] - Base UI

import { NavigationMenu } from "@base-ui-components/react/navigation-menu";
import React from "react";

import { cx, focusRing } from "../../lib/utils";

/**
 * Tab-based navigation component for switching between related content sections.
 *
 * @id tab-navigation
 * @name TabNavigation
 * @icon Folder
 * @category navigation
 * @component
 * @param props - Component properties.
 */
const TabNavigation = ({ ref: forwardedRef, className, children, ...props }: Omit<
    React.ComponentPropsWithoutRef<typeof NavigationMenu.Root>,
    "orientation" | "defaultValue"
  > & { ref?: React.RefObject<React.ElementRef<typeof NavigationMenu.Root> | null> }) => (
  <NavigationMenu.Root ref={forwardedRef} {...props}>
    <NavigationMenu.List
      className={cx(
        // base
        "flex items-center justify-start whitespace-nowrap border-b [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        // border color
        "border-zinc-200 dark:border-zinc-800",
        className,
      )}
    >
      {children}
    </NavigationMenu.List>
  </NavigationMenu.Root>
);

TabNavigation.displayName = "TabNavigation";

/**
 * Individual tab navigation link with active state and hover effects.
 *
 * Creates a clickable navigation link with tab-style visual design including
 * underline indicators and smooth transitions. Supports active states through
 * data-active attribute and disabled states for unavailable sections.
 *
 * @param href - URL for the navigation link.
 * @param disabled - Whether the link should be disabled.
 * @param children - Link content (typically text).
 * @param className - Additional CSS classes.
 * @param props - Additional NavigationMenu.Link props.
 *
 * @component
 * @example
 * ```tsx
 * // Regular navigation link
 * <TabNavigationLink href="/dashboard">
 *   Dashboard
 * </TabNavigationLink>
 *
 * // Active navigation link
 * <TabNavigationLink href="/analytics" data-active>
 *   Analytics
 * </TabNavigationLink>
 *
 * // Disabled navigation link
 * <TabNavigationLink disabled>
 *   Coming Soon
 * </TabNavigationLink>
 * ```
 */
const TabNavigationLink = ({ ref: forwardedRef, disabled, className, children, ...props }: React.ComponentPropsWithoutRef<typeof NavigationMenu.Link> & {
  disabled?: boolean;
} & { ref?: React.RefObject<React.ElementRef<typeof NavigationMenu.Link> | null> }) => (
  <NavigationMenu.Item className="flex" aria-disabled={disabled}>
    <NavigationMenu.Link
      aria-disabled={disabled}
      className={cx(
        "group relative flex shrink-0 select-none items-center justify-center",
        disabled ? "pointer-events-none" : "",
      )}
      ref={forwardedRef}
      {...props}
    >
      <span
        className={cx(
          // base
          "-mb-px flex items-center justify-center whitespace-nowrap border-b-2 border-transparent px-3 pb-2 text-sm font-medium transition-all",
          // text color
          "text-zinc-500 dark:text-zinc-500",
          // hover
          "group-hover:text-zinc-700 dark:group-hover:text-zinc-400",
          // border hover
          "group-hover:border-zinc-200 dark:group-hover:border-zinc-400",
          // selected
          "group-data-active:border-blue-500 group-data-active:text-blue-500",
          "dark:group-data-active:border-blue-500 dark:group-data-active:text-blue-500",
          // disabled
          disabled
            ? "pointer-events-none text-zinc-300 dark:text-zinc-700"
            : "",
          focusRing,
          className,
        )}
      >
        {children}
      </span>
    </NavigationMenu.Link>
  </NavigationMenu.Item>
);

TabNavigationLink.displayName = "TabNavigationLink";

export { TabNavigation, TabNavigationLink };
