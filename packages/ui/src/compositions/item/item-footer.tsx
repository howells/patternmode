import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

/**
 * ItemFooter UI component.
 * Import from "@patternmode/ui/compositions/item".
 */
export function ItemFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className,
      )}
      data-component="item-footer"
      data-slot="item-footer"
      {...props}
    />
  );
}
