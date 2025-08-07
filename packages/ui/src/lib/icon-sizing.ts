/**
 * Icon Sizing Utilities
 *
 * Utilities for working with icons, including sizing and component props.
 */

// Shared icon utilities
export const iconUtils = {
  // Get icon size class based on component size
  getIconSize: (size: "xs" | "sm" | "base" | "lg" | "xl" = "base") => {
    switch (size) {
      case "xs":
        return "size-2.5";
      case "sm":
        return "size-3";
      case "base":
        return "size-3.5";
      case "lg":
        return "size-4";
      case "xl":
        return "size-5";
      default:
        return "size-3.5";
    }
  },
};

// Shared component props for components that support left/right icons
export type ComponentWithIconsProps = {
  leftIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }> | string;
  rightIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }> | string;
  /** Stroke width for icons (defaults to 1) */
  iconStrokeWidth?: number;
};
