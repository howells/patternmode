import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

/**
 * CardAction UI component.
 * Import from "@patternmode/ui/components/card".
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      data-component="card-action"
      data-slot="card-action"
      {...props}
    />
  );
}

export { CardAction };
