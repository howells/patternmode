"use client";

import { springs } from "@patternmode/motion";
import { cn } from "@patternmode/ui/utils/cn";
import { motion } from "motion/react";
import type * as React from "react";
import { Children, isValidElement, useState } from "react";
import { StepperContext, type StepperSize } from "./stepper-context";
import { stepperRootVariants, stepperTrackVariants } from "./stepper-variants";

export type StepperProps = {
  /** Current completed step index (controlled) */
  value?: number;
  /** Initial step index (uncontrolled) */
  defaultValue?: number;
  /** Callback when step changes */
  onValueChange?: (value: number) => void;
  /** Size variant */
  size?: StepperSize;
  /** Additional className */
  className?: string;
  /** StepperItem children */
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "className">;

/** Root stepper component that manages step state */
export function Stepper({
  value,
  defaultValue = 0,
  onValueChange,
  size = "base",
  className,
  children,
  ...rest
}: StepperProps) {
  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState(defaultValue);

  // Determine if controlled
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // Handle step click - toggles step completion
  // If step is not completed: complete it (value = stepValue + 1)
  // If step is completed: toggle it off (value = stepValue, making it current)
  const handleStepClick = (stepValue: number) => {
    const isCompleted = stepValue < currentValue;
    const newValue = isCompleted ? stepValue : stepValue + 1;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  // Get step children
  const childArray = Children.toArray(children).filter(isValidElement);
  const totalSteps = childArray.length;

  // Calculate progress percentage (0 to 100)
  // Progress only extends to the last COMPLETED step (not the current one)
  // So if currentValue is 1, step 0 is completed but line doesn't extend to step 1
  const progressPercent =
    totalSteps > 1 && currentValue > 0
      ? ((currentValue - 1) / (totalSteps - 1)) * 100
      : 0;

  return (
    <StepperContext.Provider
      value={{
        value: currentValue,
        size,
        onStepClick: handleStepClick,
      }}
    >
      <nav
        aria-label="Progress steps"
        className={cn(stepperRootVariants({ size }), className)}
        data-slot="stepper"
        {...rest}
      >
        {/* Track line (grey background) - sits behind circles */}
        <div className={stepperTrackVariants({ size })}>
          {/* Progress fill (green) - animates based on completion */}
          <motion.div
            animate={{ width: `${progressPercent}%` }}
            className="absolute inset-y-0 left-0 bg-affirmative-accent"
            initial={{ width: "0%" }}
            transition={springs.subtle}
          />
        </div>

        {/* Step circles - positioned on top with z-index */}
        {childArray}
      </nav>
    </StepperContext.Provider>
  );
}
