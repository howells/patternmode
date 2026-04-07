"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@patternmode/ui/components/tooltip";
import { springs } from "@patternmode/ui/lib/motion";
import { cn } from "@patternmode/ui/utils/cn";
import { motion } from "motion/react";

const DOT_SIZE = 6;
const EXPANDED_WIDTH = 20;

interface ProgressDotsProps {
  /** Additional CSS classes */
  className?: string;
  /** Current step (0-indexed) */
  current: number;
  /** Labels for each step (shown in tooltips) */
  labels?: string[];
  /** Callback when a dot is clicked. If provided, dots become clickable. */
  onDotClick?: (index: number) => void;
  /** Total number of steps */
  total: number;
}

/**
 * A progress indicator showing dots that expand based on completion status.
 * Completed steps and the current step are shown as expanded pills, while
 * pending steps remain as small dots.
 *
 * @param props - The progress dots props
 * @param props.current - Current step (0-indexed). Steps before this are shown as completed (expanded + green).
 * @param props.total - Total number of steps/dots to display.
 * @param props.className - Additional CSS classes to apply to the container.
 * @param props.onDotClick - Optional callback when a dot is clicked. Makes dots interactive.
 *
 * @example
 * ```tsx
 * // Non-interactive
 * <ProgressDots current={2} total={5} />
 *
 * // Interactive with navigation
 * <ProgressDots current={2} total={5} onDotClick={(i) => router.push(steps[i])} />
 * ```
 */
export function ProgressDots({
  current,
  total,
  className,
  labels,
  onDotClick,
}: ProgressDotsProps) {
  const isInteractive = Boolean(onDotClick);
  const dotKeys = Array.from(
    { length: total },
    (_, index) => `progress-dot-${index}`,
  );

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {dotKeys.map((dotKey, i) => {
        const isCurrent = i === current;
        const isCompleted = i < current;
        const isPending = i > current;
        const label = labels?.[i];

        const dot = (
          <motion.button
            animate={{
              width: isCompleted || isCurrent ? EXPANDED_WIDTH : DOT_SIZE,
            }}
            aria-current={isCurrent ? "step" : undefined}
            aria-label={label ?? `Step ${i + 1} of ${total}`}
            className={cn("h-1.5 rounded-full", {
              "bg-affirmative-accent": isCompleted,
              "bg-gray-300": isCurrent,
              "bg-muted": isPending,
              "pointer-events-auto cursor-pointer transition-opacity hover:opacity-80":
                isInteractive,
              "pointer-events-none": !isInteractive,
            })}
            onClick={() => onDotClick?.(i)}
            transition={springs.snappy}
            type="button"
          />
        );

        if (label) {
          return (
            <Tooltip key={dotKey}>
              <TooltipTrigger asChild>{dot}</TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={8}>
                {label}
              </TooltipContent>
            </Tooltip>
          );
        }

        return <span key={dotKey}>{dot}</span>;
      })}
    </div>
  );
}
