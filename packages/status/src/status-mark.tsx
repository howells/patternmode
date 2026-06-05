"use client";

import { getSizeVariableStyle, joinClassNames } from "@patternmode/system";
import { useEffect, useReducer, useRef } from "react";
import type { CSSProperties } from "react";
import { domMax, LazyMotion, m, useReducedMotion } from "motion/react";
import type { Transition } from "motion/react";

import { resolveStatusProgress } from "./status-mark-types";
import type {
  ResolvedStatusProgress,
  StatusMarkMotion,
  StatusMarkProgressValue,
  StatusMarkProps,
} from "./status-mark-types";

type StatusMarkStyle = CSSProperties & Record<`--${string}`, string | number | undefined>;
interface MotionPartProps {
  hasReducedMotion: boolean;
  motion: StatusMarkMotion;
}

const STATUS_MARK_RADIUS = 8;
const STATUS_MARK_STROKE_WIDTH = 1.8;
const BORDERLESS_STATUS_MARK_RADIUS = STATUS_MARK_RADIUS + STATUS_MARK_STROKE_WIDTH / 2;
const STATUS_MARK_CENTER = 12;
const STATUS_MARK_START_ANGLE = -90;
const STATUS_MARK_FULL_PROGRESS = 100;
const STATUS_SNAP_DURATION_MS = 160;
const STATUS_SMOOTH_DURATION_MS = 280;

const getTransition = (motion: StatusMarkMotion, reducedMotion: boolean): Transition => {
  if (motion === false || motion === "reduced" || reducedMotion) {
    return { duration: 0.01 };
  }

  if (motion === "snap") {
    return { duration: 0.16, ease: [0.22, 1, 0.36, 1] as const };
  }

  return { duration: 0.28, ease: [0.4, 0, 0.2, 1] as const };
};

const getFillMotionDuration = (motion: StatusMarkMotion, reducedMotion: boolean) => {
  if (motion === false || motion === "reduced" || reducedMotion) {
    return 0;
  }

  return motion === "snap" ? STATUS_SNAP_DURATION_MS : STATUS_SMOOTH_DURATION_MS;
};

const easeFillProgress = (progress: number) => {
  if (progress < 0.5) {
    return 4 * progress * progress * progress;
  }

  return 1 - (-2 * progress + 2) ** 3 / 2;
};

const setProgress = (_current: number, next: number) => next;

const getFillPath = (progress: number, radius: number) => {
  if (progress <= 0) {
    return `M${STATUS_MARK_CENTER} ${STATUS_MARK_CENTER}`;
  }

  if (progress >= 99.9) {
    const diameter = radius * 2;

    return [
      `M${STATUS_MARK_CENTER - radius} ${STATUS_MARK_CENTER}`,
      `a${radius} ${radius} 0 1 0 ${diameter} 0`,
      `a${radius} ${radius} 0 1 0 -${diameter} 0`,
    ].join(" ");
  }

  const endAngle = STATUS_MARK_START_ANGLE + (360 * progress) / STATUS_MARK_FULL_PROGRESS;
  const radians = (endAngle * Math.PI) / 180;
  const x = Number((STATUS_MARK_CENTER + radius * Math.cos(radians)).toFixed(3));
  const y = Number((STATUS_MARK_CENTER + radius * Math.sin(radians)).toFixed(3));
  const largeArcFlag = progress > 50 ? 1 : 0;

  return [
    `M${STATUS_MARK_CENTER} ${STATUS_MARK_CENTER}`,
    `L${STATUS_MARK_CENTER} ${STATUS_MARK_CENTER - radius}`,
    `A${radius} ${radius} 0 ${largeArcFlag} 1 ${x} ${y}`,
    "Z",
  ].join(" ");
};

const getRootStyle = ({
  color,
  size = "base",
  style,
  trackColor,
}: Pick<StatusMarkProps, "color" | "size" | "style" | "trackColor">) => {
  const rootStyle: StatusMarkStyle = {
    ...getSizeVariableStyle(size, "--patternmode-status-size"),
    ...style,
  };

  if (color) {
    rootStyle["--patternmode-status-color"] = color;
  }

  if (trackColor) {
    rootStyle["--patternmode-status-track"] = trackColor;
  }

  return rootStyle;
};

const StatusFillSweep = ({
  hasReducedMotion,
  motion,
  progress,
  radius,
}: MotionPartProps & { progress: StatusMarkProgressValue; radius: number }) => {
  const animationFrameRef = useRef<number | null>(null);
  const renderedProgressRef = useRef<number>(progress);
  const [renderedProgress, setRenderedProgress] = useReducer(setProgress, progress);

  useEffect(() => {
    const duration = getFillMotionDuration(motion, hasReducedMotion);
    const startProgress = renderedProgressRef.current;
    const progressDelta = progress - startProgress;

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (duration === 0 || progressDelta === 0) {
      renderedProgressRef.current = progress;
      setRenderedProgress(progress);
      return;
    }

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min((now - startTime) / duration, 1);
      const nextProgress = startProgress + progressDelta * easeFillProgress(elapsed);

      renderedProgressRef.current = nextProgress;
      setRenderedProgress(nextProgress);

      if (elapsed < 1) {
        animationFrameRef.current = requestAnimationFrame(tick);
        return;
      }

      renderedProgressRef.current = progress;
      animationFrameRef.current = null;
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [hasReducedMotion, motion, progress]);

  return (
    <path
      className="patternmode-status-mark__fill-sweep"
      d={getFillPath(renderedProgress, radius)}
      data-testid="status-mark-fill-sweep"
    />
  );
};

const StatusArc = ({
  hasReducedMotion,
  motion,
  progress,
}: MotionPartProps & { progress: StatusMarkProgressValue }) => (
  <m.circle
    animate={{ opacity: progress > 0 ? 1 : 0, pathLength: progress / 100 }}
    className="patternmode-status-mark__arc"
    cx="12"
    cy="12"
    initial={false}
    pathLength="1"
    r="8"
    transition={getTransition(motion, hasReducedMotion)}
  />
);

const StatusMarkSvg = ({
  hasReducedMotion,
  motion,
  state,
  variant,
}: MotionPartProps & {
  state: ResolvedStatusProgress;
  variant: NonNullable<StatusMarkProps["variant"]>;
}) => (
  <svg aria-hidden="true" className="patternmode-status-mark__svg" fill="none" viewBox="0 0 24 24">
    {state.status === "null" ? (
      <circle
        className="patternmode-status-mark__track patternmode-status-mark__track--null"
        cx="12"
        cy="12"
        data-testid="status-mark-null"
        r={STATUS_MARK_RADIUS}
      />
    ) : (
      <>
        {variant === "fill" ? (
          <>
            <circle
              className="patternmode-status-mark__disc"
              cx="12"
              cy="12"
              data-testid="status-mark-fill"
              r={BORDERLESS_STATUS_MARK_RADIUS}
            />
            <StatusFillSweep
              hasReducedMotion={hasReducedMotion}
              motion={motion}
              progress={state.progress}
              radius={BORDERLESS_STATUS_MARK_RADIUS}
            />
          </>
        ) : null}
        {variant === "border" ? (
          <circle
            className="patternmode-status-mark__track"
            cx="12"
            cy="12"
            data-testid="status-mark-border"
            r={STATUS_MARK_RADIUS}
          />
        ) : null}
        {variant === "border" ? (
          <StatusArc
            hasReducedMotion={hasReducedMotion}
            motion={motion}
            progress={state.progress}
          />
        ) : null}
      </>
    )}
  </svg>
);

export const StatusMark = ({
  className,
  color,
  label,
  motion = "smooth",
  size = "base",
  status,
  style,
  tone = "neutral",
  trackColor,
  value,
  variant = "fill",
  ...props
}: StatusMarkProps) => {
  const reducedMotion = useReducedMotion();
  const hasReducedMotion = Boolean(reducedMotion);
  const state = resolveStatusProgress({ status, value });
  const rootStyle = getRootStyle({ color, size, style, trackColor });

  return (
    <span
      {...props}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={joinClassNames("patternmode-status-mark", className)}
      data-motion={motion === false ? "false" : motion}
      data-progress={state.progress ?? "null"}
      data-slot="status-mark"
      data-status={state.status}
      data-tone={tone}
      data-variant={variant}
      role={label ? "img" : undefined}
      style={rootStyle}
    >
      <LazyMotion features={domMax}>
        <StatusMarkSvg
          hasReducedMotion={hasReducedMotion}
          motion={motion}
          state={state}
          variant={variant}
        />
      </LazyMotion>
    </span>
  );
};
