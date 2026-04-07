import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

/**
 * DialogHeader section (title/description area).
 * Import from "@patternmode/ui/components/dialog".
 */
export function DialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      data-component="dialog-header"
      data-slot="dialog-header"
      {...props}
    />
  );
}
