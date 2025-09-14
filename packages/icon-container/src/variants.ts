import { tv } from "tailwind-variants";

export const iconContainerVariants = tv({
  base: "flex shrink-0 items-center justify-center rounded-lg",
  variants: {
    size: {
      sm: "h-8 w-8",
      base: "h-10 w-10",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
    },
    variant: {
      default: "bg-zinc-100 dark:bg-zinc-900/20",
      neutral: "bg-zinc-100 dark:bg-zinc-900/20",
      success: "bg-emerald-100 dark:bg-emerald-900/20",
      info: "bg-sky-100 dark:bg-sky-900/20",
      warning: "bg-amber-100 dark:bg-amber-900/20",
      error: "bg-red-100 dark:bg-red-900/20",
      critical: "bg-rose-100 dark:bg-rose-900/20",
      positive: "bg-teal-100 dark:bg-teal-900/20",
      negative: "bg-rose-100 dark:bg-rose-900/20",
    },
  },
  defaultVariants: {
    size: "base",
    variant: "neutral",
  },
});
