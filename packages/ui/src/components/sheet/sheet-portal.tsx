import { Portal as SheetPortalPrimitive } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";

/**
 * SheetPortal renders sheet content into a portal.
 * Import from "@patternmode/ui/components/sheet".
 */
export function SheetPortal(
  props: ComponentProps<typeof SheetPortalPrimitive>,
) {
  return (
    <SheetPortalPrimitive
      data-component="sheet-portal"
      data-slot="sheet-portal"
      {...props}
    />
  );
}
