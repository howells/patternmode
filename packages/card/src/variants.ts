import { borderRing } from "@patternmode/utils/border-ring";
import { borderRingDashed } from "@patternmode/utils/border-ring-dashed";
import { tv } from "tailwind-variants";

export const cardVariants = tv({
  base: ["relative w-full rounded-xl"].join(" "),
  variants: {
    variant: {
      default: [...borderRing, "bg-white dark:bg-[#090E1A]"].join(" "),
      dashed: [...borderRingDashed, "bg-transparent"].join(" "),
    },
    fillHeight: {
      true: "h-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
