import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

/**
 * DrawerFooter section for actions.
 * Import from "@patternmode/ui/components/drawer".
 */
export function DrawerFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      data-component="drawer-footer"
      data-slot="drawer-footer"
      {...props}
    />
  );
}
