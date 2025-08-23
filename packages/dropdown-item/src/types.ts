import type { VariantProps } from "tailwind-variants";
import type { ButtonProps } from "@patternmode/button";
import type { dropdownItemVariants } from "./variants";

export type DropdownItemProps = {
  highlighted?: boolean;
  selected?: boolean;
  hint?: string;
  variant?: "default" | "destructive";
} & Omit<ButtonProps, "variant" | "fullWidth" | "textAlign"> &
  VariantProps<typeof dropdownItemVariants> & {
    role?: string;
  };

