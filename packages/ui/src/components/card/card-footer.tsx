import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

/**
 * CardFooter UI component.
 * Import from "@patternmode/ui/components/card".
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2 rounded-b-3xl bg-muted/30 px-4 py-4",
        className,
      )}
      data-component="card-footer"
      data-slot="card-footer"
      {...props}
    />
  );
}

export { CardFooter };
