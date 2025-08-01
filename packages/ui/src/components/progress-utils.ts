import { tv } from "tailwind-variants";

// Shared progress variants for consistent theming
export const sharedProgressVariants = {
  default: {
    light: "blue-500",
    lightBg: "blue-200",
    dark: "blue-500",
    darkBg: "blue-500/30",
  },
  neutral: {
    light: "zinc-500",
    lightBg: "zinc-200",
    dark: "zinc-500",
    darkBg: "zinc-500/40",
  },
  warning: {
    light: "yellow-500",
    lightBg: "yellow-200",
    dark: "yellow-500",
    darkBg: "yellow-500/30",
  },
  error: {
    light: "red-500",
    lightBg: "red-200",
    dark: "red-500",
    darkBg: "red-500/30",
  },
  success: {
    light: "emerald-500",
    lightBg: "emerald-200",
    dark: "emerald-500",
    darkBg: "emerald-500/30",
  },
} as const;

// Shared progress variant type
export type ProgressVariant = keyof typeof sharedProgressVariants;

// Utility functions
export const clampValue = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const getProgressPercentage = (
  value: number | null,
  max: number,
): number => {
  if (value === null) {
    return 0;
  }
  return (clampValue(value, 0, max) / max) * 100;
};

export const defaultValueFormatter = (
  value: number | null,
  max: number,
): string => {
  if (value === null) {
    return "—";
  }
  return `${Math.round(getProgressPercentage(value, max))}%`;
};

// Shared label styling
export const progressLabelVariants = tv({
  base: [
    // base
    "text-xs font-medium leading-none",
    // text color
    "text-zinc-900 dark:text-zinc-50",
  ],
});

// Shared value styling
export const progressValueVariants = tv({
  base: [
    // base
    "text-xs font-medium leading-none",
    // text color
    "text-zinc-900 dark:text-zinc-50",
  ],
});

// Animation classes
export const progressAnimationClasses = {
  enabled: "transform-gpu transition-all duration-300 ease-in-out",
  disabled: "",
} as const;
