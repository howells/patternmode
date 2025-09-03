import { tv } from "tailwind-variants";

export const emptyStateVariants = tv({
  base: [
    // Base styles
    "flex flex-col items-center justify-center text-center",
    // Max width
    "mx-auto max-w-md",
  ],
  variants: {
    size: {
      "2xs": "gap-1.5 px-2 py-4",
      xs: "gap-2 px-3 py-6",
      sm: "gap-3 px-4 py-8",
      base: "gap-4 px-6 py-12",
      lg: "gap-6 px-12 py-16",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

export const emptyStateContentVariants = tv({
  base: "space-y-2",
});

export const emptyStateActionsVariants = tv({
  base: "flex flex-col items-center",
  variants: {
    size: {
      "2xs": "mt-1 gap-1",
      xs: "mt-1 gap-1",
      sm: "mt-2 gap-2",
      base: "mt-4 gap-3",
      lg: "mt-6 gap-4",
    },
    hasMultipleActions: {
      true: "sm:flex-row sm:gap-3",
      false: "",
    },
  },
  defaultVariants: {
    size: "base",
    hasMultipleActions: false,
  },
});
