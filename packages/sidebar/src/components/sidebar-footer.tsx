"use client";

import { cx } from "@patternmode/utils/cx";
import React from "react";
import type { SidebarFooterProps } from "../types";
import { sidebarFooterVariants } from "../variants";

const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, size = "base", ...props }, ref) => {
    return (
      <div
        className={cx(sidebarFooterVariants({ size }), className)}
        data-sidebar="footer"
        data-slot="sidebar-footer"
        ref={ref}
        {...props}
      />
    );
  }
);

SidebarFooter.displayName = "SidebarFooter";

export { SidebarFooter };
