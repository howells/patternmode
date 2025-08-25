import { tv } from "tailwind-variants";
import { formControlElementVariants } from "@patternmode/constants/form-control-variants";

export const inputElementStyles = tv({
  extend: formControlElementVariants,
  defaultVariants: { size: "base", variant: "contained" },
});

