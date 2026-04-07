import { Separator } from "@patternmode/ui/components/separator";
import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

/**
 * ItemSeparator UI component.
 * Import from "@patternmode/ui/compositions/item".
 */
export function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      className={cn("my-0", className)}
      data-component="item-separator"
      data-slot="item-separator"
      orientation="horizontal"
      {...props}
    />
  );
}
