import { tv } from "tailwind-variants";

export const radioGroupVariants = tv({
  base: [
    // base
    "grid gap-2",
  ],
  variants: {
    /**
     * Layout orientation of radio items.
     */
    orientation: {
      vertical: "grid-cols-1",
      horizontal: "grid-flow-col auto-cols-max gap-4",
    },
    /**
     * Spacing size between radio items.
     */
    size: {
      sm: "gap-1.5",
      md: "gap-2",
      lg: "gap-3",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    size: "md",
  },
});
