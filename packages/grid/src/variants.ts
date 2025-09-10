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
    viewport: {
      none: "",
      fill: "h-dvh w-screen", // Dynamic viewport height for mobile, full width
      height: "h-dvh", // Only height, keep width responsive
      width: "w-screen", // Only width, keep height auto
    },
    debug: {
      false: "",
      true: "[&>*]:border [&>*]:border-red-200 [&>*]:bg-red-50 [&>*]:dark:border-red-800 [&>*]:dark:bg-red-950",
    },
  },
  defaultVariants: {
    minHeight: "none",
    viewport: "none",
    debug: false,
  },
});

// Grid cell variants
export const gridCellVariants = tv({
  base: "relative",
  variants: {},
  defaultVariants: {},
});
