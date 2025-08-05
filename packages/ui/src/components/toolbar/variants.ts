import { tv } from "tailwind-variants";
import { focusRing } from "../../lib/utils";

export const toolbarVariants = tv({
  slots: {
    root: [
      // base
      "flex items-center gap-px rounded-md border p-0.5",
      // colors
      " bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800",
    ],
    button: [
      // base
      "flex items-center justify-center rounded-sm font-medium select-none transition-all duration-100 ease-in-out",
      // colors
      "text-zinc-600 dark:text-zinc-400",
      // hover
      "hover:bg-zinc-100 dark:hover:bg-zinc-700",
      // active
      "active:bg-zinc-200 dark:active:bg-zinc-600",
      // highlighted (keyboard navigation)
      "data-[highlighted]:bg-zinc-100 dark:data-[highlighted]:bg-zinc-700",
      // pressed (for toggle buttons)
      "data-[pressed]:bg-zinc-100 data-[pressed]:text-zinc-900 dark:data-[pressed]:bg-zinc-700 dark:data-[pressed]:text-zinc-100",
      // disabled
      "disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      // focus
      focusRing,
      "focus-visible:bg-none focus-visible:-outline-offset-1",
    ],
    link: [
      // base
      "flex items-center justify-center rounded-sm font-medium select-none transition-all duration-100 ease-in-out no-underline",
      // colors
      "text-zinc-500 dark:text-zinc-400",
      // hover
      "hover:text-blue-600 dark:hover:text-blue-400",
      // highlighted
      "data-[highlighted]:text-blue-600 dark:data-[highlighted]:text-blue-400",
      // focus
      focusRing,
      "focus-visible:-outline-offset-2",
    ],
    input: [
      // base
      "flex items-center justify-center rounded-sm font-medium transition-all duration-100 ease-in-out",
      // colors
      "text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-950",
      // border
      "border  dark:border-zinc-600",
      // hover
      "hover:border-zinc-400 dark:hover:border-zinc-500",
      // highlighted
      "data-[highlighted]:border-blue-500 dark:data-[highlighted]:border-blue-400",
      // focus
      "focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:border-blue-400 dark:focus:ring-blue-400/20",
      // disabled
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ],
    group: [
      // base
      "flex items-center gap-1",
    ],
    separator: [
      // base
      "mx-1 h-4 w-px",
      // colors
      "bg-zinc-300 dark:bg-zinc-600",
    ],
  },
  variants: {
    variant: {
      default: {
        root: " bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800",
      },
      outline: {
        root: " bg-transparent dark:border-zinc-600",
      },
      ghost: {
        root: "border-transparent bg-transparent",
      },
    },
    size: {
      sm: {
        root: "gap-0.5 p-0.5",
        button: "h-6 min-w-6 px-1.5 text-xs",
        link: "h-6 px-1.5 text-xs",
        input: "h-6 px-1.5 text-xs",
      },
      default: {
        root: "gap-px p-0.5",
        button: "h-8 min-w-8 px-3 text-sm",
        link: "h-8 px-3 text-sm",
        input: "h-8 px-3 text-sm",
      },
      lg: {
        root: "gap-1 p-1",
        button: "h-10 min-w-10 px-4 text-base",
        link: "h-10 px-4 text-base",
        input: "h-10 px-4 text-base",
      },
    },
    orientation: {
      horizontal: {
        root: "flex-row",
        separator: "h-4 w-px",
      },
      vertical: {
        root: "flex-col",
        separator: "h-px w-4",
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    orientation: "horizontal",
  },
});
