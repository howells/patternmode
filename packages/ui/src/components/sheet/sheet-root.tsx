import { Root as SheetRoot } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";

/**
 * Root component for a sheet (side panel). Manages open/closed state and accessibility.
 * Built on Radix UI Dialog primitives.
 *
 * @example
 * ```tsx
 * <Sheet>
 *   <SheetTrigger asChild>
 *     <Button>Open Panel</Button>
 *   </SheetTrigger>
 *   <SheetContent side="right">
 *     <SheetHeader>
 *       <SheetTitle>Panel Title</SheetTitle>
 *     </SheetHeader>
 *   </SheetContent>
 * </Sheet>
 * ```
 */
export function Sheet(props: ComponentProps<typeof SheetRoot>) {
  return <SheetRoot data-component="sheet" data-slot="sheet" {...props} />;
}
