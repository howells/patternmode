"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { SubTrigger } from "@radix-ui/react-dropdown-menu";
import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import type * as React from "react";
import { MenuItem } from "../menu-item/menu-item";
import { useDropdownMenuContext } from "./dropdown-menu-context";

/**
 * DropdownMenuSubTrigger composes MenuItem to open a submenu.
 * Import from "@patternmode/ui/components/dropdown-menu".
 * Built on Radix UI primitives for accessible behavior.
 */
function DropdownMenuSubTrigger({
  className,
  inset,
  icon,
  children,
  ...props
}: Omit<React.ComponentProps<typeof SubTrigger>, "children"> & {
  inset?: boolean;
  icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Text label. Use `icon` prop for icons, not children. When using asChild, pass a single React element. */
  children?: React.ReactElement | string | number;
}) {
  const { size, itemRadiusClass } = useDropdownMenuContext();

  return (
    <SubTrigger asChild {...props}>
      <MenuItem
        className={cn(
          // Concentric radius: sits flush inside container corners
          itemRadiusClass,
          // Override MenuItem's hover/focus with Radix's data-highlighted and data-state
          "hover:bg-transparent focus:bg-transparent focus-visible:bg-transparent",
          "data-[highlighted]:duration-0",
          "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
          "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
          className,
        )}
        data-component="dropdown-menu-sub-trigger"
        data-inset={inset}
        data-slot="dropdown-menu-sub-trigger"
        icon={icon}
        inset={inset}
        size={size}
        suffixIcon={ChevronRight}
      >
        {children}
      </MenuItem>
    </SubTrigger>
  );
}

export { DropdownMenuSubTrigger };
