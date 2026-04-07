"use client";

import { Root } from "@radix-ui/react-alert-dialog";
import type * as React from "react";

/**
 * AlertDialog UI component.
 * Import from "@patternmode/ui/components/alert-dialog".
 * Built on Radix UI primitives for accessible behavior.
 */
function AlertDialog({ ...props }: React.ComponentProps<typeof Root>) {
  return (
    <Root data-component="alert-dialog" data-slot="alert-dialog" {...props} />
  );
}

export { AlertDialog };
