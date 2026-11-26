"use client";

import type { RefObject } from "react";
import { useEffect, useRef } from "react";

import { easeOutCubic, quatSlerp, rotateBrioletteOrientation } from "./briolette-geometry";
import type { BrioletteQuat } from "./briolette-geometry";

const IDLE_YAW_PER_MS = 0.00007;
const IDLE_PITCH_PER_MS = 0.000013;
const INERTIA_DECAY_PER_FRAME = 0.94;
const INERTIA_REST_SPEED = 0.00002;
const MAX_FRAME_MS = 64;

/** An in-flight centering glide toward a target orientation. */
export interface BrioletteTween {
  duration: number;
  elapsed: number;
  from: BrioletteQuat;
  to: BrioletteQuat;
}

export const useViewportPresence = (
  stageRef: RefObject<HTMLDivElement | null>,
  onVisibleRef: RefObject<(() => void) | null>,
) => {
  const isInViewportRef = useRef(true);

  useEffect(() => {
    const stage = stageRef.current;
    const observer =
      stage && typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            const visible = entry?.isIntersecting ?? true;
            isInViewportRef.current = visible;
            if (visible) {
              onVisibleRef.current?.();
            }
          })
        : null;
    if (stage && observer) {
      observer.observe(stage);
    }
    return () => {
      observer?.disconnect();
    };
  }, [onVisibleRef, stageRef]);

  return isInViewportRef;
};

export interface BrioletteMotionRefs {
  isInViewportRef: RefObject<boolean>;
  isPointerActiveRef: RefObject<boolean>;
  tweenRef: RefObject<BrioletteTween | null>;
  velocityRef: RefObject<{ pitch: number; yaw: number }>;
}

/**
 * The single animation loop: a centering tween takes priority, then release
 * inertia, then idle drift. Drift pauses while a selection is active so the
 * pinned facet stays put; reduced motion opts out of all autonomous motion.
 * `isMotionReduced` is live, so turning "reduce motion" on while mounted stops
 * inertia and lands any in-flight glide on its target at once.
 *
 * Schedules frames only while work is active; callers invoke the returned
 * `wake` callback whenever a tween, inertia release, or viewport reveal
 * introduces new motion.
 */
export const useIdleMotion = (
  refs: BrioletteMotionRefs,
  setOrientation: (update: (q: BrioletteQuat) => BrioletteQuat) => void,
  isDriftEnabled: boolean,
  isMotionReduced: boolean,
  wakeRef: RefObject<(() => void) | null>,
) => {
  const { isInViewportRef, isPointerActiveRef, tweenRef, velocityRef } = refs;
  useEffect(() => {
    if (typeof requestAnimationFrame === "undefined") {
      wakeRef.current = null;
      return () => {
        // No animation scheduled without a frame scheduler.
      };
    }

    if (isMotionReduced) {
      velocityRef.current = { pitch: 0, yaw: 0 };
      const tween = tweenRef.current;
      if (tween) {
        tweenRef.current = null;
        setOrientation(() => tween.to);
      }
      wakeRef.current = null;
      return () => {
        // Reduced motion runs no autonomous animation frames.
      };
    }

    let frame = 0;
    let last = performance.now();

    const needsFrame = () => {
      if (tweenRef.current !== null) {
        return true;
      }
      if (isPointerActiveRef.current || !isInViewportRef.current || document.hidden) {
        return false;
      }
      const velocity = velocityRef.current;
      return isDriftEnabled || Math.hypot(velocity.yaw, velocity.pitch) > INERTIA_REST_SPEED;
    };

    const tick = (now: number) => {
      frame = 0;
      const elapsed = Math.min(now - last, MAX_FRAME_MS);
      last = now;

      const tween = tweenRef.current;
      if (tween) {
        tween.elapsed += elapsed;
        const t = Math.min(tween.elapsed / tween.duration, 1);
        setOrientation(() => quatSlerp(tween.from, tween.to, easeOutCubic(t)));
        if (t >= 1) {
          tweenRef.current = null;
        }
      } else if (!isPointerActiveRef.current && isInViewportRef.current && !document.hidden) {
        const velocity = velocityRef.current;
        if (Math.hypot(velocity.yaw, velocity.pitch) > INERTIA_REST_SPEED) {
          setOrientation((q) =>
            rotateBrioletteOrientation(q, velocity.yaw * elapsed, velocity.pitch * elapsed),
          );
          const decay = INERTIA_DECAY_PER_FRAME ** (elapsed / 16);
          velocity.yaw *= decay;
          velocity.pitch *= decay;
        } else {
          velocity.yaw = 0;
          velocity.pitch = 0;
          if (isDriftEnabled) {
            setOrientation((q) =>
              rotateBrioletteOrientation(q, IDLE_YAW_PER_MS * elapsed, IDLE_PITCH_PER_MS * elapsed),
            );
          }
        }
      }

      if (needsFrame()) {
        frame = requestAnimationFrame(tick);
      }
    };

    const wake = () => {
      if (frame === 0 && needsFrame()) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        wake();
      }
    };

    wakeRef.current = wake;
    document.addEventListener("visibilitychange", handleVisibilityChange);
    wake();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (wakeRef.current === wake) {
        wakeRef.current = null;
      }
      if (frame !== 0) {
        cancelAnimationFrame(frame);
      }
    };
  }, [
    isInViewportRef,
    isPointerActiveRef,
    tweenRef,
    velocityRef,
    setOrientation,
    isDriftEnabled,
    isMotionReduced,
    wakeRef,
  ]);
};
