import { tv } from "tailwind-variants";

// Meter-specific color mappings that work well for progress indicators
const meterColorMap = {
  default: {
    track: "bg-blue-200 dark:bg-blue-500/30",
    indicator: "bg-blue-500 dark:bg-blue-500",
  },
  neutral: {
    track: "bg-zinc-200 dark:bg-zinc-500/40",
    indicator: "bg-zinc-500 dark:bg-zinc-500",
  },
  success: {
    track: "bg-emerald-200 dark:bg-emerald-500/30",
    indicator: "bg-emerald-500 dark:bg-emerald-500",
  },
  info: {
    track: "bg-sky-200 dark:bg-sky-500/30",
    indicator: "bg-sky-500 dark:bg-sky-500",
  },
  warning: {
    track: "bg-yellow-200 dark:bg-yellow-500/30",
    indicator: "bg-yellow-500 dark:bg-yellow-500",
  },
  error: {
    track: "bg-red-200 dark:bg-red-500/30",
    indicator: "bg-red-500 dark:bg-red-500",
  },
  critical: {
    track: "bg-rose-200 dark:bg-rose-500/30",
    indicator: "bg-rose-500 dark:bg-rose-500",
  },
  positive: {
    track: "bg-teal-200 dark:bg-teal-500/30",
    indicator: "bg-teal-500 dark:bg-teal-500",
  },
  negative: {
    track: "bg-rose-200 dark:bg-rose-500/30",
    indicator: "bg-rose-500 dark:bg-rose-500",
  },
} as const;

export const meterVariants = tv({
  slots: {
    track: "",
    indicator: "",
  },
  variants: {
    variant: meterColorMap,
  },
  defaultVariants: {
    variant: "default",
  },
});
