import { tv } from "tailwind-variants";

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

export type ProgressVariant = keyof typeof sharedProgressVariants;

export const clampValue = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const getProgressPercentage = (
  value: number | null,
  max: number
): number => {
  if (value === null) {
    return 0;
  }
  const PERCENT = 100;
  return (clampValue(value, 0, max) / max) * PERCENT;
};

export const defaultValueFormatter = (
  value: number | null,
  max: number
): string => {
  if (value === null) {
    return "—";
  }
  return `${Math.round(getProgressPercentage(value, max))}%`;
};

export const progressLabelVariants = tv({
  base: ["font-medium text-xs leading-none", "text-zinc-900 dark:text-zinc-50"],
});

export const progressValueVariants = tv({
  base: ["font-medium text-xs leading-none", "text-zinc-900 dark:text-zinc-50"],
});

export const progressAnimationClasses = {
  enabled: "transform-gpu transition-all duration-300 ease-in-out",
  disabled: "",
} as const;

/**
 * Tailwind 4 Class Detection:
 * The circular progress component applies stroke color classes dynamically
 * via tailwind-variants. To ensure Tailwind includes these utilities, we
 * enumerate them here.
 *
 * stroke-blue-200 stroke-blue-500 dark:stroke-blue-500 dark:stroke-blue-500/30
 * stroke-zinc-200 stroke-zinc-500 dark:stroke-zinc-500 dark:stroke-zinc-500/40
 * stroke-yellow-200 stroke-yellow-500 dark:stroke-yellow-500 dark:stroke-yellow-500/30
 * stroke-red-200 stroke-red-500 dark:stroke-red-500 dark:stroke-red-500/30
 * stroke-emerald-200 stroke-emerald-500 dark:stroke-emerald-500 dark:stroke-emerald-500/30
 */
