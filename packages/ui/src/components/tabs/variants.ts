import { tv } from "tailwind-variants";
import { focusRing } from "../../lib/utils";
import { borderRadiusVariants } from "../../lib/border-radius";

export const tabsVariants = tv({
  slots: {
    root: "relative",
    list: [
      // base
      "relative flex",
      // border
      "border-b border-zinc-200 dark:border-zinc-700",
    ],
    tab: [
      // base
      "group relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium outline-hidden transition-all duration-150 ease-in-out",
      // cursor
      "cursor-pointer",
      // text color
      "text-zinc-600 dark:text-zinc-400",
      // hover
      "hover:text-zinc-900 dark:hover:text-zinc-100",
      // disabled
      "disabled:pointer-events-none disabled:text-zinc-400 dark:disabled:text-zinc-600",
      // focus
      focusRing,
    ],
    indicator: [
      // base
      "absolute transition-all duration-200 ease-in-out",
      // line indicator - bottom line that sits on the divider
      "-bottom-px left-0 h-px w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] z-10",
      "bg-zinc-900 dark:bg-zinc-50",
    ],
  },
  variants: {
    variant: {
      line: {
        list: "border-b border-zinc-200 dark:border-zinc-700",
        tab: "border-b-2 border-transparent data-[selected]:border-zinc-900 data-[selected]:text-zinc-900 dark:data-[selected]:border-zinc-50 dark:data-[selected]:text-zinc-50",
      },
      solid: {
        list: [
          // base
          "flex gap-px border p-0.5",
          // colors
          "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700",
        ],
        tab: [
          // base
          "flex items-center justify-center text-sm font-medium select-none transition-all duration-100 ease-in-out",
          // colors
          "text-zinc-600 dark:text-zinc-400",
          // hover
          "hover:bg-zinc-100 dark:hover:bg-zinc-700",
          // selected
          "data-[selected]:bg-zinc-100 data-[selected]:text-zinc-900 dark:data-[selected]:bg-zinc-700 dark:data-[selected]:text-zinc-100",
          // disabled
          "disabled:pointer-events-none disabled:opacity-50",
          // focus
          focusRing,
          "focus-visible:bg-none focus-visible:-outline-offset-1",
        ],
        indicator: "hidden", // No indicator for solid variant
      },
    },
    size: {
      xs: {
        list: "gap-x-2", // very tight spacing for line variant
        tab: "", // very small height and text size for line variant only
      },
      sm: {
        list: "gap-x-3", // tighter spacing for line variant
        tab: "", // smaller height and text size for line variant only
      },
      default: {
        list: "gap-x-4", // spacing for line variant
        tab: "", // height and text size for line variant only
      },
      lg: {
        list: "gap-x-6", // wider spacing for line variant
        tab: "", // larger height and text size for line variant only
      },
    },
    hideDivider: {
      true: {},
    },
    hideBorder: {
      true: {},
    },
  },
  compoundVariants: [
    // Size adjustments for solid variant - override gap with padding
    {
      variant: "solid",
      size: "xs",
      class: {
        list: [
          `gap-x-0 p-0.5 ${borderRadiusVariants.xs}`, // Remove gap, very compact for xs
          // Reduce button heights inside tabs for xs size
          "[&_button]:!h-[calc(var(--control-height-xs)-0.25rem)]", // xs: 28px - 4px = 24px
        ],
      },
    },
    {
      variant: "solid",
      size: "sm",
      class: {
        list: [
          `gap-x-0 p-0.5 ${borderRadiusVariants.sm}`, // Remove gap, keep compact for sm
          // Reduce button heights inside tabs for sm size
          "[&_button]:!h-[calc(var(--control-height-sm)-0.25rem)]", // sm: 36px - 4px = 32px
        ],
      },
    },
    {
      variant: "solid",
      size: "default",
      class: {
        list: [
          `gap-x-0 p-0.5 ${borderRadiusVariants.lg}`, // Remove gap, use padding
          // Reduce button heights inside tabs for default size
          "[&_button]:!h-[calc(var(--control-height-base)-0.25rem)]", // default: 40px - 4px = 36px
        ],
      },
    },
    {
      variant: "solid",
      size: "lg",
      class: {
        list: [
          `gap-x-0 p-0.5 ${borderRadiusVariants.lg}`, // Remove gap, larger container for lg
          // Reduce button heights inside tabs for lg size (uses p-1 = 8px total)
          "[&_button]:!h-[calc(var(--control-height-lg)-0.5rem)]", // lg: 48px - 8px = 40px
        ],
      },
    },
    {
      variant: "line",
      hideDivider: true,
      class: {
        list: "border-b-0",
      },
    },
    {
      variant: "line",
      hideBorder: true,
      class: {
        indicator: "hidden",
      },
    },
  ],
  defaultVariants: {
    variant: "line",
    size: "default",
    hideDivider: false,
    hideBorder: false,
  },
});
