"use client";

import { useSyncExternalStore } from "react";

import type { HomeSectionId } from "@/lib/home-sections";

/*
 * The Home pane reports which section is in view; the header reads it to
 * draw its underline. A tiny external store keeps the two apart without a
 * provider around the whole app.
 */

let activeSection: HomeSectionId | null = null;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const setActiveSection = (next: HomeSectionId | null) => {
  if (next === activeSection) {
    return;
  }
  activeSection = next;
  for (const listener of listeners) {
    listener();
  }
};

export const useActiveSection = () =>
  useSyncExternalStore(
    subscribe,
    () => activeSection,
    () => null,
  );

/*
 * Pane scroll positions, so back and forward land where the reader left.
 * The body never scrolls, so the browser's own restoration has nothing to
 * restore; each pane saves its offset per history entry instead.
 */

const POP_WINDOW_MS = 2000;
let lastPopAt = 0;

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    lastPopAt = Date.now();
  });
}

const isHistoryTraversal = () => {
  if (Date.now() - lastPopAt < POP_WINDOW_MS) {
    return true;
  }
  const [entry] = performance.getEntriesByType("navigation");
  if (!(entry instanceof PerformanceNavigationTiming) || performance.now() >= POP_WINDOW_MS) {
    return false;
  }
  return entry.type === "back_forward" || entry.type === "reload";
};

const storageKey = (key: string) => `patternmode:scroll:${key}`;

export const saveScroll = (key: string, top: number) => {
  try {
    sessionStorage.setItem(storageKey(key), String(Math.round(top)));
  } catch {
    // Private mode or a full quota: restoration is a nicety, not a requirement.
  }
};

/** The saved offset when arriving by back, forward or reload; otherwise null. */
export const readRestorableScroll = (key: string): number | null => {
  if (!isHistoryTraversal()) {
    return null;
  }
  try {
    const value = sessionStorage.getItem(storageKey(key));
    return value === null ? null : Number(value);
  } catch {
    return null;
  }
};
