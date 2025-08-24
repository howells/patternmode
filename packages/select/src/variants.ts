import { tv } from "tailwind-variants";
import { formControlElementVariants } from "@patternmode/constants/form-control-variants";

export const selectPopoverVariants = tv({
  extend: formControlElementVariants,
  slots: {
    base: "z-50 min-w-[var(--anchor-width)] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
  },
  variants: {
    size: {
      xs: "w-[--anchor-width]",
      sm: "w-[--anchor-width]",
      base: "w-[--anchor-width]",
      lg: "w-[--anchor-width]",
    },
  },
});

export const selectItemVariants = tv({
  base: [
    "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
    "focus:bg-zinc-100 focus:text-zinc-900 dark:focus:bg-zinc-800 dark:focus:text-zinc-100",
  ],
  variants: {
    size: {
      xs: "px-2 py-1 text-xs",
      sm: "px-2 py-1.5 text-sm",
      base: "px-2 py-1.5 text-sm",
      lg: "px-3 py-2 text-base",
    },
  },
  defaultVariants: { size: "base" },
});

export const selectTriggerVariants = tv({
  extend: formControlElementVariants,
  base: [
    "flex w-full items-center justify-between",
    "rounded-md border bg-white dark:bg-zinc-950 dark:border-zinc-800",
  ],
  defaultVariants: { size: "base", variant: "standalone" },
});
