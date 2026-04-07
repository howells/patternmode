"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Content } from "@radix-ui/react-alert-dialog";
import type * as React from "react";
import { AlertDialogOverlay } from "./alert-dialog-overlay";
import { AlertDialogPortal } from "./alert-dialog-portal";

/** alert dialog content area */

function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <Content
        className={cn(
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-4xl border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:max-w-lg",
          className,
        )}
        data-component="alert-dialog-content"
        data-slot="alert-dialog-content"
        {...props}
      />
    </AlertDialogPortal>
  );
}

export { AlertDialogContent };
