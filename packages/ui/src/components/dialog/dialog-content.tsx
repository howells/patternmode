import { cn } from "@patternmode/ui/utils/cn";
import { Close, Content } from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import type * as React from "react";
import { Button } from "../button";
import { DialogOverlay } from "./dialog-overlay";
import { DialogPortal } from "./dialog-portal";

type DialogContentProps = React.ComponentProps<typeof Content>;
type InteractOutsideEvent = Parameters<
  NonNullable<DialogContentProps["onInteractOutside"]>
>[0];

export interface DialogContentExtras {
  /** Callback when clicking outside the dialog (before `onInteractOutside`). */
  onClickOutside?: (event: InteractOutsideEvent) => void;
  /** Show close button in the top-right corner. */
  showCloseButton?: boolean;
}

/**
 * Main content area of the dialog. Includes overlay and optional close button.
 * Import from "@patternmode/ui/components/dialog".
 */
export function DialogContent({
  className,
  children,
  showCloseButton = true,
  onClickOutside,
  onInteractOutside,
  ...props
}: DialogContentProps & DialogContentExtras) {
  const handleInteractOutside = (event: InteractOutsideEvent): void => {
    onClickOutside?.(event);
    onInteractOutside?.(event);
  };

  return (
    <DialogPortal data-component="dialog-portal" data-slot="dialog-portal">
      <DialogOverlay />
      <Content
        className={cn(
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-6 rounded-4xl border bg-card p-8 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:max-w-lg",
          className,
        )}
        data-component="dialog-content"
        data-slot="dialog-content"
        onInteractOutside={handleInteractOutside}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <Close asChild>
            <Button
              aria-label="Close"
              className="absolute top-8 right-8"
              data-component="dialog-close"
              data-slot="dialog-close"
              icon={XIcon}
              size="icon-sm"
              variant="secondary"
            />
          </Close>
        ) : null}
      </Content>
    </DialogPortal>
  );
}
