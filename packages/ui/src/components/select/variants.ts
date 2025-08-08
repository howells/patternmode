import { tv } from "tailwind-variants";

import { formControlElementVariants } from "../../constants/form-control-variants";

export const selectTriggerVariants = tv({
  extend: formControlElementVariants,
  base: [
    // select-specific styling
    "group/trigger flex max-w-sm select-none items-center justify-between gap-2 truncate cursor-pointer",
    // placeholder
    "data-[placeholder]:text-zinc-500 dark:data-[placeholder]:text-zinc-500",
    // hover
    "hover:bg-zinc-50 dark:hover:bg-zinc-950/50",
    // disabled
    "data-[disabled]:bg-zinc-100 data-[disabled]:text-zinc-400",
    "dark:data-[disabled]:border-zinc-700 dark:data-[disabled]:bg-zinc-800 dark:data-[disabled]:text-zinc-500",
    // readonly
    "data-[readonly]:cursor-default data-[readonly]:hover:bg-white dark:data-[readonly]:hover:bg-zinc-950",
  ],
  variants: {
    size: {
      "2xs": "h-control-2xs",
      xs: "h-control-xs",
      sm: "h-control-sm",
      base: "h-control-base",
      lg: "h-control-lg",
    },
  },
  defaultVariants: {
    size: "base",
    variant: "standalone",
  },
});

export const selectPopoverVariants = tv({
  base: [
    // base
    "relative z-50 overflow-hidden border",
    // widths
    "min-w-[var(--anchor-width)] max-w-[95vw]",
    // heights
    "max-h-[var(--available-height)]",
    // background
    "bg-white dark:bg-zinc-950",
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // border color
    " dark:border-zinc-800",
  ],
  variants: {
    size: {
      "2xs": "text-[11px] rounded-sm",
      xs: "text-xs rounded-sm",
      sm: "text-sm rounded",
      base: "text-sm rounded-md",
      lg: "text-base rounded-lg",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

export const selectItemVariants = tv({
  base: [
    // base
    "grid cursor-pointer grid-cols-[1fr_20px] gap-x-2 rounded-sm outline-hidden transition-colors data-[selected]:font-semibold",
    // text color
    "text-zinc-900 dark:text-zinc-50",
    // hover
    "hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
    // highlighted
    "data-[highlighted]:bg-zinc-100 dark:data-[highlighted]:bg-zinc-800",
  ],
  variants: {
    size: {
      "2xs": "text-[11px] py-0.5 px-1.5",
      xs: "text-xs py-1 px-2",
      sm: "text-sm py-1.5 px-2.5",
      base: "text-sm py-2 px-3",
      lg: "text-base py-2.5 px-4",
    },
  },
  defaultVariants: {
    size: "base",
  },
});
