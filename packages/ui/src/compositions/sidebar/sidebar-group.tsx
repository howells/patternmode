"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { Plus } from "lucide-react";
import type React from "react";
import { Button } from "../../components/button";

/**
 * SidebarGroup UI component.
 * Import from "@patternmode/ui/compositions/sidebar".
 * Animates content position when sidebar collapses to center icons.
 */
export function SidebarGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative flex w-full min-w-0 flex-col px-3 py-4",
        className,
      )}
      data-component="sidebar-group"
      data-sidebar="group"
      data-slot="sidebar-group"
      {...props}
    />
  );
}

/**
 * SidebarGroupLabel UI component.
 * Import from "@patternmode/ui/compositions/sidebar".
 * Built on Radix UI primitives for accessible behavior.
 */
export function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        "flex shrink-0 items-center rounded-md pt-2 pr-2 pb-2 pl-3 font-medium text-sidebar-foreground/70 text-xs outline-hidden ring-sidebar-ring transition-opacity duration-300 ease-out focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Fade out when collapsed, keep layout
        "group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:opacity-0",
        className,
      )}
      data-component="sidebar-group-label"
      data-sidebar="group-label"
      data-slot="sidebar-group-label"
      {...props}
    />
  );
}

/**
 * SidebarGroupAction UI component.
 * Import from "@patternmode/ui/compositions/sidebar".
 * Built on Radix UI primitives for accessible behavior.
 */
export function SidebarGroupAction({
  className,
  asChild = false,
  icon = Plus,
  size = "icon-sm",
  radius = "full",
  appearance = "ghost",
  showWhenCollapsed = false,
  ...props
}: React.ComponentProps<typeof Button> & {
  asChild?: boolean;
  /** Show the action button even when sidebar is collapsed */
  showWhenCollapsed?: boolean;
}) {
  return (
    <Button
      appearance={appearance}
      asChild={asChild}
      className={cn(
        "absolute top-3.5 right-4 text-sidebar-foreground ring-sidebar-ring transition-all duration-300 hover:bg-white hover:text-sidebar-accent-foreground",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        // When collapsed: center the button if showing, otherwise hide
        showWhenCollapsed
          ? "group-data-[collapsible=icon]:right-1/2 group-data-[collapsible=icon]:translate-x-[55%]"
          : "group-data-[collapsible=icon]:hidden",
        className,
      )}
      data-component="sidebar-group-action"
      data-sidebar="group-action"
      data-slot="sidebar-group-action"
      icon={icon}
      radius={radius}
      size={size}
      {...props}
    />
  );
}
/** sidebar group content area */

export function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("w-full text-sm", className)}
      data-component="sidebar-group-content"
      data-sidebar="group-content"
      data-slot="sidebar-group-content"
      {...props}
    />
  );
}
