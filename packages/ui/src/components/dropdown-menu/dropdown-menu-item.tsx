"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Item } from "@radix-ui/react-dropdown-menu";
import type { LucideIcon } from "lucide-react";
import type * as React from "react";
import type { DotProps } from "../dot";
import {
  MENU_ITEM_ICON_SIZES,
  MENU_ITEM_INSET_CLASSES,
  MENU_ITEM_SIZE_CLASSES,
  MenuItem,
} from "../menu-item/menu-item";
import { useDropdownMenuContext } from "./dropdown-menu-context";

/**
 * DropdownMenuItem composes MenuItem to ensure consistent styling.
 * It adds the Radix dropdown context integration for keyboard navigation and accessibility.
 */
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  avatar,
  dot,
  icon,
  suffixIcon,
  kbd,
  suffix,
  isActive,
  activeIndicator,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Item>, "children"> & {
  inset?: boolean;
  variant?: "default" | "destructive";
  avatar?: React.ReactNode;
  /** Dot variant to display at the start, centered in the icon space (takes precedence over icon) */
  dot?: DotProps["variant"];
  icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  suffixIcon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  kbd?: string[];
  suffix?: React.ReactNode;
  /** Whether the item is in an active/selected state */
  isActive?: boolean;
  /** Visual indicator for active state. "dot" shows grey dot normally, green when active. "check" shows green checkmark only when active. */
  activeIndicator?: "dot" | "check" | "none";
  /** Text label. Use `icon` prop for icons, not children. When using asChild, pass a single React element. */
  children?: React.ReactElement | string | number;
}) {
  const { size, itemRadiusClass } = useDropdownMenuContext();

  return (
    <Item asChild {...props}>
      <MenuItem
        activeIndicator={activeIndicator}
        avatar={avatar}
        className={cn(
          // Concentric radius: sits flush inside container corners
          itemRadiusClass,
          // Override MenuItem's hover/focus with Radix's data-highlighted state
          "hover:bg-transparent focus:bg-transparent focus-visible:bg-transparent",
          "data-[highlighted]:duration-0",
          "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
          variant === "destructive" &&
            "data-[highlighted]:bg-destructive/10 data-[highlighted]:text-destructive",
          className,
        )}
        data-component="dropdown-menu-item"
        data-inset={inset}
        data-slot="dropdown-menu-item"
        data-variant={variant}
        dot={dot}
        icon={icon}
        inset={inset}
        isActive={isActive}
        kbd={kbd}
        size={size}
        suffix={suffix}
        suffixIcon={suffixIcon}
        variant={variant}
      >
        {children}
      </MenuItem>
    </Item>
  );
}

// Re-export the shared constants for backwards compatibility
// These now come from MenuItem - the single source of truth
/**
 * ITEM_SIZE_CLASSES class name map for DropdownMenu.
 * Import from "@patternmode/ui/components/dropdown-menu".
 * Built on Radix UI primitives for accessible behavior.
 */
const ITEM_SIZE_CLASSES = MENU_ITEM_SIZE_CLASSES;
/**
 * SIZE_TO_ICON_SIZE shared constant for DropdownMenu.
 * Import from "@patternmode/ui/components/dropdown-menu".
 * Built on Radix UI primitives for accessible behavior.
 */
const SIZE_TO_ICON_SIZE = MENU_ITEM_ICON_SIZES;
/**
 * SIZE_TO_INSET shared constant for DropdownMenu.
 * Import from "@patternmode/ui/components/dropdown-menu".
 * Built on Radix UI primitives for accessible behavior.
 */
const SIZE_TO_INSET = MENU_ITEM_INSET_CLASSES;

export {
  DropdownMenuItem,
  ITEM_SIZE_CLASSES,
  SIZE_TO_ICON_SIZE,
  SIZE_TO_INSET,
};
