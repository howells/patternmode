"use client";

import { Portal } from "@radix-ui/react-alert-dialog";
import type * as React from "react";

/**
 * AlertDialogPortal UI component.
 * Import from "@patternmode/ui/components/alert-dialog".
 * Built on Radix UI primitives for accessible behavior.
 */
function AlertDialogPortal({ ...props }: React.ComponentProps<typeof Portal>) {
  return (
    <Portal
      data-component="alert-dialog-portal"
      data-slot="alert-dialog-portal"
      {...props}
    />
  );
}

export { AlertDialogPortal };
