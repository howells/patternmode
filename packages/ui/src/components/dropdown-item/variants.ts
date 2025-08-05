import { tv } from "tailwind-variants";

export const dropdownItemVariants = tv({
  base: [
    // Override button defaults for dropdown context
    "w-full justify-start text-left font-normal rounded-sm shadow-none",
    // hover - subtle background change
    "hover:bg-zinc-100 dark:hover:bg-zinc-900",
    // highlighted/focused state
    "data-[highlighted]:bg-zinc-100 dark:data-[highlighted]:bg-zinc-800",
    // selected state
    "data-[selected]:bg-blue-50 data-[selected]:text-blue-900 dark:data-[selected]:bg-blue-900/20 dark:data-[selected]:text-blue-100",
    "data-[selected]:font-semibold",
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
