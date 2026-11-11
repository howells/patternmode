"use client";

import { useSyncExternalStore } from "react";

import { prefersReducedMotion, REDUCED_MOTION_QUERY } from "./reduced-motion";

const subscribeToReducedMotion = (onChange: () => void) => {
  if (typeof window === "undefined" || window.matchMedia === undefined) {
    return () => {
      // No media query to follow without a DOM `matchMedia`.
    };
  }
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", onChange);
  return () => {
    mql.removeEventListener("change", onChange);
  };
};

/**
 * True while the user prefers reduced motion, following the setting live: a
 * component mounted before the setting changed re-renders when it does.
 * SSR-safe: false on the server and wherever `matchMedia` is missing.
 */
export const usePrefersReducedMotion = (): boolean =>
  useSyncExternalStore(subscribeToReducedMotion, prefersReducedMotion, () => false);
