import { cn } from "@patternmode/ui/utils/cn";
import { Overlay } from "@radix-ui/react-dialog";
import type * as React from "react";

/**
 * DialogOverlay renders the scrim behind the dialog.
 * Import from "@patternmode/ui/components/dialog".
 */
export function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof Overlay>) {
  return (
    <Overlay
      className={cn(
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 glass-scrim fixed inset-0 z-50 data-[state=closed]:animate-out data-[state=open]:animate-in",
        className,
      )}
      data-component="dialog-overlay"
      data-slot="dialog-overlay"
      {...props}
    />
  );
}
