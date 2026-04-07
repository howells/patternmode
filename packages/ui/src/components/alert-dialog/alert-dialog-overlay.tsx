"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Overlay } from "@radix-ui/react-alert-dialog";
import type * as React from "react";

/**
 * AlertDialogOverlay UI component.
 * Import from "@patternmode/ui/components/alert-dialog".
 * Built on Radix UI primitives for accessible behavior.
 */
function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof Overlay>) {
  return (
    <Overlay
      className={cn(
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in",
        className,
      )}
      data-component="alert-dialog-overlay"
      data-slot="alert-dialog-overlay"
      {...props}
    />
  );
}

export { AlertDialogOverlay };
