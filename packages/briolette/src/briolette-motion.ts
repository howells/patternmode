"use client";

import type { RefObject } from "react";
import { useEffect, useRef } from "react";

import { quatSlerp, rotateBrioletteOrientation } from "./briolette-geometry";
import type { BrioletteQuat } from "./briolette-geometry";

const IDLE_YAW_PER_MS = 0.000_07;
const IDLE_PITCH_PER_MS = 0.000_013;
const INERTIA_DECAY_PER_FRAME = 0.94;
const INERTIA_REST_SPEED = 0.000_02;
const MAX_FRAME_MS = 64;

const easeOutCubic = (t: number): number => 1 - (1 - t) ** 3;

/** An in-flight centering glide toward a target orientation. */
export interface BrioletteTween {
  duration: number;
  elapsed: number;
  from: BrioletteQuat;
  to: BrioletteQuat;
}

export const useViewportPresence = (stageRef: RefObject<HTMLDivElement | null>) => {
  const isInViewportRef = useRef(true);

  useEffect(() => {
    const stage = stageRef.current;
    const observer =
      stage && typeof IntersectionObserver === "function"
        ? new IntersectionObserver(([entry]) => {
            isInViewportRef.current = entry?.isIntersecting ?? true;
          })
        : null;
    if (stage && observer) {
      observer.observe(stage);
    }
    return () => {
      observer?.disconnect();
    };
  }, [stageRef]);

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
 */
export const useIdleMotion = (
  refs: BrioletteMotionRefs,
  setOrientation: (update: (q: BrioletteQuat) => BrioletteQuat) => void,
  isDriftEnabled: boolean,
) => {
  useEffect(() => {
    let frame = 0;
    if (typeof requestAnimationFrame !== "function") {
      return () => {
        // No animation scheduled without a frame scheduler.
      };
    }

    /* Track the media query live: enabling "reduce motion" while mounted
       must stop idle drift and inertia, not just a fresh mount. */
    const reducedMotionQuery =
      typeof window !== "undefined" && typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    let isMotionReduced = reducedMotionQuery?.matches ?? false;
    const onReducedMotionChange = (event: MediaQueryListEvent) => {
      isMotionReduced = event.matches;
      if (isMotionReduced) {
        refs.velocityRef.current = { pitch: 0, yaw: 0 };
        const tween = refs.tweenRef.current;
        if (tween) {
          refs.tweenRef.current = null;
          setOrientation(() => tween.to);
        }
      }
    };
    reducedMotionQuery?.addEventListener("change", onReducedMotionChange);

    let last = performance.now();
    const tick = (now: number) => {
      const elapsed = Math.min(now - last, MAX_FRAME_MS);
      last = now;

      const tween = refs.tweenRef.current;
      if (isMotionReduced) {
        // Autonomous motion is opted out; direct manipulation still applies.
      } else if (tween) {
        tween.elapsed += elapsed;
        const t = Math.min(tween.elapsed / tween.duration, 1);
        setOrientation(() => quatSlerp(tween.from, tween.to, easeOutCubic(t)));
        if (t >= 1) {
          refs.tweenRef.current = null;
        }
      } else if (
        !refs.isPointerActiveRef.current &&
        refs.isInViewportRef.current &&
        !document.hidden
      ) {
        const velocity = refs.velocityRef.current;
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

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      reducedMotionQuery?.removeEventListener("change", onReducedMotionChange);
    };
  }, [
    refs.isInViewportRef,
    refs.isPointerActiveRef,
    refs.tweenRef,
    refs.velocityRef,
    setOrientation,
    isDriftEnabled,
  ]);
};
