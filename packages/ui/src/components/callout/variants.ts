import { tv } from "tailwind-variants";

/**
 * Style variants for callout components.
 *
 * Defines color schemes for different types of callouts including
 * informational, success, error, warning, and neutral variants.
 */
export const calloutVariants = tv({
  base: "flex flex-col overflow-hidden rounded-md p-4 text-sm",
  variants: {
    /**
     * Visual style variant.
     */
    variant: {
      /**
       * Default informational style (blue).
       */
      default: [
        // text color
        "text-blue-900 dark:text-blue-400",
        // background color
        "bg-blue-50 dark:bg-blue-950/70",
      ],
      /**
       * Success state style (green).
       */
      success: [
        // text color
        "text-emerald-900 dark:text-emerald-500",
        // background color
        "bg-emerald-50 dark:bg-emerald-950/70",
      ],
      /**
       * Error state style (red).
       */
      error: [
        // text color
        "text-red-900 dark:text-red-500",
        // background color
        "bg-red-50 dark:bg-red-950/70",
      ],
      /**
       * Warning state style (yellow).
       */
      warning: [
        // text color
        "text-yellow-900 dark:text-yellow-500",
        // background color
        "bg-yellow-50 dark:bg-yellow-950/70",
      ],
      /**
       * Neutral informational style (gray).
       */
      neutral: [
        // text color
        "text-zinc-900 dark:text-zinc-400",
        // background color
        "bg-zinc-100 dark:bg-zinc-800/70",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
