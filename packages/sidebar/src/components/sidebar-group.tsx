"use client";

import { cx } from "@patternmode/utils/cx";
import React from "react";
import type { SidebarGroupProps } from "../types";
import { sidebarGroupVariants } from "../variants";

const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, size = "base", ...props }, ref) => {
    return (
      <div
        className={cx(sidebarGroupVariants({ size }), className)}
        data-sidebar="group"
        data-slot="sidebar-group"
        ref={ref}
        {...props}
      />
    );
  }
);

SidebarGroup.displayName = "SidebarGroup";

export { SidebarGroup };
