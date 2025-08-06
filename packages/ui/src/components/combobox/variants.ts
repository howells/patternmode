import { tv } from "tailwind-variants";

import { selectItemVariants, selectPopoverVariants, selectTriggerVariants } from "../select/variants";

export const comboboxVariants = tv({
  base: ["relative w-full"],
  variants: {
    size: {
      xs: "",
      sm: "",
      base: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

// Reuse Select's trigger variants but adapt for Combobox button behavior
export const comboboxTriggerVariants = tv({
  extend: selectTriggerVariants,
  base: [
    // Override cursor to default since it's a button
    "cursor-default",
  ],
});

// Reuse Select's popover variants but adapt for Combobox positioning
export const comboboxListVariants = tv({
  extend: selectPopoverVariants,
  base: [
    // Override positioning for combobox (absolute vs relative)
    "absolute z-50 mt-1 w-full",
    // Add fixed height and scrolling
    "max-h-60 overflow-auto",
    // Add scrollbar styling
    "scrollbar-thin scrollbar-track-zinc-100 scrollbar-thumb-zinc-300 dark:scrollbar-track-zinc-800 dark:scrollbar-thumb-zinc-600",
  ],
  variants: {
    size: {
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

// Reuse Select's item variants directly
export const comboboxItemVariants = tv({
  extend: selectItemVariants,
  base: [
    // Override grid layout to use flex layout for combobox items
    "flex cursor-pointer select-none items-center justify-between outline-none transition-colors data-[selected]:font-semibold",
    // hover
    "hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
    // highlighted
    "data-[highlighted]:bg-zinc-100 dark:data-[highlighted]:bg-zinc-800",
  ],
  variants: {
    size: {
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
