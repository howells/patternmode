"use client";

import { springs } from "@patternmode/motion";
import { cn } from "@patternmode/ui/utils/cn";
import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import type * as React from "react";
import { Icon } from "../../components/icon";
import { useStepperContext } from "./stepper-context";
import {
  type StepState,
  stepperCircleContainerVariants,
  stepperCircleVariants,
  stepperIconVariants,
  stepperLabelVariants,
} from "./stepper-variants";

export type StepperItemProps = {
  /** Step index (required, determines order and completion) */
  value: number;
  /** Label text below the step (optional) */
  label?: string;
  /** Whether this step is disabled */
  disabled?: boolean;
  /** Custom icon - defaults to Check */
  icon?: LucideIcon;
  /** Additional className */
  className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "className">;

/** Individual step in the stepper */
export function StepperItem({
  value,
  label,
  disabled = false,
  icon = Check,
  className,
  ...rest
}: StepperItemProps) {
  const { value: currentValue, size, onStepClick } = useStepperContext();

  // Derive state from current value
  const getState = (): StepState => {
    if (disabled) {
      return "disabled";
    }
    if (value < currentValue) {
      return "completed";
    }
    if (value === currentValue) {
      return "current";
    }
    return "upcoming";
  };

  const state = getState();
  const isInteractive = !disabled;

  const handleClick = () => {
    if (isInteractive) {
      onStepClick(value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isInteractive && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onStepClick(value);
    }
  };

  // Map size to icon size (two levels smaller than component size)
  const sizeToIconSize = { sm: "3xs", base: "2xs", lg: "xs" } as const;
  const iconSize = sizeToIconSize[size];

  // Circle sizes in pixels for animation
  const circleSizes = {
    sm: { completed: 20, default: 28 }, // size-5, size-7
    base: { completed: 24, default: 36 }, // size-6, size-9
    lg: { completed: 32, default: 44 }, // size-8, size-11
  };
  const circleSize =
    state === "completed"
      ? circleSizes[size].completed
      : circleSizes[size].default;

  return (
    <div
      className={cn("relative", className)}
      data-slot="stepper-item"
      data-state={state}
      {...rest}
    >
      {/* Fixed-height container keeps circles vertically aligned across states */}
      <div className={stepperCircleContainerVariants({ size })}>
        <motion.button
          animate={{ width: circleSize, height: circleSize }}
          aria-current={state === "current" ? "step" : undefined}
          aria-label={label ? `Step: ${label}` : `Step ${value + 1}`}
          className={cn(
            stepperCircleVariants({ size, state }),
            isInteractive && "cursor-pointer",
            !isInteractive && "cursor-default",
          )}
          disabled={disabled}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          transition={springs.subtle}
          type="button"
        >
          <Icon
            className={stepperIconVariants({ size, state })}
            icon={icon}
            size={iconSize}
          />
        </motion.button>
      </div>
      {/* Label absolutely positioned to not affect flex layout spacing */}
      {label && (
        <span className={stepperLabelVariants({ size, state })}>{label}</span>
      )}
    </div>
  );
}
