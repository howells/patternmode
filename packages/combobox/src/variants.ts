import {
  selectItemVariants,
  selectPopoverVariants,
  selectTriggerVariants,
} from "@patternmode/select/variants";
import { tv } from "tailwind-variants";

export const comboboxVariants = tv({
  base: ["relative w-full"],
  variants: {
    size: { "2xs": "", xs: "", sm: "", base: "", lg: "" },
  },
  defaultVariants: { size: "base" },
});

export const comboboxTriggerVariants = tv({
  extend: selectTriggerVariants,
  base: ["cursor-default"],
});

export const comboboxListVariants = tv({
  slots: {
    base: "z-50 max-h-[var(--available-height)] min-w-[var(--anchor-width)] overflow-y-auto rounded-md border border-zinc-200 bg-white text-popover-foreground dark:border-zinc-800 dark:bg-zinc-950",
  },
  variants: {
    size: {
      "2xs": "w-[--anchor-width]",
      xs: "w-[--anchor-width]",
      sm: "w-[--anchor-width]",
      base: "w-[--anchor-width]",
      lg: "w-[--anchor-width]",
    },
  },
});

export const comboboxItemVariants = tv({
  extend: selectItemVariants,
  base: [
    "relative flex w-full cursor-default select-none items-center rounded-sm outline-none",
    "bg-white dark:bg-zinc-950",
    "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
    "focus:bg-zinc-100 focus:text-zinc-900 dark:focus:bg-zinc-800 dark:focus:text-zinc-100",
    "data-[highlighted]:bg-zinc-100 data-[highlighted]:text-zinc-900 dark:data-[highlighted]:bg-zinc-800 dark:data-[highlighted]:text-zinc-100",
  ],
  variants: {
    size: {
      "2xs": "px-2 py-1 text-xs",
      xs: "px-2 py-1 text-xs",
      sm: "px-2 py-1.5 text-sm",
      base: "px-2 py-1.5 text-sm",
      lg: "px-3 py-2 text-base",
    },
  },
  defaultVariants: { size: "base" },
});
