/**
 * Scroll Area Components.
 *
 * Custom scrollable areas with styled scrollbars built on Base UI ScrollArea.
 * Provides cross-browser consistent scrolling behavior with customizable
 * appearance and smooth interactions.
 *
 * Features:
 * - Base UI ScrollArea integration for accessibility
 * - Custom styled scrollbars with hover effects
 * - Vertical, horizontal, or both scroll orientations
 * - Smooth transitions and animations
 * - Dark mode support
 * - Customizable scrollbar and thumb styling
 * - Cross-platform consistent appearance
 * - Touch-friendly interactions.
 *
 * Built on Base UI ScrollArea documentation:
 * https://base-ui.com/react/components/scroll-area.
 *
 * @example
 * ```tsx
 * // Basic vertical scroll area
 * <ScrollArea className="h-48 w-full border">
 *   <div className="p-4">
 *     <p>Long content that needs scrolling...</p>
 *     <p>More content...</p>
 *     <p>Even more content...</p>
 *   </div>
 * </ScrollArea>
 *
 * // Horizontal scroll area
 * <ScrollArea
 *   orientation="horizontal"
 *   className="w-full whitespace-nowrap"
 * >
 *   <div className="flex gap-4 p-4">
 *     <div className="w-32 h-32 bg-blue-200 flex-shrink-0">Item 1</div>
 *     <div className="w-32 h-32 bg-green-200 flex-shrink-0">Item 2</div>
 *     <div className="w-32 h-32 bg-red-200 flex-shrink-0">Item 3</div>
 *   </div>
 * </ScrollArea>
 *
 * // Both orientations
 * <ScrollArea
 *   orientation="both"
 *   className="h-64 w-64 border"
 * >
 *   <div className="w-[500px] h-[500px] p-4">
 *     <p>Content that scrolls both ways...</p>
 *   </div>
 * </ScrollArea>
 *
 * // Custom styled scrollbars
 * <ScrollArea
 *   className="h-48 w-full"
 *   scrollbarClassName="w-3 bg-zinc-100"
 *   thumbClassName="bg-blue-500 hover:bg-blue-600"
 * >
 *   <div className="p-4">
 *     Content with custom scrollbar
 *   </div>
 * </ScrollArea>
 *
 * // Chat message area
 * <ScrollArea className="h-96 w-full border rounded-lg">
 *   <div className="space-y-2 p-4">
 *     {messages.map(message => (
 *       <div key={message.id} className="p-2 bg-zinc-100 rounded">
 *         {message.text}
 *       </div>
 *     ))}
 *   </div>
 * </ScrollArea>
 * ```
 */

import { ScrollArea as BaseScrollArea } from "@base-ui-components/react/scroll-area";
import * as React from "react";
import { cx } from "../../lib/utils";

/**
 * Props for the ScrollArea component.
 *
 * Configuration for scrollable areas with custom styling options.
 *
 * @interface ScrollAreaProps
 * @augments React.ComponentPropsWithoutRef<"div">
 */
interface ScrollAreaProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Content to be made scrollable.
   */
  children: React.ReactNode;
  /**
   * Scroll orientation - vertical, horizontal, or both.
   */
  orientation?: "vertical" | "horizontal" | "both";
  /**
   * Additional CSS classes for the scrollbar.
   */
  scrollbarClassName?: string;
  /**
   * Additional CSS classes for the scrollbar thumb.
   */
  thumbClassName?: string;
  /**
   * Additional CSS classes for the viewport.
   */
  viewportClassName?: string;
}

/**
 * Custom scrollable area with styled scrollbars.
 *
 * Provides a scrollable container with custom-styled scrollbars that work
 * consistently across browsers. Supports vertical, horizontal, or both
 * scroll orientations with smooth hover effects.
 *
 * @param className - Additional CSS classes for the root element.
 * @param children - Content to be made scrollable.
 * @param orientation - Scroll direction (vertical, horizontal, both).
 * @param scrollbarClassName - Custom classes for scrollbar styling.
 * @param thumbClassName - Custom classes for scrollbar thumb.
 * @param viewportClassName - Custom classes for the viewport.
 *
 *
 * @id scroll-area
 * @name Scroll Area
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <ScrollArea className="h-48 w-full border">
 *   <div className="p-4 space-y-2">
 *     {items.map(item => <div key={item.id}>{item.content}</div>)}
 *   </div>
 * </ScrollArea>
 *
 * // Horizontal scrolling
 * <ScrollArea orientation="horizontal" className="w-full">
 *   <div className="flex gap-4 p-4">
 *     {items.map(item => (
 *       <div key={item.id} className="flex-shrink-0 w-32">
 *         {item.content}
 *       </div>
 *     ))}
 *   </div>
 * </ScrollArea>
 *
 * // Custom scrollbar styling
 * <ScrollArea
 *   scrollbarClassName="w-4 bg-blue-100"
 *   thumbClassName="bg-blue-500"
 * >
 *   <div>Scrollable content</div>
 * </ScrollArea>
 * ```
 */
/**
 * Augments native scroll functionality for custom, cross-browser styling.
 *
 * @id scroll-area
 * @name Scroll Area
 * @component
 */
const ScrollArea = (
    { ref, className, children, orientation = "vertical", scrollbarClassName, thumbClassName, viewportClassName, ...props }: ScrollAreaProps & { ref?: React.RefObject<HTMLDivElement | null> },
  ) => (
    <BaseScrollArea.Root
      ref={ref}
      className={cx("relative overflow-hidden group", className)}
      {...props}
    >
      <BaseScrollArea.Viewport
        className={cx("h-full w-full rounded-[inherit]", viewportClassName)}
      >
        <BaseScrollArea.Content>{children}</BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      {(orientation === "vertical" || orientation === "both") && (
        <BaseScrollArea.Scrollbar
          orientation="vertical"
          className={cx(
            "flex h-full w-2.5 touch-none select-none border-l border-l-transparent p-[1px] transition-all duration-200",
            "opacity-0 group-hover:opacity-100 data-[state=visible]:opacity-100",
            "hover:bg-zinc-100 dark:hover:bg-zinc-800",
            scrollbarClassName,
          )}
        >
          <BaseScrollArea.Thumb
            className={cx(
              "relative flex-1 rounded-full bg-zinc-300 dark:bg-zinc-600",
              "hover:bg-zinc-400 dark:hover:bg-zinc-500",
              thumbClassName,
            )}
          />
        </BaseScrollArea.Scrollbar>
      )}
      {(orientation === "horizontal" || orientation === "both") && (
        <BaseScrollArea.Scrollbar
          orientation="horizontal"
          className={cx(
            "flex h-2.5 w-full touch-none select-none border-t border-t-transparent p-[1px] transition-all duration-200",
            "opacity-0 group-hover:opacity-100 data-[state=visible]:opacity-100",
            "hover:bg-zinc-100 dark:hover:bg-zinc-800",
            scrollbarClassName,
          )}
        >
          <BaseScrollArea.Thumb
            className={cx(
              "relative rounded-full bg-zinc-300 dark:bg-zinc-600",
              "hover:bg-zinc-400 dark:hover:bg-zinc-500",
              thumbClassName,
            )}
          />
        </BaseScrollArea.Scrollbar>
      )}
      <BaseScrollArea.Corner />
    </BaseScrollArea.Root>
  );

ScrollArea.displayName = "ScrollArea";

/**
 * Standalone scrollbar component for custom scroll areas.
 *
 * A reusable scrollbar component that can be used independently
 * or with other scroll area implementations. Provides consistent
 * styling and behavior.
 *
 * @param className - Additional CSS classes.
 * @param orientation - Scrollbar orientation (vertical or horizontal).
 * @param props - Additional Base UI Scrollbar props.
 *
 * @component
 * @example
 * ```tsx
 * // Used within a custom scroll implementation
 * <div className="relative group">
 *   <div className="overflow-auto">
 *     Content here
 *   </div>
 *   <ScrollBar orientation="vertical" />
 *   <ScrollBar orientation="horizontal" />
 * </div>
 *
 * // Custom styled scrollbar
 * <ScrollBar
 *   orientation="vertical"
 *   className="w-3 bg-red-100"
 * />
 * ```
 */
const ScrollBar = ({ ref, className, orientation = "vertical", ...props }: React.ComponentPropsWithoutRef<typeof BaseScrollArea.Scrollbar> & { ref?: React.RefObject<React.ElementRef<typeof BaseScrollArea.Scrollbar> | null> }) => (
    <BaseScrollArea.Scrollbar
      ref={ref}
      orientation={orientation}
      className={cx(
        "flex touch-none select-none transition-all duration-200",
        "opacity-0 group-hover:opacity-100 data-[state=visible]:opacity-100",
        orientation === "vertical"
        && "h-full w-2.5 border-l border-l-transparent p-[1px]",
        orientation === "horizontal"
        && "h-2.5 w-full border-t border-t-transparent p-[1px]",
        "hover:bg-zinc-100 dark:hover:bg-zinc-800",
        className,
      )}
      {...props}
    >
      <BaseScrollArea.Thumb className="relative flex-1 rounded-full bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-500" />
    </BaseScrollArea.Scrollbar>
  );

ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };
