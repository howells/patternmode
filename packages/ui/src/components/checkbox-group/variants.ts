import { tv } from "tailwind-variants";

export const checkboxGroupVariants = tv({
  base: "flex flex-col items-start gap-2 text-zinc-900 dark:text-zinc-50",
});

export const checkboxGroupLabelVariants = tv({
  base: "font-medium text-sm text-zinc-900 dark:text-zinc-50",
});

export const checkboxGroupItemVariants = tv({
  base: "flex items-center gap-2 cursor-pointer",
  variants: {
    disabled: {
      true: "cursor-not-allowed opacity-50",
      false: "",
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export const checkboxGroupItemTextVariants = tv({
  base: "text-sm font-medium select-none",
});