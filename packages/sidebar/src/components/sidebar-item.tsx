"use client";

import { Button } from "@patternmode/button";
import type { IconButtonSize } from "@patternmode/button/types";
import type { Size } from "@patternmode/config/sizes";
import { Tooltip } from "@patternmode/tooltip";
import { cx } from "@patternmode/utils/cx";
import { ChevronDown, ChevronRight } from "lucide-react";
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
      items,
      ...props
    },
    ref
  ) => {
    const isExpanded = useSidebar((s) => s.isExpanded);
    const buttonSize: Size | IconButtonSize = isExpanded ? size : "icon";
    const [open, setOpen] = React.useState(false);

    const mainButton = (
      <Button
        aria-label={
          !isExpanded && typeof children === "string" ? children : undefined
        }
        className={cx(
          // Only handle active state here; base styles come from Button
          sidebarItemVariants({ isActive }),
          isExpanded && "flex-1 justify-start",
          className
        )}
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

    // Collapsed: single icon button with tooltip
    if (!isExpanded) {
      return (
        <Tooltip
          align="center"
          content={children}
          delayDuration={0}
          render={mainButton}
          side="right"
        />
      );
    }

    const hasChildren = items != null;
    const panelId = `${props.id}-panel`;

    return (
      <div className="flex w-full flex-col">
        <div className="flex items-stretch gap-1">
          {mainButton}
          {hasChildren ? (
            <Button
              aria-controls={panelId}
              aria-expanded={open}
              aria-label={open ? "Collapse" : "Expand"}
              onClick={() => setOpen((v) => !v)}
              size="icon"
              variant="ghost"
            >
              {open ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </Button>
          ) : null}
        </div>
        {hasChildren && open ? (
          <div aria-live="polite" className="mt-1 space-y-1 pl-6" id={panelId}>
            {items}
          </div>
        ) : null}
      </div>
    );
  }
);

SidebarItem.displayName = "SidebarItem";

export { SidebarItem };
