"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Title } from "@radix-ui/react-alert-dialog";
import type * as React from "react";

/**
 * AlertDialogTitle UI component.
 * Import from "@patternmode/ui/components/alert-dialog".
 * Built on Radix UI primitives for accessible behavior.
 */
function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof Title>) {
  return (
    <Title
      className={cn("font-medium text-lg", className)}
      data-component="alert-dialog-title"
      data-slot="alert-dialog-title"
      {...props}
    />
  );
}

export { AlertDialogTitle };
