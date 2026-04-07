import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

/**
 * ItemTitle UI component.
 * Import from "@patternmode/ui/compositions/item".
 */
export function ItemTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-fit items-center gap-2 font-medium text-sm leading-snug",
        className,
      )}
      data-component="item-title"
      data-slot="item-title"
      {...props}
    />
  );
}
