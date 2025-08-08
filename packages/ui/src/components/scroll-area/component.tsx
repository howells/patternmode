import { ScrollArea as BaseScrollArea } from "@base-ui-components/react/scroll-area";
import * as React from "react";

import { cx } from "../../utils/cx";

/**
 * Props for the ScrollArea component.
 */
type ScrollAreaProps = {
  /**
   * Content to be made scrollable.
   */
  children?: React.ReactNode;
  /**
   * Scroll orientation determining which direction(s) content can be scrolled.
   * - "vertical": Only vertical scrolling (default)
   * - "horizontal": Only horizontal scrolling
   * - "both": Both vertical and horizontal scrolling.
   */
  orientation?: "vertical" | "horizontal" | "both";
  /**
   * Additional CSS classes for the scrollbar track styling.
   * Customize the appearance of the scrollbar background area.
   */
  scrollbarClassName?: string;
  /**
   * Additional CSS classes for the scrollbar thumb styling.
   * Customize the appearance of the draggable scrollbar handle.
   */
  thumbClassName?: string;
  /**
   * Additional CSS classes for the scrollable viewport container.
   * Customize the styling of the content viewing area.
   */
  viewportClassName?: string;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * Custom scrollable area with styled scrollbars built on Base UI ScrollArea.
 */
const ScrollArea = (
  { ref, className, children, orientation = "vertical", scrollbarClassName, thumbClassName, viewportClassName, ...props }: ScrollAreaProps & { ref?: React.RefObject<HTMLDivElement | null> },
) => (
  <BaseScrollArea.Root
    ref={ref}
    className={cx("relative overflow-hidden group", className)}
    data-testid="scroll-area"
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
 * Props for the ScrollBar component.
 */
type ScrollBarProps = {
  /**
   * Scrollbar orientation determining scroll direction.
   * - "vertical": Vertical scrollbar for up/down scrolling
   * - "horizontal": Horizontal scrollbar for left/right scrolling.
   */
  orientation?: "vertical" | "horizontal";
} & React.ComponentPropsWithoutRef<typeof BaseScrollArea.Scrollbar>;

/**
 * Standalone scrollbar component for custom scroll areas.
 */
const ScrollBar = ({ ref, className, orientation = "vertical", ...props }: ScrollBarProps & { ref?: React.RefObject<React.ElementRef<typeof BaseScrollArea.Scrollbar> | null> }) => (
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

export { ScrollArea, type ScrollAreaProps, ScrollBar, type ScrollBarProps };
