import { cx } from "@patternmode/utils/cx";
import { tv } from "tailwind-variants";

export const progressStepsVariants = tv({
  base: cx("w-full"),
  variants: {
    orientation: {
      vertical: "flex flex-col gap-4",
      horizontal: "flex items-start",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export const stepItemVariants = tv({
  base: "",
  variants: {
    orientation: {
      vertical: "flex gap-3",
      horizontal: "flex min-w-0 flex-col items-center text-center",
    },
    state: {
      inactive: "text-zinc-500 dark:text-zinc-400",
      active: "text-zinc-900 dark:text-zinc-50",
      complete: "text-zinc-900 dark:text-zinc-50",
      error: "text-red-900 dark:text-red-400",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    state: "inactive",
  },
});

export const titleVariants = tv({
  base: "font-medium text-sm leading-5",
});

export const descriptionVariants = tv({
  base: "text-xs text-zinc-600 leading-5 dark:text-zinc-400",
});
