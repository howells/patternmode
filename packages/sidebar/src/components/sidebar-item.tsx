"use client";

import { Button } from "@patternmode/button";
import { Tooltip } from "@patternmode/tooltip";
import { cx } from "@patternmode/utils/cx";
import { ChevronDown } from "lucide-react";
import React from "react";
import { useSidebar } from "../sidebar-store";
import type { SidebarItemProps } from "../types";
import { sidebarItemVariants } from "../variants";

const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ children, icon, href, isActive, className, size = "base", onClick, ...props }, ref) => {
    const isExpanded = useSidebar((s) => s.isExpanded);
    const buttonSize = isExpanded ? "base" : "icon";
    const trigger = (
      <Button
        aria-label={!isExpanded && typeof children === "string" ? (children as string) : undefined}
        className={cx(sidebarItemVariants({ size, isActive, isExpanded }), className)}
        data-sidebar="item"
        data-slot="sidebar-item"
        data-testid="sidebar-item"
        icon={icon as any}
        onClick={onClick}
        ref={ref}
        render={href ? <a href={href} /> : undefined}
        size={buttonSize as any}
        variant="ghost"
        {...props}
      >
        {isExpanded ? children : null}
      </Button>
    );

    return !isExpanded ? (
      <Tooltip align="center" content={children} delayDuration={0} render={trigger} side="right" />
    ) : (
      trigger
    );
  }
);

SidebarItem.displayName = "SidebarItem";

export { SidebarItem };
