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
export const useBodyScale = (
  config: ResolvedConfig,
  isOpen: boolean,
  prefersReducedMotion: boolean,
) => {
  useEffect(() => {
    const wrapper = document.querySelector("[data-stacksheet-wrapper]");
    const resetWrapper = () => {
      if (wrapper instanceof HTMLElement) {
        wrapper.style.transform = "";
        wrapper.style.borderRadius = "";
        wrapper.style.transition = "";
        wrapper.style.overflow = "";
        wrapper.style.transformOrigin = "";
      }
    };
    const canScale =
      config.shouldScaleBackground && !prefersReducedMotion && wrapper instanceof HTMLElement;
    if (canScale && isOpen) {
      const scale = config.scaleBackgroundAmount;
      wrapper.style.transition =
        "transform 500ms cubic-bezier(0.32, 0.72, 0, 1), border-radius 500ms cubic-bezier(0.32, 0.72, 0, 1)";
      wrapper.style.transform = `scale(${scale})`;
      wrapper.style.borderRadius = "8px";
      wrapper.style.overflow = "hidden";
      wrapper.style.transformOrigin = "center top";
      return resetWrapper;
    }
    const handleEnd = () => {
      resetWrapper();
    };
    if (canScale) {
      wrapper.style.transform = "";
      wrapper.style.borderRadius = "";
      wrapper.addEventListener("transitionend", handleEnd, { once: true });
    }
    return () => {
      if (wrapper instanceof HTMLElement) {
        wrapper.removeEventListener("transitionend", handleEnd);
      }
    };
  }, [isOpen, config.shouldScaleBackground, config.scaleBackgroundAmount, prefersReducedMotion]);
};
