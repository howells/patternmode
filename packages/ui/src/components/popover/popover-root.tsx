"use client";

import { cn } from "@patternmode/ui/utils/cn";
import {
  Anchor,
  Content,
  Portal,
  Root,
  Trigger,
} from "@radix-ui/react-popover";
import type * as React from "react";
import type { ComponentSize } from "../../lib/size";

/**
 * Root component for a popover (non-modal floating panel). Manages open/closed state.
 *
 * @param props - The popover props
 * @param props.open - Controlled open state. Use with onOpenChange.
 * @param props.defaultOpen - Uncontrolled default open state.
 * @param props.onOpenChange - Callback when open state changes.
 * @param props.modal - Whether the popover is modal. Defaults to false.
 * @param props... - All other Radix UI Popover.Root props.
 *
 * @example
 * ```tsx
 * <Popover open={open} onOpenChange={setOpen}>
 *   <PopoverTrigger>Open</PopoverTrigger>
 *   <PopoverContent>Content</PopoverContent>
 * </Popover>
 * ```
 */
function Popover({ ...props }: React.ComponentProps<typeof Root>) {
  return <Root data-component="popover" data-slot="popover" {...props} />;
}

/**
 * Button that opens the popover when clicked.
 *
 * @param props - The popover trigger props
 * @param props... - All Radix UI Popover.Trigger props.
 */
function PopoverTrigger({ ...props }: React.ComponentProps<typeof Trigger>) {
  return (
    <Trigger
      data-component="popover-trigger"
      data-slot="popover-trigger"
      {...props}
    />
  );
}
type PopoverSize = Extract<ComponentSize, "sm" | "base" | "lg">;

const POPOVER_SIZE_CLASSES: Record<PopoverSize, string> = {
  sm: "p-2 rounded-xl",
  base: "p-4 rounded-2xl",
  lg: "p-6 rounded-3xl",
};

/**
 * Content area of the popover. Positioned relative to the trigger.
 *
 * @param props - The popover content props
 * @param props.size - Controls padding and border radius. Options: "sm", "base" (default), "lg".
 * @param props.align - Alignment relative to trigger. Options: "center" (default), "start", "end".
 * @param props.side - Side relative to trigger. Options: "top", "right", "bottom", "left".
 * @param props.sideOffset - Distance from trigger in pixels. Defaults to 4.
 * @param props.className - Additional CSS classes to apply.
 * @param props.children - Popover content.
 * @param props... - All other Radix UI Popover.Content props.
 *
 * @example
 * ```tsx
 * <PopoverContent align="start" side="bottom" size="lg">
 *   <Text>Popover content</Text>
 * </PopoverContent>
 * ```
 */
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  size = "base",
  ...props
}: React.ComponentProps<typeof Content> & {
  size?: PopoverSize;
}) {
  return (
    <Portal>
      <Content
        align={align}
        className={cn(
          // Use ring instead of border - ring is box-shadow based and won't interfere with arrow overlap
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) overflow-hidden bg-popover text-popover-foreground shadow-xs outline-hidden ring-1 ring-border data-[state=closed]:animate-out data-[state=open]:animate-in",
          POPOVER_SIZE_CLASSES[size],
          className,
        )}
        data-component="popover-content"
        data-slot="popover-content"
        sideOffset={sideOffset}
        {...props}
      />
    </Portal>
  );
}

/** Alternative anchor element for positioning the popover relative to a non-trigger element. */
function PopoverAnchor({ ...props }: React.ComponentProps<typeof Anchor>) {
  return (
    <Anchor
      data-component="popover-anchor"
      data-slot="popover-anchor"
      {...props}
    />
  );
}

/**
 * SVG arrow pointer that connects the popover to its trigger.
 * Uses SVG for seamless shadow integration. Arrow dimensions: 22px wide x 9px tall.
 */
function PopoverArrow({ className }: { className?: string }) {
  // SVG triangle with drop-shadow filter for edge definition.
  // Arrow is positioned to overlap content border for seamless connection.
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-10",
        // Arrow dimensions
        "h-[9px] w-[22px]",
        // Horizontal alignment
        "[[data-align=center]_&]:left-1/2 [[data-align=center]_&]:-translate-x-1/2",
        "[[data-align=start]_&]:left-4",
        "[[data-align=end]_&]:right-4 [[data-align=end]_&]:left-auto",
        // Side positioning - SVG points down by default
        "[[data-side=bottom]_&]:-top-[8px] [[data-side=bottom]_&]:rotate-180",
        "[[data-side=top]_&]:top-auto [[data-side=top]_&]:-bottom-[8px]",
        "[[data-side=left]_&]:top-1/2 [[data-side=left]_&]:-right-[8px] [[data-side=left]_&]:left-auto [[data-side=left]_&]:h-[22px] [[data-side=left]_&]:w-[9px] [[data-side=left]_&]:-translate-y-1/2 [[data-side=left]_&]:-rotate-90",
        "[[data-side=right]_&]:top-1/2 [[data-side=right]_&]:right-auto [[data-side=right]_&]:-left-[8px] [[data-side=right]_&]:h-[22px] [[data-side=right]_&]:w-[9px] [[data-side=right]_&]:-translate-y-1/2 [[data-side=right]_&]:rotate-90",
        className,
      )}
      data-component="popover-arrow"
      data-slot="popover-arrow"
      viewBox="0 0 22 9"
    >
      {/* Drop shadow filter for edge definition */}
      <defs>
        <filter height="200%" id="arrow-shadow" width="200%" x="-50%" y="-50%">
          <feDropShadow dx="0" dy="1" floodOpacity="0.1" stdDeviation="1" />
        </filter>
      </defs>
      {/* Triangle with shadow on edges only */}
      <path
        className="fill-popover"
        d="M0 0h22L11 9 0 0z"
        filter="url(#arrow-shadow)"
      />
    </svg>
  );
}

export { Popover, PopoverAnchor, PopoverArrow, PopoverContent, PopoverTrigger };
