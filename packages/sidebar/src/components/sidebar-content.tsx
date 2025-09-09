"use client";

import { cx } from "@patternmode/utils/cx";
import React from "react";
import type { SidebarContentProps } from "../types";
import { sidebarContentVariants } from "../variants";

const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, size = "base", ...props }, ref) => {
    return (
      <div
        className={cx(sidebarContentVariants({ size }), className)}
        data-sidebar="content"
        data-slot="sidebar-content"
        ref={ref}
        {...props}
      />
    );
  }
);

SidebarContent.displayName = "SidebarContent";

export { SidebarContent };
