import { tv } from "tailwind-variants";

export const dotVariants = tv({
  base: "inline-flex items-center gap-2 text-sm",
  variants: {
    size: {
      sm: "text-xs",
      default: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: { size: "default" },
});

export const dotIndicatorVariants = tv({
  base: ["relative rounded-full", "flex-shrink-0"],
  variants: {
    size: { sm: "h-1.5 w-1.5", default: "h-2 w-2", lg: "h-2.5 w-2.5" },
    animated: {
      true: "animate-pulse before:absolute before:inset-0 before:animate-ping before:rounded-full before:opacity-75",
      false: "",
    },
  },
  defaultVariants: { size: "default", animated: false },
});
