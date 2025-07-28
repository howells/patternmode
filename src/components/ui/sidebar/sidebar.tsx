"use client";

import clsx from "clsx";
import { LayoutGroup, motion } from "framer-motion";
import { PanelLeft, PanelLeftDashed } from "lucide-react";
import Link from "next/link";
import React, { forwardRef, useId, useState } from "react";
import { Button } from "../button";
import { ScrollArea } from "../scroll-area";
import { Separator } from "../separator/separator";

// Sidebar-specific title component for navigation hierarchy
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
  const baseClasses = clsx(
    "font-medium transition-colors",
    level === 1 ? "text-xs" : "text-2xs uppercase tracking-wide",
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={clsx(
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
      data-component="SidebarToggle"
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

  // Simplified: All levels render the same way
  return (
    <LayoutGroup id={id}>
      <div
        {...props}
        data-component="SidebarGroup"
        className={clsx(className, "space-y-2 py-4")}
      >
        {title && (
          <div className="flex items-center justify-between px-4">
            <SidebarTitle level={level} href={href}>
              {title}
            </SidebarTitle>
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
  } & Omit<React.ComponentPropsWithoutRef<"button">, "className">
>(function SidebarItem(
  {
    current,
    className,
    children,
    isCollapsed,
    href,
    leftIcon: LeftIcon,
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
      className={clsx(className, "relative block px-4")}
      data-component="SidebarItem"
    >
      <Button
        render={href ? <Link href={href} /> : undefined}
        variant="inverse-ghost"
        shadow={false}
        leftIcon={LeftIcon}
        onClick={handleClick}
        fullWidth
        size="sm"
        textAlign="left"
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
      className={clsx(className, "")}
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
