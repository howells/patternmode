"use client";

import type { ComponentSize } from "@patternmode/ui/lib/size";
import { cn } from "@patternmode/ui/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

const scrollFadeVariants = cva(
  "pointer-events-none absolute isolate z-10 overflow-hidden after:absolute after:inset-0 after:bg-[repeating-linear-gradient(135deg,rgb(255_255_255_/_0.025)_0px,rgb(255_255_255_/_0.025)_1px,rgb(0_0_0_/_0.02)_2px,rgb(0_0_0_/_0.02)_3px)] after:opacity-40",
  {
    variants: {
      /**
       * Size of the fade gradient
       */
      size: {
        "2xs": "",
        xs: "",
        sm: "",
        base: "",
        lg: "",
        xl: "",
        "2xl": "",
        "3xl": "",
      },
      /**
       * Orientation of the gradient
       */
      orientation: {
        vertical: "right-0 left-0",
        horizontal: "top-0 bottom-0",
      },
      /**
       * Position/direction of the fade
       * - start: top for vertical, left for horizontal
       * - end: bottom for vertical, right for horizontal
       */
      position: {
        start: "",
        end: "",
      },
      /**
       * Background theme the gradient fades to
       */
      theme: {
        card: "bg-card",
        background: "bg-background",
        popover: "bg-popover",
        muted: "bg-muted",
        gray: "bg-gray-100",
      },
    },
    compoundVariants: [
      // Vertical orientation sizes (height)
      { orientation: "vertical", size: "2xs", class: "h-2" },
      { orientation: "vertical", size: "xs", class: "h-3" },
      { orientation: "vertical", size: "sm", class: "h-4" },
      { orientation: "vertical", size: "base", class: "h-6" },
      { orientation: "vertical", size: "lg", class: "h-8" },
      { orientation: "vertical", size: "xl", class: "h-10" },
      { orientation: "vertical", size: "2xl", class: "h-12" },
      { orientation: "vertical", size: "3xl", class: "h-16" },
      // Horizontal orientation sizes (width)
      { orientation: "horizontal", size: "2xs", class: "w-2" },
      { orientation: "horizontal", size: "xs", class: "w-3" },
      { orientation: "horizontal", size: "sm", class: "w-4" },
      { orientation: "horizontal", size: "base", class: "w-6" },
      { orientation: "horizontal", size: "lg", class: "w-8" },
      { orientation: "horizontal", size: "xl", class: "w-10" },
      { orientation: "horizontal", size: "2xl", class: "w-12" },
      { orientation: "horizontal", size: "3xl", class: "w-16" },
      // Vertical + start = top fade, gradient goes down (transparent at bottom, opaque at top)
      {
        orientation: "vertical",
        position: "start",
        class: "top-0",
      },
      // Vertical + end = bottom fade, gradient goes down (transparent at top, opaque at bottom)
      {
        orientation: "vertical",
        position: "end",
        class: "bottom-0",
      },
      // Horizontal + start = left fade, gradient goes left (transparent at right, opaque at left)
      {
        orientation: "horizontal",
        position: "start",
        class: "left-0",
      },
      // Horizontal + end = right fade, gradient goes right (transparent at left, opaque at right)
      {
        orientation: "horizontal",
        position: "end",
        class: "right-0",
      },
    ],
    defaultVariants: {
      size: "base",
      orientation: "vertical",
      position: "end",
      theme: "background",
    },
  },
);

export interface ScrollFadeProps
  extends Omit<React.ComponentProps<"div">, "children">,
    Omit<VariantProps<typeof scrollFadeVariants>, "size"> {
  size?: ComponentSize;
}

/**
 * A gradient fade overlay for scroll containers.
 * Place inside a relatively positioned container to indicate more content.
 *
 * @example
 * ```tsx
 * <div className="relative">
 *   <ScrollArea className="h-64">
 *     {content}
 *   </ScrollArea>
 *   <ScrollFade position="end" theme="card" />
 * </div>
 * ```
 */
export function ScrollFade({
  className,
  size = "base",
  orientation = "vertical",
  position = "end",
  theme = "background",
  style,
  ...props
}: ScrollFadeProps) {
  const easedScrimStops =
    "rgb(0 0 0 / 0) 0%, rgb(0 0 0 / 0.008) 8%, rgb(0 0 0 / 0.025) 18%, rgb(0 0 0 / 0.06) 32%, rgb(0 0 0 / 0.14) 50%, rgb(0 0 0 / 0.28) 68%, rgb(0 0 0 / 0.52) 82%, rgb(0 0 0 / 0.8) 93%, rgb(0 0 0 / 1) 100%";
  let maskDirection = "to bottom";

  if (orientation === "horizontal") {
    maskDirection = position === "end" ? "to right" : "to left";
  } else if (position === "start") {
    maskDirection = "to top";
  }

  const maskImage = `linear-gradient(${maskDirection}, ${easedScrimStops})`;
  const scrimStyle: React.CSSProperties = {
    WebkitMaskImage: maskImage,
    maskImage,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    ...style,
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        scrollFadeVariants({ size, orientation, position, theme }),
        className,
      )}
      data-component="scroll-fade"
      data-slot="scroll-fade"
      style={scrimStyle}
      {...props}
    />
  );
}
