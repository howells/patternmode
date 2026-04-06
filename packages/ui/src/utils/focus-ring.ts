import type { SemanticVariant } from "../lib/variant";

type FocusRingVariant = SemanticVariant;

const FOCUS_RING_CLASSES: Record<FocusRingVariant, readonly string[]> = {
  default: [
    "outline-none",
    "focus-visible:ring-4",
    "focus-visible:ring-ring/15",
    "data-[focused=true]:ring-4",
    "data-[focused=true]:ring-ring/15",
    "transition-[box-shadow]",
  ],
  secondary: [
    "outline-none",
    "focus-visible:ring-4",
    "focus-visible:ring-border/80",
    "data-[focused=true]:ring-4",
    "data-[focused=true]:ring-border/80",
    "transition-[box-shadow]",
  ],
  accent: [
    "outline-none",
    "focus-visible:ring-4",
    "focus-visible:ring-accent/20",
    "data-[focused=true]:ring-4",
    "data-[focused=true]:ring-accent/20",
    "transition-[box-shadow]",
  ],
  success: [
    "outline-none",
    "focus-visible:ring-4",
    "focus-visible:ring-success/20",
    "data-[focused=true]:ring-4",
    "data-[focused=true]:ring-success/20",
    "transition-[box-shadow]",
  ],
  destructive: [
    "outline-none",
    "focus-visible:ring-4",
    "focus-visible:ring-destructive/20",
    "data-[focused=true]:ring-4",
    "data-[focused=true]:ring-destructive/20",
    "transition-[box-shadow]",
  ],
};

export function focusRing(variant: FocusRingVariant = "default") {
  return FOCUS_RING_CLASSES[variant];
}
