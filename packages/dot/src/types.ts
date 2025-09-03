import type {
  SemanticVariant,
  TailwindColor,
} from "@patternmode/constants/variants";
import type * as React from "react";
import type { VariantProps } from "tailwind-variants";
import type { dotIndicatorVariants, dotVariants } from "./variants";

export type DotProps = {
  variant?: SemanticVariant | TailwindColor;
  label?: string;
} & VariantProps<typeof dotVariants> &
  VariantProps<typeof dotIndicatorVariants> &
  React.ComponentPropsWithoutRef<"span">;
