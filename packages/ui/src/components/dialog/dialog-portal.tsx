import { Portal } from "@radix-ui/react-dialog";
import type * as React from "react";

/**
 * DialogPortal renders dialog content into a portal.
 * Import from "@patternmode/ui/components/dialog".
 */
export function DialogPortal(props: React.ComponentProps<typeof Portal>) {
  return (
    <Portal
      data-component="dialog-portal"
      data-slot="dialog-portal"
      {...props}
    />
  );
}
