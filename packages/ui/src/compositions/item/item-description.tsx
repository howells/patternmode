import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

/**
 * ItemDescription UI component.
 * Import from "@patternmode/ui/compositions/item".
 */
export function ItemDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "line-clamp-2 text-balance font-normal text-muted-foreground text-sm leading-normal",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className,
      )}
      data-component="item-description"
      data-slot="item-description"
      {...props}
    />
  );
}
