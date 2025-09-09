"use client";

import { cx } from "@patternmode/utils/cx";
import React from "react";
import { useSidebar } from "../sidebar-store";
import type { SidebarOverlayProps } from "../types";
import { sidebarOverlayVariants } from "../variants";

/**
 * Slightly dark clickable overlay shown on desktop when the sidebar is open.
 */
const SidebarOverlay = React.forwardRef<HTMLDivElement, SidebarOverlayProps>(
  ({ ...props }, ref) => {
    const state = useSidebar((s) => s.state);
    const isMobile = useSidebar((s) => s.isMobile);
    const isHovering = useSidebar((s) => s.isHovering);

    if (isMobile) return null;

    const visible = state === "collapsed" && isHovering;

    return (
      <div
        aria-hidden="true"
        className={cx(
          sidebarOverlayVariants({ visible }),
          "pointer-events-none z-30 bg-black/20"
        )}
        data-testid="sidebar"
        ref={ref}
        {...props}
      />
    );
  }
);

SidebarOverlay.displayName = "SidebarOverlay";

export { SidebarOverlay };
