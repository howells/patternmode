"use client";

import { getColorClasses } from "@patternmode/constants/variants";
import { Dot } from "@patternmode/dot";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";
import type {
  ProgressStep,
  ProgressStepState,
  ProgressStepsProps,
} from "./types";
import {
  descriptionVariants,
  progressStepsVariants,
  stepItemVariants,
  titleVariants,
} from "./variants";

const dotVariantMap: Record<
  ProgressStepState,
  "success" | "error" | "default" | "neutral"
> = {
  complete: "success",
  error: "error",
  active: "default",
  inactive: "neutral",
};
const stateToDotVariant = (state: ProgressStepState) => dotVariantMap[state];

function resolveStates(
  steps: ProgressStep[],
  current?: number
): ProgressStepState[] {
  return steps.map((step, idx) => {
    if (step.state) return step.state;
    if (typeof current === "number") {
      if (idx < current) return "complete";
      if (idx === current) return "active";
      return "inactive";
    }
    return "inactive";
  });
}

const ProgressSteps = ({
  ref,
  orientation = "vertical",
  current,
  steps,
  className,
  "aria-label": ariaLabel = "Progress steps",
  ...props
}: ProgressStepsProps & { ref?: React.RefObject<HTMLOListElement | null> }) => {
  const states = resolveStates(steps, current);

  if (orientation === "vertical") {
    return (
      <ol
        aria-label={ariaLabel}
        className={cx(progressStepsVariants({ orientation }), className)}
        data-testid="progress-steps"
        ref={ref}
        {...props}
      >
        {steps.map((step, idx) => {
          const state = states[idx];
          const isLast = idx === steps.length - 1;
          const connectorColor =
            state === "complete"
              ? cx(getColorClasses("success").bgSolid)
              : "bg-zinc-200 dark:bg-zinc-800";

          return (
            <li className="min-w-0" key={idx}>
              <div className={stepItemVariants({ orientation, state })}>
                {/* Dot and connector */}
                <div className="flex w-6 flex-col items-center">
                  <Dot
                    aria-hidden
                    size="default"
                    variant={stateToDotVariant(state)}
                  />
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className={cx("mt-2 h-full w-px", connectorColor)}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 py-0.5">
                  <div className={titleVariants()}>
                    <span
                      aria-current={state === "active" ? "step" : undefined}
                      className={cx(
                        state === "active" && "text-blue-700 dark:text-blue-300"
                      )}
                    >
                      {step.title}
                    </span>
                    <span className="sr-only">
                      {state === "complete"
                        ? " – completed"
                        : state === "active"
                          ? " – current step"
                          : state === "error"
                            ? " – error"
                            : ""}
                    </span>
                  </div>
                  {step.description ? (
                    <div className={descriptionVariants()}>
                      {step.description}
                    </div>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    );
  }

  // Horizontal
  return (
    <ol
      aria-label={ariaLabel}
      className={cx(progressStepsVariants({ orientation }), className)}
      data-testid="progress-steps"
      ref={ref}
      {...props}
    >
      {steps.map((step, idx) => {
        const state = states[idx];
        const isLast = idx === steps.length - 1;
        const connectorColor =
          state === "complete"
            ? cx(getColorClasses("success").bgSolid)
            : "bg-zinc-200 dark:bg-zinc-800";

        return (
          <>
            <li className={stepItemVariants({ orientation, state })}>
              <Dot
                aria-hidden
                size="default"
                variant={stateToDotVariant(state)}
              />
              <div className="mt-1 min-w-0">
                <div className={titleVariants()}>
                  <span
                    aria-current={state === "active" ? "step" : undefined}
                    className={cx(
                      state === "active" && "text-blue-700 dark:text-blue-300"
                    )}
                  >
                    {step.title}
                  </span>
                  <span className="sr-only">
                    {state === "complete"
                      ? " – completed"
                      : state === "active"
                        ? " – current step"
                        : state === "error"
                          ? " – error"
                          : ""}
                  </span>
                </div>
                {step.description ? (
                  <div className={descriptionVariants()}>
                    {step.description}
                  </div>
                ) : null}
              </div>
            </li>
            {!isLast && (
              <li
                aria-hidden="true"
                className={cx("mx-2 mt-2 h-px flex-1", connectorColor)}
                role="presentation"
              />
            )}
          </>
        );
      })}
    </ol>
  );
};

ProgressSteps.displayName = "ProgressSteps";

export { ProgressSteps };
