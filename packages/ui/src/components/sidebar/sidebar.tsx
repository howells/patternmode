"use client";

import { cx } from "../../lib/utils";
import { LayoutGroup } from "framer-motion";
import { Circle, CircleSmall, PanelLeft, PanelLeftDashed } from "lucide-react";
import Link from "next/link";
import React, { forwardRef, useId, useState } from "react";
import { Button } from "../button/button";
import { ScrollArea } from "../scroll-area/scroll-area";
import { Separator } from "../separator/separator";
import { Tooltip } from "../tooltip/tooltip";

// Sidebar-specific title component for navigation hierarchy
/**
 * A versatile sidebar component for navigation and content organization.
 *
 * Sidebar
 *
 * @component
 * @id sidebar
 * @name Sidebar
 * @example
 * ```tsx
 * <SidebarTitle>Content</SidebarTitle>
 * ```
 */
function SidebarTitle({
  level = 1,
  href,
  children,
  className,
  ...props
}: {
  level?: 1 | 2;
  href?: string;
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<"span">) {
  const baseClasses = cx(
    "font-medium transition-colors",
    level === 1 ? "text-xs" : "text-2xs uppercase tracking-wide",
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cx(
          baseClasses,
          "hover:text-zinc-700 dark:hover:text-zinc-300"
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

// Root Sidebar Container
export function Sidebar({
  className,
  children,
  isCollapsed = false,
  onToggle,
  showToggle = false,
  ...props
}: React.ComponentPropsWithoutRef<"nav"> & {
  isCollapsed?: boolean;
  onToggle?: () => void;
  showToggle?: boolean;
}) {
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

export function SidebarToggle({
  className,
  isCollapsed,
  onToggle,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & {
  isCollapsed?: boolean;
  onToggle?: () => void;
}) {
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

// Header (Level 0)
export function SidebarHeader({
  className,
  isCollapsed,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  isCollapsed?: boolean;
}) {
  return (
    <div
      {...props}
      data-component="SidebarHeader"
      className={cx(
        className,
        "h-16 flex flex-col border-b border-zinc-950/5 dark:border-white/5 transition-all duration-200"
      )}
    />
  );
}

// Scrollable Body
export function SidebarBody({
  className,
  isCollapsed,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  isCollapsed?: boolean;
}) {
  return (
    <ScrollArea
      data-component="SidebarBody"
      className={cx(className, "flex-1")}
      viewportClassName="[&>*+*]:mt-6"
      scrollbarClassName={cx(
        // Default scrollbar width
        "w-2.5",
        // Thinner scrollbar when collapsed
        isCollapsed && "w-1.5"
      )}
      thumbClassName={cx(
        // Default thumb styling is handled by ScrollArea
        // Make thumb thinner when collapsed to match scrollbar
        isCollapsed && "bg-zinc-400 dark:bg-zinc-500"
      )}
      {...props}
    >
      <div data-component="SidebarContent">{children}</div>
    </ScrollArea>
  );
}

// Footer
export function SidebarFooter({
  className,
  isCollapsed,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  isCollapsed?: boolean;
}) {
  return (
    <div
      {...props}
      data-component="SidebarFooter"
      className={cx(
        className,
        "flex flex-col border-t border-zinc-950/5 dark:border-white/5 transition-all duration-200 p-4"
      )}
    />
  );
}

// Level 1: Root Groups (Getting Started, Components)
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
}: React.ComponentPropsWithoutRef<"div"> & {
  title?: React.ReactNode;
  href?: string;
  actions?: React.ReactNode;
  isCollapsed?: boolean;
  level?: 1 | 2;
  groupIcon?: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
  tooltipDelay?: number;
}) {
  const id = useId();

  // When collapsed, show group as an icon item with tooltip
  if (isCollapsed && title) {
    // Use different icons based on level: Circle for level 1, Dot for level 2
    const DefaultIcon = level === 1 ? Circle : CircleSmall;
    const GroupIcon = groupIcon || DefaultIcon;

    const groupButton = (
      <span className="relative block px-2">
        {href ? (
          <Link
            href={href}
            className={cx(
              "relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium outline-hidden transition-all duration-100 ease-in-out",
              "h-8 w-8 rounded-md",
              "text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100",
              "hover:bg-zinc-100 dark:hover:bg-zinc-800",
              "focus-visible:ring-2 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300"
            )}
          >
            <GroupIcon className="size-4" strokeWidth={1.5} />
          </Link>
        ) : (
          <div
            className={cx(
              "relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium",
              "h-8 w-8 rounded-md",
              "text-zinc-700 dark:text-zinc-300"
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
          {typeof title === "string" ? (
            <Tooltip
              content={title}
              side="right"
              sideOffset={8}
              delayDuration={tooltipDelay}
            >
              {groupButton}
            </Tooltip>
          ) : (
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

// Level 3: Individual Items
export const SidebarItem = forwardRef<
  HTMLButtonElement,
  {
    current?: boolean;
    className?: string;
    children: React.ReactNode;
    isCollapsed?: boolean;
    href?: string;
    icon?: React.ComponentType<{
      className?: string;
      strokeWidth?: number;
    }>;
    leftIcon?: React.ComponentType<{
      className?: string;
      strokeWidth?: number;
    }>;
    tooltipDelay?: number;
  } & Omit<React.ComponentPropsWithoutRef<"button">, "className">
>(function SidebarItem(
  {
    current,
    className,
    children,
    isCollapsed,
    href,
    icon,
    leftIcon: LeftIcon,
    tooltipDelay = 0,
    onClick,
    ...props
  },
  ref
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
  const wrappedChildren =
    isCollapsed && typeof children === "string" ? null : React.isValidElement(
        children
      ) ? (
      children
    ) : (
      <span
        className={cx(
          "truncate transition-opacity duration-200",
          isCollapsed && "opacity-0 w-0 overflow-hidden"
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
        | undefined
    ) => {
      if (!IconComponent || typeof IconComponent !== "function") {
        return null;
      }

      try {
        return React.createElement(IconComponent, {
          className: "size-4",
          strokeWidth: 1.5,
        });
      } catch (error) {
        // Silently catch any icon rendering errors
        console.warn("Icon rendering failed:", error);
        return null;
      }
    };

    const collapsedElement = href ? (
      <Link
        href={href}
        onClick={handleClick}
        className={cx(
          "relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium outline-hidden transition-all duration-100 ease-in-out",
          "h-8 w-8 rounded-md",
          "text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100",
          "hover:bg-zinc-100 dark:hover:bg-zinc-800",
          "focus-visible:ring-2 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300"
        )}
      >
        {renderIcon(icon || LeftIcon)}
      </Link>
    ) : (
      <button
        onClick={handleClick}
        className={cx(
          "relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium outline-hidden transition-all duration-100 ease-in-out",
          "h-8 w-8 rounded-md",
          "text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100",
          "hover:bg-zinc-100 dark:hover:bg-zinc-800",
          "focus-visible:ring-2 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300"
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
});

// Utility: Divider
export function SidebarDivider({
  className,
  isCollapsed,
  ...props
}: React.ComponentPropsWithoutRef<typeof Separator> & {
  isCollapsed?: boolean;
}) {
  if (isCollapsed) return null;
  return (
    <Separator
      {...props}
      data-component="SidebarDivider"
      className={cx(className, "")}
    />
  );
}
