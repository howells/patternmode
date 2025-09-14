import { Dialog } from "@base-ui-components/react/dialog";
import { cx } from "@patternmode/utils/cx";
import { focusRing } from "@patternmode/utils/focus-ring";
import type * as React from "react";
import { SheetOverlay } from "./sheet-overlay";
import { SheetPortal } from "./sheet-portal";

export type SheetContentProps = React.ComponentPropsWithoutRef<
  typeof Dialog.Popup
>;

export const SheetContent = ({
  ref: forwardedRef,
  className,
  ...props
}: SheetContentProps & {
  ref?: React.RefObject<React.ElementRef<typeof Dialog.Popup> | null>;
}) => {
  return (
    <SheetPortal>
      <SheetOverlay />
      <Dialog.Popup
        className={cx(
          "fixed inset-y-2 isolate mx-auto flex w-[95vw] flex-1 flex-col overflow-y-auto rounded-md border p-4 shadow-xl focus:outline-hidden max-sm:inset-x-2 sm:inset-y-2 sm:right-2 sm:max-w-lg sm:p-6",
          "dark:border-zinc-900",
          "bg-white dark:bg-[#090E1A]",
          "data-[closed]:animate-sheet-slide-right-and-fade data-[open]:animate-sheet-slide-left-and-fade",
          focusRing,
          className
        )}
        ref={forwardedRef}
        {...props}
      />
    </SheetPortal>
  );
};

SheetContent.displayName = "SheetContent";
