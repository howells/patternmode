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
    // Map text sizes to their icon-only counterparts so collapsed icons
    // match the visual size of the expanded variant (e.g., sm ↔ icon-sm).
    const toIconSize = (s: Size | IconButtonSize): IconButtonSize => {
      switch (s) {
        case "2xs":
          return "icon-2xs";
        case "xs":
          return "icon-xs";
        case "sm":
          return "icon-sm";
        case "base":
          return "icon";
        case "lg":
          return "icon-lg";
        default:
          return String(s).startsWith("icon") ? (s as IconButtonSize) : "icon";
      }
    };
    const buttonSize: Size | IconButtonSize = isExpanded
      ? size
      : toIconSize(size);
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
        <div className="flex items-center gap-1">
          {mainButton}
          {hasChildren ? (
            <Button
              aria-controls={panelId}
              aria-expanded={open}
              aria-label={open ? "Collapse" : "Expand"}
              icon={open ? ChevronDown : ChevronRight}
              onClick={() => setOpen((v) => !v)}
              size="icon-xs"
              variant="ghost"
            />
          ) : null}
        </div>
        {hasChildren && open ? (
          <div
            aria-live="polite"
            className="[&>*]:before:-translate-x-1/2 [&>*]:before:-translate-y-1/2 relative [&>*]:relative [&>*]:before:absolute [&>*]:before:top-1/2 [&>*]:before:left-4 [&>*]:before:z-10 [&>*]:before:h-2 [&>*]:before:w-2 [&>*]:before:rounded-full [&>*]:before:border [&>*]:before:border-zinc-300 [&>*]:before:bg-white [&>*]:before:content-[''] dark:[&>*]:before:border-zinc-600 dark:[&>*]:before:bg-zinc-900"
            id={panelId}
          >
            {items}

            <div className="absolute inset-y-4 left-4 w-px bg-zinc-200 dark:bg-zinc-800" />
          </div>
        ) : null}
      </div>
    );
  }
);

SidebarItem.displayName = "SidebarItem";

export { SidebarItem };
