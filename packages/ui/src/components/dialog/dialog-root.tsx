import { Root } from "@radix-ui/react-dialog";
import type * as React from "react";

/**
 * Root component for a modal dialog. Manages open/closed state and accessibility.
 * Built on Radix UI primitives for accessible behavior.
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger asChild>
 *     <Button>Open</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Dialog Title</DialogTitle>
 *       <DialogDescription>Description text</DialogDescription>
 *     </DialogHeader>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
export function Dialog(props: React.ComponentProps<typeof Root>) {
  return <Root data-component="dialog" data-slot="dialog" {...props} />;
}
