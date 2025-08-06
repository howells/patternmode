import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { Size } from "../../lib/component-config-types";
import type { selectNativeStyles } from "./variants";

/**
 * Props for the SelectNative component.
 */
export type SelectNativeProps = Omit<React.InputHTMLAttributes<HTMLSelectElement>, 'size'> & {
  /**
   * Whether to display error styling for form validation.
   * Adds red border and error state styling to indicate validation errors.
   */
  hasError?: boolean;
  /**
   * Size variant of the select input.
   * Controls height and padding of the select element.
   */
  size?: "xs" | "sm" | "base" | "lg";
};
