import { floatingItemVariants } from "@patternmode/utils/floating-item";
import { floatingSurfaceVariants } from "@patternmode/utils/floating-surface";
import { formControlElementVariants } from "@patternmode/constants/form-control-variants";
import { tv } from "tailwind-variants";

export const comboboxVariants = tv({
  base: ["relative w-full"],
  variants: {
    size: { "2xs": "", xs: "", sm: "", base: "", lg: "" },
  },
  defaultVariants: { size: "base" },
});

export const comboboxTriggerVariants = tv({
  extend: formControlElementVariants,
  base: [
    "cursor-default",
    "flex w-full items-center justify-between",
    "rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950",
  ],
});

export const comboboxListVariants = tv({
  slots: {
    base: [
      floatingSurfaceVariants({ width: "anchor" }).base(),
      "max-h-[var(--available-height)]",
    ].join(" "),
  },
  variants: {
    size: {
      "2xs": "w-[--anchor-width]",
      xs: "w-[--anchor-width]",
      sm: "w-[--anchor-width]",
      base: "w-[--anchor-width]",
      lg: "w-[--anchor-width]",
    },
  },
});

export const comboboxItemVariants = tv({
  base: floatingItemVariants().split(" "),
  variants: {
    size: {
      "2xs": "px-2 py-1 text-xs",
      xs: "px-2 py-1 text-xs",
      sm: "px-2 py-1.5 text-sm",
      base: "px-2 py-1.5 text-sm",
      lg: "px-3 py-2 text-base",
    },
  },
  defaultVariants: { size: "base" },
});
