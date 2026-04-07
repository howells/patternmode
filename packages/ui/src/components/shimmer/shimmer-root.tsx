"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { motion } from "motion/react";
import { type CSSProperties, type ElementType, type JSX, useMemo } from "react";

/** Shimmer color variant configurations */
export type ShimmerVariant = "light" | "dark" | "inverted";

/** Color tokens for each variant using semantic design tokens */
const SHIMMER_COLORS: Record<
  ShimmerVariant,
  { base: string; highlight: string }
> = {
  light: {
    base: "var(--color-muted-foreground)",
    highlight: "var(--color-muted)",
  },
  dark: {
    // No semantic equivalent for gray-400, using raw token
    base: "var(--color-gray-400)",
    highlight: "var(--color-foreground)",
  },
  inverted: {
    // White text on dark backgrounds
    base: "rgba(255, 255, 255, 0.85)",
    highlight: "rgba(255, 255, 255, 1)",
  },
};

export interface ShimmerProps {
  /** HTML element or component to render as. Defaults to "span" */
  as?: ElementType;
  /** Text content to apply shimmer effect to */
  children: string;
  /** Additional CSS classes */
  className?: string;
  /** Animation duration in seconds. Defaults to 1.2 */
  duration?: number;
  /** Number of times to repeat the animation. Defaults to Infinity */
  repeat?: number;
  /** Delay between repeats in seconds. Defaults to 0 */
  repeatDelay?: number;
  /** Spread of shimmer gradient in pixels per character. Defaults to 2.5 */
  spread?: number;
  /** Color variant. Defaults to "light" */
  variant?: ShimmerVariant;
}

/**
 * Animated shimmer effect for text. Creates a gradient sweep animation.
 *
 * Variants:
 * - `"light"` (default): muted foreground → muted highlight (dark text on light bg)
 * - `"dark"`: gray-400 → foreground (darker sweep on light bg)
 * - `"inverted"`: white text on dark backgrounds
 *
 * @example
 * ```tsx
 * // Infinite shimmer (default)
 * <Shimmer>Loading...</Shimmer>
 *
 * // Limited repeats for thinking indicators
 * <Shimmer repeat={2} repeatDelay={0.25}>Analyzing data</Shimmer>
 *
 * // Inverted variant for dark backgrounds
 * <Shimmer variant="inverted">Processing</Shimmer>
 * ```
 */
export function Shimmer({
  children,
  as: Component = "span",
  className,
  duration = 1.2,
  spread = 2.5,
  repeat = Number.POSITIVE_INFINITY,
  repeatDelay = 0,
  variant = "light",
}: ShimmerProps) {
  const MotionComponent = motion.create(
    Component as keyof JSX.IntrinsicElements,
  );

  const colors = SHIMMER_COLORS[variant];

  const dynamicSpread = useMemo(
    () => (children?.length ?? 0) * spread,
    [children, spread],
  );

  // Motion's repeat = additional plays after initial, so repeat - 1
  const motionRepeat =
    repeat === Number.POSITIVE_INFINITY ? repeat : Math.max(0, repeat - 1);

  return (
    <MotionComponent
      animate={{ backgroundPosition: "0% center" }}
      className={cn(
        "inline-block bg-[length:250%_100%] bg-clip-text text-transparent",
        className,
      )}
      initial={{ backgroundPosition: "100% center" }}
      style={
        {
          backgroundImage: `linear-gradient(90deg, transparent calc(50% - ${dynamicSpread}px), ${colors.highlight} 50%, transparent calc(50% + ${dynamicSpread}px)), linear-gradient(${colors.base}, ${colors.base})`,
          backgroundRepeat: "no-repeat, padding-box",
        } as CSSProperties
      }
      transition={{
        duration,
        ease: "linear",
        repeat: motionRepeat,
        repeatDelay,
      }}
    >
      {children}
    </MotionComponent>
  );
}
