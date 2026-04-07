"use client";

import { buttonVariants } from "@patternmode/ui/components/button";
import { cn } from "@patternmode/ui/utils/cn";
import { Cancel } from "@radix-ui/react-alert-dialog";
import type * as React from "react";

/**
 * AlertDialogCancel UI component.
 * Import from "@patternmode/ui/components/alert-dialog".
 * Built on Radix UI primitives for accessible behavior.
 */
function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof Cancel>) {
  return (
    <Cancel
      className={cn(
        buttonVariants({ appearance: "outline", variant: "secondary" }),
        className,
      )}
      {...props}
    />
  );
}

export { AlertDialogCancel };
