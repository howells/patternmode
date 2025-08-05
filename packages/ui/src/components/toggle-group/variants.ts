import { tv } from "tailwind-variants";
import { focusRing } from "../../lib/utils";

export const toggleGroupVariants = tv({
  slots: {
    root: [
      // base
      "flex gap-px rounded-md border p-0.5",
      // colors
      " bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800",
    ],
    item: [
      // base
      "flex items-center justify-center rounded-sm text-sm font-medium select-none transition-all duration-100 ease-in-out",
      // colors
      "text-zinc-600 dark:text-zinc-400",
      // hover
      "hover:bg-zinc-100 dark:hover:bg-zinc-700",
      // active
      "active:bg-zinc-200 dark:active:bg-zinc-600",
      // pressed
      "data-[pressed]:bg-zinc-100 data-[pressed]:text-zinc-900 dark:data-[pressed]:bg-zinc-700 dark:data-[pressed]:text-zinc-100",
      // disabled
      "disabled:pointer-events-none disabled:opacity-50",
      // focus
      focusRing,
      "focus-visible:bg-none focus-visible:-outline-offset-1",
    ],
  },
  variants: {
    variant: {
      default: {
        root: " bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800",
        item: "",
      },
      outline: {
        root: " bg-transparent dark:border-zinc-600",
        item: "border border-transparent data-[pressed]:border-blue-500 dark:data-[pressed]:border-blue-400",
      },
      ghost: {
        root: "border-transparent bg-transparent",
        item: "hover:bg-zinc-100 dark:hover:bg-zinc-800",
      },
    },
    size: {
      xs: {
        root: "gap-0.5 p-0.5",
        item: "h-4 px-1 text-xs rounded-sm", // Extra small size
      },
      sm: {
        root: "gap-0.5 p-0.5",
        item: "h-6 px-2 text-xs rounded-sm", // Match button sm: py-1.5 px-2.5 text-xs but adjusted for toggle
      },
      default: {
        root: "gap-px p-0.5",
        item: "h-8 px-3 text-sm rounded-sm", // Match button default: py-2 px-3 text-sm
      },
      lg: {
        root: "gap-1 p-1",
        item: "h-10 px-4 text-base rounded-md", // Match button lg: py-2.5 px-4 text-base
      },
    },
    orientation: {
      horizontal: {
        root: "flex-row",
      },
      vertical: {
        root: "flex-col",
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    orientation: "horizontal",
  },
});
