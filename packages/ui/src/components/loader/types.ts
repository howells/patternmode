import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { loaderVariants } from "./variants";

/**
 * Props for the Loader component.
 */
export type LoaderProps = {
  /**
   * The size variant of the loader icon.
   * Controls the width and height dimensions of the spinner.
   * @default "base"
   */
  "size"?: "xs" | "sm" | "base" | "lg" | "xl";

  /**
   * Accessible label for screen readers describing the loading state.
   * Essential for accessibility when the loader has no visible text.
   */
  "aria-label"?: string;

  /**
   * Optional visible label text displayed to the right of the spinner.
   * If provided without aria-label, will also be used as the aria-label.
   * Creates a horizontal layout with the spinner and text side by side.
   */
  "label"?: string;
} & React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof loaderVariants>;
