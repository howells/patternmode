// Divider Component [v1.0.0] - Pure Implementation

/**
 * A versatile divider component for visually separating content sections.
 * Supports both horizontal and vertical orientations with optional text labels.
 * Built with tailwind-variants for consistent styling and theming.
 */

import React from "react";
import { tv } from "tailwind-variants";

import { cx } from "../../lib/utils";

/**
 * Style variants for the divider container.
 */
const dividerVariants = tv({
  base: [
    // base
    "mx-auto my-6 flex w-full items-center justify-between gap-3 text-sm",
    // text color
    "text-zinc-500 dark:text-zinc-500",
  ],
  variants: {
    /**
     * Divider orientation.
     */
    orientation: {
      /**
       * Horizontal divider (default).
       */
      horizontal: "flex-row",
      /**
       * Vertical divider for sidebar layouts.
       */
      vertical: "flex-col h-full w-auto mx-0 my-0",
    },
    /**
     * Vertical spacing around divider.
     */
    spacing: {
      /**
       * No spacing.
       */
      none: "my-0",
      /**
       * Small spacing (16px).
       */
      sm: "my-4",
      /**
       * Medium spacing (24px) - default.
       */
      md: "my-6",
      /**
       * Large spacing (32px).
       */
      lg: "my-8",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    spacing: "md",
  },
});

/**
 * Style variants for the divider line element.
 */
const dividerLineVariants = tv({
  base: [
    // background color
    "bg-zinc-200 dark:bg-zinc-800",
  ],
  variants: {
    /**
     * Line orientation.
     */
    orientation: {
      /**
       * Horizontal line (1px height, full width).
       */
      horizontal: "h-[1px] w-full",
      /**
       * Vertical line (1px width, full height).
       */
      vertical: "w-[1px] h-full",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

type DividerProps = {
  /**
   * Optional text content to display in the center of the divider.
   * When provided, creates a labeled divider with text between two lines.
   */
  children?: React.ReactNode;
  /**
   * Divider orientation - horizontal spans full width, vertical spans full height.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Vertical spacing around the divider (ignored for vertical orientation).
   * Controls margin top and bottom for horizontal dividers.
   * @default "md"
   */
  spacing?: "none" | "sm" | "md" | "lg";
} & React.ComponentPropsWithoutRef<"div">;

/**
 * A versatile divider component for visually separating content sections.
 */
const Divider = (
  { ref: forwardedRef, className, children, orientation = "horizontal", spacing, ...props }: DividerProps & { ref?: React.RefObject<HTMLDivElement | null> },
) => (
  <div
    ref={forwardedRef}
    className={cx(dividerVariants({ orientation, spacing }), className)}
    {...props}
  >
    {children
      ? (
          <>
            <div className={cx(dividerLineVariants({ orientation }))} />
            <div className="whitespace-nowrap text-inherit">{children}</div>
            <div className={cx(dividerLineVariants({ orientation }))} />
          </>
        )
      : (
          <div className={cx(dividerLineVariants({ orientation }))} />
        )}
  </div>
);

Divider.displayName = "Divider";

export { Divider, type DividerProps, dividerVariants };
