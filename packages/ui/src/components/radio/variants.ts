import { tv } from "tailwind-variants";
import { focusRing } from "../../lib/utils";

/**
 * Style variants for radio button components.
 *
 * Provides consistent styling for radio indicators including circle,
 * dot, and interactive states across different sizes and variants.
 */
export const radioVariants = tv({
  slots: {
    root: [
      // base
      "group relative flex items-center justify-center appearance-none outline-hidden",
      // focus
      ...focusRing,
    ],
    indicator: [
      // base
      "flex items-center justify-center",
    ],
    circle: [
      // base
      "flex shrink-0 items-center justify-center rounded-full border dark:border-zinc-800",
      // background color
      "bg-white dark:bg-zinc-950",
    ],
    dot: [
      // base
      "shrink-0 rounded-full",
      // indicator color
      "bg-white",
    ],
  },
  variants: {
    size: {
      xs: {
        root: "size-3",
        circle: "size-3",
        dot: "size-0.5",
      },
      sm: {
        root: "size-4",
        circle: "size-4",
        dot: "size-1",
      },
      base: {
        root: "size-4",
        circle: "size-4",
        dot: "size-1.5",
      },
      lg: {
        root: "size-5",
        circle: "size-5",
        dot: "size-2",
      },
    },
    variant: {
      default: {
        circle: [
          // checked
          "group-data-[checked]:border-0 group-data-[checked]:border-transparent group-data-[checked]:bg-blue-500",
          // disabled
          "group-data-[disabled]:bg-zinc-100 group-data-[disabled]:text-zinc-400",
          "dark:group-data-[disabled]:border-zinc-700 dark:group-data-[disabled]:bg-zinc-800",
        ],
        dot: [
          // disabled
          "group-data-[disabled]:bg-zinc-400 dark:group-data-[disabled]:bg-zinc-500",
        ],
      },
      card: {
        circle: [
          // checked
          "group-data-[checked]:border-0 group-data-[checked]:border-transparent group-data-[checked]:bg-blue-500",
          // disabled
          "group-data-[disabled]:bg-zinc-100 group-data-[disabled]:text-zinc-400",
          "dark:group-data-[disabled]:border-zinc-700 dark:group-data-[disabled]:bg-zinc-800",
        ],
        dot: [
          // disabled
          "group-data-[disabled]:bg-zinc-400 dark:group-data-[disabled]:bg-zinc-500",
        ],
      },
    },
  },
  defaultVariants: {
    size: "base",
    variant: "default",
  },
});

/**
 * Style variants for radio label components.
 *
 * Provides consistent styling for labels including text sizing,
 * spacing, and disabled states.
 */
export const radioLabelVariants = tv({
  base: [
    // base
    "flex items-center gap-2 cursor-pointer",
    // text
    "text-sm font-medium text-zinc-900 dark:text-zinc-50",
    // disabled
    "has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:text-zinc-400 dark:has-[[data-disabled]]:text-zinc-600",
  ],
  variants: {
    size: {
      xs: "gap-1 text-xs",
      sm: "gap-1.5 text-xs",
      base: "gap-2 text-sm",
      lg: "gap-2.5 text-base",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

/**
 * Style variants for radio card components.
 *
 * Provides enhanced card-based styling for radio options with
 * borders, backgrounds, focus states, and responsive sizing.
 */
export const radioCardVariants = tv({
  base: [
    // base
    "group relative w-full rounded-md border p-4 text-left transition cursor-pointer",
    // background color
    "bg-white dark:bg-zinc-950",
    // border color
    "dark:border-zinc-800",
    // checked
    "data-[checked]:border-blue-500 dark:data-[checked]:border-blue-500",
    // disabled
    "data-[disabled]:border-zinc-100 dark:data-[disabled]:border-zinc-800",
    "data-[disabled]:bg-zinc-50 data-[disabled]:shadow-none dark:data-[disabled]:bg-zinc-900",
    "data-[disabled]:cursor-not-allowed",
    // focus
    "focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2",
  ],
  variants: {
    size: {
      xs: "p-2",
      sm: "p-3",
      base: "p-4",
      lg: "p-5",
    },
  },
  defaultVariants: {
    size: "base",
  },
});
