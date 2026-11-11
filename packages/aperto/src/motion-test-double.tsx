/*
 * Test double for `motion/react`, used through `vi.mock` by the jsdom suites.
 * It implements only the div and button elements Aperto renders: animation
 * props are stripped, `drag`/`layout`/`layoutId` are surfaced as data
 * attributes, and the transition clone reports its animation complete at once.
 */
import { createElement, Fragment, useEffect } from "react";
import type { HTMLAttributes, ReactNode, Ref } from "react";
import type { TargetAndTransition } from "motion/react";

interface CloneAnimation {
  complete: (() => void) | undefined;
  manual: boolean;
}

/**
 * Set `manual` to hold the transition clone in flight; `complete` then plays
 * the moment Motion reports the animation finished. Reset after each test.
 */
export const cloneAnimation: CloneAnimation = { complete: undefined, manual: false };

export const resetCloneAnimation = () => {
  cloneAnimation.complete = undefined;
  cloneAnimation.manual = false;
};

type MotionTestProps = HTMLAttributes<HTMLElement> & {
  animate?: boolean | string | TargetAndTransition;
  "data-slot"?: string;
  drag?: boolean;
  dragConstraints?: unknown;
  dragElastic?: unknown;
  dragMomentum?: unknown;
  dragSnapToOrigin?: unknown;
  exit?: unknown;
  initial?: unknown;
  layout?: boolean;
  layoutCrossfade?: unknown;
  layoutId?: string;
  onAnimationComplete?: () => void;
  onDrag?: unknown;
  onDragEnd?: unknown;
  onLayoutAnimationComplete?: unknown;
  ref?: Ref<HTMLElement>;
  transition?: unknown;
};
type MotionDivTestProps = Omit<MotionTestProps, "ref"> & { ref?: Ref<HTMLDivElement> };
type MotionButtonTestProps = Omit<MotionTestProps, "ref"> & { ref?: Ref<HTMLButtonElement> };

const getMotionDataValue = (value: boolean | undefined): string | undefined =>
  value === undefined ? undefined : String(value);

const isAnimationConfigured = (value: MotionTestProps["animate"]): boolean =>
  value !== undefined && value !== false;

const stripMotionProps = ({
  animate: _animate,
  drag,
  dragConstraints: _dragConstraints,
  dragElastic: _dragElastic,
  dragMomentum: _dragMomentum,
  dragSnapToOrigin: _dragSnapToOrigin,
  exit: _exit,
  initial: _initial,
  layout,
  layoutCrossfade: _layoutCrossfade,
  layoutId,
  onAnimationComplete: _onAnimationComplete,
  onDrag: _onDrag,
  onDragEnd: _onDragEnd,
  onLayoutAnimationComplete: _onLayoutAnimationComplete,
  ref: _ref,
  transition: _transition,
  ...props
}: MotionTestProps) => ({
  ...props,
  "data-drag": getMotionDataValue(drag),
  "data-layout": getMotionDataValue(layout),
  "data-layout-id": layoutId,
});

// oxlint-disable-next-line react/only-export-components -- test-only module; never fast-refreshed.
const PassThrough = ({ children }: { children?: ReactNode }) =>
  createElement(Fragment, null, children);

// oxlint-disable-next-line react/only-export-components -- test-only module; never fast-refreshed.
const MotionDiv = ({ ref, ...props }: MotionDivTestProps) => {
  useEffect(() => {
    if (props["data-slot"] !== "aperto-transition-media" || !isAnimationConfigured(props.animate)) {
      return;
    }
    if (cloneAnimation.manual) {
      cloneAnimation.complete = props.onAnimationComplete;
    } else {
      props.onAnimationComplete?.();
    }
  }, [props]);

  return <div ref={ref} {...stripMotionProps(props)} />;
};

// oxlint-disable-next-line react/only-export-components -- test-only module; never fast-refreshed.
const MotionButton = ({ ref, ...props }: MotionButtonTestProps) => (
  <button ref={ref} type="button" {...stripMotionProps(props)} />
);

const motionComponents = { button: MotionButton, div: MotionDiv };

/** What the double replaces in `motion/react`; spread it over the real module. */
export const motionDouble = {
  AnimatePresence: PassThrough,
  LayoutGroup: PassThrough,
  m: motionComponents,
  motion: motionComponents,
  useReducedMotion: () => false,
};
