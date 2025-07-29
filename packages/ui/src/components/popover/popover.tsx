/**
 * Popover Components
 *
 * A comprehensive popover system built on Base UI Popover for creating
 * contextual overlays, tooltips, and dropdown content. Features smart
 * positioning, collision detection, and smooth animations.
 *
 * Features:
 * - Base UI Popover integration for full accessibility
 * - Smart positioning with collision detection
 * - Portal rendering for proper layering
 * - Smooth entrance and exit animations
 * - Arrow indicators with automatic rotation
 * - Focus management and keyboard navigation
 * - Backdrop support for modal-like behavior
 * - Dark mode compatible styling
 * - Customizable positioning and alignment
 *
 * Built on Base UI Popover documentation:
 * https://base-ui.com/react/components/popover
 *
 * @example
 * ```tsx
 * // Basic popover
 * <Popover>
 *   <PopoverTrigger>Click me</PopoverTrigger>
 *   <PopoverContent>
 *     <PopoverTitle>Popover Title</PopoverTitle>
 *     <PopoverDescription>Some helpful information here.</PopoverDescription>
 *     <PopoverClose>Close</PopoverClose>
 *   </PopoverContent>
 * </Popover>
 *
 * // Advanced popover with arrow and positioning
 * <Popover>
 *   <PopoverTrigger className="px-4 py-2 bg-blue-500 text-white rounded">
 *     Show Details
 *   </PopoverTrigger>
 *   <PopoverContent side="top" align="start" sideOffset={15}>
 *     <PopoverArrow />
 *     <PopoverTitle>Product Details</PopoverTitle>
 *     <PopoverDescription>
 *       This product includes advanced features and premium support.
 *     </PopoverDescription>
 *     <div className="mt-4 flex justify-end space-x-2">
 *       <PopoverClose className="px-3 py-1 text-sm border rounded">
 *         Cancel
 *       </PopoverClose>
 *       <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">
 *         Learn More
 *       </button>
 *     </div>
 *   </PopoverContent>
 * </Popover>
 *
 * // Popover with backdrop
 * <Popover>
 *   <PopoverTrigger>Open Modal-like Popover</PopoverTrigger>
 *   <PopoverPortal>
 *     <PopoverBackdrop />
 *     <PopoverContent>
 *       <PopoverTitle>Important Notice</PopoverTitle>
 *       <PopoverDescription>
 *         This action cannot be undone. Please confirm your decision.
 *       </PopoverDescription>
 *     </PopoverContent>
 *   </PopoverPortal>
 * </Popover>
 *
 * // Custom positioned popover
 * <Popover>
 *   <PopoverTrigger>Show Menu</PopoverTrigger>
 *   <PopoverContent side="right" align="center" collisionPadding={20}>
 *     <div className="space-y-2">
 *       <button className="block w-full text-left px-3 py-1 hover:bg-zinc-100">
 *         Edit
 *       </button>
 *       <button className="block w-full text-left px-3 py-1 hover:bg-zinc-100">
 *         Duplicate
 *       </button>
 *       <button className="block w-full text-left px-3 py-1 hover:bg-zinc-100 text-red-600">
 *         Delete
 *       </button>
 *     </div>
 *   </PopoverContent>
 * </Popover>
 * ```
 */

import { cx } from "../../lib/utils";
import { Popover as BasePopover } from "@base-ui-components/react/popover";
import React from "react";

/**
 * An accessible popup anchored to a button, built on Base UI's Popover primitive.
 *
 * Based on Base UI's Popover (https://base-ui.com/react/components/popover),
 * providing flexible contextual information displays with positioning, arrows,
 * and proper focus management. Perfect for tooltips, menus, and content overlays.
 *
 * @component
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>Open Popover</PopoverTrigger>
 *   <PopoverContent>
 *     <PopoverTitle>Popover Title</PopoverTitle>
 *     <PopoverDescription>Some helpful information here.</PopoverDescription>
 *     <PopoverClose>Close</PopoverClose>
 *   </PopoverContent>
 * </Popover>
 * ```
 *
 * @see https://base-ui.com/react/components/popover - Base UI documentation
 */
const Popover = BasePopover.Root;

/**
 * Trigger element that opens the popover when activated.
 *
 * Can be any interactive element like a button or link. Provides focus management
 * and proper ARIA attributes for accessibility.
 *
 * @example
 * ```tsx
 * <PopoverTrigger>Click me</PopoverTrigger>
 * ```
 */
/**
 * Popover trigger component that opens the popover when activated.
 *
 * Interactive element that toggles the popover visibility. Features
 * proper focus states and accessibility attributes. Can be styled
 * as any type of interactive element.
 *
 * @param className - Additional CSS classes
 * @param props - Additional Base UI Trigger props
 *
 * @component
 * @example
 * ```tsx
 * <PopoverTrigger>Click to open</PopoverTrigger>
 *
 * <PopoverTrigger className="px-4 py-2 bg-blue-500 text-white rounded">
 *   Show Information
 * </PopoverTrigger>
 *
 * <PopoverTrigger asChild>
 *   <button className="custom-button">Custom Button</button>
 * </PopoverTrigger>
 * ```
 */
const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof BasePopover.Trigger>,
  React.ComponentPropsWithoutRef<typeof BasePopover.Trigger>
>(({ className, ...props }, ref) => (
  <BasePopover.Trigger
    ref={ref}
    className={cx(
      // base
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
      // focus
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
      // disabled
      "disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
));
PopoverTrigger.displayName = "PopoverTrigger";

/**
 * Portal component for rendering popover content in a different DOM location.
 *
 * Renders popover content outside the normal DOM tree to avoid z-index
 * issues and ensure proper layering. Used internally by PopoverContent.
 *
 * @component
 * @example
 * ```tsx
 * <PopoverPortal>
 *   <PopoverContent>Content rendered in portal</PopoverContent>
 * </PopoverPortal>
 * ```
 */
const PopoverPortal = BasePopover.Portal;

/**
 * Optional backdrop that appears behind the popover.
 *
 * Provides subtle background overlay and can be configured to close
 * the popover when clicked. Less prominent than dialog backdrops.
 *
 * @example
 * ```tsx
 * <PopoverBackdrop />
 * ```
 */
/**
 * Optional backdrop that appears behind the popover.
 *
 * Provides subtle background overlay for modal-like behavior.
 * Can be configured to close the popover when clicked and includes
 * smooth fade animations.
 *
 * @param className - Additional CSS classes
 * @param props - Additional Base UI Backdrop props
 *
 * @component
 * @example
 * ```tsx
 * <PopoverPortal>
 *   <PopoverBackdrop />
 *   <PopoverContent>Modal-like popover content</PopoverContent>
 * </PopoverPortal>
 *
 * <PopoverBackdrop className="bg-red-500/20" />
 * ```
 */
const PopoverBackdrop = React.forwardRef<
  React.ElementRef<typeof BasePopover.Backdrop>,
  React.ComponentPropsWithoutRef<typeof BasePopover.Backdrop>
>(({ className, ...props }, ref) => (
  <BasePopover.Backdrop
    ref={ref}
    className={cx(
      // base
      "fixed inset-0 z-40",
      // background
      "bg-black/20 dark:bg-black/40",
      // animations
      "data-[starting-style]:animate-in data-[ending-style]:animate-out",
      "data-[starting-style]:fade-in data-[ending-style]:fade-out",
      className
    )}
    {...props}
  />
));
PopoverBackdrop.displayName = "PopoverBackdrop";

/**
 * Positioner component that handles popover placement and collision detection.
 *
 * Automatically positions the popover relative to its trigger with smart
 * collision avoidance. Typically used internally by PopoverContent but
 * can be used directly for custom positioning logic.
 *
 * @param sideOffset - Distance from the trigger element
 * @param collisionPadding - Padding for collision detection
 * @param props - Additional Base UI Positioner props
 *
 * @component
 * @example
 * ```tsx
 * <PopoverPositioner side="top" align="center" sideOffset={15}>
 *   <PopoverContent>Custom positioned content</PopoverContent>
 * </PopoverPositioner>
 * ```
 */
const PopoverPositioner = React.forwardRef<
  React.ElementRef<typeof BasePopover.Positioner>,
  React.ComponentPropsWithoutRef<typeof BasePopover.Positioner>
>(({ sideOffset = 10, collisionPadding = 5, ...props }, ref) => (
  <BasePopover.Positioner
    ref={ref}
    sideOffset={sideOffset}
    collisionPadding={collisionPadding}
    {...props}
  />
));
PopoverPositioner.displayName = "PopoverPositioner";

/**
 * Main popover content container with automatic positioning.
 *
 * The primary container for popover content with smart positioning,
 * collision detection, smooth animations, and portal rendering.
 * Features comprehensive styling and wheel event handling.
 *
 * @param sideOffset - Distance from the trigger element
 * @param side - Preferred placement side (top, right, bottom, left)
 * @param align - Alignment relative to trigger (start, center, end)
 * @param collisionPadding - Padding for collision detection
 * @param className - Additional CSS classes
 * @param props - Additional Base UI Popup props
 *
 * @component
 * @example
 * ```tsx
 * // Basic content
 * <PopoverContent>
 *   <PopoverTitle>Title</PopoverTitle>
 *   <PopoverDescription>Description text</PopoverDescription>
 * </PopoverContent>
 *
 * // Positioned content
 * <PopoverContent side="top" align="start" sideOffset={15}>
 *   Content positioned above trigger
 * </PopoverContent>
 *
 * // Custom styled content
 * <PopoverContent className="w-80 p-4 bg-blue-50">
 *   Custom styled popover content
 * </PopoverContent>
 * ```
 */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof BasePopover.Popup>,
  React.ComponentPropsWithoutRef<typeof BasePopover.Popup> & {
    /** Distance from the trigger element */
    sideOffset?: number;
    /** Preferred placement side */
    side?: "top" | "right" | "bottom" | "left";
    /** Alignment relative to the trigger */
    align?: "start" | "center" | "end";
    /** Padding for collision detection */
    collisionPadding?: number;
  }
>(
  (
    {
      className,
      sideOffset = 10,
      side = "bottom",
      align = "center",
      collisionPadding = 5,
      ...props
    },
    ref
  ) => {
    return (
      <PopoverPortal>
        <PopoverPositioner
          side={side}
          align={align}
          sideOffset={sideOffset}
          collisionPadding={collisionPadding}
        >
          <BasePopover.Popup
            ref={ref}
            className={cx(
              // base
              "z-50 min-w-60 max-w-sm overflow-hidden rounded-md border p-2.5 text-sm shadow-xl shadow-black/[2.5%]",
              // border color
              "border-zinc-200 dark:border-zinc-800",
              // text color
              "text-zinc-900 dark:text-zinc-50",
              // background color
              "bg-white dark:bg-zinc-950",
              // animations
              "data-[starting-style]:animate-in data-[ending-style]:animate-out",
              "data-[starting-style]:fade-in data-[ending-style]:fade-out",
              "data-[starting-style]:zoom-in-95 data-[ending-style]:zoom-out-95",
              "data-[side=bottom]:data-[starting-style]:slide-in-from-top-2 data-[side=bottom]:data-[ending-style]:slide-out-to-top-2",
              "data-[side=left]:data-[starting-style]:slide-in-from-right-2 data-[side=left]:data-[ending-style]:slide-out-to-right-2",
              "data-[side=right]:data-[starting-style]:slide-in-from-left-2 data-[side=right]:data-[ending-style]:slide-out-to-left-2",
              "data-[side=top]:data-[starting-style]:slide-in-from-bottom-2 data-[side=top]:data-[ending-style]:slide-out-to-bottom-2",
              className
            )}
            onWheel={(event) => {
              event.stopPropagation();
              const isScrollingDown = event.deltaY > 0;
              if (isScrollingDown) {
                event.currentTarget.dispatchEvent(
                  new KeyboardEvent("keydown", { key: "ArrowDown" })
                );
              } else {
                event.currentTarget.dispatchEvent(
                  new KeyboardEvent("keydown", { key: "ArrowUp" })
                );
              }
            }}
            {...props}
          />
        </PopoverPositioner>
      </PopoverPortal>
    );
  }
);
PopoverContent.displayName = "PopoverContent";

/**
 * Arrow component that points from the popover to its trigger.
 *
 * Provides visual connection between the trigger and popover content.
 * Automatically rotates and positions based on the popover's placement side.
 * Features layered SVG styling for proper contrast in light and dark themes.
 *
 * @example
 * ```tsx
 * <PopoverContent>
 *   <PopoverArrow />
 *   Content here
 * </PopoverContent>
 * ```
 */
const PopoverArrow = React.forwardRef<
  React.ElementRef<typeof BasePopover.Arrow>,
  React.ComponentPropsWithoutRef<typeof BasePopover.Arrow>
>(({ className, ...props }, ref) => (
  <BasePopover.Arrow
    ref={ref}
    className={cx(
      // base
      "flex transition-all duration-200 ease-out",
      // positioning based on side
      "data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90",
      "data-[side=right]:left-[-13px] data-[side=right]:-rotate-90",
      "data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
      className
    )}
    {...props}
  >
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-white dark:fill-zinc-950"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className="fill-zinc-200 dark:fill-none"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className="dark:fill-zinc-300"
      />
    </svg>
  </BasePopover.Arrow>
));
PopoverArrow.displayName = "PopoverArrow";

/**
 * Title heading for the popover content.
 *
 * Provides semantic heading structure and prominent typography.
 * Use to establish clear hierarchy within popover content.
 *
 * @example
 * ```tsx
 * <PopoverTitle>Settings</PopoverTitle>
 * ```
 */
/**
 * Title heading component for popover content.
 *
 * Semantic heading that establishes content hierarchy within the popover.
 * Features prominent typography and proper spacing for visual organization.
 *
 * @param className - Additional CSS classes
 * @param props - Additional Base UI Title props
 *
 * @component
 * @example
 * ```tsx
 * <PopoverTitle>Settings Panel</PopoverTitle>
 *
 * <PopoverTitle className="text-xl font-bold text-blue-600">
 *   Custom Styled Title
 * </PopoverTitle>
 * ```
 */
const PopoverTitle = React.forwardRef<
  React.ElementRef<typeof BasePopover.Title>,
  React.ComponentPropsWithoutRef<typeof BasePopover.Title>
>(({ className, ...props }, ref) => (
  <BasePopover.Title
    ref={ref}
    className={cx(
      // base
      "text-lg font-semibold leading-6",
      // text color
      "text-zinc-900 dark:text-zinc-50",
      // spacing
      "mb-2",
      className
    )}
    {...props}
  />
));
PopoverTitle.displayName = "PopoverTitle";

/**
 * Description text that provides additional context for the popover.
 *
 * Uses muted text styling to create proper visual hierarchy with the title.
 * Ideal for explanatory content or additional details.
 *
 * @example
 * ```tsx
 * <PopoverDescription>
 *   Adjust your account preferences and notification settings.
 * </PopoverDescription>
 * ```
 */
/**
 * Description component for explanatory popover text.
 *
 * Provides additional context and information with muted styling
 * that creates proper visual hierarchy with the title.
 *
 * @param className - Additional CSS classes
 * @param props - Additional Base UI Description props
 *
 * @component
 * @example
 * ```tsx
 * <PopoverDescription>
 *   Adjust your account preferences and notification settings.
 * </PopoverDescription>
 *
 * <PopoverDescription className="text-red-600">
 *   Warning: This action cannot be undone.
 * </PopoverDescription>
 * ```
 */
const PopoverDescription = React.forwardRef<
  React.ElementRef<typeof BasePopover.Description>,
  React.ComponentPropsWithoutRef<typeof BasePopover.Description>
>(({ className, ...props }, ref) => (
  <BasePopover.Description
    ref={ref}
    className={cx(
      // base
      "text-sm leading-6",
      // text color
      "text-zinc-600 dark:text-zinc-400",
      className
    )}
    {...props}
  />
));
PopoverDescription.displayName = "PopoverDescription";

/**
 * Close button that dismisses the popover.
 *
 * Typically styled as a small icon button and positioned in the top-right corner.
 * Automatically handles focus management when the popover closes.
 *
 * @example
 * ```tsx
 * <PopoverClose>
 *   <XIcon className="h-4 w-4" />
 * </PopoverClose>
 * ```
 */
/**
 * Close button component for dismissing the popover.
 *
 * Interactive element that closes the popover and returns focus
 * to the trigger. Features subtle styling and hover effects.
 *
 * @param className - Additional CSS classes
 * @param props - Additional Base UI Close props
 *
 * @component
 * @example
 * ```tsx
 * <PopoverClose>Close</PopoverClose>
 *
 * <PopoverClose className="absolute top-2 right-2">
 *   <X className="h-4 w-4" />
 * </PopoverClose>
 *
 * <PopoverClose asChild>
 *   <button className="custom-close-button">Done</button>
 * </PopoverClose>
 * ```
 */
const PopoverClose = React.forwardRef<
  React.ElementRef<typeof BasePopover.Close>,
  React.ComponentPropsWithoutRef<typeof BasePopover.Close>
>(({ className, ...props }, ref) => (
  <BasePopover.Close
    ref={ref}
    className={cx(
      // base
      "inline-flex h-6 w-6 items-center justify-center rounded-sm text-sm font-medium transition-colors",
      // text color
      "text-zinc-500 dark:text-zinc-400",
      // hover
      "hover:text-zinc-900 dark:hover:text-zinc-50",
      // focus
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
      // disabled
      "disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
));
PopoverClose.displayName = "PopoverClose";

/**
 * Legacy alias for PopoverTrigger (backward compatibility).
 *
 * @deprecated Use PopoverTrigger instead
 */
const PopoverAnchor = PopoverTrigger;

export {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBackdrop,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
};
