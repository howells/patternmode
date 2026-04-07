"use client";

import { Content, Portal } from "@radix-ui/react-dialog";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/focus-ring";
import { SheetOverlay } from "./sheet-overlay";
import { SheetClose } from "./sheet-root";

export type SheetSide = "top" | "right" | "bottom" | "left";

const SHEET_SIDE_CLASSES: Record<SheetSide, string> = {
  right:
    "inset-y-3 right-3 w-[min(30rem,calc(100vw-1.5rem))] rounded-[var(--radius-xl)] p-6",
  left: "inset-y-3 left-3 w-[min(30rem,calc(100vw-1.5rem))] rounded-[var(--radius-xl)] p-6",
  top: "top-3 right-3 left-3 rounded-[var(--radius-xl)] p-6",
  bottom: "right-3 bottom-3 left-3 rounded-[var(--radius-xl)] p-6",
};

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-full"
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4 12 12M12 4 4 12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export interface SheetContentProps
  extends ComponentPropsWithoutRef<typeof Content> {
  side?: SheetSide;
}

const SheetContent = forwardRef<
  ComponentRef<typeof Content>,
  SheetContentProps
>(({ className, children, side = "right", ...props }, ref) => {
  return (
    <Portal>
      <SheetOverlay />
      <Content
        className={cn(
          "fixed z-50 flex flex-col gap-4 border border-border/80 bg-panel shadow-lg backdrop-blur-sm",
          SHEET_SIDE_CLASSES[side],
          className
        )}
        data-slot="sheet-content"
        ref={ref}
        {...props}
      >
        {children}
        <SheetClose
          className={cn(
            "absolute top-4 right-4 rounded-[calc(var(--radius-md)-4px)] p-1 text-muted-foreground transition-colors hover:bg-secondary/85 hover:text-foreground",
            ...focusRing()
          )}
        >
          <span className="size-4">
            <CloseIcon />
          </span>
          <span className="sr-only">Close</span>
        </SheetClose>
      </Content>
    </Portal>
  );
});

SheetContent.displayName = Content.displayName;

export { SheetContent };
