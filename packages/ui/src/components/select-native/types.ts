import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { selectNativeStyles } from "./variants";

/**
 * Props for the SelectNative component.
 */
export type SelectNativeProps = {
  /**
   * Whether to display error styling for form validation.
   * Adds red border and error state styling to indicate validation errors.
   */
  hasError?: boolean;
} & React.InputHTMLAttributes<HTMLSelectElement> & VariantProps<typeof selectNativeStyles>;
