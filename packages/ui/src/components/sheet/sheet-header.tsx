import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

/**
 * SheetHeader section (title/description area).
 * Import from "@patternmode/ui/components/sheet".
 */
export function SheetHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 py-4", className)}
      data-component="sheet-header"
      data-slot="sheet-header"
      {...props}
    />
  );
}
