"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { motion } from "motion/react";
import { Spinner } from "../../components/spinner";

function dotSize(isActive: boolean, isHovered: boolean): number {
  if (isActive) {
    return 16;
  }
  if (isHovered) {
    return 14;
  }
  return 12;
}

interface VariantStyles {
  dot: { active: React.CSSProperties; inactive: React.CSSProperties };
  focusRing: string;
  ring: { active: React.CSSProperties; inactive: React.CSSProperties };
}

const SPRING_TRANSITION = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
};

const VARIANT_STYLES: Record<"neutral" | "blue", VariantStyles> = {
  neutral: {
    ring: {
      active: {
        backgroundColor: "rgba(0, 0, 0, 0.15)",
        border: "1.5px solid rgba(0, 0, 0, 0.4)",
      },
      inactive: {
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        border: "1.5px solid rgba(255, 255, 255, 0.6)",
      },
    },
    dot: {
      active: {
        backgroundColor: "#111",
        boxShadow: "0 0 0 1.5px #fff, 0 2px 10px rgba(0,0,0,0.35)",
      },
      inactive: {
        backgroundColor: "#fff",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.3)",
      },
    },
    focusRing:
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2",
  },
  blue: {
    ring: {
      active: {
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        border: "1.5px solid rgba(59, 130, 246, 0.6)",
      },
      inactive: {
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        border: "1.5px solid rgba(59, 130, 246, 0.4)",
      },
    },
    dot: {
      active: {
        backgroundColor: "#3b82f6",
        boxShadow: "0 0 0 1.5px #fff, 0 2px 10px rgba(59, 130, 246, 0.45)",
      },
      inactive: {
        backgroundColor: "#60a5fa",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.8), 0 2px 8px rgba(59, 130, 246, 0.35)",
      },
    },
    focusRing:
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
  },
};

function ringAnimate(isHovered: boolean, isActive: boolean) {
  if (isHovered && !isActive) {
    return { width: 32, height: 32, opacity: 1, scale: [1, 1.25, 1] };
  }
  const isHighlighted = isHovered || isActive;
  return {
    width: isHighlighted ? 32 : 0,
    height: isHighlighted ? 32 : 0,
    opacity: isHighlighted ? 1 : 0,
    scale: 1,
  };
}

const PULSE_TRANSITION = {
  scale: {
    duration: 1.2,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut" as const,
  },
  default: SPRING_TRANSITION,
};

function ringTransition(isHovered: boolean, isActive: boolean) {
  return isHovered && !isActive ? PULSE_TRANSITION : SPRING_TRANSITION;
}

export interface HotspotIndicatorProps {
  /** Horizontal position as a percentage (0-100). */
  centerX: number;
  /** Vertical position as a percentage (0-100). */
  centerY: number;
  /** Additional class names for the button element. */
  className?: string;
  /** Whether interaction is disabled (e.g. during processing). */
  disabled?: boolean;
  /** Custom focus ring classes. Defaults to gray ring for neutral, blue for blue variant. */
  focusRingClass?: string;
  /** Whether this hotspot is the currently selected/active one. */
  isActive?: boolean;
  /** Whether this hotspot is being hovered. */
  isHovered?: boolean;
  /** Accessible label for the hotspot button. */
  label?: string;
  /** Called when the hotspot is clicked. */
  onClick?: () => void;
  /** Called when the mouse enters the hotspot. */
  onMouseEnter?: () => void;
  /** Called when the mouse leaves the hotspot. */
  onMouseLeave?: () => void;
  /** Show a loading spinner overlay on the dot. */
  showSpinner?: boolean;
  /** Color variant: "neutral" for white/dark dots, "blue" for blue dots. */
  variant?: "neutral" | "blue";
}

/**
 * Animated hotspot dot indicator with outer ring and inner dot.
 * Used to mark patternmodel locations on images.
 */
export function HotspotIndicator({
  centerX,
  centerY,
  isActive = false,
  isHovered = false,
  variant = "neutral",
  label,
  onClick,
  onMouseEnter,
  onMouseLeave,
  disabled = false,
  showSpinner = false,
  focusRingClass,
  className,
}: HotspotIndicatorProps) {
  const size = dotSize(isActive, isHovered);
  const styles = VARIANT_STYLES[variant];
  const stateKey = isActive ? "active" : "inactive";

  return (
    <>
      <button
        aria-label={label}
        className={cn(
          "pointer-events-auto absolute z-10 -translate-x-1/2 -translate-y-1/2",
          focusRingClass ?? styles.focusRing,
          disabled && "cursor-not-allowed",
          className,
        )}
        disabled={disabled}
        onClick={
          onClick
            ? (e) => {
                e.stopPropagation();
                onClick();
              }
            : undefined
        }
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ left: `${centerX}%`, top: `${centerY}%` }}
        type="button"
      >
        <motion.div
          animate={ringAnimate(isHovered, isActive)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          initial={false}
          style={styles.ring[stateKey]}
          transition={ringTransition(isHovered, isActive)}
        />

        <motion.div
          animate={{ width: size, height: size }}
          className="relative rounded-full"
          initial={false}
          style={styles.dot[stateKey]}
          transition={SPRING_TRANSITION}
        />
      </button>

      {showSpinner && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${centerX}%`, top: `${centerY}%` }}
        >
          <Spinner size="xs" />
        </div>
      )}
    </>
  );
}
