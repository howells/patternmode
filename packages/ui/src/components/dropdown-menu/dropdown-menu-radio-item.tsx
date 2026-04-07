"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { ItemIndicator, RadioItem } from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import type * as React from "react";
import { Icon } from "../icon";
import { MENU_ITEM_ICON_SIZES, MenuItem } from "../menu-item/menu-item";
import { useDropdownMenuContext } from "./dropdown-menu-context";

/**
 * DropdownMenuRadioItem composes MenuItem with a check indicator on the right when selected.
 * Import from "@patternmode/ui/components/dropdown-menu".
 * Built on Radix UI primitives for accessible behavior.
 */
function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof RadioItem>, "children"> & {
  /** Text label. Use `icon` prop for icons, not children. When using asChild, pass a single React element. */
  children?: React.ReactElement | string | number;
}) {
  const { size, itemRadiusClass } = useDropdownMenuContext();
  const iconSize = MENU_ITEM_ICON_SIZES[size];

  return (
    <RadioItem asChild {...props}>
      <MenuItem
        className={cn(
          // Concentric radius: sits flush inside container corners
          itemRadiusClass,
          // Override MenuItem's hover/focus with Radix's data-highlighted state
          "hover:bg-transparent focus:bg-transparent focus-visible:bg-transparent",
          "data-[highlighted]:duration-0",
          "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
          className,
        )}
        data-component="dropdown-menu-radio-item"
        data-slot="dropdown-menu-radio-item"
        size={size}
        suffix={
          <ItemIndicator
            className="data-[state=unchecked]:invisible"
            forceMount
          >
            <Icon icon={Check} size={iconSize} />
          </ItemIndicator>
        }
      >
        {children}
      </MenuItem>
    </RadioItem>
  );
}

export { DropdownMenuRadioItem };
