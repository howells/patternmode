import { Dialog } from "@base-ui-components/react/dialog";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";

export type SheetOverlayProps = React.ComponentPropsWithoutRef<
  typeof Dialog.Backdrop
>;

export const SheetOverlay = ({
  ref: forwardedRef,
  className,
  ...props
}: SheetOverlayProps & {
  ref?: React.RefObject<React.ElementRef<typeof Dialog.Backdrop> | null>;
}) => {
  return (
    <Dialog.Backdrop
      className={cx(
        "fixed inset-0 isolate overflow-y-auto",
        "bg-black/30",
        "data-[closed]:animate-hide data-[open]:animate-dialog-overlay-show",
        className
      )}
      ref={forwardedRef}
      {...props}
      style={{ animationDuration: "400ms", animationFillMode: "backwards" }}
    />
  );
};

SheetOverlay.displayName = "SheetOverlay";
