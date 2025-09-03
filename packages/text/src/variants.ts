import { tv } from "tailwind-variants";

export const textVariants = tv({
  base: "m-0 max-w-prose text-current leading-relaxed",
  variants: {
    size: {
      "2xs": "prose-xs",
      xs: "prose-xs",
      sm: "prose-sm",
      base: "prose-base",
      lg: "prose-lg",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});
