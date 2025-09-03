import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { separatorContainerVariants, separatorVariants } from "./variants";

/**
 * Props for the Separator component.
 */
export type SeparatorProps = {
  /**
   * Optional text to render alongside the separator line(s).
   */
  children?: React.ReactNode;
  /**
   * Additional class names for custom styling.
   */
  className?: string;
} & Omit<
  React.ComponentProps<
    typeof import("@base-ui-components/react/separator").Separator
  >,
  "children" | "className"
> &
  VariantProps<typeof separatorVariants> &
  VariantProps<typeof separatorContainerVariants>;
