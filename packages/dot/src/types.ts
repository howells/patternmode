import type * as React from "react";
import type { VariantProps } from "tailwind-variants";
import type { dotVariants, dotIndicatorVariants } from "./variants";

export type DotProps = {
  variant?: string;
  label?: string;
} & VariantProps<typeof dotVariants> & VariantProps<typeof dotIndicatorVariants> & React.ComponentPropsWithoutRef<"span">;

