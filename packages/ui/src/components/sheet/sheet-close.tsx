import { Close as SheetClosePrimitive } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";

/**
 * SheetClose closes the sheet when triggered.
 * Import from "@patternmode/ui/components/sheet".
 */
export function SheetClose(props: ComponentProps<typeof SheetClosePrimitive>) {
  return (
    <SheetClosePrimitive
      data-component="sheet-close"
      data-slot="sheet-close"
      {...props}
    />
  );
}
