"use client";

import { cn } from "@patternmode/ui/utils/cn";
import {
  Arrow as TooltipArrow,
  Content as TooltipContentPrimitive,
  Portal as TooltipPortal,
  Provider as TooltipProviderPrimitive,
  Root as TooltipRoot,
  Trigger as TooltipTriggerPrimitive,
} from "@radix-ui/react-tooltip";
import type * as React from "react";

/**
 * TooltipProvider UI component.
 * Import from "@patternmode/ui/components/tooltip".
 * Built on Radix UI primitives for accessible behavior.
 */
function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipProviderPrimitive>) {
  return (
    <TooltipProviderPrimitive
      data-component="tooltip-provider"
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

/**
 * Root component for a tooltip. Wraps TooltipProvider automatically.
 *
 * @param props - The tooltip props
 * @param props.open - Controlled open state. Use with onOpenChange.
 * @param props.defaultOpen - Uncontrolled default open state.
 * @param props.onOpenChange - Callback when open state changes.
 * @param props.delayDuration - Delay before showing tooltip in ms. Defaults to 0.
 * @param props... - All other Radix UI Tooltip.Root props.
 *
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>Hover me</TooltipTrigger>
 *   <TooltipContent>Tooltip text</TooltipContent>
 * </Tooltip>
 * ```
 */
function Tooltip({
  delayDuration,
  ...props
}: React.ComponentProps<typeof TooltipRoot> & {
  /** Delay before showing tooltip in ms. Defaults to 0. */
  delayDuration?: number;
}) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <TooltipRoot data-component="tooltip" data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

/**
 * Element that triggers the tooltip on hover or focus.
 *
 * @param props - The tooltip trigger props
 * @param props... - All Radix UI Tooltip.Trigger props.
 */
function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipTriggerPrimitive>) {
  return (
    <TooltipTriggerPrimitive
      data-component="tooltip-trigger"
      data-slot="tooltip-trigger"
      {...props}
    />
  );
}
/**
 * Content displayed in the tooltip. Includes arrow pointer.
 *
 * @param props - The tooltip content props
 * @param props.side - Side relative to trigger. Options: "top", "right", "bottom", "left".
 * @param props.sideOffset - Distance from trigger in pixels. Defaults to 0.
 * @param props.align - Alignment relative to trigger. Options: "start", "center", "end".
 * @param props.className - Additional CSS classes to apply.
 * @param props.children - Tooltip text content.
 * @param props... - All other Radix UI Tooltip.Content props.
 *
 * @example
 * ```tsx
 * <TooltipContent side="top" sideOffset={4}>
 *   Tooltip text
 * </TooltipContent>
 * ```
 */
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipContentPrimitive>) {
  return (
    <TooltipPortal>
      <TooltipContentPrimitive
        className={cn(
          "data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) text-balance rounded-2xl bg-foreground px-3 py-1.5 text-background text-xs data-[state=closed]:animate-out data-[state=open]:animate-in",
          className,
        )}
        data-component="tooltip-content"
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        {...props}
      >
        {children}
        <TooltipArrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-xs bg-foreground fill-foreground" />
      </TooltipContentPrimitive>
    </TooltipPortal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
