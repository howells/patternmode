"use client";

import { LayoutGroup } from "framer-motion";
import { Circle, CircleSmall, PanelLeft, PanelLeftDashed } from "lucide-react";
import Link from "next/link";
import React, { useId, useState } from "react";

import { cx } from "../../lib/utils";
import { Button } from "../button";
import { ScrollArea } from "../scroll-area";
import { Separator } from "../separator";
import { Tooltip } from "../tooltip";

/**
 * Props for the SidebarTitle component.
 */
type SidebarTitleProps = {
  /**
   * Heading level determining text size and visual hierarchy.
   * - 1: Regular size for primary titles
   * - 2: Smaller size for secondary titles with uppercase styling.
   */
  level?: 1 | 2;
  /**
   * Optional URL to make the title a clickable link.
   */
  href?: string;
  /**
   * Title content to display.
   */
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"span">;

/**
 * Title component for sidebar navigation hierarchy and section headers.
 */
function SidebarTitle({
  level = 1,
  href,
  children,
  className,
  ...props
}: SidebarTitleProps) {
  const baseClasses = cx(
    "font-medium transition-colors",
    level === 1 ? "text-xs" : "text-2xs uppercase tracking-wide",
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cx(
          baseClasses,
          "hover:text-zinc-700 dark:hover:text-zinc-300",
        )}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <span className={baseClasses} {...props}>
      {children}
    </span>
  );
}

/**
 * Props for the Sidebar component.
 */
type SidebarProps = {
  /**
   * Whether the sidebar is in collapsed state with reduced width.
   * Shows only icons and tooltips when collapsed.
   */
  isCollapsed?: boolean;
  /**
   * Callback fired when the toggle button is clicked.
   * Used to control collapsed state from parent component.
   */
  onToggle?: () => void;
  /**
   * Whether to show the collapse/expand toggle button.
   * Displays a toggle button in the top-right corner when enabled.
   */
  showToggle?: boolean;
} & React.ComponentPropsWithoutRef<"nav">;

/**
 * Collapsible sidebar component for navigation and supplementary content organization.
 */
export function Sidebar({
  className,
  children,
  isCollapsed = false,
  onToggle,
  showToggle = false,
  ...props
}: SidebarProps) {
  return (
    <nav
      {...props}
      data-component="Sidebar"
      className={cx(className, "flex h-full min-h-0 flex-col relative")}
      style={{
        width: "var(--sidebar-width, 16rem)",
      }}
    >
      {showToggle && (
        <div
          className={cx("absolute top-4 z-10", {
            "right-2": isCollapsed,
            "right-4": !isCollapsed,
          })}
        >
          <SidebarToggle isCollapsed={isCollapsed} onToggle={onToggle} />
        </div>
      )}
      {children}
    </nav>
  );
}

/**
 * Props for the SidebarToggle component.
 */
type SidebarToggleProps = {
  /**
   * Whether the sidebar is currently collapsed.
   * Determines which icon to show and the aria-label text.
   */
  isCollapsed?: boolean;
  /**
   * Callback fired when the toggle button is clicked.
   */
  onToggle?: () => void;
} & React.ComponentPropsWithoutRef<"button">;

/**
 * Toggle button for collapsing and expanding the sidebar.
 */
export function SidebarToggle({
  className,
  isCollapsed,
  onToggle,
  ...props
}: SidebarToggleProps) {
  return (
    <Button
      {...props}
      data-component="SidebarToggle"
      onClick={onToggle}
      variant="inverse-ghost"
      size="icon-sm"
      shadow={false}
      className={cx(className)}
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      leftIcon={isCollapsed ? PanelLeft : PanelLeftDashed}
    />
  );
}

/**
 * Props for the SidebarHeader component.
 */
type SidebarHeaderProps = {
  /**
   * Whether the sidebar is currently collapsed.
   * Affects spacing and layout of header content.
   */
  isCollapsed?: boolean;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * Header section of the sidebar for branding, titles, or primary actions.
 */
export function SidebarHeader({
  className,
  isCollapsed,
  ...props
}: SidebarHeaderProps) {
  return (
    <div
      {...props}
      data-component="SidebarHeader"
      className={cx(
        className,
        "h-16 flex flex-col border-b border-zinc-950/5 dark:border-white/5 transition-all duration-200",
      )}
    />
  );
}

/**
 * Props for the SidebarBody component.
 */
type SidebarBodyProps = {
  /**
   * Whether the sidebar is currently collapsed.
   * Affects scrollbar styling and content spacing.
   */
  isCollapsed?: boolean;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * Scrollable body section containing the main sidebar navigation content.
 */
export function SidebarBody({
  className,
  isCollapsed,
  children,
  ...props
}: SidebarBodyProps) {
  return (
    <ScrollArea
      data-component="SidebarBody"
      className={cx(className, "flex-1")}
      viewportClassName="[&>*+*]:mt-6"
      scrollbarClassName={cx(
        // Default scrollbar width
        "w-2.5",
        // Thinner scrollbar when collapsed
        isCollapsed && "w-1.5",
      )}
      thumbClassName={cx(
        // Default thumb styling is handled by ScrollArea
        // Make thumb thinner when collapsed to match scrollbar
        isCollapsed && "bg-zinc-400 dark:bg-zinc-500",
      )}
      {...props}
    >
      <div data-component="SidebarContent">{children}</div>
    </ScrollArea>
  );
}

/**
 * Props for the SidebarFooter component.
 */
type SidebarFooterProps = {
  /**
   * Whether the sidebar is currently collapsed.
   * Affects layout and spacing of footer content.
   */
  isCollapsed?: boolean;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * Footer section of the sidebar for secondary actions or user information.
 */
export function SidebarFooter({
  className,
  isCollapsed,
  ...props
}: SidebarFooterProps) {
  return (
    <div
      {...props}
      data-component="SidebarFooter"
      className={cx(
        className,
        "flex flex-col border-t border-zinc-950/5 dark:border-white/5 transition-all duration-200 p-4",
      )}
    />
  );
}

/**
 * Props for the SidebarGroup component.
 */
type SidebarGroupProps = {
  /**
   * Optional title displayed at the top of the group.
   */
  title?: React.ReactNode;
  /**
   * Optional URL to make the group title clickable.
   */
  href?: string;
  /**
   * Optional action elements displayed alongside the title.
   */
  actions?: React.ReactNode;
  /**
   * Whether the sidebar is currently collapsed.
   * Shows group as icon with tooltip when collapsed.
   */
  isCollapsed?: boolean;
  /**
   * Hierarchy level determining styling and icon size.
   * - 1: Primary groups with larger icons
   * - 2: Secondary groups with smaller icons.
   */
  level?: 1 | 2;
  /**
   * Optional icon component displayed when collapsed.
   * Defaults to Circle for level 1, CircleSmall for level 2.
   */
  groupIcon?: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
  /**
   * Delay in milliseconds before showing tooltip when collapsed.
   */
  tooltipDelay?: number;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * Group container for organizing related sidebar items with optional title and actions.
 */
export function SidebarGroup({
  className,
  title,
  href,
  actions,
  children,
  isCollapsed,
  level = 1,
  groupIcon,
  tooltipDelay = 0,
  ...props
}: SidebarGroupProps) {
  const id = useId();

  // When collapsed, show group as an icon item with tooltip
  if (isCollapsed && title) {
    // Use different icons based on level: Circle for level 1, Dot for level 2
    const DefaultIcon = level === 1 ? Circle : CircleSmall;
    const GroupIcon = groupIcon || DefaultIcon;

    const groupButton = (
      <span className="relative block px-2">
        {href
          ? (
              <Link
                href={href}
                className={cx(
                  "relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium outline-hidden transition-all duration-100 ease-in-out",
                  "h-8 w-8 rounded-md",
                  "text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100",
                  "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                  "focus-visible:ring-2 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300",
                )}
              >
                <GroupIcon className="size-4" strokeWidth={1.5} />
              </Link>
            )
          : (
              <div
                className={cx(
                  "relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium",
                  "h-8 w-8 rounded-md",
                  "text-zinc-700 dark:text-zinc-300",
                )}
              >
                <GroupIcon className="size-4" strokeWidth={1.5} />
              </div>
            )}
      </span>
    );

    return (
      <LayoutGroup id={id}>
        <div
          {...props}
          data-component="SidebarGroup"
          className={cx(className, "py-1")}
        >
          {typeof title === "string"
            ? (
                <Tooltip
                  content={title}
                  side="right"
                  sideOffset={8}
                  delayDuration={tooltipDelay}
                >
                  {groupButton}
                </Tooltip>
              )
            : (
                groupButton
              )}
          <div className="space-y-1">{children}</div>
        </div>
      </LayoutGroup>
    );
  }

  // Normal expanded state
  return (
    <LayoutGroup id={id}>
      <div
        {...props}
        data-component="SidebarGroup"
        className={cx(className, "space-y-2 py-4")}
      >
        {title && (
          <div className="flex items-center justify-between px-4">
            <SidebarTitle level={level} href={href}>
              {title}
            </SidebarTitle>
            {actions && (
              <div
                className={cx("flex items-center", isCollapsed && "opacity-0")}
              >
                {actions}
              </div>
            )}
          </div>
        )}
        <div className="space-y-1">{children}</div>
      </div>
    </LayoutGroup>
  );
}

/**
 * Props for the SidebarItem component.
 */
type SidebarItemProps = {
  /**
   * Whether this item represents the current/active page or section.
   * Applies active styling to indicate current location.
   */
  current?: boolean;
  /**
   * Whether the sidebar is currently collapsed.
   * Shows item as icon with tooltip when collapsed.
   */
  isCollapsed?: boolean;
  /**
   * Optional URL to make the item a navigable link.
   */
  href?: string;
  /**
   * Icon component displayed alongside or instead of text.
   * Used as the main identifier when sidebar is collapsed.
   */
  icon?: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
  /**
   * Left-side icon component (alternative to icon prop).
   */
  leftIcon?: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
  /**
   * Delay in milliseconds before showing tooltip when collapsed.
   */
  tooltipDelay?: number;
} & Omit<React.ComponentPropsWithoutRef<"button">, "className"> & {
  className?: string;
  ref?: React.RefObject<HTMLButtonElement | null>;
};

/**
 * Individual navigation item with support for links, icons, and collapsed states.
 */
export const SidebarItem = function SidebarItem(
  { ref, current, className, children, isCollapsed, href, icon, leftIcon: LeftIcon, tooltipDelay = 0, onClick, ...props }: SidebarItemProps,
) {
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (href) {
      setIsNavigating(true);
      setTimeout(() => setIsNavigating(false), 150);
    }
    if (onClick) {
      onClick(e as React.MouseEvent<HTMLButtonElement>);
    }
  };

  // Handle collapsed state: if children is a simple string, apply collapsed logic
  const shouldHideContent = isCollapsed && typeof children === "string";
  const displayChildren = shouldHideContent ? null : children;

  // If it's a simple string and collapsed, wrap it with collapsed styling
  const wrappedChildren
    = isCollapsed && typeof children === "string"
      ? null
      : React.isValidElement(
        children,
      )
        ? (
            children
          )
        : (
            <span
              className={cx(
                "truncate transition-opacity duration-200",
                isCollapsed && "opacity-0 w-0 overflow-hidden",
              )}
            >
              {children}
            </span>
          );

  // For collapsed state with tooltip, create a simple element to avoid nested buttons
  if (isCollapsed && typeof children === "string") {
    // Safely render icon with proper error handling
    const renderIcon = (
      IconComponent:
        | React.ComponentType<{ className?: string; strokeWidth?: number }>
        | null
        | undefined,
    ) => {
      if (!IconComponent || typeof IconComponent !== "function") {
        return null;
      }

      try {
        return React.createElement(IconComponent, {
          className: "size-4",
          strokeWidth: 1.5,
        });
      }
      catch (error) {
        // Silently catch any icon rendering errors
        console.warn("Icon rendering failed:", error);
        return null;
      }
    };

    const collapsedElement = href
      ? (
          <Link
            href={href}
            onClick={handleClick}
            className={cx(
              "relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium outline-hidden transition-all duration-100 ease-in-out",
              "h-8 w-8 rounded-md",
              "text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100",
              "hover:bg-zinc-100 dark:hover:bg-zinc-800",
              "focus-visible:ring-2 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300",
            )}
          >
            {renderIcon(icon || LeftIcon)}
          </Link>
        )
      : (
          <button
            onClick={handleClick}
            className={cx(
              "relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium outline-hidden transition-all duration-100 ease-in-out",
              "h-8 w-8 rounded-md",
              "text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100",
              "hover:bg-zinc-100 dark:hover:bg-zinc-800",
              "focus-visible:ring-2 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300",
            )}
            {...props}
          >
            {renderIcon(icon || LeftIcon)}
          </button>
        );

    return (
      <span
        className={cx(className, "relative block px-2")}
        data-component="SidebarItem"
      >
        <Tooltip
          content={children}
          side="right"
          sideOffset={8}
          delayDuration={tooltipDelay}
        >
          {collapsedElement}
        </Tooltip>
      </span>
    );
  }

  // For expanded state or non-string children, use Button component
  const buttonElement = (
    <Button
      render={href ? <Link href={href} /> : undefined}
      variant="inverse-ghost"
      shadow={false}
      icon={icon}
      leftIcon={LeftIcon}
      onClick={handleClick}
      fullWidth={!isCollapsed}
      size={isCollapsed ? "icon-sm" : "sm"}
      textAlign={isCollapsed ? "center" : "left"}
      ref={ref}
      title={isCollapsed && typeof children === "string" ? children : undefined}
      {...props}
    >
      {wrappedChildren}
    </Button>
  );

  return (
    <span
      className={cx(className, "relative block px-2")}
      data-component="SidebarItem"
    >
      {buttonElement}
    </span>
  );
};

/**
 * Props for the SidebarDivider component.
 */
type SidebarDividerProps = {
  /**
   * Whether the sidebar is currently collapsed.
   * Hides the divider completely when collapsed.
   */
  isCollapsed?: boolean;
} & React.ComponentPropsWithoutRef<typeof Separator>;

/**
 * Visual separator for dividing sections within the sidebar.
 */
export function SidebarDivider({
  className,
  isCollapsed,
  ...props
}: SidebarDividerProps) {
  if (isCollapsed) { return null; }
  return (
    <Separator
      {...props}
      data-component="SidebarDivider"
      className={cx(className, "")}
    />
  );
}

export {
  type SidebarBodyProps,
  type SidebarDividerProps,
  type SidebarFooterProps,
  type SidebarGroupProps,
  type SidebarHeaderProps,
  type SidebarItemProps,
  type SidebarProps,
  type SidebarTitleProps,
  type SidebarToggleProps,
};
