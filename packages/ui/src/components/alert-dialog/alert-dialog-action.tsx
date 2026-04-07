"use client";

import {
  type ButtonVariant,
  buttonVariants,
} from "@patternmode/ui/components/button";
import { cn } from "@patternmode/ui/utils/cn";
import { Action } from "@radix-ui/react-alert-dialog";
import type * as React from "react";

interface AlertDialogActionProps extends React.ComponentProps<typeof Action> {
  variant?: ButtonVariant;
}

/**
 * AlertDialogAction UI component.
 * Import from "@patternmode/ui/components/alert-dialog".
 * Built on Radix UI primitives for accessible behavior.
 */
function AlertDialogAction({
  className,
  variant,
  ...props
}: AlertDialogActionProps) {
  return (
    <Action className={cn(buttonVariants({ variant }), className)} {...props} />
  );
}

export { AlertDialogAction };
