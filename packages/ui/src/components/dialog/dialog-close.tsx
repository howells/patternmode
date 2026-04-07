import { Close } from "@radix-ui/react-dialog";
import type * as React from "react";

/**
 * DialogClose closes the dialog when triggered.
 * Import from "@patternmode/ui/components/dialog".
 */
export function DialogClose(props: React.ComponentProps<typeof Close>) {
  return (
    <Close data-component="dialog-close" data-slot="dialog-close" {...props} />
  );
}
