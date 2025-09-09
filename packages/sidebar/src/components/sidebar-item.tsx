"use client";

import { Button } from "@patternmode/button";
import type { IconButtonSize } from "@patternmode/button/types";
import type { Size } from "@patternmode/config/sizes";
import { Tooltip } from "@patternmode/tooltip";
import { cx } from "@patternmode/utils/cx";
import React from "react";
import { useSidebar } from "../sidebar-store";
import type { SidebarItemProps } from "../types";
import { sidebarItemVariants } from "../variants";

const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  (
    {
      children,
      icon,
      render,
      isActive,
      className,
      size = "base",
      onClick,
      ...props
    },
    ref
  ) => {
    const isExpanded = useSidebar((s) => s.isExpanded);
    const buttonSize: Size | IconButtonSize = isExpanded ? "base" : "icon";
    const trigger = (
      <Button
        aria-label={
          !isExpanded && typeof children === "string" ? children : undefined
        }
        className={cx(sidebarItemVariants({ isActive, isExpanded }), className)}
        data-sidebar="item"
        data-slot="sidebar-item"
        data-testid="sidebar-item"
        icon={
          icon != null
            ? (icon as React.ComponentType<{
                className?: string;
                strokeWidth?: number;
              }>)
            : undefined
        }
        onClick={onClick}
        ref={ref}
        render={render}
        size={buttonSize}
        variant="ghost"
        {...props}
      >
        {isExpanded ? children : null}
      </Button>
    );

    return isExpanded ? (
      trigger
    ) : (
      <Tooltip
        align="center"
        content={children}
        delayDuration={0}
        render={trigger}
        side="right"
      />
    );
  }
);

SidebarItem.displayName = "SidebarItem";

export { SidebarItem };
