import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

interface DialogFooterProps extends React.ComponentProps<"div"> {
  /** Button alignment within the footer. */
  justify?: "end" | "between";
}

/**
 * DialogFooter section for actions.
 * Import from "@patternmode/ui/components/dialog".
 */
export function DialogFooter({
  className,
  justify = "end",
  ...props
}: DialogFooterProps) {
  return (
    <div
      className={cn(
        "mt-2 flex flex-col-reverse gap-2 sm:flex-row",
        justify === "between" ? "sm:justify-between" : "sm:justify-end",
        className,
      )}
      data-component="dialog-footer"
      data-slot="dialog-footer"
      {...props}
    />
  );
}
