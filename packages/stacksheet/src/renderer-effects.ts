import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
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

const subscribeToNothing = () => () => {
  // An inactive stack resolves no Snap Points, so there is nothing to watch.
};

const subscribeToViewport = (onChange: () => void) => {
  window.addEventListener("resize", onChange);
  window.visualViewport?.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("resize", onChange);
    window.visualViewport?.removeEventListener("resize", onChange);
  };
};

/**
 * The height fractional Snap Points resolve against while `active`: the
 * container's, for a contained stack, otherwise the visual viewport's.
 * Nothing is observed while inactive.
 */
export const useStageHeight = (active: boolean, container?: HTMLElement): number => {
  // oxlint-disable-next-line react-doctor/react-compiler-no-manual-memoization -- the library build does not run React Compiler; a stable subscribe keeps the observer from re-attaching on every render.
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!active) {
        return subscribeToNothing();
      }
      if (container === undefined) {
        return subscribeToViewport(onChange);
      }
      const observer = new ResizeObserver(onChange);
      observer.observe(container);
      return () => {
        observer.disconnect();
      };
    },
    [active, container],
  );
  const getHeight = () => {
    if (!active) {
      return 0;
    }
    return container === undefined ? getViewportHeight() : container.clientHeight;
  };
  return useSyncExternalStore(subscribe, getHeight, () => 0);
};

/** Input types that don't summon the on-screen keyboard. */
const NON_TEXT_INPUT_TYPES = new Set([
  "button",
  "checkbox",
  "color",
  "file",
  "hidden",
  "image",
  "radio",
  "range",
  "reset",
  "submit",
]);

/** True for elements whose focus raises the on-screen keyboard. */
const isEditableElement = (el: Element | null): boolean => {
  if (!(el instanceof HTMLElement)) {
    return false;
  }
  if (el.isContentEditable) {
    return true;
  }
  if (el instanceof HTMLTextAreaElement) {
    return true;
  }
  if (el instanceof HTMLInputElement) {
    return !NON_TEXT_INPUT_TYPES.has(el.type);
  }
  return false;
};

/**
 * Height (px) the on-screen keyboard occupies while a field inside `containerRef`
 * is focused, else `0`. Derived from the gap between the layout viewport and the
 * (keyboard-shrunk, possibly panned) visual viewport.
 *
 * Focus-gated to fields *inside the container* so unrelated `visualViewport`
 * changes — Android URL-bar collapse, or typing into the page behind a
 * non-modal sheet — don't move the sheet, and zero while pinch-zoomed since a
 * shrunk visual viewport then isn't a keyboard. rAF-throttled because iOS
 * fires many resize events over the keyboard's open animation.
 */
export const useKeyboardInset = (
  active: boolean,
  containerRef: RefObject<HTMLElement | null>,
): number => {
  const [inset, setInset] = useState(0);
  useEffect(() => {
    const canListen = active && typeof window !== "undefined";
    const container = containerRef.current;
    const viewport = canListen ? window.visualViewport : undefined;
    let frame = 0;
    let scheduled = false;
    const measure = () => {
      const el = document.activeElement;
      const focused = isEditableElement(el) && container !== null && container.contains(el);
      // Pinch-zoom also shrinks the visual viewport; that's not a keyboard.
      const zoomed = (viewport?.scale ?? 1) > 1;
      const visibleHeight = viewport?.height ?? window.innerHeight;
      // The keyboard occupies the gap below the visual viewport: layout height
      // minus the viewport's pan offset (iOS scrolls it down) minus its height.
      const gap = window.innerHeight - (viewport?.offsetTop ?? 0) - visibleHeight;
      setInset(focused && !zoomed ? Math.max(0, gap) : 0);
    };
    const schedule = () => {
      if (scheduled) {
        return;
      }
      scheduled = true;
      frame = window.requestAnimationFrame(() => {
        scheduled = false;
        measure();
      });
    };
    if (canListen) {
      container?.addEventListener("focusin", schedule);
      container?.addEventListener("focusout", schedule);
      viewport?.addEventListener("resize", schedule, { passive: true });
      // offsetTop changes as iOS pans the visual viewport while the keyboard is up.
      viewport?.addEventListener("scroll", schedule, { passive: true });
      // Re-measure on (re)activation — state persists across sheet close/reopen,
      // so a stale inset from the last session must be cleared.
      schedule();
    }
    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
      container?.removeEventListener("focusin", schedule);
      container?.removeEventListener("focusout", schedule);
      viewport?.removeEventListener("resize", schedule);
      viewport?.removeEventListener("scroll", schedule);
    };
  }, [active, containerRef]);
  return active ? inset : 0;
};
const BODY_SCALE_TRANSITION =
  "transform 500ms cubic-bezier(0.32, 0.72, 0, 1), border-radius 500ms cubic-bezier(0.32, 0.72, 0, 1)";
/** Fallback delay (transition duration + margin) if `transitionend` never fires. */
const BODY_SCALE_RESET_FALLBACK_MS = 600;

/**
 * The un-scale reset still pending on each wrapper. Keyed by the element, not
 * the stack: every stack that scales the page shares its one wrapper, so a
 * stack opening must cancel whichever stack's reset is still finishing there.
 */
const pendingBodyScaleResets = new WeakMap<HTMLElement, () => void>();

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
      pendingBodyScaleResets.get(scalable)?.();
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
      // This reset supersedes any other stack's reset still pending here.
      pendingBodyScaleResets.get(scalable)?.();
      scalable.style.transition = BODY_SCALE_TRANSITION;
      scalable.style.transform = "";
      scalable.style.borderRadius = "";
      const controller = new AbortController();
      const { signal } = controller;
      const finish = () => {
        controller.abort();
        pendingBodyScaleResets.delete(scalable);
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
      pendingBodyScaleResets.set(scalable, () => {
        controller.abort();
        pendingBodyScaleResets.delete(scalable);
      });
    };
  }, [isOpen, config.shouldScaleBackground, config.scaleBackgroundAmount, prefersReducedMotion]);
};
