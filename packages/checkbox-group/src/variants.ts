import { tv } from "tailwind-variants";

export const checkboxGroupVariants = tv({
  base: "flex flex-col items-start gap-2 text-zinc-900 dark:text-zinc-50",
});

export const checkboxGroupLabelVariants = tv({
  base: "pl-8 text-sm text-zinc-500 dark:text-zinc-400",
});

export const checkboxGroupItemVariants = tv({
  base: "relative flex cursor-pointer items-center gap-2",
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
  base: "select-none pl-8 text-sm",
});
