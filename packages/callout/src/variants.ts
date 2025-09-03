import { tv } from "tailwind-variants";

export const calloutVariants = tv({
  base: "rounded-md border p-4",
  variants: {
    variant: {
      default:
        "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-100",
      success:
        "border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950/40 dark:text-green-100",
      error:
        "border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-100",
      warning:
        "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-900 dark:bg-yellow-950/40 dark:text-yellow-100",
      neutral:
        "border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-900 dark:bg-zinc-950/40 dark:text-zinc-100",
    },
  },
});
