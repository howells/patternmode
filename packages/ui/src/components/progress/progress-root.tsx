"use client";

import { Indicator, Root } from "@radix-ui/react-progress";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "../../utils/cn";

function Progress({
  className,
  value = 0,
  ...props
}: ComponentPropsWithoutRef<typeof Root>) {
  return (
    <Root
      className={cn(
        "relative h-2.5 w-full overflow-hidden rounded-full bg-secondary/90",
        className
      )}
      data-slot="progress"
      value={value}
      {...props}
    >
      <Indicator
        className="h-full w-full flex-1 bg-accent transition-transform duration-300 ease-[var(--ease-snappy)]"
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

interface ProgressCircleProps {
  children?: ReactNode;
  className?: string;
  indicatorClassName?: string;
  label: string;
  max?: number;
  size?: number;
  strokeWidth?: number;
  trackClassName?: string;
  value: number;
  valueFormatter?: (value: number, max: number) => string;
}

function ProgressCircle({
  children,
  className,
  indicatorClassName,
  label,
  max = 100,
  size = 52,
  strokeWidth = 4,
  trackClassName,
  value,
  valueFormatter = (currentValue, currentMax) =>
    `${Math.round((currentValue / currentMax) * 100)}%`,
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
        className
      )}
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
          className={cn("fill-none stroke-secondary", trackClassName)}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className={cn(
            "fill-none stroke-accent transition-[stroke-dashoffset] duration-300 ease-[var(--ease-snappy)]",
            indicatorClassName
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
