import { tv } from "tailwind-variants";

export const cardVariants = tv({
  base: [
    // base
    "relative w-full max-w-xl rounded-lg text-left text-sm",
  ],
  variants: {
    variant: {
      default: [
        "border",
        "bg-white dark:bg-[#090E1A]",
      ],
      dashed: [
        "border border-dashed border-zinc-300 dark:border-zinc-600",
        "bg-transparent",
        "[&_.card-border]:border-dashed [&_.card-border]:border-zinc-300 dark:[&_.card-border]:border-zinc-600",
      ],
    },
    fillHeight: {
      true: "h-full",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    fillHeight: false,
  },
});
