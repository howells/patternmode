import { cn } from "@patternmode/ui/utils/cn";
import { Title as SheetTitlePrimitive } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";

/**
 * SheetTitle renders the heading for the sheet.
 * Import from "@patternmode/ui/components/sheet".
 */
export function SheetTitle({
  className,
  ...props
}: ComponentProps<typeof SheetTitlePrimitive>) {
  return (
    <SheetTitlePrimitive
      className={cn("font-medium text-foreground", className)}
      data-component="sheet-title"
      data-slot="sheet-title"
      {...props}
    />
  );
}
