"use client";

import { Content, Portal } from "@radix-ui/react-alert-dialog";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import { cn } from "../../utils/cn";
import { AlertDialogOverlay } from "./alert-dialog-root";

const AlertDialogContent = forwardRef<
  ComponentRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => {
  return (
    <Portal>
      <AlertDialogOverlay />
      <Content
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-[min(32rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-[var(--radius-xl)] border border-border/80 bg-panel p-6 shadow-lg",
          className
        )}
        ref={ref}
        {...props}
      />
    </Portal>
  );
});

AlertDialogContent.displayName = Content.displayName;

export { AlertDialogContent };
