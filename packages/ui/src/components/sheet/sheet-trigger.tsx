import { Trigger as SheetTriggerPrimitive } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";

/**
 * Button that opens the sheet when clicked.
 * Import from "@patternmode/ui/components/sheet".
 */
export function SheetTrigger(
  props: ComponentProps<typeof SheetTriggerPrimitive>,
) {
  return (
    <SheetTriggerPrimitive
      data-component="sheet-trigger"
      data-slot="sheet-trigger"
      {...props}
    />
  );
}
