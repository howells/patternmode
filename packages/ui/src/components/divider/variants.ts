import { tv } from "tailwind-variants";

/**
 * Style variants for the divider container.
 */
export const dividerVariants = tv({
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
export const dividerLineVariants = tv({
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
