import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { findSnapTarget } from "../snap-points";
import { DEAD_ZONE, RUBBER_BAND_FACTOR } from "./drag-constants";
import {
  commitGesture,
  findScrollableAncestor,
  getDismissAxis,
  getPanelDimension,
  isInteractiveElement,
} from "./drag-geometry";
import type { DragConfig, DragState } from "./drag-types";

type DragCommit = "drag" | "none";

interface DragRefs {
  committedRef: RefObject<DragCommit | null>;
  offsetRef: RefObject<number>;
  scrollTargetRef: RefObject<Element | null>;
  startRef: RefObject<{
    time: number;
    x: number;
    y: number;
  } | null>;
}

const resetDragRefs = ({ committedRef, offsetRef, scrollTargetRef, startRef }: DragRefs) => {
  startRef.current = null;
  committedRef.current = null;
  offsetRef.current = 0;
  scrollTargetRef.current = null;
};

const createDragHandlers = ({
  axis,
  config,
  onDragUpdate,
  panelRef,
  refs,
  sign,
}: {
  axis: "x" | "y";
  config: DragConfig;
  onDragUpdate: (state: DragState) => void;
  panelRef: RefObject<HTMLDivElement | null>;
  refs: DragRefs;
  sign: 1 | -1;
}) => {
  const dismiss = () => {
    if (config.isNested) {
      config.onPop();
    } else {
      config.onClose();
    }
  };
  const handlePointerDown = (e: PointerEvent) => {
    if (!config.enabled || e.button !== 0 || !(e.target instanceof Element)) {
      return;
    }
    const { target } = e;
    const isHandle = target.closest("[data-stacksheet-handle]") !== null;
    if (!isHandle && isInteractiveElement(target)) {
      return;
    }
    refs.scrollTargetRef.current = isHandle ? null : findScrollableAncestor(target, axis);
    refs.startRef.current = { time: Date.now(), x: e.clientX, y: e.clientY };
    refs.committedRef.current = null;
    refs.offsetRef.current = 0;
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };
  const handlePointerMove = (e: PointerEvent) => {
    if (refs.startRef.current === null) {
      return;
    }
    const dx = e.clientX - refs.startRef.current.x;
    const dy = e.clientY - refs.startRef.current.y;
    const dist = Math.hypot(dx, dy);
    if (refs.committedRef.current === null && dist < DEAD_ZONE) {
      return;
    }
    if (refs.committedRef.current === null) {
      refs.committedRef.current = commitGesture(dx, dy, axis, sign, refs.scrollTargetRef.current);
      if (refs.committedRef.current !== "drag") {
        refs.startRef.current = null;
        return;
      }
    }
    if (refs.committedRef.current !== "drag") {
      return;
    }
    const rawOffset = axis === "x" ? dx : dy;
    const directional = rawOffset * sign;
    const clampedOffset =
      directional >= 0 ? directional : -Math.sqrt(Math.abs(directional)) * RUBBER_BAND_FACTOR;
    refs.offsetRef.current = clampedOffset;
    onDragUpdate({ isDragging: true, offset: clampedOffset });
    e.preventDefault();
  };
  const handlePointerUp = () => {
    if (refs.startRef.current === null || refs.committedRef.current !== "drag") {
      resetDragRefs(refs);
      return;
    }
    const offset = Math.max(0, refs.offsetRef.current);
    const elapsed = Date.now() - refs.startRef.current.time;
    const velocity = elapsed > 0 ? offset / elapsed : 0;
    resetDragRefs(refs);
    const panelSize = getPanelDimension(panelRef.current, axis);
    if (config.snapHeights.length > 0) {
      const targetIndex = findSnapTarget(
        offset,
        panelSize,
        config.snapHeights,
        velocity,
        config.activeSnapIndex,
        config.sequential,
      );
      if (targetIndex === -1) {
        dismiss();
      } else {
        config.onSnap(targetIndex);
        onDragUpdate({ isDragging: false, offset: 0 });
      }
      return;
    }
    const pastThreshold = offset / panelSize > config.closeThreshold;
    const fastEnough = velocity > config.velocityThreshold;
    if (pastThreshold || fastEnough) {
      dismiss();
    } else {
      onDragUpdate({ isDragging: false, offset: 0 });
    }
  };
  const handlePointerCancel = () => {
    resetDragRefs(refs);
    onDragUpdate({ isDragging: false, offset: 0 });
  };
  return { handlePointerCancel, handlePointerDown, handlePointerMove, handlePointerUp };
};

/**
 * Hook that manages drag gestures that can dismiss a sheet panel.
 *
 * Gesture pipeline:
 * 1. Dead zone (10px) — ignores micro-movements
 * 2. Angle check (35°) — must be roughly aligned with dismiss axis
 * 3. Scroll conflict — yields to scrollable containers not at edge
 * 4. Commit — drag is active, applies offset via `onDragUpdate`
 * 5. Release — velocity + threshold determine close/snap/bounce-back
 *
 * Opposite-direction drag uses √(offset) damping for elastic
 * rubber-band resistance (same physics as iOS over-scroll).
 *
 * When `snapHeights` is provided, release targeting uses
 * `findSnapTarget()` instead of the simple threshold check.
 */
export const useDrag = (
  panelRef: RefObject<HTMLDivElement | null>,
  config: DragConfig,
  onDragUpdate: (state: DragState) => void,
) => {
  const startRef = useRef<{
    x: number;
    y: number;
    time: number;
  } | null>(null);
  const committedRef = useRef<DragCommit | null>(null);
  const offsetRef = useRef(0);
  const scrollTargetRef = useRef<Element | null>(null);
  const { axis, sign } = getDismissAxis(config.side);
  const refs = { committedRef, offsetRef, scrollTargetRef, startRef };
  const { handlePointerCancel, handlePointerDown, handlePointerMove, handlePointerUp } =
    createDragHandlers({ axis, config, onDragUpdate, panelRef, refs, sign });
  const handlersRef = useRef({
    handlePointerCancel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  });
  handlersRef.current = {
    handlePointerCancel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
  // Attach pointer events to the panel element
  useEffect(() => {
    const el = panelRef.current;
    const onPointerDown = (event: PointerEvent) => {
      handlersRef.current.handlePointerDown(event);
    };
    const onPointerMove = (event: PointerEvent) => {
      handlersRef.current.handlePointerMove(event);
    };
    const onPointerUp = () => {
      handlersRef.current.handlePointerUp();
    };
    const onPointerCancel = () => {
      handlersRef.current.handlePointerCancel();
    };
    const canListen = el !== null && config.enabled;
    if (canListen) {
      el.addEventListener("pointerdown", onPointerDown);
      el.addEventListener("pointermove", onPointerMove);
      el.addEventListener("pointerup", onPointerUp);
      el.addEventListener("pointercancel", onPointerCancel);
    }
    return () => {
      if (canListen) {
        el.removeEventListener("pointerdown", onPointerDown);
        el.removeEventListener("pointermove", onPointerMove);
        el.removeEventListener("pointerup", onPointerUp);
        el.removeEventListener("pointercancel", onPointerCancel);
      }
    };
  }, [panelRef, config.enabled]);
};
