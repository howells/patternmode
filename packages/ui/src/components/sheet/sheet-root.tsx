import { Root as SheetRoot } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";

/**
 * Root component for a sheet (side panel). Manages open/closed state and accessibility.
 * Import from "@patternmode/ui/components/sheet".
 */
export function Sheet(props: ComponentProps<typeof SheetRoot>) {
  return <SheetRoot data-component="sheet" data-slot="sheet" {...props} />;
}
