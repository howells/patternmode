"use client";

import { Dot, type DotProps } from "@patternmode/ui/components/dot";
import { Icon } from "@patternmode/ui/components/icon";
import {
  MenuItem,
  type MenuItemProps,
} from "@patternmode/ui/components/menu-item";
import { cn } from "@patternmode/ui/utils/cn";
import type { LucideIcon } from "lucide-react";
import type React from "react";
import { Children, cloneElement, isValidElement } from "react";

type SidebarMenuSubProps = React.ComponentProps<"ul">;

/**
 * SidebarMenuSub UI component.
 * Import from "@patternmode/ui/compositions/sidebar".
 */
export function SidebarMenuSub({ className, ...props }: SidebarMenuSubProps) {
  return (
    <ul
      className={cn(
        "flex min-w-0 flex-col gap-1 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      data-component="sidebar-menu-sub"
      data-sidebar="menu-sub"
      data-slot="sidebar-menu-sub"
      {...props}
    />
  );
}

type SidebarMenuSubItemProps = React.ComponentProps<"li">;

/**
 * SidebarMenuSubItem UI component.
 * Import from "@patternmode/ui/compositions/sidebar".
 */
export function SidebarMenuSubItem({
  className,
  ...props
}: SidebarMenuSubItemProps) {
  return (
    <li
      className={cn("group/menu-sub-item relative", className)}
      data-component="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      data-slot="sidebar-menu-sub-item"
      {...props}
    />
  );
}

type SidebarMenuSubButtonProps = Omit<MenuItemProps, "icon" | "dot"> & {
  /** Dot variant to display in the left column (takes precedence over icon) */
  dot?: DotProps["variant"];
  /** Icon to display in the left icon column */
  icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Additional className for the icon */
  iconClassName?: string;
};

/**
 * SidebarMenuSubButton UI component.
 * Thin wrapper around MenuItem with sidebar-specific defaults.
 * Always reserves space for an icon on the left to maintain alignment.
 * Uses size-4 (16px) icon space to match parent SidebarMenuButton.
 * Renders as a button by default. Use asChild with Link for navigation.
 * Import from "@patternmode/ui/compositions/sidebar".
 */
export function SidebarMenuSubButton({
  size = "base",
  variant = "input",
  radius = "full",
  className,
  asChild,
  dot,
  icon,
  iconClassName,
  isActive,
  children,
  ...props
}: SidebarMenuSubButtonProps) {
  // Always reserve icon space (16px to match parent icon size)
  // Priority: dot > icon
  let iconContent: React.ReactNode = null;
  if (dot) {
    iconContent = <Dot size="sm" variant={dot} />;
  } else if (icon) {
    iconContent = <Icon className={cn("size-4", iconClassName)} icon={icon} />;
  }
  const iconPlaceholder = (
    <span className="flex size-4 shrink-0 items-center justify-center">
      {iconContent}
    </span>
  );

  // When asChild, inject content into the child
  if (asChild) {
    const child = Children.only(children);
    if (isValidElement<{ children?: React.ReactNode }>(child)) {
      return (
        <MenuItem
          asChild
          className={cn("group-data-[collapsible=icon]:hidden", className)}
          data-component="sidebar-menu-sub-button"
          data-sidebar="menu-sub-button"
          data-slot="sidebar-menu-sub-button"
          isActive={isActive}
          radius={radius}
          size={size}
          variant={variant}
          {...props}
        >
          {cloneElement(
            child,
            {},
            iconPlaceholder,
            <span className="min-w-0 flex-1 truncate">
              {child.props.children}
            </span>,
          )}
        </MenuItem>
      );
    }
  }

  // For non-asChild usage, wrap in a single span for MenuItem
  const wrappedContent = (
    <span className="flex min-w-0 flex-1 items-center gap-2">
      {iconPlaceholder}
      <span className="min-w-0 flex-1 truncate">{children}</span>
    </span>
  );

  return (
    <MenuItem
      className={cn("group-data-[collapsible=icon]:hidden", className)}
      data-component="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-slot="sidebar-menu-sub-button"
      isActive={isActive}
      radius={radius}
      size={size}
      variant={variant}
      {...props}
    >
      {wrappedContent}
    </MenuItem>
  );
}

export type {
  SidebarMenuSubButtonProps,
  SidebarMenuSubItemProps,
  SidebarMenuSubProps,
};
