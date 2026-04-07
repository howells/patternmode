import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

/**
 * ItemContent UI component.
 * Import from "@patternmode/ui/compositions/item".
 */
export function ItemContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        className,
      )}
      data-component="item-content"
      data-slot="item-content"
      {...props}
    />
  );
}
