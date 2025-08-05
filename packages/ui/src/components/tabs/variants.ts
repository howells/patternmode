import { tv } from "tailwind-variants";

import { focusRing } from "../../lib/utils";

export const tabsVariants = tv({
  slots: {
    root: [
      // base
      "w-full",
    ],
    list: [
      // base styles will be applied via variants
    ],
    tab: [
      // base styles will be applied via variants
    ],
    indicator: [
      // base
      "absolute transition-all duration-200 ease-out",
    ],
    panel: [
      // base
      "outline-hidden",
      // focus
      focusRing,
    ],
  },
  variants: {
    variant: {
      solid: {
        list: [
          // base - button collection style (sized for default = text-xs)
          "inline-flex items-center justify-start bg-zinc-100 dark:bg-zinc-900 p-0.5 rounded-md",
          // Reduce button heights inside tabs to account for container padding
          "[&_button]:!h-[calc(var(--control-height-base)-0.25rem)]", // default: 40px - 4px = 36px
          "[&_button[class*='h-control-xs']]:!h-[calc(var(--control-height-xs)-0.25rem)]", // xs: 28px - 4px = 24px
          "[&_button[class*='h-control-sm']]:!h-[calc(var(--control-height-sm)-0.25rem)]", // sm: 36px - 4px = 32px
          "[&_button[class*='h-control-lg']]:!h-[calc(var(--control-height-lg)-0.5rem)]", // lg: 48px - 8px = 40px (lg uses p-1)
        ],
        tab: [
          // For solid variant, we'll use Button component instead of these styles
          // Keep minimal styles for the Base UI Tab wrapper
          "relative",
        ],
        indicator: [
          // no indicator for solid variant - the button styling handles the active state
          "hidden",
        ],
      },
      line: {
        list: [
          // base
          "relative flex items-center justify-start",
          // bottom border (divider)
          "border-b  dark:border-zinc-800",
        ],
        tab: [

        ],
        indicator: [
          // line indicator - bottom line that sits on the divider
          "-bottom-px left-0 h-px w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] z-10",
          "bg-zinc-900 dark:bg-zinc-50",
        ],
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
          "gap-x-0 p-0.5 rounded-sm", // Remove gap, very compact for xs
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
          "gap-x-0 p-0.5 rounded-md", // Remove gap, keep compact for sm
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
          "gap-x-0 p-0.5 rounded-lg", // Remove gap, use padding
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
          "gap-x-0 p-0.5 rounded-lg", // Remove gap, larger container for lg
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
