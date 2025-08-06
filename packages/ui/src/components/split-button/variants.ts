import { tv } from "tailwind-variants";

import { focusRing } from "../../lib/utils";

// Split button variants using the same base as button but with modifications for the split layout
export const splitButtonVariants = tv({
  base: [
    // base
    "relative inline-flex items-center  outline-hidden",
    // background transition - only animate colors and shadows, not position
    "transition-[background-color,border-color,box-shadow,color] duration-150 ease-in-out",
    // disabled
    "data-disabled:pointer-events-none data-disabled:shadow-none",
  ],
  variants: {
    variant: {
      default: [
        // inset border with normal shadow using proper Tailwind classes
        "inset-ring-1 inset-ring-white/10 ",
        "dark:inset-ring-black/20",
        // background color
        "bg-zinc-900 dark:bg-zinc-50",
        // hover with enhanced inset border
        "hover:inset-ring-white/15 hover:",
        "dark:hover:inset-ring-black/25",
        // disabled
        "data-disabled:bg-zinc-400 data-disabled:inset-ring-white/5 data-disabled:shadow-none",
        "dark:data-disabled:bg-zinc-600 dark:data-disabled:inset-ring-black/10",
      ],
      secondary: [
        // clean secondary without border, just shadow
        "",
        // background color
        "bg-zinc-100 dark:bg-zinc-800",
        // hover with shadow only
        "hover:",
        // disabled
        "data-disabled:bg-zinc-50 data-disabled:shadow-none",
        "dark:data-disabled:bg-zinc-900",
      ],
      destructive: [
        // inset border with normal shadow using proper Tailwind classes
        "inset-ring-1 inset-ring-white/20 ",
        "dark:inset-ring-white/10",
        // background color
        "bg-red-600 dark:bg-red-600",
        // hover with enhanced inset border
        "hover:inset-ring-white/25 hover:",
        "dark:hover:inset-ring-white/15",
        // disabled
        "data-disabled:bg-red-300 data-disabled:inset-ring-white/10 data-disabled:shadow-none",
        "dark:data-disabled:bg-red-800 dark:data-disabled:inset-ring-white/5",
      ],
      outline: [
        // ring border with shadow - using explicit border classes
        "ring-1 ring-zinc-300 ",
        "dark:ring-zinc-700",
        // background transparent initially
        "bg-transparent",
        // hover with shadow ring
        "hover:ring-zinc-400 hover:",
        "dark:hover:ring-zinc-600",
        // disabled
        "data-disabled:ring-zinc-200 data-disabled:shadow-none",
        "dark:data-disabled:ring-zinc-800",
      ],
      ghost: [
        // no border, just shadow for consistency
        "",
        // background transparent initially
        "bg-transparent",
        // hover maintains clean look
        "hover:",
        // disabled clean look
        "data-disabled:shadow-none",
      ],
    },
    size: {
      default: "",
      sm: "",
    },
    rounded: {
      true: "rounded-full",
      false: "rounded-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    rounded: false,
  },
});

export const dropdownTriggerVariants = tv({
  slots: {
    trigger: [
      // base styles shared with Button component
      "h-9 border-l border-black/10 px-2 focus:outline-hidden",
      "dark:border-white/10",
      // focus styling
      focusRing,
      // rounded corners to match parent
      "rounded-r-lg",
    ],
  },
  variants: {
    variant: {
      default: [
        "text-white hover:text-white",
        "dark:text-zinc-900 dark:hover:text-zinc-900",
      ],
      secondary: [
        "text-zinc-900 hover:text-zinc-900",
        "dark:text-zinc-50 dark:hover:text-zinc-50",
      ],
      destructive: [
        "text-white hover:text-white",
        "dark:text-white dark:hover:text-white",
      ],
      outline: [
        "text-zinc-900 hover:text-zinc-900",
        "dark:text-zinc-50 dark:hover:text-zinc-50",
      ],
      ghost: [
        "text-zinc-900 hover:text-zinc-900",
        "dark:text-zinc-50 dark:hover:text-zinc-50",
      ],
    },
    size: {
      default: "h-9 px-2",
      sm: "h-8 px-1.5 text-sm",
    },
    rounded: {
      true: "rounded-r-full",
      false: "rounded-r-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    rounded: false,
  },
});
