"use client";

import { useSyncExternalStore } from "react";

const MOBILE_QUERY = "(max-width: 767px)";
const MOBILE_BREAKPOINT = 768;

const hasMatchMedia = (): boolean =>
  typeof window !== "undefined" &&
  // oxlint-disable-next-line anti-slop/no-runtime-typeof -- DOM feature detection for minimal jsdom test environments
  typeof window.matchMedia === "function";

const subscribe = (onChange: () => void) => {
  if (hasMatchMedia()) {
    const query = window.matchMedia(MOBILE_QUERY);
    query.addEventListener("change", onChange);

    return () => {
      query.removeEventListener("change", onChange);
    };
  }

  window.addEventListener("resize", onChange);

  return () => {
    window.removeEventListener("resize", onChange);
  };
};

const getSnapshot = () =>
  hasMatchMedia() ? window.matchMedia(MOBILE_QUERY).matches : window.innerWidth < MOBILE_BREAKPOINT;

const getServerSnapshot = () => false;

export const useIsMobile = (): boolean =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
