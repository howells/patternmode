import { tv } from "tailwind-variants";

export const textVariants = tv({
  base: "m-0 text-current leading-relaxed max-w-prose",
  variants: {
    size: {
      "2xs": "prose-2xs",
      "xs": "prose-xs",
      "sm": "prose-sm",
      "base": "prose-base",
      "lg": "prose-lg",
      "xl": "prose-xl",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});
