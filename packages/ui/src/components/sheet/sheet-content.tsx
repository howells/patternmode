import { cn } from "@patternmode/ui/utils/cn";
import { focusRing } from "@patternmode/ui/utils/focus-ring";
import {
  Close as SheetClosePrimitive,
  Content as SheetContentPrimitive,
} from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { SheetOverlay } from "./sheet-overlay";
import { SheetPortal } from "./sheet-portal";

type SheetSide = "top" | "right" | "bottom" | "left";

type SheetContentProps = ComponentProps<typeof SheetContentPrimitive> & {
  /** Side from which sheet slides in. */
  side?: SheetSide;
};

/**
 * Main content area of the sheet. Slides in from the specified side.
 * Import from "@patternmode/ui/components/sheet".
 */
export function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetContentPrimitive
        className={cn(
          "fixed z-50 flex flex-col gap-4 rounded-4xl border bg-card px-4 shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right top-3 right-3 bottom-3 w-3/4 sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left top-3 bottom-3 left-3 w-3/4 sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top top-3 right-3 left-3 h-auto",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom right-3 bottom-3 left-3 h-auto",
          className,
        )}
        data-component="sheet-content"
        data-slot="sheet-content"
        {...props}
      >
        {children}
        <SheetClosePrimitive
          className={cn(
            "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity",
            "hover:opacity-100",
            focusRing,
            "disabled:pointer-events-none data-[state=open]:bg-secondary",
          )}
        >
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetClosePrimitive>
      </SheetContentPrimitive>
    </SheetPortal>
  );
}
