import { tv } from "tailwind-variants";

export const calloutVariants = tv({
  base: "rounded-md p-4 border",
  variants: {
    variant: {
      default: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/40 dark:border-blue-900 dark:text-blue-100",
      success: "bg-green-50 border-green-200 text-green-900 dark:bg-green-950/40 dark:border-green-900 dark:text-green-100",
      error: "bg-red-50 border-red-200 text-red-900 dark:bg-red-950/40 dark:border-red-900 dark:text-red-100",
      warning: "bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950/40 dark:border-yellow-900 dark:text-yellow-100",
      neutral: "bg-zinc-50 border-zinc-200 text-zinc-900 dark:bg-zinc-950/40 dark:border-zinc-900 dark:text-zinc-100",
    },
  },
});

