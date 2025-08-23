import { tv } from "tailwind-variants";

// Grid variants
export const gridVariants = tv({
  base: "relative w-full",
  variants: {
    minHeight: {
      none: "",
      sm: "min-h-[100px]",
      md: "min-h-[200px]",
      lg: "min-h-[300px]",
      xl: "min-h-[400px]",
    },
  },
  defaultVariants: {
    minHeight: "none",
  },
});

// Grid cell variants
export const gridCellVariants = tv({
  base: "relative",
  variants: {},
  defaultVariants: {},
});

