import { cx } from "@patternmode/utils/cx";
import {
  clampValue,
  defaultValueFormatter,
  getProgressPercentage,
} from "@patternmode/utils/progress";
import type React from "react";
import type { ProgressCircleProps } from "./types";
import { progressCircleVariants } from "./variants";

/**
 * Circular progress indicator for displaying completion status and loading states.
 */
const ProgressCircle = ({
  ref,
  value = 0,
  max = 100,
  radius = 32,
  strokeWidth = 6,
  showAnimation = true,
  variant = "default",
  size,
  className,
  children,
  label,
  showValue = false,
  valueFormatter,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  ...props
}: ProgressCircleProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const safeValue = value !== null ? clampValue(value, 0, max) : null;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percentage = getProgressPercentage(safeValue, max);
  const offset = circumference - (percentage / 100) * circumference;

  const formatValue = valueFormatter || defaultValueFormatter;
  const {
    root,
    svg,
    track,
    indicator,
    content,
    label: labelClass,
    value: valueClass,
  } = progressCircleVariants({ variant, showAnimation, size });

  // Determine effective size from size variant or radius
  const effectiveSize = size ? undefined : radius * 2;

  return (
    <div
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel || label || "Progress circle"}
      aria-valuemax={max}
      aria-valuemin={0}
      aria-valuenow={safeValue ?? undefined}
      className={cx(root(), className)}
      data-max={max}
      data-percentage={Math.round(percentage)}
      data-testid="progress-circle"
      data-value={safeValue}
      ref={ref}
      role="progressbar"
      style={
        effectiveSize
          ? { width: effectiveSize, height: effectiveSize }
          : undefined
      }
      {...props}
    >
      <svg
        aria-hidden="true"
        className={cx(svg(), "h-full w-full")}
        height={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        width={radius * 2}
      >
        <title>Progress visualization</title>
        {/* Background track */}
        <circle
          className={cx("stroke-zinc-200 dark:stroke-zinc-800", track())}
          cx={radius}
          cy={radius}
          fill="transparent"
          r={normalizedRadius}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        {/* Progress indicator */}
        {safeValue !== null && safeValue >= 0 && (
          <circle
            className={cx("stroke-blue-500 dark:stroke-blue-500", indicator())}
            cx={radius}
            cy={radius}
            fill="transparent"
            r={normalizedRadius}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
          />
        )}
      </svg>

      {/* Content area */}
      <div className={content()}>
        {children || (
          <div className="flex flex-col items-center justify-center text-center">
            {showValue && (
              <span className={valueClass()}>
                {formatValue(safeValue, max)}
              </span>
            )}
            {label && !showValue && (
              <span className={labelClass()}>{label}</span>
            )}
            {label && showValue && (
              <span className={cx(labelClass(), "mt-1 text-xs")}>{label}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

ProgressCircle.displayName = "ProgressCircle";

export { ProgressCircle };
