import { cn } from "@patternmode/ui/utils/cn";
import { Overlay as SheetOverlayPrimitive } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";

/**
 * SheetOverlay renders the scrim behind the sheet.
 * Import from "@patternmode/ui/components/sheet".
 */
export function SheetOverlay({
  className,
  ...props
}: ComponentProps<typeof SheetOverlayPrimitive>) {
  return (
    <SheetOverlayPrimitive
      className={cn(
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 glass-scrim fixed inset-0 z-50 data-[state=closed]:animate-out data-[state=open]:animate-in",
        className,
      )}
      data-component="sheet-overlay"
      data-slot="sheet-overlay"
      {...props}
    />
  );
}
