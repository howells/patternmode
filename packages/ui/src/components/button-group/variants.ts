import { tv } from "tailwind-variants";

export const buttonGroupVariants = tv({
  base: "flex flex-row items-center",
  variants: {
    align: {
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
  defaultVariants: {
    align: "start",
    wrap: false,
  },
});
