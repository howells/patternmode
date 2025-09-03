import { tv } from "tailwind-variants";

// Toast variants for consistent styling
export const toastVariants = tv({
  base: [
    // base
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-xl transition-all",
    // background
    "bg-white dark:bg-zinc-950",
    // border
    "dark:border-zinc-800",
  ],
  variants: {
    variant: {
      default: "dark:border-zinc-800",
      success:
        "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-50",
      error:
        "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-50",
      warning:
        "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-50",
      info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-50",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
