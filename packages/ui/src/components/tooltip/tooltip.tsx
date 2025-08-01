// Tremor Tooltip [v1.0.0] - Base UI

"use client";

import type { VariantProps } from "tailwind-variants";

import { Tooltip as BaseTooltip } from "@base-ui-components/react/tooltip";
import React from "react";
import { tv } from "tailwind-variants";

import { cx } from "../../lib/utils";

const tooltipVariants = tv({
  slots: {
    popup: [
      // base
      "origin-[var(--transform-origin)] flex flex-col rounded-md px-2 py-1 text-sm shadow-lg z-50",
      // colors
      "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900",
      // transitions
      "transition-[transform,scale,opacity] duration-150 ease-in-out",
      // animations
      "data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
    ],
    arrow: [
      // positioning based on side
      "data-[side=bottom]:top-[-8px]",
      "data-[side=left]:right-[-13px] data-[side=left]:rotate-90",
      "data-[side=right]:left-[-13px] data-[side=right]:-rotate-90",
      "data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
    ],
  },
  variants: {
    variant: {
      default: {
        popup: "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900",
      },
      inverse: {
        popup: "bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50",
      },
    },
    size: {
      sm: {
        popup: "px-2 py-1 text-xs",
      },
      default: {
        popup: "px-2 py-1 text-sm",
      },
      lg: {
        popup: "px-3 py-2 text-base",
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

/**
 * Props for the Tooltip component.
 *
 * @interface TooltipProps
 * @augments Omit<React.ComponentPropsWithoutRef<typeof BaseTooltip.Root>, "children">
 * @augments VariantProps<typeof tooltipVariants>
 * @example
 * ```tsx
 * <Tooltip>Content</Tooltip>
 * ```
 */
type TooltipProps = {
  /**
   * The element that triggers the tooltip.
   */
  children: React.ReactElement;
  /**
   * Content to display in the tooltip.
   */
  content: React.ReactNode;
  /**
   * Preferred side for tooltip placement.
   */
  side?: "top" | "bottom" | "left" | "right";
  /**
   * Distance from the trigger element.
   */
  sideOffset?: number;
  /**
   * Alignment relative to the trigger.
   */
  align?: "start" | "center" | "end";
  /**
   * Offset for alignment positioning.
   */
  alignOffset?: number;
  /**
   * Whether to show the pointing arrow.
   */
  showArrow?: boolean;
  /**
   * Delay before showing tooltip in milliseconds.
   */
  delayDuration?: number;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Click handler for the trigger element.
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
} & Omit<
      React.ComponentPropsWithoutRef<typeof BaseTooltip.Root>,
      "children"
    > & VariantProps<typeof tooltipVariants>;

/**
 * A tooltip component built on Base UI's Tooltip primitive.
 *
 * Based on Base UI's Tooltip (https://base-ui.com/react/components/tooltip),
 * providing accessible hover/focus-triggered information popups with smart positioning,
 * customizable delays, and smooth animations. Perfect for providing contextual help,
 * explanations, and additional information without cluttering the interface.
 *
 * @component
 * @category ui
 * @icon HelpCircle
 * @id tooltip
 * @name Tooltip
 * @example
 * ```tsx
 * // Basic tooltip
 * <Tooltip content="This is a helpful tooltip">
 *   <Button>Hover me</Button>
 * </Tooltip>
 *
 * // With custom positioning
 * <Tooltip content="Bottom tooltip" side="bottom" align="start">
 *   <Icon>?</Icon>
 * </Tooltip>
 *
 * // Different variants and sizes
 * <Tooltip content="Inverse tooltip" variant="inverse" size="sm">
 *   <span>Small inverse tooltip</span>
 * </Tooltip>
 *
 * // Without arrow
 * <Tooltip content="No arrow" showArrow={false}>
 *   <Button>Clean tooltip</Button>
 * </Tooltip>
 *
 * // Controlled tooltip
 * <Tooltip
 *   content="Controlled"
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   delayDuration={500}
 * >
 *   <Button>Controlled</Button>
 * </Tooltip>
 * ```
 *
 * @see https://base-ui.com/react/components/tooltip - Base UI documentation
 */
/**
 * Contextual information popup displayed on hover or focus interactions.
 *
 * @id tooltip
 * @name Tooltip
 * @icon MessageSquare
 * @category ui
 * @component
 * @param props - Component properties.
 */
const Tooltip = ({
  ref: forwardedRef,
  children,
  className,
  content,
  delayDuration = 150,
  defaultOpen,
  open,
  onClick,
  onOpenChange,
  showArrow = true,
  side = "top",
  sideOffset = 10,
  align = "center",
  alignOffset = 0,
  variant,
  size,
  ...props
}: TooltipProps & {
  ref?: React.RefObject<React.ElementRef<typeof BaseTooltip.Popup> | null>;
}) => {
  const { popup, arrow } = tooltipVariants({ variant, size });

  return (
    <BaseTooltip.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      {...props}
    >
      <BaseTooltip.Trigger onClick={onClick}>{children}</BaseTooltip.Trigger>
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
        >
          <BaseTooltip.Popup
            ref={forwardedRef}
            className={cx(popup(), className)}
          >
            {content}
            {showArrow && (
              <BaseTooltip.Arrow className={arrow()}>
                <ArrowSvg />
              </BaseTooltip.Arrow>
            )}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
};

Tooltip.displayName = "Tooltip";

// Arrow SVG component matching Base UI example
function ArrowSvg(props: React.ComponentProps<"svg">) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-zinc-900 dark:fill-zinc-50"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className="fill-zinc-200 dark:fill-zinc-700"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className="fill-zinc-800 dark:fill-zinc-300"
      />
    </svg>
  );
}

// Additional exports for more flexibility
const TooltipProvider = BaseTooltip.Provider;
const TooltipRoot = BaseTooltip.Root;
const TooltipTrigger = BaseTooltip.Trigger;
const TooltipPortal = BaseTooltip.Portal;
const TooltipPositioner = BaseTooltip.Positioner;
const TooltipPopup = BaseTooltip.Popup;
const TooltipArrow = BaseTooltip.Arrow;

export {
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  type TooltipProps,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
};
