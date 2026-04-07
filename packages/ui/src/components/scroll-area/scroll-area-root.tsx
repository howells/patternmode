"use client";

import { cn } from "@patternmode/ui/utils/cn";
import {
  Corner,
  Root,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  Viewport,
} from "@radix-ui/react-scroll-area";
import type { ComponentProps } from "react";

type ScrollAreaProps = ComponentProps<typeof Root> & {
  /** Allow content to visually overflow the root container. */
  allowOverflow?: boolean;
  /** Orientation of the scrollbar. Defaults to "vertical". Set to "horizontal" for horizontal scrolling. */
  orientation?: "vertical" | "horizontal";
  /** Hide the scrollbar completely while maintaining scroll functionality */
  hideScrollbar?: boolean;
  /** Additional classes for the viewport (scrolling container) */
  viewportClassName?: string;
};

/**
 * Custom scrollable area with styled scrollbars.
 * Built on Radix UI primitives for accessible behavior.
 *
 * @example
 * ```tsx
 * <ScrollArea className="h-64">
 *   <div>Long scrollable content...</div>
 * </ScrollArea>
 * ```
 */
function ScrollArea({
  className,
  children,
  allowOverflow = false,
  orientation = "vertical",
  hideScrollbar = false,
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
        className,
      )}
      data-component="scroll-area"
      data-slot="scroll-area"
      {...props}
    >
      <Viewport
        className={cn(
          "size-full rounded-[inherit] outline-none transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50",
          orientation === "horizontal" && "[&>div]:!block",
          viewportClassName,
        )}
        data-component="scroll-area-viewport"
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

/** Styled scrollbar track and thumb. Used internally by ScrollArea. */
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ComponentProps<typeof ScrollAreaScrollbar>) {
  return (
    <ScrollAreaScrollbar
      className={cn(
        "flex touch-none select-none p-px transition-colors",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className,
      )}
      data-component="scroll-area-scrollbar"
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      {...props}
    >
      <ScrollAreaThumb
        className="relative flex-1 rounded-full bg-border"
        data-component="scroll-area-thumb"
        data-slot="scroll-area-thumb"
      />
    </ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
