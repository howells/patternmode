import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

/**
 * SheetFooter section for actions.
 * Import from "@patternmode/ui/components/sheet".
 */
export function SheetFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-2 py-4", className)}
      data-component="sheet-footer"
      data-slot="sheet-footer"
      {...props}
    />
  );
}
