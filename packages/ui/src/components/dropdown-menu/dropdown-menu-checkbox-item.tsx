"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { CheckboxItem, ItemIndicator } from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import type * as React from "react";
import { Icon } from "../icon";
import { MENU_ITEM_ICON_SIZES, MenuItem } from "../menu-item/menu-item";
import { useDropdownMenuContext } from "./dropdown-menu-context";

/**
 * DropdownMenuCheckboxItem composes MenuItem with a checkbox indicator slot.
 * Import from "@patternmode/ui/components/dropdown-menu".
 * Built on Radix UI primitives for accessible behavior.
 */
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: Omit<React.ComponentProps<typeof CheckboxItem>, "children"> & {
  /** Text label. Use `icon` prop for icons, not children. When using asChild, pass a single React element. */
  children?: React.ReactElement | string | number;
}) {
  const { size, itemRadiusClass } = useDropdownMenuContext();
  const iconSize = MENU_ITEM_ICON_SIZES[size];

  return (
    <CheckboxItem asChild checked={checked} {...props}>
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
        data-component="dropdown-menu-checkbox-item"
        data-slot="dropdown-menu-checkbox-item"
        indicator={
          <ItemIndicator>
            <Icon icon={Check} size={iconSize} />
          </ItemIndicator>
        }
        size={size}
      >
        {children}
      </MenuItem>
    </CheckboxItem>
  );
}

export { DropdownMenuCheckboxItem };
