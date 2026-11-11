import { easings } from "@howells/motion";
import { animate, useMotionValue, useTransform } from "motion/react";
import type { MotionValue, ValueAnimationTransition } from "motion/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";

import { getDismissAxis, getPanelDimension } from "../Drag/drag-geometry";
import type { DragAxis, DragOutcome, DragTarget } from "../Drag/drag-types";
import { clampUnit } from "../stack-motion";
import type { StackMotion } from "../stack-motion";
import { getStackTransform } from "../stacking";
import type { Side, SpringConfig, StackingConfig } from "../types";

/** Reduced motion: a short crossfade replaces travel and scale. */
export const REDUCED_FADE_IN: ValueAnimationTransition<number> = {
  duration: 0.2,
  ease: easings.snappy,
};
export const REDUCED_FADE_OUT: ValueAnimationTransition<number> = {
  duration: 0.15,
  ease: easings.snappy,
};

/**
 * An exiting Panel springs toward a point this far past fully hidden and is
 * removed the moment it is out of sight, so a leaving Sheet never crawls
 * through the spring's slow tail at the screen edge.
 */
const EXIT_OVERSHOOT_PX = 48;

const getSpringTransition = (
  spring: SpringConfig,
  velocity?: number,
): ValueAnimationTransition<number> => {
  const transition: ValueAnimationTransition<number> = {
    damping: spring.damping,
    mass: spring.mass,
    restDelta: 0.5,
    restSpeed: 10,
    stiffness: spring.stiffness,
    type: "spring",
  };
  // Without an explicit velocity, Motion carries the value's current one.
  if (velocity !== undefined) {
    transition.velocity = velocity;
  }
  return transition;
};

/**
 * Before the first measurement: far enough to be off screen for any panel
 * size. Panels only ever render on the client, inside the portal.
 */
const guessHiddenTravel = (axis: DragAxis): number =>
  axis === "x" ? window.innerWidth : window.innerHeight;

/** `--ease-sheet`: the iOS sheet curve, for a fitted Sheet changing height. */
const EASE_SHEET = "cubic-bezier(0.32, 0.72, 0, 1)";
const HEIGHT_CHANGE_MS = 300;

/** The vertical offset an in-flight height change is drawing right now. */
const readTranslateY = (panel: HTMLElement): number => {
  const [, y] = getComputedStyle(panel).translate.split(" ");
  // `translate` computes to px ("0px 12.5px"); Number() rejects the unit.
  const value = y === undefined ? 0 : Number(y.replace("px", ""));
  return Number.isFinite(value) ? value : 0;
};

/**
 * A fitted bottom Sheet changed height (a row was added, the keyboard
 * padded it). It is anchored at the bottom, so its top edge has already
 * jumped by `delta`. Offset it back with the independent `translate`
 * property and ease that to zero: only the top edge travels, composited, and
 * a second change mid-flight continues from the offset on screen.
 *
 * Runs from a ResizeObserver callback, after layout and before paint, so the
 * jump never reaches the screen. WAAPI applies a new animation's first frame
 * immediately; a Motion value would only render on the next frame.
 */
const animateHeightChange = (
  panel: HTMLElement,
  delta: number,
  runtime: RefObject<{ heightChange: Animation | null }>,
) => {
  if (!("animate" in panel)) {
    return;
  }
  let from = delta;
  const running = runtime.current.heightChange;
  if (running !== null) {
    from += readTranslateY(panel);
    running.cancel();
  }
  const animation = panel.animate([{ translate: `0 ${from}px` }, { translate: "0 0" }], {
    duration: HEIGHT_CHANGE_MS,
    easing: EASE_SHEET,
  });
  runtime.current.heightChange = animation;
  animation.addEventListener("finish", () => {
    if (runtime.current.heightChange === animation) {
      runtime.current.heightChange = null;
    }
  });
};

/** Fold an in-flight height change into the travel, so a drag starts from what is on screen. */
const takeHeightChange = (
  panel: HTMLElement | null,
  runtime: RefObject<{ heightChange: Animation | null }>,
): number => {
  const animation = runtime.current.heightChange;
  if (panel === null || animation === null) {
    return 0;
  }
  const offset = readTranslateY(panel);
  animation.cancel();
  runtime.current.heightChange = null;
  return offset;
};

export interface PanelMotionOptions {
  /** Whether a drag can start on this panel right now */
  dragEnabled: boolean;
  /** A bottom Sheet sized to its content: animate its height changes. */
  fitted: boolean;
  isPresent: boolean;
  /** The drag dismissed the Sheet: pop or close the stack. */
  onDismiss: () => void;
  /** The entrance finished while the panel is present. */
  onEntered: () => void;
  /** The drag settled on a Snap Point. */
  onSnap: (index: number) => void;
  panelRef: RefObject<HTMLDivElement | null>;
  reduced: boolean;
  /** Resting travel: px from fully open toward dismissal (the active Snap Point's offset, or 0) */
  rest: number;
  safeToRemove: (() => void) | null | undefined;
  side: Side;
  /** Resting travel for a given Snap Point index */
  snapTravel: (index: number) => number;
  spring: SpringConfig;
  stack: StackMotion;
  stacking: StackingConfig;
}

export interface PanelMotion {
  dragTarget: DragTarget;
  style: {
    opacity: MotionValue<number>;
    scale: MotionValue<number>;
    x: MotionValue<number> | number;
    y: MotionValue<number> | number;
  };
}

/** The panel's mutable motion bookkeeping. One ref, read only from effects and callbacks. */
interface MotionRuntime {
  dragging: boolean;
  entered: boolean;
  /** A fitted Sheet's height change in flight */
  heightChange: Animation | null;
  latest: PanelMotionOptions;
  /** `onEntered` has fired */
  opened: boolean;
  /** Velocity (px/s) a Swipe hands to the exit */
  releaseVelocity: number;
  /** Distance (px) from rest to fully hidden: the panel's size on the dismiss axis */
  size: number;
  /** Target of the travel spring that is running, if any */
  target: number | null;
}

interface MotionState {
  fade: MotionValue<number>;
  runtime: RefObject<MotionRuntime>;
  travel: MotionValue<number>;
}

/** The first time the Sheet comes to rest after opening, however it got there. */
const markOpened = ({ runtime }: MotionState) => {
  const { current } = runtime;
  if (!current.opened && current.latest.isPresent) {
    current.opened = true;
    current.latest.onEntered();
  }
};

const springTravel = async (state: MotionState, to: number, velocity?: number) => {
  const { runtime, travel } = state;
  if (runtime.current.target === to && travel.isAnimating() && velocity === undefined) {
    return;
  }
  runtime.current.target = to;
  await animate(travel, to, getSpringTransition(runtime.current.latest.spring, velocity)).finished;
  if (runtime.current.target === to) {
    runtime.current.target = null;
    markOpened(state);
  }
};

/** Bring a present panel to rest: back from a drag, an interrupted exit, or a new Snap Point. */
const settle = (state: MotionState, to: number, velocity?: number) => {
  const { fade, runtime, travel } = state;
  if (fade.get() < 1 && !fade.isAnimating()) {
    animate(fade, 1, REDUCED_FADE_IN);
  }
  if (runtime.current.latest.reduced && velocity === undefined && !travel.isAnimating()) {
    // Reduced motion: a programmatic change of position doesn't travel.
    runtime.current.target = null;
    travel.jump(to);
    return;
  }
  void springTravel(state, to, velocity);
};

const enter = async (state: MotionState) => {
  const { fade, runtime, travel } = state;
  const { reduced, rest } = runtime.current.latest;
  if (reduced) {
    travel.jump(rest);
    await animate(fade, 1, REDUCED_FADE_IN).finished;
    markOpened(state);
    return;
  }
  fade.jump(1);
  travel.jump(runtime.current.size);
  await springTravel(state, rest);
};

/**
 * Leave the way it came. A Swipe hands its release velocity to the spring,
 * so a flick leaves at the speed it was thrown; Done, Escape and the backdrop
 * leave from rest on the same spring the Sheet arrived on.
 */
const exit = async (state: MotionState) => {
  const { fade, runtime, travel } = state;
  const velocity = runtime.current.releaseVelocity;
  runtime.current.releaseVelocity = 0;
  runtime.current.dragging = false;
  let removed = false;
  const remove = () => {
    // A Sheet re-presented mid-exit (the same id opened again) stays.
    if (removed || runtime.current.latest.isPresent) {
      return;
    }
    removed = true;
    runtime.current.latest.safeToRemove?.();
  };
  if (runtime.current.latest.reduced) {
    await animate(fade, 0, REDUCED_FADE_OUT).finished;
    remove();
    return;
  }
  const hidden = runtime.current.size;
  const to = hidden + EXIT_OVERSHOOT_PX;
  runtime.current.target = to;
  await animate(travel, to, {
    ...getSpringTransition(runtime.current.latest.spring, velocity),
    onUpdate: (value) => {
      if (value >= hidden) {
        remove();
      }
    },
  }).finished;
  remove();
};

const createDragTarget = (state: MotionState): DragTarget => ({
  begin: () => {
    const { runtime, travel } = state;
    runtime.current.dragging = true;
    runtime.current.target = null;
    travel.stop();
    const caught =
      travel.get() + takeHeightChange(runtime.current.latest.panelRef.current, runtime);
    travel.jump(caught);
    return caught;
  },
  end: (outcome: DragOutcome, velocity: number) => {
    const { runtime } = state;
    runtime.current.dragging = false;
    const { latest } = runtime.current;
    if (outcome.kind === "dismiss") {
      runtime.current.releaseVelocity = velocity;
      latest.onDismiss();
      // If nothing removed the Sheet, it goes back to rest.
      requestAnimationFrame(() => {
        const { current } = runtime;
        if (current.latest.isPresent && !current.dragging && !state.travel.isAnimating()) {
          current.releaseVelocity = 0;
          settle(state, current.latest.rest, velocity);
        }
      });
      return;
    }
    if (outcome.kind === "snap") {
      void springTravel(state, latest.snapTravel(outcome.index), velocity);
      latest.onSnap(outcome.index);
      return;
    }
    void springTravel(state, latest.rest, velocity);
  },
  move: (travel: number) => {
    state.travel.set(travel);
  },
});

/** Report presence to the Sheet Stack, which turns it into depth and backdrop. */
const useStackPresence = (
  { fade, runtime, travel }: MotionState,
  stack: StackMotion,
  depth: MotionValue<number>,
) => {
  useLayoutEffect(() => {
    const unregister = stack.register({
      depth,
      presence: () => {
        const { latest, size } = runtime.current;
        const span = Math.max(1, size - latest.rest);
        return fade.get() * (1 - clampUnit((travel.get() - latest.rest) / span));
      },
    });
    const unsubscribeTravel = travel.on("change", stack.update);
    const unsubscribeFade = fade.on("change", stack.update);
    return () => {
      unsubscribeTravel();
      unsubscribeFade();
      unregister();
    };
  }, [stack, depth, fade, travel, runtime]);
};

/**
 * Everything that moves a Panel, on Motion values rather than React state:
 * its travel along the dismiss axis (entrance, drag, Snap, exit), its fade
 * (reduced motion only), and its depth in the Sheet Stack (scale and offset
 * beneath the Panels above it). A drag writes the travel directly from
 * pointer events, so it never re-renders React.
 */
export const usePanelMotion = (options: PanelMotionOptions): PanelMotion => {
  const { dragEnabled, isPresent, panelRef, reduced, rest, side, stack, stacking } = options;
  const { axis, sign } = getDismissAxis(side);
  // Off screen until the first measurement, so the first frame never flashes the Sheet at rest.
  const travel = useMotionValue(reduced ? rest : guessHiddenTravel(axis));
  const fade = useMotionValue(reduced ? 0 : 1);
  const depth = useMotionValue(0);
  const runtime = useRef<MotionRuntime>({
    dragging: false,
    entered: false,
    heightChange: null,
    latest: options,
    opened: false,
    releaseVelocity: 0,
    size: 0,
    target: null,
  });

  useLayoutEffect(() => {
    runtime.current.latest = options;
  });

  // Measure the distance to fully hidden and keep it current, animating a
  // fitted Sheet's height changes.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    const measure = () => {
      const measured = getPanelDimension(panel, axis);
      if (panel === null || measured <= 0) {
        return;
      }
      const delta = measured - runtime.current.size;
      const { dragging, entered, latest } = runtime.current;
      const settled = entered && latest.isPresent && !dragging;
      if (latest.fitted && settled && !latest.reduced && delta !== 0) {
        animateHeightChange(panel, delta, runtime);
      }
      runtime.current.size = measured;
    };
    measure();
    const canObserve = panel !== null && "ResizeObserver" in globalThis;
    const observer = canObserve ? new ResizeObserver(measure) : undefined;
    if (panel !== null) {
      observer?.observe(panel);
    }
    return () => {
      observer?.disconnect();
    };
  }, [panelRef, axis]);
  useStackPresence({ fade, runtime, travel }, stack, depth);

  // Enter, settle on a new rest, leave, or come back when re-presented mid-exit.
  useLayoutEffect(() => {
    const state = { fade, runtime, travel };
    const { current } = runtime;
    if (current.size <= 0) {
      current.size = guessHiddenTravel(axis);
    }
    if (!isPresent) {
      void exit(state);
    } else if (current.entered) {
      if (!current.dragging) {
        settle(state, rest);
      }
    } else {
      current.entered = true;
      void enter(state);
    }
  }, [isPresent, rest, fade, travel, axis]);

  // Covered by a push mid-drag: let go of the gesture and rest.
  useEffect(() => {
    const { current } = runtime;
    if (!dragEnabled && current.dragging) {
      current.dragging = false;
      if (current.latest.isPresent) {
        settle({ fade, runtime, travel }, current.latest.rest);
      }
    }
  }, [dragEnabled, fade, travel]);

  const axisValue = useTransform(
    () => sign * (travel.get() - getStackTransform(depth.get(), stacking).offset),
  );
  const scale = useTransform(() => getStackTransform(depth.get(), stacking).scale);
  const opacity = useTransform(() => fade.get() * getStackTransform(depth.get(), stacking).opacity);

  // Methods, not a snapshot: the motion runtime is only read when the drag calls them.
  const dragTarget: DragTarget = {
    begin: () => createDragTarget({ fade, runtime, travel }).begin(),
    end: (outcome, velocity) => {
      createDragTarget({ fade, runtime, travel }).end(outcome, velocity);
    },
    move: (value) => {
      travel.set(value);
    },
  };

  return {
    dragTarget,
    style: {
      opacity,
      scale,
      x: axis === "x" ? axisValue : 0,
      y: axis === "y" ? axisValue : 0,
    },
  };
};
