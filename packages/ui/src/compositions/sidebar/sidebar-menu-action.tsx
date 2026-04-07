"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import type React from "react";

type SidebarMenuActionProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
  showOnHover?: boolean;
};

/**
 * SidebarMenuAction UI component.
 * Import from "@patternmode/ui/compositions/sidebar".
 * Built on Radix UI primitives for accessible behavior.
 */
export function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: SidebarMenuActionProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "absolute top-1/2 right-2.5 flex aspect-square w-5 -translate-y-1/2 items-center justify-center rounded-md p-0 text-muted-foreground outline-hidden ring-ring transition-transform hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-accent-foreground md:opacity-0",
        className,
      )}
      data-component="sidebar-menu-action"
      data-sidebar="menu-action"
      data-slot="sidebar-menu-action"
      {...props}
    />
  );
}

export type { SidebarMenuActionProps };
