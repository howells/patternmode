import { tv } from "tailwind-variants";

import { focusInput } from "../../lib/utils";

export const selectTriggerVariants = tv({
  base: [
    // base
    "group/trigger flex w-full max-w-sm select-none items-center justify-between gap-2 truncate rounded-md border shadow-xs outline-hidden transition",
    // border color
    " dark:border-zinc-800",
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // placeholder
    "data-[placeholder]:text-zinc-500 dark:data-[placeholder]:text-zinc-500",
    // background color
    "bg-white dark:bg-zinc-950",
    // hover
    "hover:bg-zinc-50 dark:hover:bg-zinc-950/50",
    // disabled
    "data-[disabled]:bg-zinc-100 data-[disabled]:text-zinc-400",
    "dark:data-[disabled]:border-zinc-700 dark:data-[disabled]:bg-zinc-800 dark:data-[disabled]:text-zinc-500",
    // readonly
    "data-[readonly]:cursor-default data-[readonly]:hover:bg-white dark:data-[readonly]:hover:bg-zinc-950",
    focusInput,
  ],
  variants: {
    size: {
      xs: "px-2 h-control-xs text-xs",
      sm: "px-2.5 h-control-sm text-sm",
      default: "px-3 h-control-base text-sm",
      lg: "px-4 h-control-lg text-base",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
