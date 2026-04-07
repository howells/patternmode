"use client";

import {
  durations,
  type Easing,
  type EasingTuple,
  easings,
} from "@patternmode/motion";
import { cn } from "@patternmode/ui/utils/cn";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type * as React from "react";
import { ICON_SIZE_CLASS, type IconSize } from "../../components/icon";

/** Default animation timing for morph transitions */
const DEFAULT_TIMING = {
  enter: durations.normal,
  exit: durations.quick,
} as const;

/** Default easing for morph transitions */
const DEFAULT_EASING = {
  enter: easings.customGentle,
  exit: easings.customIn,
} as const;

/** Easing value: named preset from @patternmode/motion or a custom bezier tuple */
type EasingValue = Easing | EasingTuple;

/** Resolve named easing to tuple, or pass through if already a tuple */
function resolveEasing(value: EasingValue): EasingTuple {
  return typeof value === "string" ? easings[value] : value;
}

export interface IconMorphProps
  extends Omit<React.SVGProps<SVGSVGElement>, "strokeWidth"> {
  /** Duration for enter animation in seconds. Defaults to `durations.normal`. */
  enterDuration?: number;
  /** Easing for enter animation. Accepts named preset or bezier tuple. Defaults to `easings.customGentle`. */
  enterEasing?: EasingValue;
  /** Duration for exit animation in seconds. Defaults to `durations.quick`. */
  exitDuration?: number;
  /** Easing for exit animation. Accepts named preset or bezier tuple. Defaults to `easings.customIn`. */
  exitEasing?: EasingValue;
  /** Icon component from lucide-react or any SVG React component. */
  icon: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Unique key to trigger morph animation when icon changes. */
  morphKey: string;
  /** Size scale for icons. Defaults to `base` (20px). */
  size?: IconSize;
}

/**
 * Icon with blur-crossfade morph animation between icon changes.
 *
 * Drop-in replacement for Icon when you need animated transitions.
 * The icon stays in place while crossfading with a blur effect.
 *
 * @example
 * ```tsx
 * // Morph between icons based on state
 * <IconMorph
 *   icon={isPlaying ? Pause : Play}
 *   morphKey={isPlaying ? "pause" : "play"}
 * />
 *
 * // With size and color
 * <IconMorph
 *   icon={currentIcon}
 *   morphKey={currentStep}
 *   size="lg"
 *   className="text-muted-foreground"
 * />
 *
 * // With custom timing (named presets from @patternmode/motion)
 * <IconMorph
 *   icon={icon}
 *   morphKey={key}
 *   enterDuration={0.3}
 *   exitDuration={0.15}
 *   enterEasing="smooth"
 *   exitEasing="customOut"
 * />
 *
 * // With custom bezier tuple
 * <IconMorph
 *   icon={icon}
 *   morphKey={key}
 *   enterEasing={[0.25, 0.1, 0.25, 1]}
 * />
 * ```
 */
export function IconMorph({
  icon: IconComp,
  morphKey,
  size = "base",
  enterDuration = DEFAULT_TIMING.enter,
  exitDuration = DEFAULT_TIMING.exit,
  enterEasing = DEFAULT_EASING.enter,
  exitEasing = DEFAULT_EASING.exit,
  className,
  ...props
}: IconMorphProps) {
  const sizeClass = ICON_SIZE_CLASS[size];

  return (
    <div className={cn("relative shrink-0", sizeClass)}>
      <AnimatePresence mode="sync">
        <motion.div
          animate={{
            filter: "blur(0px)",
            scale: 1,
          }}
          className="absolute inset-0"
          exit={{
            filter: "blur(4px)",
            scale: 0.9,
            transition: {
              duration: exitDuration,
              ease: resolveEasing(exitEasing),
            },
          }}
          initial={{
            filter: "blur(4px)",
            scale: 1.1,
          }}
          key={morphKey}
          transition={{
            duration: enterDuration,
            ease: resolveEasing(enterEasing),
          }}
        >
          <IconComp
            aria-hidden
            className={cn("stroke-[1.5]", sizeClass, className)}
            data-component="icon-morph"
            focusable={false}
            {...props}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
