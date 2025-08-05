import { tv } from "tailwind-variants";

// Stack variants using shared spacing utilities
export const stackVariants = tv({
  base: "flex",
  variants: {
    direction: {
      vertical: "flex-col",
      horizontal: "flex-row",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
  },
  compoundVariants: [
    // Negative spacing for horizontal direction - these will be handled by responsive utilities
    // but keeping compound variants for complex negative spacing scenarios
    { direction: "horizontal", class: "space-x-0" }, // Base case for negative spacing
    { direction: "vertical", class: "space-y-0" }, // Base case for negative spacing
  ],
  defaultVariants: {
    direction: "vertical",
    wrap: false,
  },
});
