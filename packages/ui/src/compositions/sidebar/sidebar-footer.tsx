"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { motion } from "motion/react";
import type React from "react";
import { SIDEBAR_TRANSITION } from "./sidebar-motion-config";
import { useSidebar } from "./sidebar-provider";

type SidebarFooterProps = Omit<
  React.ComponentProps<typeof motion.div>,
  "onDrag"
>;

/**
 * SidebarFooter UI component.
 * Import from "@patternmode/ui/compositions/sidebar".
 * Animates position when collapsed to center content.
 */
export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <motion.div
      animate={{
        x: isCollapsed ? -0 : 0,
      }}
      className={cn("flex", className)}
      data-component="sidebar-footer"
      data-sidebar="footer"
      data-slot="sidebar-footer"
      initial={false}
      transition={SIDEBAR_TRANSITION}
      {...props}
    />
  );
}
