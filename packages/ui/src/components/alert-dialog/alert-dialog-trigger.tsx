"use client";

import { Trigger } from "@radix-ui/react-alert-dialog";
import type * as React from "react";

/** alert dialog trigger button */

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof Trigger>) {
  return (
    <Trigger
      data-component="alert-dialog-trigger"
      data-slot="alert-dialog-trigger"
      {...props}
    />
  );
}

export { AlertDialogTrigger };
