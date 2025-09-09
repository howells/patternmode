import { formControlElementVariants } from "@patternmode/constants/form-control-variants";
import { floatingItemVariants } from "@patternmode/utils/floating-item";
import { floatingSurfaceVariants } from "@patternmode/utils/floating-surface";
import { tv } from "tailwind-variants";

export const selectPopoverVariants = tv({
  slots: {
    base: [
      floatingSurfaceVariants({ width: "anchor" }).base(),
      "max-h-[var(--available-height)]",
    ].join(" "),
  },
  variants: {
    size: {
      xs: "w-[--anchor-width]",
      sm: "w-[--anchor-width]",
      base: "w-[--anchor-width]",
      lg: "w-[--anchor-width]",
    },
  },
});

export const selectItemVariants = tv({
  base: floatingItemVariants().split(" "),
  variants: {
    size: {
      xs: "px-2 py-1 text-xs",
      sm: "px-2 py-1.5 text-sm",
      base: "px-2 py-1.5 text-sm",
      lg: "px-3 py-2 text-base",
    },
  },
  defaultVariants: { size: "base" },
});

export const selectTriggerVariants = tv({
  extend: formControlElementVariants,
  base: [
    "flex w-full items-center justify-between",
    "rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950",
  ],
  defaultVariants: { size: "base", variant: "standalone" },
});
