import { tv } from "tailwind-variants";

export const comboboxVariants = tv({
  base: ["relative w-full"],
  variants: {
    size: {
      sm: "",
      base: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

export const comboboxListVariants = tv({
  base: [
    // base
    "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg dark:bg-zinc-950",
    // border
    " dark:border-zinc-800",
    // scrollbar
    "scrollbar-thin scrollbar-track-zinc-100 scrollbar-thumb-zinc-300 dark:scrollbar-track-zinc-800 dark:scrollbar-thumb-zinc-600",
  ],
  variants: {
    size: {
      sm: "text-xs",
      base: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

export const comboboxItemVariants = tv({
  base: [
    // base
    "relative flex cursor-pointer select-none items-center justify-between py-2 px-3 outline-none transition-colors",
    // hover
    "hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
    // highlighted
    "data-[highlighted]:bg-zinc-100 dark:data-[highlighted]:bg-zinc-800",
    // selected
    "data-[selected]:bg-blue-50 data-[selected]:text-blue-900 dark:data-[selected]:bg-blue-900/20 dark:data-[selected]:text-blue-100",
  ],
  variants: {
    size: {
      sm: "text-xs py-1.5 px-2.5",
      base: "text-sm py-2 px-3",
      lg: "text-base py-2.5 px-4",
    },
  },
  defaultVariants: {
    size: "base",
  },
});
