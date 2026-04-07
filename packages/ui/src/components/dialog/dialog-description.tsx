import { cn } from "@patternmode/ui/utils/cn";
import { Description } from "@radix-ui/react-dialog";
import type * as React from "react";

/**
 * DialogDescription renders supporting text for the dialog.
 * Import from "@patternmode/ui/components/dialog".
 */
export function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof Description>) {
  return (
    <Description
      className={cn("text-muted-foreground text-xs", className)}
      data-component="dialog-description"
      data-slot="dialog-description"
      {...props}
    />
  );
}
