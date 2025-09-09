"use client";

import { Separator } from "@patternmode/separator";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import type { SidebarSeparatorProps } from "../types";
import { sidebarSeparatorVariants } from "../variants";

const SidebarSeparator: React.FC<SidebarSeparatorProps> = ({
  className,
  size = "base",
  ...props
}) => {
  return (
    <Separator
      className={cx(
        sidebarSeparatorVariants({
          size: size as "2xs" | "xs" | "sm" | "base" | "lg",
        }),
        className
      )}
      data-sidebar="separator"
      data-slot="sidebar-separator"
      {...props}
    />
  );
};

SidebarSeparator.displayName = "SidebarSeparator";

export { SidebarSeparator };
