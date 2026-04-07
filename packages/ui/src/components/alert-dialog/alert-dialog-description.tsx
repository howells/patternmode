"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Description } from "@radix-ui/react-alert-dialog";
import type * as React from "react";

/**
 * AlertDialogDescription UI component.
 * Import from "@patternmode/ui/components/alert-dialog".
 * Built on Radix UI primitives for accessible behavior.
 */
function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof Description>) {
  return (
    <Description
      className={cn("text-muted-foreground text-sm", className)}
      data-component="alert-dialog-description"
      data-slot="alert-dialog-description"
      {...props}
    />
  );
}

export { AlertDialogDescription };
