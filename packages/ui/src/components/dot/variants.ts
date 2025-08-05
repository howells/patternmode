import { tv } from "tailwind-variants";

// Simple dot variants - just handle sizing
export const dotVariants = tv({
  base: ["inline-flex items-center gap-2", "font-medium"],
  variants: {
    size: {
      sm: "text-2xs",
      default: "text-xs",
      lg: "text-sm",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

// Simple dot indicator variants - just handle sizing and base styles
export const dotIndicatorVariants = tv({
  base: ["relative rounded-full", "flex-shrink-0"],
  variants: {
    size: {
      sm: "w-1.5 h-1.5",
      default: "w-2 h-2",
      lg: "w-2.5 h-2.5",
    },
    animated: {
      true: "animate-pulse before:absolute before:inset-0 before:rounded-full before:animate-ping before:opacity-75",
      false: "",
    },
  },
  defaultVariants: {
    size: "default",
    animated: false,
  },
});
