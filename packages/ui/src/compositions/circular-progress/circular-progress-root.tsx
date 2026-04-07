"use client";

import { springs } from "@patternmode/motion";
import { cn } from "@patternmode/ui/utils/cn";
import { motion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import type { ComponentSize } from "../../lib/size";

/**
 * Maps ComponentSize to pixel dimensions (matches Button heights).
 * This ensures CircularProgress matches Button size at the same scale.
 */
const SIZE_TO_PX: Record<ComponentSize, number> = {
  "2xs": 24, // h-6
  xs: 28, // h-7
  sm: 32, // h-8
  base: 36, // h-9
  lg: 40, // h-10
  xl: 44, // h-11
  "2xl": 48, // h-12
  "3xl": 56, // h-14
};

/**
 * Maps ComponentSize to stroke width.
 * Stroke width is roughly size/6.4, rounded for visual balance.
 */
const SIZE_TO_STROKE: Record<ComponentSize, number> = {
  "2xs": 4, // 24 / 6 = 4
  xs: 4, // 28 / 7 = 4
  sm: 5, // 32 / 6.4 = 5
  base: 5, // 36 / 7.2 = 5
  lg: 6, // 40 / 6.7 = 6
  xl: 6, // 44 / 7.3 = 6
  "2xl": 7, // 48 / 6.9 = 7
  "3xl": 8, // 56 / 7 = 8
};

interface CircularProgressProps {
  /** Additional CSS classes */
  className?: string;
  /** Size using shared component size scale (matches Button heights) */
  size?: ComponentSize;
  /** Progress value from 0-100 */
  value: number;
}

/**
 * Circular progress indicator component.
 * Uses shared ComponentSize scale for consistent sizing with Button and other components.
 * Progress animation uses spring physics from @patternmode/motion.
 *
 * @example
 * ```tsx
 * // Basic usage (defaults to size="base")
 * <CircularProgress value={60} />
 *
 * // Match Button size
 * <CircularProgress value={75} size="sm" />
 *
 * // Larger size
 * <CircularProgress value={50} size="lg" />
 * ```
 */
export function CircularProgress({
  value,
  size = "base",
  className,
}: CircularProgressProps) {
  const sizePx = SIZE_TO_PX[size];
  const strokeWidth = SIZE_TO_STROKE[size];
  const radius = (sizePx - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Spring-animated progress value using subtle spring from @patternmode/motion
  const springValue = useSpring(0, {
    stiffness: springs.subtle.stiffness,
    damping: springs.subtle.damping,
    mass: springs.subtle.mass,
  });

  // Transform spring value to stroke offset
  const strokeDashoffset = useTransform(
    springValue,
    (v) => circumference - (v / 100) * circumference,
  );

  // Update spring target when value changes
  useEffect(() => {
    springValue.set(value);
  }, [springValue, value]);

  return (
    <svg
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={value}
      className={cn("shrink-0 rotate-[-90deg]", className)}
      height={sizePx}
      role="progressbar"
      viewBox={`0 0 ${sizePx} ${sizePx}`}
      width={sizePx}
    >
      {/* Background track */}
      <circle
        className="stroke-current opacity-30"
        cx={sizePx / 2}
        cy={sizePx / 2}
        fill="transparent"
        r={radius}
        strokeWidth={strokeWidth}
      />
      {/* Animated progress arc */}
      <motion.circle
        className="stroke-current"
        cx={sizePx / 2}
        cy={sizePx / 2}
        fill="transparent"
        r={radius}
        strokeDasharray={circumference}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        style={{ strokeDashoffset }}
      />
    </svg>
  );
}

export type { CircularProgressProps };
