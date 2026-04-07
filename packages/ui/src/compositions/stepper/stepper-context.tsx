import { createContext, useContext } from "react";
import type { ComponentSize } from "../../lib/size";

/** Supported stepper sizes */
export type StepperSize = Extract<ComponentSize, "sm" | "base" | "lg">;

/** Context value for stepper state and configuration */
export interface StepperContextValue {
  /** Handler for step clicks */
  onStepClick: (stepValue: number) => void;
  /** Size variant */
  size: StepperSize;
  /** Current completed step index */
  value: number;
}

/**
 * StepperContext UI component.
 * Import from "@patternmode/ui/compositions/stepper".
 */
export const StepperContext = createContext<StepperContextValue | null>(null);

/** Hook to access stepper context */
export function useStepperContext() {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("Stepper components must be used within a Stepper");
  }
  return context;
}
