"use client";

import clsx from "clsx";
import { LayoutGroup, motion } from "framer-motion";
import { PanelLeft, PanelLeftDashed } from "lucide-react";
import Link from "next/link";
import React, { forwardRef, useId, useState } from "react";
import { Button } from "../button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../collapsible";
import { ScrollArea } from "../scroll-area";
import { Separator } from "../separator/separator";
import { Subheading } from "../subheading";

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
      className={clsx(className, "flex h-full min-h-0 flex-col relative")}
      style={{
        width: "var(--sidebar-width, 16rem)",
      }}
    >
      {showToggle && (
        <div
          className={clsx(
            "absolute top-0 z-10 group",
            isCollapsed
              ? "inset-x-2 h-12 flex items-center justify-center opacity-0 hover:opacity-100 bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-md transition-opacity duration-200"
              : "right-3.5 top-3"
          )}
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
      onClick={onToggle}
      variant="inverse-ghost"
      size="icon"
      className={clsx(className)}
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
      className={clsx(
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
      className={clsx(className, "flex-1")}
      viewportClassName="[&>*+*]:mt-6"
      {...props}
    >
      <div
        className={clsx(
          "transition-all duration-200",
          isCollapsed ? "px-2" : "px-4"
        )}
      >
        {children}
      </div>
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
      className={clsx(
        className,
        "flex flex-col border-t border-zinc-950/5 dark:border-white/5 transition-all duration-200",
        isCollapsed ? "p-2" : "p-4"
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
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  title?: React.ReactNode;
  href?: string;
  actions?: React.ReactNode;
  isCollapsed?: boolean;
  level?: 1 | 2;
}) {
  const id = useId();

  if (level === 1) {
    // Level 1: Section header with optional actions
    return (
      <LayoutGroup id={id}>
        <div
          {...props}
          data-component="SidebarGroup"
          className={clsx(className, "space-y-3")}
        >
          {title && (
            <div className="flex items-center justify-between">
              {href ? (
                <Link href={href} className="block">
                  <Subheading className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                    {title}
                  </Subheading>
                </Link>
              ) : (
                <Subheading>{title}</Subheading>
              )}
              {actions && !isCollapsed && (
                <div className="flex items-center">{actions}</div>
              )}
            </div>
          )}
          <div className="space-y-1">{children}</div>
        </div>
      </LayoutGroup>
    );
  }

  // Level 2: Collapsible categories
  return (
    <LayoutGroup id={id}>
      <div {...props} data-component="SidebarGroup" className={clsx(className)}>
        <Collapsible defaultOpen={true}>
          <CollapsibleTrigger className="w-full">
            {href ? (
              <Link href={href} className="flex-1 text-left">
                {title}
              </Link>
            ) : (
              <span className="flex-1">{title}</span>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-0.5 border-l pl-2 border-zinc-200 dark:border-zinc-700 pl-0">
              {children}
            </div>
          </CollapsibleContent>
        </Collapsible>
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
    leftIcon?: React.ComponentType<{
      className?: string;
      strokeWidth?: number;
    }>;
    isNested?: boolean;
  } & Omit<React.ComponentPropsWithoutRef<"button">, "className">
>(function SidebarItem(
  {
    current,
    className,
    children,
    isCollapsed,
    href,
    leftIcon: LeftIcon,
    isNested = false,
    ...props
  },
  ref
) {
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = () => {
    if (href) {
      setIsNavigating(true);
      setTimeout(() => setIsNavigating(false), 150);
    }
  };

  return (
    <span
      className={clsx(className, "relative block")}
      data-component="SidebarItem"
    >
      {current && !isCollapsed && (
        <motion.span
          layoutId="current-indicator"
          className={clsx(
            "absolute inset-y-1 w-px rounded-full bg-zinc-950 dark:bg-white",
            {
              "-left-[9px]": !isNested, // Offset to the left for top-level items
              "left-0": isNested, // Flush with the border for nested items
            }
          )}
        />
      )}
      <Button
        render={href ? <Link href={href} /> : undefined}
        className={clsx(
          // Base styles
          "w-full flex items-center gap-3 rounded-md text-left text-sm transition-all duration-200",
          // Force no shadow
          "!shadow-none",
          // Layout
          {
            "px-2 py-2 justify-center": isCollapsed,
            "px-3 py-2 justify-start": !isCollapsed,
          },
          // Colors
          {
            "text-zinc-700 dark:text-zinc-300": !current,
            "text-zinc-900 dark:text-zinc-100": current,
          },
          // Background
          {
            "bg-white dark:bg-zinc-800": current,
            "bg-zinc-50 dark:bg-zinc-850": isNavigating,
          },
          // Interactive states
          {
            "hover:bg-zinc-100 dark:hover:bg-zinc-800": !current,
            "hover:text-zinc-900 dark:hover:text-zinc-100": !current,
            // Override button hover when current
            "hover:!bg-white dark:hover:!bg-zinc-800": current,
            "hover:!text-zinc-900 dark:hover:!text-zinc-100": current,
          },
          // Typography
          {
            "font-medium": current,
          }
        )}
        variant="inverse-ghost"
        shadow={false}
        leftIcon={LeftIcon}
        onClick={handleClick}
        ref={ref}
        title={
          isCollapsed && typeof children === "string" ? children : undefined
        }
        {...props}
      >
        {isCollapsed ? null : children}
      </Button>
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
      className={clsx(className, "my-4")}
    />
  );
}

// Utility: Label (for complex item content)
export function SidebarLabel({
  className,
  isCollapsed,
  ...props
}: React.ComponentPropsWithoutRef<"span"> & {
  isCollapsed?: boolean;
}) {
  return (
    <span
      {...props}
      data-component="SidebarLabel"
      className={clsx(
        className,
        "truncate transition-opacity duration-200",
        isCollapsed && "opacity-0 w-0 overflow-hidden"
      )}
    />
  );
}
