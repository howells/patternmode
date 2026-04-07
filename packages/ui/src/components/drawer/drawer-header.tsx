import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

/**
 * DrawerHeader section (title/description area).
 * Import from "@patternmode/ui/components/drawer".
 */
export function DrawerHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left",
        className,
      )}
      data-component="drawer-header"
      data-slot="drawer-header"
      {...props}
    />
  );
}
