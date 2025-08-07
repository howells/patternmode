import { tv } from "tailwind-variants";
import { borderRadiusVariants } from "../../presentation/border-radius-variants";
import { focusRing } from "../../presentation/focus-ring";

export const toggleVariants = tv({
  base: [
    // base
    "group inline-flex h-9 min-w-9 items-center justify-center gap-2 border px-2 text-sm font-medium transition-all duration-100 ease-in-out",
    // border
    " dark:border-zinc-800",
    // text color
    "text-zinc-700 dark:text-zinc-300",
    // background color
    "bg-white dark:bg-zinc-950",
    // hover color
    "hover:bg-zinc-50 dark:hover:bg-zinc-900/60",
    // disabled
    "disabled:pointer-events-none disabled:text-zinc-400 dark:disabled:text-zinc-600",
    // pressed state
    "data-[pressed]:bg-zinc-100 data-[pressed]:text-zinc-900 dark:data-[pressed]:bg-zinc-800 dark:data-[pressed]:text-zinc-50",
    // focus
    focusRing,
  ],
  variants: {
    variant: {
      default: "",
      outline: [
        "border-2",
        "data-[pressed]:border-blue-500 dark:data-[pressed]:border-blue-400",
      ],
      ghost: [
        "border-transparent",
        "hover: dark:hover:border-zinc-700",
      ],
    },
    size: {
      xs: `h-7 min-w-7 px-1 text-xs ${borderRadiusVariants.xs}`,
      sm: `h-8 min-w-8 px-1.5 text-xs ${borderRadiusVariants.sm}`,
      base: `h-9 min-w-9 px-2 text-sm ${borderRadiusVariants.base}`,
      lg: `h-10 min-w-10 px-3 text-base ${borderRadiusVariants.lg}`,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "base",
  },
});
