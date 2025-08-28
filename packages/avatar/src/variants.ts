import { tv } from "tailwind-variants";

export const avatarVariants = tv({
  base: "inline-flex items-center justify-center rounded-full overflow-hidden",
  variants: {
    size: { "2xs": "size-3", xs: "size-4", sm: "size-6", base: "size-10", lg: "size-14" },
    square: { true: "rounded", false: "rounded-full" },
  },
  defaultVariants: { size: "base", square: false },
});
