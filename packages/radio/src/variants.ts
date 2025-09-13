import { focusRing } from "@patternmode/utils/focus-ring";
import { tv } from "tailwind-variants";

export const radioVariants = tv({
  slots: {
    root: "group relative inline-flex items-center",
    circle: [
      "relative flex shrink-0 items-center justify-center border-2 transition-all duration-150 ease-in-out",
      "border-zinc-300 dark:border-zinc-600",
      "bg-white dark:bg-zinc-950",
      focusRing,
      "disabled:pointer-events-none",
    ],
    dot: [
      "absolute transition-all duration-150 ease-in-out",
      "bg-white dark:bg-zinc-50",
      "group-data-[disabled]:bg-zinc-100 dark:group-data-[disabled]:bg-zinc-800",
    ],
  },
  variants: {
    size: {
      "2xs": { circle: "size-2.5 rounded-full", dot: "size-1" },
      xs: { circle: "size-3 rounded-full", dot: "size-1" },
      sm: { circle: "size-3.5 rounded-full", dot: "size-1.5" },
      base: { circle: "size-4 rounded-full", dot: "size-2" },
      lg: { circle: "size-5 rounded-full", dot: "size-2.5" },
    },
    variant: {
      default: {
        circle:
          "group-data-[checked]:border-0 group-data-[checked]:border-transparent group-data-[checked]:bg-blue-500 group-data-[disabled]:bg-zinc-100 group-data-[disabled]:text-zinc-400 dark:group-data-[disabled]:border-zinc-700 dark:group-data-[disabled]:bg-zinc-800",
        dot: "group-data-[disabled]:bg-zinc-400 dark:group-data-[disabled]:bg-zinc-500",
      },
      card: {
        circle:
          "group-data-[checked]:border-0 group-data-[checked]:border-transparent group-data-[checked]:bg-blue-500 group-data-[disabled]:bg-zinc-100 group-data-[disabled]:text-zinc-400 dark:group-data-[disabled]:border-zinc-700 dark:group-data-[disabled]:bg-zinc-800",
        dot: "group-data-[disabled]:bg-zinc-400 dark:group-data-[disabled]:bg-zinc-500",
      },
    },
  },
  defaultVariants: { size: "base", variant: "default" },
});

export const radioLabelVariants = tv({
  base: [
    "flex cursor-pointer items-center gap-2",
    "font-medium text-sm text-zinc-900 dark:text-zinc-50",
    "has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:text-zinc-400 dark:has-[[data-disabled]]:text-zinc-600",
  ],
  variants: {
    size: {
      "2xs": "gap-1 text-[11px]",
      xs: "gap-1 text-xs",
      sm: "gap-1.5 text-xs",
      base: "gap-2 text-sm",
      lg: "gap-2.5 text-base",
    },
  },
  defaultVariants: { size: "base" },
});

export const radioGroupVariants = tv({
  base: ["grid gap-2"],
  variants: {
    orientation: {
      vertical: "grid-cols-1",
      horizontal: "auto-cols-max grid-flow-col gap-4",
    },
    size: { sm: "gap-1.5", md: "gap-2", lg: "gap-3" },
  },
  defaultVariants: { orientation: "vertical", size: "md" },
});
