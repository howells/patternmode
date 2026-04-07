"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@patternmode/ui/components/sheet";
import { cn } from "@patternmode/ui/utils/cn";
import { motion } from "motion/react";
import type React from "react";
import {
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
  SIDEBAR_WIDTH_MOBILE,
} from "./sidebar-constants";
import { SIDEBAR_TRANSITION } from "./sidebar-motion-config";
import { useSidebar } from "./sidebar-provider";

type SidebarProps = Omit<
  React.ComponentProps<typeof motion.div>,
  "onDrag" | "children"
> & {
  children?: React.ReactNode;
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
};

function getSidebarGapWidth(
  collapsible: "offcanvas" | "icon" | "none",
  state: "expanded" | "collapsed",
  variant: "sidebar" | "floating" | "inset",
): string {
  if (collapsible === "offcanvas" && state === "collapsed") {
    return "0px";
  }
  if (state === "collapsed") {
    if (variant === "floating") {
      return `calc(${SIDEBAR_WIDTH_ICON} + 1rem)`;
    }
    return SIDEBAR_WIDTH_ICON;
  }
  return SIDEBAR_WIDTH;
}

function getSidebarContainerWidth(
  collapsible: "offcanvas" | "icon" | "none",
  state: "expanded" | "collapsed",
  variant: "sidebar" | "floating" | "inset",
): string {
  if (collapsible === "icon" && state === "collapsed") {
    if (variant === "floating") {
      return `calc(${SIDEBAR_WIDTH_ICON} + 1rem + 2px)`;
    }
    return SIDEBAR_WIDTH_ICON;
  }
  return SIDEBAR_WIDTH;
}

function getSidebarOffcanvasPosition(
  collapsible: "offcanvas" | "icon" | "none",
  state: "expanded" | "collapsed",
  side: "left" | "right",
): Record<string, string> {
  if (collapsible !== "offcanvas") {
    return {};
  }
  const offset = state === "collapsed" ? `calc(${SIDEBAR_WIDTH} * -1)` : "0px";
  if (side === "left") {
    return { left: offset };
  }
  return { right: offset };
}

function getSidebarContainerClassName(
  variant: "sidebar" | "floating" | "inset",
): string {
  if (variant === "floating") {
    return "p-2";
  }
  if (variant === "inset") {
    return "";
  }
  return "group-data-[side=left]:border-r group-data-[side=right]:border-l";
}

/**
 * Sidebar UI component.
 * Import from "@patternmode/ui/compositions/sidebar".
 * Includes motion-based animations.
 */
export function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: SidebarProps) {
  const {
    isMobile,
    state,
    openMobile,
    setOpenMobile,
    toggleSidebar,
    hasHydrated,
  } = useSidebar();
  const transition = hasHydrated ? SIDEBAR_TRANSITION : { duration: 0 };

  if (collapsible === "none") {
    return (
      <div
        className={cn(
          "flex h-full w-sidebar flex-col bg-background text-sidebar-foreground",
          className,
        )}
        data-component="sidebar"
        data-slot="sidebar"
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet onOpenChange={setOpenMobile} open={openMobile}>
        <SheetContent
          className="w-sidebar bg-background p-0 text-sidebar-foreground [&>button]:hidden"
          data-component="sidebar"
          data-mobile="true"
          data-sidebar="sidebar"
          data-slot="sidebar"
          side={side}
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="group peer group/sidebar hidden text-sidebar-foreground lg:block"
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-component="sidebar"
      data-side={side}
      data-slot="sidebar"
      data-state={state}
      data-variant={variant}
    >
      {/* This is what handles the sidebar gap on desktop */}
      <motion.div
        animate={{
          width: getSidebarGapWidth(collapsible, state, variant),
        }}
        className={cn(
          "relative bg-transparent",
          "group-data-[side=right]:rotate-180",
        )}
        data-component="sidebar-gap"
        data-slot="sidebar-gap"
        initial={false}
        transition={transition}
      />
      <motion.div
        animate={{
          width: getSidebarContainerWidth(collapsible, state, variant),
          ...getSidebarOffcanvasPosition(collapsible, state, side),
        }}
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh lg:flex",
          side === "left" ? "left-0" : "right-0",
          state === "collapsed" && collapsible === "icon" && "cursor-e-resize",
          getSidebarContainerClassName(variant),
          className,
        )}
        data-component="sidebar-container"
        data-slot="sidebar-container"
        initial={false}
        transition={transition}
        {...props}
      >
        <div className="relative h-full w-full">
          {state === "collapsed" && collapsible === "icon" ? (
            <button
              aria-label="Expand sidebar"
              className="absolute inset-0 z-0 cursor-e-resize rounded-none"
              data-slot="sidebar-expand-hitarea"
              onClick={toggleSidebar}
              type="button"
            />
          ) : null}
          <div
            className="pointer-events-none flex h-full w-full flex-col overflow-hidden group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm"
            data-component="sidebar-inner"
            data-sidebar="sidebar"
            data-slot="sidebar-inner"
          >
            <div className="pointer-events-auto flex h-full w-full flex-col">
              {children}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
