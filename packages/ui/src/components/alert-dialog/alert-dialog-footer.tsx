"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

/**
 * AlertDialogFooter UI component.
 * Import from "@patternmode/ui/components/alert-dialog".
 */
function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      data-component="alert-dialog-footer"
      data-slot="alert-dialog-footer"
      {...props}
    />
  );
}

export { AlertDialogFooter };
