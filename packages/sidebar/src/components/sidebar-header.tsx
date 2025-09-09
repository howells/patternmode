"use client";

import { cx } from "@patternmode/utils/cx";
import React from "react";
import type { SidebarHeaderProps } from "../types";
import { sidebarHeaderVariants } from "../variants";

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ children, className, size = "base", ...props }, ref) => {
    return (
      <div
        className={cx(sidebarHeaderVariants({ size }), className)}
        data-sidebar="header"
        data-slot="sidebar-header"
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarHeader.displayName = "SidebarHeader";

export { SidebarHeader };
