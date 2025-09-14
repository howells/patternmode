import { focusRing } from "@patternmode/utils/focus-ring";
import { tv } from "tailwind-variants";

export const radioGroupItemVariants = tv({
  base: [
    "group relative flex cursor-pointer items-center gap-2 text-sm",
    "text-zinc-900 dark:text-zinc-50",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "focus:outline-none",
    focusRing,
  ],
  variants: {
    size: {
      "1": "gap-1 text-xs",
      "2": "gap-2 text-sm",
      "3": "gap-2 text-base",
    },
    variant: {
      classic: [
        "rounded border px-3 py-1.5",
        "border-zinc-300 dark:border-zinc-700",
        "bg-white dark:bg-zinc-900",
        "hover:bg-zinc-50 dark:hover:bg-zinc-800",
        "data-[state=checked]:border-zinc-900 dark:data-[state=checked]:border-zinc-100",
        "data-[state=checked]:bg-zinc-900 dark:data-[state=checked]:bg-zinc-100",
        "data-[state=checked]:text-white dark:data-[state=checked]:text-zinc-900",
      ],
      surface: [
        "rounded px-3 py-1.5",
        "bg-zinc-100 dark:bg-zinc-800",
        "hover:bg-zinc-200 dark:hover:bg-zinc-700",
        "data-[state=checked]:bg-zinc-500",
        "data-[state=checked]:text-white",
      ],
      soft: [
        "rounded px-3 py-1.5",
        "hover:bg-zinc-100 dark:hover:bg-zinc-800",
        "data-[state=checked]:bg-zinc-500",
        "data-[state=checked]:text-white",
      ],
    },
    color: {
      indigo: [
        "data-[state=checked]:bg-indigo-500 data-[state=checked]:text-white",
        "data-[state=checked]:border-indigo-500",
      ],
      cyan: [
        "data-[state=checked]:bg-cyan-500 data-[state=checked]:text-white",
        "data-[state=checked]:border-cyan-500",
      ],
      orange: [
        "data-[state=checked]:bg-orange-500 data-[state=checked]:text-white",
        "data-[state=checked]:border-orange-500",
      ],
      crimson: [
        "data-[state=checked]:bg-crimson-500 data-[state=checked]:text-white",
        "data-[state=checked]:border-crimson-500",
      ],
      gray: [
        "data-[state=checked]:bg-gray-500 data-[state=checked]:text-white",
        "data-[state=checked]:border-gray-500",
      ],
    },
    highContrast: {
      true: [
        "data-[state=checked]:bg-zinc-900 dark:data-[state=checked]:bg-zinc-50",
        "data-[state=checked]:text-white dark:data-[state=checked]:text-zinc-900",
      ],
    },
  },
  defaultVariants: {
    size: "2",
    variant: "surface",
  },
});

export const radioGroupRootVariants = tv({
  base: "inline-flex items-center gap-1",
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});
