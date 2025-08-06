import { tv } from "tailwind-variants";

export const tagGroupVariants = tv({
  base: "flex flex-wrap items-center",
  variants: {
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    direction: {
      row: "flex-row",
      column: "flex-col",
    },
  },
  defaultVariants: {
    justify: "start",
    direction: "row",
  },
});
