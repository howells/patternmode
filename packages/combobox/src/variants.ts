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
  extend: selectPopoverVariants,
  base: [
    "absolute z-60 mt-1 w-full",
    "max-h-60 overflow-auto",
    "scrollbar-thin scrollbar-track-zinc-100 scrollbar-thumb-zinc-300 dark:scrollbar-track-zinc-800 dark:scrollbar-thumb-zinc-600",
  ],
  variants: {
    size: {
      "2xs": "rounded-sm text-[11px]",
      xs: "rounded-sm text-xs",
      sm: "rounded text-sm",
      base: "rounded-md text-sm",
      lg: "rounded-lg text-base",
    },
  },
  defaultVariants: { size: "base" },
});

export const comboboxItemVariants = tv({
  extend: selectItemVariants,
  base: [
    "data-[selected]: flex cursor-pointer select-none items-center justify-between outline-none transition-colors",
    "hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
    "data-[highlighted]:bg-zinc-100 dark:data-[highlighted]:bg-zinc-800",
  ],
  variants: {
    size: {
      "2xs": "px-1.5 py-0.5 text-[11px]",
      xs: "px-2 py-1 text-xs",
      sm: "px-2.5 py-1.5 text-sm",
      base: "px-3 py-2 text-sm",
      lg: "px-4 py-2.5 text-base",
    },
  },
  defaultVariants: { size: "base" },
});
