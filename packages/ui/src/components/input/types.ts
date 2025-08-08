import type { Input as BaseInput } from "@base-ui-components/react/input";
import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { inputStyles } from "./variants";

export type InputProps = {
  /**
   * Additional CSS classes for the input element.
   * Applied directly to the input element for custom styling.
   */
  inputClassName?: string;

  /**
   * Input type (text, email, password, etc.).
   * Supports all standard HTML input types with enhanced behavior for password and search types.
   */
  type?: string;

  /**
   * Custom prefix content.
   * Can be any React node including icons, text, or complex components.
   */
  prefix?: React.ReactNode;

  /**
   * Custom suffix content.
   * Can be any React node including icons, text, or complex components.
   */
  suffix?: React.ReactNode;

  /**
   * Prefix text content.
   * Simple text that appears before the input field.
   */
  prefixText?: string;

  /**
   * Prefix icon component.
   * Lucide React icon or similar icon component that accepts className and strokeWidth props.
   */
  prefixIcon?: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;

  /**
   * Suffix text content.
   * Simple text that appears after the input field.
   */
  suffixText?: string;

  /**
   * Suffix icon component.
   * Lucide React icon or similar icon component that accepts className and strokeWidth props.
   */
  suffixIcon?: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;

  /**
   * Whether to apply prefix styling.
   * When true, adds background and border styling to prefix content.
   */
  prefixStyling?: boolean;

  /**
   * Whether to apply suffix styling.
   * When true, adds background and border styling to suffix content.
   */
  suffixStyling?: boolean;

  /**
   * Stroke width for icons (defaults to 1).
   * Controls the thickness of icon strokes for consistent visual weight.
   */
  iconStrokeWidth?: number;

  /**
   * Minimal variant for command palettes - removes border, shadow, focus ring.
   * Perfect for search interfaces and command palettes where minimal styling is preferred.
   */
  minimal?: boolean;

  /**
   * Remove all styling and return bare input element.
   * Provides maximum customization flexibility by removing all component styling.
   */
  unstyled?: boolean;

  /**
   * Size variant of the input.
   * Controls height, text size, and overall dimensions of the input field.
   */
  size?: "2xs" | "xs" | "sm" | "base" | "lg";

  /**
   * Whether to display error styling for form validation.
   * Adds red border and error state styling to indicate validation errors.
   */
  hasError?: boolean;

  /**
   * Whether to show number input steppers.
   * When false, hides the up/down arrows on number inputs for cleaner appearance.
   */
  enableStepper?: boolean;
} & Omit<
      React.ComponentPropsWithoutRef<typeof BaseInput>,
      "size" | "prefix"
    > & VariantProps<typeof inputStyles>;
