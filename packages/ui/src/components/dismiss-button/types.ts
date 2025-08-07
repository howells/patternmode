import type React from "react";

export type DismissButtonProps = {
  /**
   * Callback when the dismiss button is clicked.
   * @example
   * ```tsx
   * <DismissButton onClick={() => {}} />
   * ```
   */
  "onClick"?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Custom icon component for the dismiss button.
   * @default X icon from lucide-react
   */
  "icon"?: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
  /**
   * Icon stroke width.
   * @default defaultConfig.components.iconStrokeWidth
   */
  "iconStrokeWidth"?: number;
  /**
   * Size of the dismiss button.
   * Aligns with the control height system for consistent square sizing.
   * @default "base"
   */
  "size"?: "xs" | "sm" | "base" | "lg";
  /**
   * Accessible label for the button.
   * @default "Remove"
   */
  "aria-label"?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
