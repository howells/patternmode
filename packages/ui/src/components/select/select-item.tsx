"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Item, ItemIndicator, ItemText } from "@radix-ui/react-select";
import { Check } from "lucide-react";
import type * as React from "react";
import { MENU_ITEM_RADIUS } from "../../lib/menu-content";
import type { ComponentSize } from "../../lib/size";
import type { WithTestId } from "../../lib/types";
import { Icon } from "../icon";
import { MENU_ITEM_ICON_SIZES, MENU_ITEM_SIZE_CLASSES } from "../menu-item";
import { useSelectContext } from "./select-context";

/**
 * Right padding override per size to make room for the check indicator.
 * Replaces the symmetric px-* from MENU_ITEM_SIZE_CLASSES on the right side.
 */
const SELECT_ITEM_RIGHT_PADDING: Record<ComponentSize, string> = {
  "2xs": "pr-6",
  xs: "pr-7",
  sm: "pr-8",
  base: "pr-8",
  lg: "pr-9",
  xl: "pr-10",
  "2xl": "pr-10",
  "3xl": "pr-12",
};

/** Indicator container position and size per item size. */
const SELECT_INDICATOR_CLASSES: Record<ComponentSize, string> = {
  "2xs": "right-1.5 size-3",
  xs: "right-2 size-3",
  sm: "right-2 size-3.5",
  base: "right-2.5 size-3.5",
  lg: "right-3 size-4",
  xl: "right-3.5 size-4",
  "2xl": "right-4 size-4.5",
  "3xl": "right-5 size-5",
};

/**
 * SelectItem UI component.
 * Import from "@patternmode/ui/components/select".
 * Built on Radix UI primitives for accessible behavior.
 */
function SelectItem({
  className,
  children,
  testId,
  ...props
}: WithTestId<React.ComponentProps<typeof Item>>) {
  const { size } = useSelectContext();

  return (
    <Item
      className={cn(
        "relative flex w-full cursor-default select-none items-center outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        MENU_ITEM_SIZE_CLASSES[size],
        SELECT_ITEM_RIGHT_PADDING[size],
        MENU_ITEM_RADIUS.default,
        className,
      )}
      data-component="select-item"
      data-slot="select-item"
      data-testid={testId}
      {...props}
    >
      <span
        className={cn(
          "absolute flex items-center justify-center",
          SELECT_INDICATOR_CLASSES[size],
        )}
      >
        <ItemIndicator>
          <Icon
            className="text-muted-foreground/70"
            icon={Check}
            size={MENU_ITEM_ICON_SIZES[size]}
          />
        </ItemIndicator>
      </span>
      <ItemText>{children}</ItemText>
    </Item>
  );
}

export { SelectItem };
