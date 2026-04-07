"use client";

import { Button } from "@patternmode/ui/components/button";
import { cn } from "@patternmode/ui/utils/cn";
import type { LucideIcon } from "lucide-react";
import { PanelLeftCloseIcon } from "lucide-react";
import type React from "react";
import { useSidebar } from "./sidebar-provider";

type SidebarTriggerProps = Omit<React.ComponentProps<typeof Button>, "icon"> & {
  /** Icon to display. Defaults to PanelLeftCloseIcon. */
  icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

/** Sidebar trigger button */
export function SidebarTrigger({
  className,
  variant = "ghost",
  onClick,
  icon = PanelLeftCloseIcon,
  ...props
}: SidebarTriggerProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      aria-label="Toggle Sidebar"
      className={cn(className)}
      data-component="sidebar-trigger"
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      icon={icon}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      pressed={false}
      radius="full"
      size="icon-base"
      square
      variant={variant}
      {...props}
    />
  );
}

/**
 * SidebarRail UI component.
 * Import from "@patternmode/ui/compositions/sidebar".
 */
export function SidebarRail({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      aria-label="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      data-component="sidebar-rail"
      data-sidebar="rail"
      data-slot="sidebar-rail"
      onClick={toggleSidebar}
      tabIndex={-1}
      title="Toggle Sidebar"
      {...props}
    />
  );
}
