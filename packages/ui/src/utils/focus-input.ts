import type { SemanticVariant } from "../lib/variant";

type FocusInputVariant = SemanticVariant;

const FOCUS_INPUT_CLASSES: Record<FocusInputVariant, readonly string[]> = {
  default: [
    "outline-none",
    "focus-visible:border-ring",
    "focus-visible:ring-4",
    "focus-visible:ring-ring/15",
    "data-[focused=true]:border-ring",
    "data-[focused=true]:ring-4",
    "data-[focused=true]:ring-ring/15",
    "transition-[box-shadow,border-color]",
  ],
  secondary: [
    "outline-none",
    "focus-visible:border-border-strong",
    "focus-visible:ring-4",
    "focus-visible:ring-border/80",
    "data-[focused=true]:border-border-strong",
    "data-[focused=true]:ring-4",
    "data-[focused=true]:ring-border/80",
    "transition-[box-shadow,border-color]",
  ],
  accent: [
    "outline-none",
    "focus-visible:border-accent",
    "focus-visible:ring-4",
    "focus-visible:ring-accent/20",
    "data-[focused=true]:border-accent",
    "data-[focused=true]:ring-4",
    "data-[focused=true]:ring-accent/20",
    "transition-[box-shadow,border-color]",
  ],
  success: [
    "outline-none",
    "focus-visible:border-success",
    "focus-visible:ring-4",
    "focus-visible:ring-success/20",
    "data-[focused=true]:border-success",
    "data-[focused=true]:ring-4",
    "data-[focused=true]:ring-success/20",
    "transition-[box-shadow,border-color]",
  ],
  destructive: [
    "outline-none",
    "focus-visible:border-destructive",
    "focus-visible:ring-4",
    "focus-visible:ring-destructive/20",
    "data-[focused=true]:border-destructive",
    "data-[focused=true]:ring-4",
    "data-[focused=true]:ring-destructive/20",
    "transition-[box-shadow,border-color]",
  ],
};

export function focusInput(variant: FocusInputVariant = "default") {
  return FOCUS_INPUT_CLASSES[variant];
}
