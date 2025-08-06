import { tv } from "tailwind-variants";
import { focusRing } from "../../lib/utils";
import { componentVariants } from "../../lib/variants";

export const themeToggleVariants = tv({
  base: [
    // base
    "relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm outline-hidden",
    // cursor
    "cursor-pointer",
    // border
    "border border-transparent",
    // background transition
    "transition-[background-color,border-color,box-shadow,color] duration-150 ease-in-out",
    // disabled
    "disabled:pointer-events-none disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-50",
    // focus
    focusRing,
    // icon transition
    "[&>svg]:transition-transform [&>svg]:duration-200",
  ],
  variants: {
    variant: componentVariants.button,
    rounded: {
      true: "rounded-full",
      false: "rounded-md",
    },
    size: {
      "xs": "size-control-xs",
      "sm": "size-control-sm", 
      "default": "size-control-base",
      "lg": "size-control-lg",
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "default",
    rounded: false,
  },
});