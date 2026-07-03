import { useEffect, useState } from "react";
import type { RefObject } from "react";
import type { ResolvedConfig } from "./types";

export const usePanelHeight = (
  panelRef: RefObject<HTMLDivElement | null>,
  hasSnapPoints: boolean,
): number => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const el = panelRef.current;
    let observer: ResizeObserver | undefined;
    if (el !== null && hasSnapPoints) {
      setHeight(el.offsetHeight);
      observer = new ResizeObserver(([entry]) => {
        if (entry) {
          setHeight(entry.contentRect.height);
        }
      });
      observer.observe(el);
    }
    return () => {
      observer?.disconnect();
    };
  }, [panelRef, hasSnapPoints]);
  return height;
};
const getViewportHeight = () =>
  typeof window === "undefined" ? 0 : (window.visualViewport?.height ?? window.innerHeight);

export const useViewportHeight = (active: boolean): number => {
  const [height, setHeight] = useState<number | undefined>(() =>
    typeof window === "undefined" ? undefined : getViewportHeight(),
  );
  useEffect(() => {
    const update = () => {
      setHeight(getViewportHeight());
    };
    const canListen = typeof window !== "undefined";
    if (canListen) {
      window.addEventListener("resize", update);
      window.visualViewport?.addEventListener("resize", update);
    }
    return () => {
      if (canListen) {
        window.removeEventListener("resize", update);
        window.visualViewport?.removeEventListener("resize", update);
      }
    };
  }, []);
  return active ? (height ?? 0) : 0;
};
const BODY_SCALE_TRANSITION =
  "transform 500ms cubic-bezier(0.32, 0.72, 0, 1), border-radius 500ms cubic-bezier(0.32, 0.72, 0, 1)";
/** Fallback delay (transition duration + margin) if `transitionend` never fires. */
const BODY_SCALE_RESET_FALLBACK_MS = 600;

/** Cancels a pending un-scale reset when the sheet reopens mid-animation. */
let cancelPendingBodyScaleReset: (() => void) | undefined;

export const useBodyScale = (
  config: ResolvedConfig,
  isOpen: boolean,
  prefersReducedMotion: boolean,
) => {
  useEffect(() => {
    const wrapper = document.querySelector("[data-stacksheet-wrapper]");
    const canScale =
      config.shouldScaleBackground && !prefersReducedMotion && wrapper instanceof HTMLElement;
    const scalable = canScale && isOpen ? wrapper : null;
    if (scalable !== null) {
      cancelPendingBodyScaleReset?.();
      scalable.style.transition = BODY_SCALE_TRANSITION;
      scalable.style.transform = `scale(${config.scaleBackgroundAmount})`;
      scalable.style.borderRadius = "8px";
      scalable.style.overflow = "hidden";
      scalable.style.transformOrigin = "center top";
    }
    return () => {
      if (scalable === null) {
        return;
      }
      // Closing (or unmounting): re-assert the transition so the un-scale
      // animates, clear the transform, and only remove the remaining inline
      // styles once the transition actually ends (with a timeout fallback).
      scalable.style.transition = BODY_SCALE_TRANSITION;
      scalable.style.transform = "";
      scalable.style.borderRadius = "";
      const controller = new AbortController();
      const { signal } = controller;
      const finish = () => {
        controller.abort();
        cancelPendingBodyScaleReset = undefined;
        scalable.style.transition = "";
        scalable.style.overflow = "";
        scalable.style.transformOrigin = "";
      };
      scalable.addEventListener(
        "transitionend",
        (event) => {
          if (event.target === scalable && event.propertyName === "transform") {
            finish();
          }
        },
        { signal },
      );
      const timeoutId = setTimeout(() => {
        if (!signal.aborted) {
          finish();
        }
      }, BODY_SCALE_RESET_FALLBACK_MS);
      signal.addEventListener("abort", () => {
        clearTimeout(timeoutId);
      });
      cancelPendingBodyScaleReset = () => {
        controller.abort();
        cancelPendingBodyScaleReset = undefined;
      };
    };
  }, [isOpen, config.shouldScaleBackground, config.scaleBackgroundAmount, prefersReducedMotion]);
};
