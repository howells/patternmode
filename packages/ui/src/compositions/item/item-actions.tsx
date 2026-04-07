import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

/**
 * ItemActions UI component.
 * Import from "@patternmode/ui/compositions/item".
 */
export function ItemActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      data-component="item-actions"
      data-slot="item-actions"
      {...props}
    />
  );
}
