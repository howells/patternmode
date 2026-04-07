"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type React from "react";

type SidebarMenuBadgeProps = React.ComponentProps<"div">;

/**
 * SidebarMenuBadge UI component.
 * Import from "@patternmode/ui/compositions/sidebar".
 */
export function SidebarMenuBadge({
  className,
  ...props
}: SidebarMenuBadgeProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-1/2 right-2.5 flex h-5 min-w-5 -translate-y-1/2 select-none items-center justify-center rounded-md px-1 font-medium text-muted-foreground text-xs tabular-nums",
        "peer-hover/menu-button:text-accent-foreground peer-data-[active=true]/menu-button:text-accent-foreground",
        "transition-opacity duration-300 ease-out group-data-[collapsible=icon]:opacity-0",
        className,
      )}
      data-component="sidebar-menu-badge"
      data-sidebar="menu-badge"
      data-slot="sidebar-menu-badge"
      {...props}
    />
  );
}

export type { SidebarMenuBadgeProps };
