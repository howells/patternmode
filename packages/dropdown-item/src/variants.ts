import { tv } from "tailwind-variants";

export const dropdownItemVariants = tv({
  base: [
    "w-full justify-start text-left font-normal rounded-sm shadow-none",
    "hover:bg-zinc-100 dark:hover:bg-zinc-900",
    "data-[highlighted]:bg-zinc-100 dark:data-[highlighted]:bg-zinc-800",
    "data-[selected]:bg-blue-50 data-[selected]:text-blue-900 dark:data-[selected]:bg-blue-900/20 dark:data-[selected]:text-blue-100",
    "data-[selected]:",
  ],
  variants: {
    variant: {
      default: "",
      destructive: [
        "text-red-900 dark:text-red-100",
        "hover:bg-red-50 dark:hover:bg-red-900/20",
        "data-[highlighted]:bg-red-50 dark:data-[highlighted]:bg-red-900/20",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
