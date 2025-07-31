// Tremor Raw cx [v0.0.0]

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Tremor focusInput [v0.0.2]

export const focusInput = [
  // base
  "focus:ring-2",
  // ring color
  "focus:ring-blue-200 dark:focus:ring-blue-700/30",
  // border color
  "focus:border-blue-500 dark:focus:border-blue-700",
];

// Tremor Raw focusRing [v0.0.1]

export const focusRing = [
  // base
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  // outline color
  "outline-blue-500 dark:outline-blue-500",
];

// Tremor Raw hasErrorInput [v0.0.1]

export const hasErrorInput = [
  // base
  "ring-2",
  // border color
  "border-red-500 dark:border-red-700",
  // ring color
  "ring-red-200 dark:ring-red-700/30",
];

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
export interface ComponentWithIconsProps {
  leftIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  rightIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /** Stroke width for icons (defaults to 1) */
  iconStrokeWidth?: number;
}
