import { tv } from "tailwind-variants";

export const separatorVariants = tv({
  base: [
    // base
    "shrink-0 border-none",
    // background color
    "bg-zinc-200 dark:bg-zinc-800",
  ],
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px h-full",
    },
    variant: {
      default: "bg-zinc-200 dark:bg-zinc-800",
      subtle: "bg-zinc-100 dark:bg-zinc-900",
      strong: "bg-zinc-200 dark:bg-zinc-800",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    // Horizontal sizes
    {
      orientation: "horizontal",
      size: "sm",
      class: "h-px",
    },
    {
      orientation: "horizontal",
      size: "md",
      class: "h-px",
    },
    {
      orientation: "horizontal",
      size: "lg",
      class: "h-0.5",
    },
    // Vertical sizes
    {
      orientation: "vertical",
      size: "sm",
      class: "w-px",
    },
    {
      orientation: "vertical",
      size: "md",
      class: "w-px",
    },
    {
      orientation: "vertical",
      size: "lg",
      class: "w-0.5",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    variant: "default",
    size: "md",
  },
});

// Container variants for text labels
export const separatorContainerVariants = tv({
  base: [
    "flex items-center justify-between gap-3 text-sm",
    "text-zinc-500 dark:text-zinc-500",
  ],
  variants: {
    orientation: {
      horizontal: "flex-row w-full",
      vertical: "flex-col h-full w-auto",
    },
    spacing: {
      none: "my-0",
      sm: "my-4",
      md: "my-6",
      lg: "my-8",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    spacing: "md",
  },
});

