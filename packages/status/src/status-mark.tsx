"use client";

import { usePrefersReducedMotion } from "@howells/motion/react";
import { getSizeVariableStyle, joinClassNames } from "@patternmode/system";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

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
/*
 * Known-zero progress is outlined in the mark's own colour, at a lighter weight
 * than a full border ring so it reads as an empty outline rather than a closed
 * one. The radius keeps its outer edge on the same circle as every other state.
 */
const EMPTY_STATUS_MARK_STROKE_WIDTH = 1.2;
const EMPTY_STATUS_MARK_RADIUS = BORDERLESS_STATUS_MARK_RADIUS - EMPTY_STATUS_MARK_STROKE_WIDTH / 2;
const STATUS_MARK_CENTER = 12;
const STATUS_MARK_START_ANGLE = -90;
const STATUS_MARK_FULL_PROGRESS = 100;
const STATUS_SNAP_DURATION_MS = 160;
const STATUS_SMOOTH_DURATION_MS = 280;

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
  size,
  style,
  trackColor,
}: Pick<StatusMarkProps, "color" | "size" | "style" | "trackColor">) => {
  const rootStyle: StatusMarkStyle = {
    ...(size === undefined ? null : getSizeVariableStyle(size, "--patternmode-status-size")),
    ...style,
  };

  if (color !== undefined && color !== "") {
    rootStyle["--patternmode-status-color"] = color;
  }

  if (trackColor !== undefined && trackColor !== "") {
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
  const pathRef = useRef<SVGPathElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const renderedProgressRef = useRef<number>(progress);
  const [settledPath, setSettledPath] = useState(() => getFillPath(progress, radius));

  useEffect(() => {
    const cancelFillAnimation = () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
    const writePath = (value: number) => {
      const nextPath = getFillPath(value, radius);
      pathRef.current?.setAttribute("d", nextPath);
      return nextPath;
    };
    const duration = getFillMotionDuration(motion, hasReducedMotion);
    const startProgress = renderedProgressRef.current;
    const progressDelta = progress - startProgress;

    cancelFillAnimation();

    if (duration === 0 || progressDelta === 0) {
      renderedProgressRef.current = progress;
      setSettledPath(writePath(progress));
      return cancelFillAnimation;
    }

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min((now - startTime) / duration, 1);
      const nextProgress = startProgress + progressDelta * easeFillProgress(elapsed);

      renderedProgressRef.current = nextProgress;
      const nextPath = writePath(nextProgress);

      if (elapsed < 1) {
        animationFrameRef.current = requestAnimationFrame(tick);
        return;
      }

      renderedProgressRef.current = progress;
      animationFrameRef.current = null;
      setSettledPath(nextPath);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return cancelFillAnimation;
  }, [hasReducedMotion, motion, progress, radius]);

  return (
    <path
      className="patternmode-status-mark__fill-sweep"
      d={settledPath}
      data-slot="status-mark-fill-sweep"
      ref={pathRef}
    />
  );
};

const StatusArc = ({
  hasReducedMotion,
  progress,
}: {
  hasReducedMotion: boolean;
  progress: StatusMarkProgressValue;
}) => (
  <circle
    className="patternmode-status-mark__arc"
    cx="12"
    cy="12"
    pathLength={1}
    r="8"
    style={{
      opacity: progress > 0 ? 1 : 0,
      strokeDasharray: "1",
      strokeDashoffset: 1 - progress / 100,
      ...(hasReducedMotion ? { transition: "none" } : null),
    }}
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
        data-slot="status-mark-null"
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
              data-slot="status-mark-fill"
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
        {variant === "border" && state.progress > 0 ? (
          <circle
            className="patternmode-status-mark__track"
            cx="12"
            cy="12"
            data-slot="status-mark-border"
            r={STATUS_MARK_RADIUS}
          />
        ) : null}
        {variant === "border" ? (
          <StatusArc hasReducedMotion={hasReducedMotion} progress={state.progress} />
        ) : null}
        {state.progress === 0 ? (
          <circle
            className="patternmode-status-mark__empty"
            cx="12"
            cy="12"
            data-slot="status-mark-empty"
            r={EMPTY_STATUS_MARK_RADIUS}
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
  size,
  status,
  style,
  tone = "neutral",
  trackColor,
  value,
  variant = "fill",
  ...props
}: StatusMarkProps) => {
  const hasReducedMotion = usePrefersReducedMotion();
  const state = resolveStatusProgress({ status, value });
  const rootStyle = getRootStyle({ color, size, style, trackColor });
  const hasLabel = label !== undefined && label !== "";

  return (
    <span
      {...props}
      aria-hidden={hasLabel ? undefined : true}
      aria-label={label}
      className={joinClassNames("patternmode-status-mark", className)}
      data-motion={motion === false ? "false" : motion}
      data-progress={state.progress ?? "null"}
      data-slot="status-mark"
      data-status={state.status}
      data-tone={tone}
      data-variant={variant}
      role={hasLabel ? "img" : undefined}
      style={rootStyle}
    >
      <StatusMarkSvg
        hasReducedMotion={hasReducedMotion}
        motion={motion}
        state={state}
        variant={variant}
      />
    </span>
  );
};
