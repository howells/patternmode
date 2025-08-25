import { tv } from "tailwind-variants";
import { selectItemVariants, selectPopoverVariants, selectTriggerVariants } from "@patternmode/select/variants";

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
    "absolute z-50 mt-1 w-full",
    "max-h-60 overflow-auto",
    "scrollbar-thin scrollbar-track-zinc-100 scrollbar-thumb-zinc-300 dark:scrollbar-track-zinc-800 dark:scrollbar-thumb-zinc-600",
  ],
  variants: {
    size: { "2xs": "text-[11px] rounded-sm", xs: "text-xs rounded-sm", sm: "text-sm rounded", base: "text-sm rounded-md", lg: "text-base rounded-lg" },
  },
  defaultVariants: { size: "base" },
});

export const comboboxItemVariants = tv({
  extend: selectItemVariants,
  base: [
    "flex cursor-pointer select-none items-center justify-between outline-none transition-colors data-[selected]:font-semibold",
    "hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
    "data-[highlighted]:bg-zinc-100 dark:data-[highlighted]:bg-zinc-800",
  ],
  variants: {
    size: { "2xs": "text-[11px] py-0.5 px-1.5", xs: "text-xs py-1 px-2", sm: "text-sm py-1.5 px-2.5", base: "text-sm py-2 px-3", lg: "text-base py-2.5 px-4" },
  },
  defaultVariants: { size: "base" },
});

