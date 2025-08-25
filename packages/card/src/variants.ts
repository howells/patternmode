import { tv } from "tailwind-variants";

export const cardVariants = tv({
  base: [
    "relative w-full rounded-lg",
    "bg-white dark:bg-[#090E1A]",
    "border card-border",
    "shadow-xs",
  ].join(" "),
  variants: {
    variant: {
      default: "",
      dashed: "border-2 border-dashed bg-transparent",
    },
    fillHeight: {
      true: "h-full",
    },
  },
});
