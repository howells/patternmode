import { Root } from "@radix-ui/react-dialog";
import type * as React from "react";

/**
 * Root component for a modal dialog. Manages open/closed state and accessibility.
 * Import from "@patternmode/ui/components/dialog".
 */
export function Dialog(props: React.ComponentProps<typeof Root>) {
  return <Root data-component="dialog" data-slot="dialog" {...props} />;
}
