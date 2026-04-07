import { cn } from "@patternmode/ui/utils/cn";
import { Title } from "@radix-ui/react-dialog";
import type * as React from "react";

/**
 * DialogTitle renders the heading for the dialog.
 * Import from "@patternmode/ui/components/dialog".
 */
export function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof Title>) {
  return (
    <Title
      className={cn("font-semibold text-xl leading-none", className)}
      data-component="dialog-title"
      data-slot="dialog-title"
      {...props}
    />
  );
}
