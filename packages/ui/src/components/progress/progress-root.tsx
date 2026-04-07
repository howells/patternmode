"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Indicator, Root } from "@radix-ui/react-progress";
import type * as React from "react";

type ProgressSize = "xs" | "sm" | "base";

const PROGRESS_SIZE_CLASSES: Record<ProgressSize, string> = {
  xs: "h-1",
  sm: "h-1.5",
  base: "h-2",
};

/** Props for the linear Progress bar component. */
type ProgressProps = React.ComponentProps<typeof Root> & {
  /** Height variant. "xs" for player bars, "sm" for compact, "base" (default) for standard. */
  size?: ProgressSize;
};

/** Props for the circular ProgressCircle component. */
interface ProgressCircleProps {
  /** Content to render in the center of the circle (e.g., percentage text). */
  children?: React.ReactNode;
  /** Additional CSS classes for the container. */
  className?: string;
  /** Additional CSS classes for the progress indicator arc. */
  indicatorClassName?: string;
  /** Accessible label describing what the progress represents. */
  label: string;
  /** Maximum value for the progress. Default 100. */
  max?: number;
  /** Diameter of the circle in pixels. Default 44. */
  size?: number;
  /** Width of the progress stroke in pixels. Default 3. */
  strokeWidth?: number;
  /** Additional CSS classes for the background track circle. */
  trackClassName?: string;
  /** Current progress value (0 to max). */
  value: number;
  /** Custom formatter for the title tooltip text. */
  valueFormatter?: (value: number, max: number) => string;
}

/**
 * Linear progress bar with configurable height.
 * Built on Radix UI primitives for accessible behavior.
 *
 * @example
 * ```tsx
 * <Progress value={65} />
 * <Progress value={30} size="xs" />
 * ```
 */
function Progress({
  className,
  value,
  size = "base",
  ...props
}: ProgressProps) {
  return (
    <Root
      className={cn(
        "relative block w-full overflow-hidden rounded-full bg-muted",
        PROGRESS_SIZE_CLASSES[size],
        className,
      )}
      data-component="progress"
      data-slot="progress"
      value={value}
      {...props}
    >
      <Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        data-component="progress-indicator"
        data-slot="progress-indicator"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </Root>
  );
}

function clamp(value: number, min: number, max: number) {
  if (Number.isNaN(value)) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
}

/**
 * Circular progress indicator rendered as an SVG ring.
 * Supports custom sizes, stroke widths, and center content.
 *
 * @example
 * ```tsx
 * <ProgressCircle label="Upload progress" value={75} />
 * <ProgressCircle label="Score" value={8} max={10} size={64} strokeWidth={4}>
 *   <Text size="xs">80%</Text>
 * </ProgressCircle>
 * ```
 */
function ProgressCircle({
  label,
  value,
  max = 100,
  size = 44,
  strokeWidth = 3,
  className,
  indicatorClassName,
  trackClassName,
  valueFormatter = (currentValue, currentMax) =>
    `${Math.round((currentValue / currentMax) * 100)}%`,
  children,
}: ProgressCircleProps) {
  const safeMax = Math.max(1, max);
  const safeValue = clamp(value, 0, safeMax);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = safeValue / safeMax;
  const dashOffset = circumference * (1 - progress);

  return (
    <div
      aria-label={label}
      aria-valuemax={safeMax}
      aria-valuemin={0}
      aria-valuenow={safeValue}
      className={cn(
        "relative inline-flex items-center justify-center",
        className,
      )}
      data-component="progress-circle"
      data-slot="progress-circle"
      role="progressbar"
      title={valueFormatter(safeValue, safeMax)}
    >
      <svg
        aria-hidden="true"
        className="-rotate-90"
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        width={size}
      >
        <circle
          className={cn("fill-none stroke-muted", trackClassName)}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className={cn(
            "fill-none stroke-primary transition-[stroke-dashoffset]",
            indicatorClassName,
          )}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </svg>

      {children ? (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export { Progress, ProgressCircle };
