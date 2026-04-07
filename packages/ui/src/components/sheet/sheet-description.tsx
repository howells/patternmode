import { cn } from "@patternmode/ui/utils/cn";
import { Description as SheetDescriptionPrimitive } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";

/**
 * SheetDescription renders supporting text for the sheet.
 * Import from "@patternmode/ui/components/sheet".
 */
export function SheetDescription({
  className,
  ...props
}: ComponentProps<typeof SheetDescriptionPrimitive>) {
  return (
    <SheetDescriptionPrimitive
      className={cn("text-muted-foreground text-sm", className)}
      data-component="sheet-description"
      data-slot="sheet-description"
      {...props}
    />
  );
}
