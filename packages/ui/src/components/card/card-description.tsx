import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

/**
 * CardDescription UI component.
 * Import from "@patternmode/ui/components/card".
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("trim-both text-muted-foreground text-sm", className)}
      data-component="card-description"
      data-slot="card-description"
      {...props}
    />
  );
}

export { CardDescription };
