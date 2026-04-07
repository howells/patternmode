"use client";

import { useIsMobile } from "@patternmode/ui/hooks/use-mobile";
import { cn } from "@patternmode/ui/utils/cn";
import { motion } from "motion/react";
import type React from "react";
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON } from "./sidebar-constants";
import { SIDEBAR_TRANSITION } from "./sidebar-motion-config";
import { useSidebar } from "./sidebar-provider";

type SidebarLayoutHeaderProps = Omit<
  React.ComponentProps<typeof motion.div>,
  "onDrag"
> & {
  /** Right padding when sidepanel or other overlay is open */
  rightOffset?: string;
};

/**
 * SidebarLayoutHeader UI component.
 * Import from "@patternmode/ui/compositions/sidebar".
 * Includes motion-based animations.
 */
export function SidebarLayoutHeader({
  className,
  rightOffset = "0px",
  ...props
}: SidebarLayoutHeaderProps) {
  const { state, hasHydrated } = useSidebar();
  const isMobile = useIsMobile();
  const transition = hasHydrated ? SIDEBAR_TRANSITION : { duration: 0 };

  const getLeftOffset = () => {
    if (isMobile) {
      return "0px";
    }
    if (state === "collapsed") {
      return SIDEBAR_WIDTH_ICON;
    }
    return SIDEBAR_WIDTH;
  };
  const leftOffset = getLeftOffset();

  // Base padding when closed, sidepanel width when open
  const paddingRight = rightOffset === "0px" ? "2rem" : rightOffset;

  return (
    <motion.div
      animate={{ left: leftOffset, paddingRight }}
      className={cn(
        "fixed top-0 right-0 z-50 hidden h-header items-center pl-8 lg:flex",
        className,
      )}
      data-component="sidebar-layout-header"
      data-slot="sidebar-layout-header"
      initial={false}
      transition={transition}
      {...props}
    />
  );
}
