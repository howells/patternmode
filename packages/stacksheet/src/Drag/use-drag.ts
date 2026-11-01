import { useEffect, useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";
import {
  CLICK_SUPPRESSION_MS,
  DEAD_ZONE,
  RUBBER_BAND_REACH,
  TOUCH_CLAIM_DISTANCE,
} from "./drag-constants";
import {
  commitGesture,
  findScrollableAncestor,
  getDismissAxis,
  getPanelDimension,
  isDragExempt,
  rubberBand,
  unRubberBand,
} from "./drag-geometry";
import type { GestureContext } from "./drag-geometry";
import { resolveRelease } from "./drag-release";
import type { DragConfig, DragTarget } from "./drag-types";
import { appendVelocitySample, getReleaseVelocity } from "./drag-velocity";
import type { VelocitySample } from "./drag-velocity";

type DragCommit = "drag" | "none";

/** Mutable state of one gesture. Lives in a ref so pointer events never re-render React. */
interface Gesture {
  /** Finger distance (px, dismiss direction) that maps to the travel at commit */
  base: number;
  commit: DragCommit | null;
  context: GestureContext;
  pointerId: number;
  pointerType: string;
  samples: VelocitySample[];
  startX: number;
  startY: number;
}

const now = (): number => (typeof performance === "undefined" ? Date.now() : performance.now());

/**
 * Swallow the click that follows a committed drag, so dragging a Sheet by a
 * link or a button never activates it. Cleared by the next press, or after a
 * short timeout, so a later tap is never eaten.
 */
const suppressNextClick = () => {
  const controller = new AbortController();
  const { signal } = controller;
  const stop = () => {
    controller.abort();
  };
  window.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      stop();
    },
    { capture: true, signal },
  );
  window.addEventListener("pointerdown", stop, { capture: true, signal });
  const timeout = setTimeout(stop, CLICK_SUPPRESSION_MS);
  signal.addEventListener("abort", () => {
    clearTimeout(timeout);
  });
};

/** Map a finger distance from the drag start to the Sheet's travel, rubber-banding past its most open rest. */
const toTravel = (finger: number, minTravel: number, size: number): number =>
  finger >= minTravel
    ? finger
    : minTravel - rubberBand(minTravel - finger, Math.min(size, RUBBER_BAND_REACH));

/** Inverse of `toTravel`, for a drag that grabs a Sheet mid-overshoot. */
const toFinger = (travel: number, minTravel: number, size: number): number =>
  travel >= minTravel
    ? travel
    : minTravel - unRubberBand(minTravel - travel, Math.min(size, RUBBER_BAND_REACH));

const setSelectable = (panel: HTMLElement | null, selectable: boolean) => {
  if (panel === null) {
    return;
  }
  const value = selectable ? "" : "none";
  panel.style.userSelect = value;
  panel.style.setProperty("-webkit-user-select", value);
};

interface DragRuntime {
  config: DragConfig;
  gesture: RefObject<Gesture | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  target: DragTarget;
}

const getAlong = (gesture: Gesture, x: number, y: number) => ({
  dx: x - gesture.startX,
  dy: y - gesture.startY,
});

const fingerDistance = (gesture: Gesture, dx: number, dy: number): number =>
  (gesture.context.axis === "x" ? dx : dy) * gesture.context.sign;

const finish = ({ config, gesture, panelRef, target }: DragRuntime, cancelled: boolean) => {
  const { current } = gesture;
  gesture.current = null;
  if (current?.commit !== "drag") {
    return;
  }
  setSelectable(panelRef.current, true);
  if (cancelled) {
    target.end({ kind: "rest" }, 0);
    return;
  }
  suppressNextClick();
  const latest = current.samples.at(-1);
  const travel = latest?.offset ?? 0;
  // Release velocity comes from a sliding window of recent samples, so a
  // pause followed by a flick still dismisses (a whole-gesture average would
  // dilute the flick to near zero).
  const velocity = getReleaseVelocity(current.samples, now());
  const size = getPanelDimension(panelRef.current, current.context.axis);
  target.end(resolveRelease(travel, velocity, size, config), velocity * 1000);
};

const handlePointerDown = ({ config, gesture, panelRef }: DragRuntime, e: PointerEvent) => {
  if (!config.enabled || !e.isPrimary || e.button !== 0 || !(e.target instanceof Element)) {
    return;
  }
  const isHandle = e.target.closest("[data-stacksheet-handle]") !== null;
  if (!isHandle && isDragExempt(e.target)) {
    return;
  }
  const { axis, sign } = getDismissAxis(config.side);
  const panel = panelRef.current;
  const scrollEl = isHandle ? null : findScrollableAncestor(e.target, axis);
  gesture.current = {
    base: 0,
    commit: null,
    context: {
      axis,
      // A Sheet resting below its most open Snap Point expands before its content scrolls.
      expandable:
        config.snapHeights.length > 0 && config.activeSnapIndex < config.snapHeights.length - 1,
      openward: e.pointerType !== "mouse",
      // Only consider scroll containers inside this Sheet.
      scrollEl: scrollEl !== null && panel?.contains(scrollEl) === true ? scrollEl : null,
      sign,
    },
    pointerId: e.pointerId,
    pointerType: e.pointerType,
    samples: [],
    startX: e.clientX,
    startY: e.clientY,
  };
  // Pointer capture is deferred until the gesture commits as a drag:
  // capturing here would retarget plain taps away from clickable children,
  // swallowing their clicks.
};

const commitDrag = (runtime: DragRuntime, current: Gesture, e: PointerEvent) => {
  const { config, panelRef, target } = runtime;
  const size = getPanelDimension(panelRef.current, current.context.axis);
  const { dx, dy } = getAlong(current, e.clientX, e.clientY);
  // Grabbing a Sheet mid-animation catches it where it is: the drag starts
  // from the travel on screen, not from its resting position.
  const startTravel = target.begin();
  current.base = toFinger(startTravel, config.minTravel, size) - fingerDistance(current, dx, dy);
  current.commit = "drag";
  // The gesture is now a real drag. Capture so the panel keeps receiving
  // pointer events when the pointer leaves it.
  if (e.currentTarget instanceof Element) {
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  window.getSelection()?.removeAllRanges();
  setSelectable(panelRef.current, false);
};

const handlePointerMove = (runtime: DragRuntime, e: PointerEvent) => {
  const { current } = runtime.gesture;
  if (current === null || e.pointerId !== current.pointerId) {
    return;
  }
  const { dx, dy } = getAlong(current, e.clientX, e.clientY);
  if (current.commit === null) {
    if (Math.hypot(dx, dy) < DEAD_ZONE) {
      return;
    }
    if (commitGesture(dx, dy, current.context) === "none") {
      runtime.gesture.current = null;
      return;
    }
    commitDrag(runtime, current, e);
  }
  const size = getPanelDimension(runtime.panelRef.current, current.context.axis);
  const travel = toTravel(
    current.base + fingerDistance(current, dx, dy),
    runtime.config.minTravel,
    size,
  );
  appendVelocitySample(current.samples, { offset: travel, time: now() });
  runtime.target.move(travel);
  e.preventDefault();
};

/**
 * Keep the browser from scrolling under a touch that is becoming a drag.
 * Pointer events alone can't: once the browser starts a native pan it sends
 * `pointercancel` and the drag is lost. Cancelling the early `touchmove`
 * events (which must be non-passive) keeps the gesture ours, while a touch
 * heading for the content's own scroll is left alone.
 */
const handleTouchMove = ({ gesture }: DragRuntime, e: TouchEvent) => {
  const { current } = gesture;
  const [touch] = e.touches;
  if (current === null || current.pointerType !== "touch" || touch === undefined || !e.cancelable) {
    return;
  }
  if (e.touches.length > 1) {
    return;
  }
  if (current.commit === "drag") {
    e.preventDefault();
    return;
  }
  const { dx, dy } = getAlong(current, touch.clientX, touch.clientY);
  if (
    Math.hypot(dx, dy) >= TOUCH_CLAIM_DISTANCE &&
    commitGesture(dx, dy, current.context) === "drag"
  ) {
    e.preventDefault();
  }
};

const attachDragListeners = (el: HTMLElement, runtime: () => DragRuntime, signal: AbortSignal) => {
  el.addEventListener(
    "pointerdown",
    (event) => {
      handlePointerDown(runtime(), event);
    },
    { signal },
  );
  el.addEventListener(
    "pointermove",
    (event) => {
      handlePointerMove(runtime(), event);
    },
    { signal },
  );
  el.addEventListener(
    "pointerup",
    () => {
      finish(runtime(), false);
    },
    { signal },
  );
  el.addEventListener(
    "pointercancel",
    () => {
      finish(runtime(), true);
    },
    { signal },
  );
  el.addEventListener(
    "touchmove",
    (event) => {
      handleTouchMove(runtime(), event);
    },
    { passive: false, signal },
  );
  // A link or image dragged with a mouse would start a native drag and
  // cancel the pointer stream. While a gesture is armed, the Sheet owns it.
  el.addEventListener(
    "dragstart",
    (event) => {
      if (runtime().gesture.current !== null) {
        event.preventDefault();
      }
    },
    { signal },
  );
};

/**
 * Hook that turns pointer gestures on a sheet panel into Drag, Snap and Swipe.
 *
 * Gesture pipeline:
 * 1. Press — anywhere except fields, `draggable` elements and
 *    `[data-stacksheet-no-drag]`; links and buttons included.
 * 2. Dead zone (10px) — below it the press stays a tap.
 * 3. Angle check (35°) — must be roughly aligned with the dismiss axis.
 * 4. Scroll handoff — content that can still scroll keeps the gesture;
 *    scrolled to its edge, it hands the pull to the Sheet.
 * 5. Commit — capture the pointer, catch the Sheet where it is, and move it
 *    through `target.move` on every pointer event without touching React.
 * 6. Release — velocity, distance and Snap Points choose the outcome, which
 *    `target.end` animates with the release velocity. The click that follows
 *    is swallowed.
 *
 * Past its most open rest the Sheet rubber-bands with the scroll-view curve.
 */
export const useDrag = (
  panelRef: RefObject<HTMLDivElement | null>,
  config: DragConfig,
  target: DragTarget,
) => {
  const gesture = useRef<Gesture | null>(null);
  const latestRef = useRef({ config, target });
  useLayoutEffect(() => {
    latestRef.current = { config, target };
  });
  useEffect(() => {
    const el = panelRef.current;
    const controller = new AbortController();
    if (el !== null && config.enabled) {
      // The runtime is rebuilt per event from the latest props, so a re-render
      // never re-attaches the listeners and a gesture in progress keeps its state.
      attachDragListeners(
        el,
        () => ({ ...latestRef.current, gesture, panelRef }),
        controller.signal,
      );
    }
    return () => {
      controller.abort();
      // Disabled mid-gesture (the Sheet was popped or covered): drop the
      // gesture without settling, since the panel's own transition now owns it.
      if (gesture.current?.commit === "drag") {
        setSelectable(el, true);
      }
      gesture.current = null;
    };
  }, [panelRef, config.enabled]);
};
