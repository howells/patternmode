"use client";

import { getSizeVariableStyle, joinClassNames } from "@patternmode/system";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { domMax, LazyMotion, m, useReducedMotion } from "motion/react";
import type { Transition } from "motion/react";

import { getStatusMarkState } from "./status-mark-types";
import type { StatusMarkMotion, StatusMarkProps, StatusMarkState } from "./status-mark-types";

type StatusMarkStyle = CSSProperties & Record<`--${string}`, string | number | undefined>;
interface MotionPartProps {
  hasReducedMotion: boolean;
  motion: StatusMarkMotion;
}
type VisibleMotionPartProps = MotionPartProps & {
  isVisible: boolean;
};
interface StatusMarkVisibility {
  showArc: boolean;
  showCheck: boolean;
  showDots: boolean;
  showNull: boolean;
  showPause: boolean;
  showQuestion: boolean;
  showSlash: boolean;
}

const STATUS_MARK_RADIUS = 8;
const STATUS_MARK_STROKE_WIDTH = 1.8;
const BORDERLESS_STATUS_MARK_RADIUS = STATUS_MARK_RADIUS + STATUS_MARK_STROKE_WIDTH / 2;
const STATUS_SYMBOL_TRANSFORM = "translate(12 12) scale(0.82) translate(-12 -12)";
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

const getSymbolTransition = (
  motion: StatusMarkMotion,
  reducedMotion: boolean,
  index = 0,
): Transition => {
  if (motion === false || motion === "reduced" || reducedMotion) {
    return { duration: 0.01 };
  }

  return {
    delay: index * 0.04,
    duration: motion === "snap" ? 0.14 : 0.2,
    ease: [0.22, 1, 0.36, 1] as const,
  };
};

const getScale = (visible: boolean, reduced: boolean) => {
  if (!visible) {
    return reduced ? 1 : 0.96;
  }
  return 1;
};

const getStatusMarkVisibility = (
  state: StatusMarkState,
  border: boolean,
  fill: boolean,
): StatusMarkVisibility => ({
  showArc: border && !fill && (state.progress > 0 || state.status === "complete"),
  showCheck: state.status === "complete",
  showDots: state.status === "pending",
  showNull: state.status === "null",
  showPause: state.status === "paused",
  showQuestion: state.status === "unknown",
  showSlash: state.status === "blocked" || state.status === "unavailable",
});

const getRootStyle = ({
  color,
  fillColor,
  size = "base",
  style,
  trackColor,
}: Pick<StatusMarkProps, "color" | "fillColor" | "size" | "style" | "trackColor">) => {
  const rootStyle: StatusMarkStyle = {
    ...getSizeVariableStyle(size, "--patternmode-status-size"),
    ...style,
  };

  if (color) {
    rootStyle["--patternmode-status-color"] = color;
  }

  if (fillColor) {
    rootStyle["--patternmode-status-fill"] = fillColor;
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
}: MotionPartProps & Pick<StatusMarkState, "progress"> & { radius: number }) => {
  const animationFrameRef = useRef<number | null>(null);
  const renderedProgressRef = useRef<number>(progress);
  const [renderedProgress, setRenderedProgress] = useState<number>(progress);

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
      setRenderedProgress(progress);
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
  isVisible,
  motion,
  progress,
}: VisibleMotionPartProps & Pick<StatusMarkState, "progress">) => (
  <m.circle
    animate={{ opacity: isVisible ? 1 : 0, pathLength: progress / 100 }}
    className="patternmode-status-mark__arc"
    cx="12"
    cy="12"
    initial={false}
    pathLength="1"
    r="8"
    transition={getTransition(motion, hasReducedMotion)}
  />
);

const StatusDots = ({ hasReducedMotion, isVisible, motion }: VisibleMotionPartProps) => (
  <m.g
    animate={{
      opacity: isVisible ? 1 : 0,
      scale: getScale(isVisible, hasReducedMotion),
    }}
    className="patternmode-status-mark__dots"
    data-testid="status-mark-dots"
    initial={false}
    transition={getSymbolTransition(motion, hasReducedMotion)}
  >
    {[8, 12, 16].map((cx, index) => (
      <m.circle
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: getScale(isVisible, hasReducedMotion),
        }}
        cx={cx}
        cy="12"
        initial={false}
        key={cx}
        r="0.8"
        transition={getSymbolTransition(motion, hasReducedMotion, index)}
      />
    ))}
  </m.g>
);

const StatusGlyphPath = ({
  d,
  delayIndex = 0,
  hasReducedMotion,
  isVisible,
  motion,
  testId,
  transform,
}: VisibleMotionPartProps & {
  d: string;
  delayIndex?: number;
  testId: string;
  transform?: string;
}) => {
  const path = (
    <m.path
      animate={{
        opacity: isVisible ? 1 : 0,
        pathLength: isVisible ? 1 : 0,
        scale: getScale(isVisible, hasReducedMotion),
      }}
      className="patternmode-status-mark__glyph"
      d={d}
      data-testid={testId}
      initial={false}
      transition={getSymbolTransition(motion, hasReducedMotion, delayIndex)}
    />
  );

  if (transform) {
    return <g transform={transform}>{path}</g>;
  }

  return path;
};

const StatusPause = ({ hasReducedMotion, isVisible, motion }: VisibleMotionPartProps) => (
  <m.g
    animate={{
      opacity: isVisible ? 1 : 0,
      scale: getScale(isVisible, hasReducedMotion),
    }}
    className="patternmode-status-mark__glyph"
    data-testid="status-mark-pause"
    initial={false}
    transition={getSymbolTransition(motion, hasReducedMotion)}
  >
    <g transform={STATUS_SYMBOL_TRANSFORM}>
      {[10.15, 13.85].map((x, index) => (
        <m.path
          animate={{
            pathLength: isVisible ? 1 : 0,
          }}
          d={`M${x} 8.85v6.3`}
          initial={false}
          key={x}
          transition={getSymbolTransition(motion, hasReducedMotion, index)}
        />
      ))}
    </g>
  </m.g>
);

const StatusQuestion = ({ hasReducedMotion, isVisible, motion }: VisibleMotionPartProps) => (
  <m.g
    animate={{
      opacity: isVisible ? 1 : 0,
      scale: getScale(isVisible, hasReducedMotion),
    }}
    className="patternmode-status-mark__glyph"
    data-testid="status-mark-question"
    initial={false}
    transition={getSymbolTransition(motion, hasReducedMotion)}
  >
    <g transform={STATUS_SYMBOL_TRANSFORM}>
      <m.path
        animate={{
          pathLength: isVisible ? 1 : 0,
        }}
        d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
        initial={false}
        transition={getSymbolTransition(motion, hasReducedMotion)}
      />
      <m.path
        animate={{
          opacity: isVisible ? 1 : 0,
          pathLength: isVisible ? 1 : 0,
        }}
        d="M12 17h.01"
        initial={false}
        transition={getSymbolTransition(motion, hasReducedMotion, 1)}
      />
    </g>
  </m.g>
);

const StatusMarkSvg = ({
  border,
  fill,
  hasReducedMotion,
  motion,
  state,
  visibility,
  fillRadius,
}: MotionPartProps & {
  border: boolean;
  fill: boolean;
  fillRadius: number;
  state: StatusMarkState;
  visibility: StatusMarkVisibility;
}) => (
  <svg aria-hidden="true" className="patternmode-status-mark__svg" fill="none" viewBox="0 0 24 24">
    {visibility.showNull ? (
      <circle
        className="patternmode-status-mark__track patternmode-status-mark__track--null"
        cx="12"
        cy="12"
        data-testid="status-mark-null"
        r={STATUS_MARK_RADIUS}
      />
    ) : (
      <>
        {fill ? (
          <>
            <circle
              className="patternmode-status-mark__disc"
              cx="12"
              cy="12"
              data-testid="status-mark-fill"
              r={fillRadius}
            />
            <StatusFillSweep
              hasReducedMotion={hasReducedMotion}
              motion={motion}
              progress={state.progress}
              radius={fillRadius}
            />
          </>
        ) : null}
        {border ? (
          <circle
            className="patternmode-status-mark__track"
            cx="12"
            cy="12"
            data-testid="status-mark-border"
            r={STATUS_MARK_RADIUS}
          />
        ) : null}
      </>
    )}
    <StatusArc
      hasReducedMotion={hasReducedMotion}
      isVisible={visibility.showArc}
      motion={motion}
      progress={state.progress}
    />
    <StatusDots
      hasReducedMotion={hasReducedMotion}
      isVisible={visibility.showDots}
      motion={motion}
    />
    <StatusGlyphPath
      d="M7 17 17 7"
      hasReducedMotion={hasReducedMotion}
      isVisible={visibility.showSlash}
      motion={motion}
      testId="status-mark-slash"
    />
    <StatusPause
      hasReducedMotion={hasReducedMotion}
      isVisible={visibility.showPause}
      motion={motion}
    />
    <StatusQuestion
      hasReducedMotion={hasReducedMotion}
      isVisible={visibility.showQuestion}
      motion={motion}
    />
    <StatusGlyphPath
      d="m8.3 12.3 2.35 2.35 5.05-5.3"
      delayIndex={1}
      hasReducedMotion={hasReducedMotion}
      isVisible={visibility.showCheck}
      motion={motion}
      testId="status-mark-check"
      transform={STATUS_SYMBOL_TRANSFORM}
    />
  </svg>
);

export const StatusMark = ({
  border = true,
  className,
  color,
  fill = true,
  fillColor,
  label,
  motion = "smooth",
  size = "base",
  status,
  style,
  tone = "neutral",
  trackColor,
  value,
  ...props
}: StatusMarkProps) => {
  const reducedMotion = useReducedMotion();
  const hasReducedMotion = Boolean(reducedMotion);
  const state = getStatusMarkState({ status, value });
  const hasFill = Boolean(fill);
  const fillRadius = border ? STATUS_MARK_RADIUS : BORDERLESS_STATUS_MARK_RADIUS;
  const visibility = getStatusMarkVisibility(state, border, hasFill);
  const rootStyle = getRootStyle({ color, fillColor, size, style, trackColor });

  return (
    <span
      {...props}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={joinClassNames("patternmode-status-mark", className)}
      data-border={border ? "true" : "false"}
      data-fill={hasFill ? "true" : "false"}
      data-motion={motion === false ? "false" : motion}
      data-progress={state.progress}
      data-slot="status-mark"
      data-status={state.status}
      data-tone={tone}
      role={label ? "img" : undefined}
      style={rootStyle}
    >
      <LazyMotion features={domMax}>
        <StatusMarkSvg
          border={border}
          fill={hasFill}
          fillRadius={fillRadius}
          hasReducedMotion={hasReducedMotion}
          motion={motion}
          state={state}
          visibility={visibility}
        />
      </LazyMotion>
    </span>
  );
};
