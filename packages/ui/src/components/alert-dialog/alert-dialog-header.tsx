"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

/** alert dialog header section */

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      data-component="alert-dialog-header"
      data-slot="alert-dialog-header"
      {...props}
    />
  );
}

export { AlertDialogHeader };
