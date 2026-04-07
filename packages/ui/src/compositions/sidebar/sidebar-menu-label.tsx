"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { SIDEBAR_TRANSITION } from "./sidebar-motion-config";
import { useSidebar } from "./sidebar-provider";

type SidebarMenuLabelProps = React.ComponentProps<typeof motion.span> & {
  delay?: number;
};

/** Animated label for sidebar menu buttons - syncs with sidebar collapse/expand */
export function SidebarMenuLabel({
  className,
  children,
  delay = 0,
  ...props
}: SidebarMenuLabelProps) {
  const { state, hasHydrated, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed" && !isMobile;

  return (
    <AnimatePresence>
      {!isCollapsed && (
        <motion.span
          animate={{ opacity: 1 }}
          className={cn("shrink-0 whitespace-nowrap", className)}
          data-component="sidebar-menu-label"
          data-slot="sidebar-menu-label"
          exit={{ opacity: 0 }}
          initial={hasHydrated ? { opacity: 0 } : false}
          transition={{
            ...SIDEBAR_TRANSITION,
            delay,
          }}
          {...props}
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export type { SidebarMenuLabelProps };
