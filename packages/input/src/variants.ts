import { formControlElementVariants } from "@patternmode/constants/form-control-variants";
import { tv } from "tailwind-variants";

export const inputElementStyles = tv({
	extend: formControlElementVariants,
	defaultVariants: { size: "base", variant: "contained" },
});
