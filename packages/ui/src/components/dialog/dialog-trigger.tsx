import { Trigger } from "@radix-ui/react-dialog";
import type * as React from "react";

/**
 * Button that opens the dialog when clicked.
 * Import from "@patternmode/ui/components/dialog".
 */
export function DialogTrigger(props: React.ComponentProps<typeof Trigger>) {
  return (
    <Trigger
      data-component="dialog-trigger"
      data-slot="dialog-trigger"
      {...props}
    />
  );
}
