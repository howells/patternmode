"use client";

import { Overlay } from "@radix-ui/react-dialog";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import { cn } from "../../utils/cn";

const SheetOverlay = forwardRef<
  ComponentRef<typeof Overlay>,
  ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, ref) => {
  return (
    <Overlay
      className={cn(
        "fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

SheetOverlay.displayName = Overlay.displayName;

export { SheetOverlay };
