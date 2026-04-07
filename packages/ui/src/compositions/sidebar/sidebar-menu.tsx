/** biome-ignore-all lint/performance/noBarrelFile: intentional package or module entrypoint */
"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";

export {
  SidebarMenuAction,
  type SidebarMenuActionProps,
} from "./sidebar-menu-action";
export {
  SidebarMenuBadge,
  type SidebarMenuBadgeProps,
} from "./sidebar-menu-badge";
// Re-export all sidebar menu components
export {
  SidebarMenuButton,
  type SidebarMenuButtonProps,
} from "./sidebar-menu-button";
export {
  SidebarMenuLabel,
  type SidebarMenuLabelProps,
} from "./sidebar-menu-label";
export {
  SidebarMenuSkeleton,
  type SidebarMenuSkeletonProps,
} from "./sidebar-menu-skeleton";
export {
  SidebarMenuSub,
  SidebarMenuSubButton,
  type SidebarMenuSubButtonProps,
  SidebarMenuSubItem,
  type SidebarMenuSubItemProps,
  type SidebarMenuSubProps,
} from "./sidebar-menu-sub";

// Base menu components
/**
 * SidebarMenu UI component.
 * Import from "@patternmode/ui/compositions/sidebar".
 */
export function SidebarMenu({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      data-component="sidebar-menu"
      data-sidebar="menu"
      data-slot="sidebar-menu"
      {...props}
    />
  );
}

/**
 * SidebarMenuItem UI component.
 * Import from "@patternmode/ui/compositions/sidebar".
 */
export function SidebarMenuItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      className={cn("group/menu-item relative", className)}
      data-component="sidebar-menu-item"
      data-sidebar="menu-item"
      data-slot="sidebar-menu-item"
      {...props}
    />
  );
}
