"use client";

import {
  Corner,
  Root,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  Viewport,
} from "@radix-ui/react-scroll-area";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../utils/cn";

export interface ScrollAreaProps extends ComponentPropsWithoutRef<typeof Root> {
  allowOverflow?: boolean;
  hideScrollbar?: boolean;
  orientation?: "vertical" | "horizontal";
  viewportClassName?: string;
}

function ScrollArea({
  allowOverflow = false,
  children,
  className,
  hideScrollbar = false,
  orientation = "vertical",
  viewportClassName,
  ...props
}: ScrollAreaProps) {
  return (
    <Root
      className={cn(
        "relative",
        orientation === "horizontal" &&
          (allowOverflow
            ? "overflow-x-hidden overflow-y-visible"
            : "overflow-hidden"),
        className
      )}
      data-slot="scroll-area"
      {...props}
    >
      <Viewport
        className={cn(
          "size-full rounded-[inherit]",
          orientation === "horizontal" && "[&>div]:!block",
          viewportClassName
        )}
        data-slot="scroll-area-viewport"
      >
        {children}
      </Viewport>
      <ScrollBar
        className={hideScrollbar ? "opacity-0" : undefined}
        orientation={orientation}
      />
      <Corner />
    </Root>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ComponentPropsWithoutRef<typeof ScrollAreaScrollbar>) {
  return (
    <ScrollAreaScrollbar
      className={cn(
        "flex touch-none select-none p-px transition-opacity duration-200",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className
      )}
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      {...props}
    >
      <ScrollAreaThumb
        className="relative flex-1 rounded-full bg-border-strong/90"
        data-slot="scroll-area-thumb"
      />
    </ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
