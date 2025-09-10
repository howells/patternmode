import { borderRadiusVariants } from "@patternmode/utils/border-radius-variants";
import { containerButtonAdjustments } from "@patternmode/utils/container-button-adjustments";
import { floatingSurfaceVariants } from "@patternmode/utils/floating-surface";
import { focusRing } from "@patternmode/utils/focus-ring";
import { tv } from "tailwind-variants";

export const toggleGroupVariants = tv({
  slots: {
    root: [
      // base
      "flex gap-px p-0.5",
      // shared surface (static context): white with thin border, no shadow
      floatingSurfaceVariants({ density: "none", context: "static" }).base(),
    ],
    item: [
      // base
      "flex select-none items-center justify-center font-medium text-sm transition-all duration-100 ease-in-out",
      // colors
      "text-zinc-600 dark:text-zinc-400",
      // hover
      "hover:bg-zinc-100 dark:hover:bg-zinc-700",
      // active
      "active:bg-zinc-200 dark:active:bg-zinc-600",
      // pressed
      "data-[pressed]:bg-zinc-100 data-[pressed]:text-zinc-900 dark:data-[pressed]:bg-zinc-700 dark:data-[pressed]:text-zinc-100",
      // disabled
      "disabled:pointer-events-none disabled:opacity-50",
      // focus
      focusRing,
      "focus-visible:-outline-offset-1 focus-visible:bg-none",
    ],
  },
  variants: {
    variant: {
      default: {
        root: "",
        item: "",
      },
      outline: {
        root: "",
        item: "border border-transparent data-[pressed]:border-blue-500 dark:data-[pressed]:border-blue-400",
      },
      ghost: {
        root: "border-transparent bg-transparent",
        item: "hover:bg-zinc-100 dark:hover:bg-zinc-800",
      },
    },
    size: {
      "2xs": {
        root: [
          `gap-0.5 p-0.5 ${borderRadiusVariants.xs}`,
          ...containerButtonAdjustments.xs,
        ],
        item: `h-3.5 px-1 text-[11px] ${borderRadiusVariants.xs}`,
      },
      xs: {
        root: [
          `gap-0.5 p-0.5 ${borderRadiusVariants.xs}`,
          // Use centralized button adjustments
          ...containerButtonAdjustments.xs,
        ],
        item: `h-4 px-1 text-xs ${borderRadiusVariants.xs}`,
      },
      sm: {
        root: [
          `gap-0.5 p-0.5 ${borderRadiusVariants.sm}`,
          // Use centralized button adjustments
          ...containerButtonAdjustments.sm,
        ],
        item: `h-6 px-2 text-xs ${borderRadiusVariants.sm}`,
      },
      base: {
        root: [
          `gap-px p-0.5 ${borderRadiusVariants.base}`,
          // Use centralized button adjustments
          ...containerButtonAdjustments.base,
        ],
        item: `h-8 px-3 text-sm ${borderRadiusVariants.base}`,
      },
      lg: {
        root: [
          `gap-1 p-1 ${borderRadiusVariants.lg}`,
          // Use centralized button adjustments
          ...containerButtonAdjustments.lg,
        ],
        item: `h-10 px-4 text-base ${borderRadiusVariants.lg}`,
      },
    },
    orientation: {
      horizontal: {
        root: "flex-row",
      },
      vertical: {
        root: "flex-col",
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "base",
    orientation: "horizontal",
  },
});
