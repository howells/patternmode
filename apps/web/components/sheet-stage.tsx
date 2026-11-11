"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface Frame {
  /** The box. */
  box: DOMRect;
  /** The part of the box still in view: scrolled out of a pane, it shrinks. */
  visible: { bottom: number; left: number; right: number; top: number };
}

/** The box clipped by every scrolling or clipping ancestor, so a stage scrolled out of its pane takes its sheets with it. */
const measureFrame = (element: HTMLElement): Frame => {
  const box = element.getBoundingClientRect();
  const visible = { bottom: box.bottom, left: box.left, right: box.right, top: box.top };
  for (let parent = element.parentElement; parent !== null; parent = parent.parentElement) {
    const { overflowX, overflowY } = getComputedStyle(parent);
    if (overflowX === "visible" && overflowY === "visible") {
      continue;
    }
    const clip = parent.getBoundingClientRect();
    visible.bottom = Math.min(visible.bottom, clip.bottom);
    visible.left = Math.max(visible.left, clip.left);
    visible.right = Math.min(visible.right, clip.right);
    visible.top = Math.max(visible.top, clip.top);
  }
  return { box, visible };
};

/**
 * A box that holds one Stacksheet instance: its sheets slide and stack inside
 * the box instead of over the page. Stacksheet draws every sheet in a fixed
 * layer on the body, so this pins that layer to the box's rectangle with a
 * rule scoped to the instance's `zIndex` (the layer takes `zIndex + 1`), and
 * clips it to the box. Each instance on a page needs its own `zIndex`.
 *
 * `inset` is the gap between the box and the sheets: top, right, bottom,
 * left, in px. Pair the instance with `modal: false`: a modal stack would
 * lock the page's scrolling and take focus on load.
 */
export const SheetStage = ({
  children,
  className,
  inset,
  radius,
  zIndex,
}: {
  children?: ReactNode;
  className: string;
  inset: [number, number, number, number];
  radius: number;
  zIndex: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState<Frame | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (element === null) {
      throw new Error("SheetStage has no element to measure");
    }
    const measure = () => {
      setFrame(measureFrame(element));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener("resize", measure);
    // A phone's page scrolls under the fixed layer, so it follows.
    window.addEventListener("scroll", measure, true);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, []);

  const [top, right, bottom, left] = inset;
  const clip = (() => {
    if (frame === null) {
      return null;
    }
    const { box, visible } = frame;
    const layerTop = box.top + top;
    const layerLeft = box.left + left;
    const layerBottom = box.bottom - bottom;
    const layerRight = box.right - right;
    const edges = [
      visible.top - layerTop,
      layerRight - visible.right,
      layerBottom - visible.bottom,
      visible.left - layerLeft,
    ];
    return { edges, hidden: visible.bottom <= visible.top || visible.right <= visible.left };
  })();

  return (
    <div className={className} ref={ref}>
      {children}
      {frame === null || clip === null ? null : (
        <style>{`.patternmode-stacksheet__layer[style*="z-index: ${zIndex + 1};"] {
  inset: auto;
  top: ${frame.box.top + top}px;
  left: ${frame.box.left + left}px;
  width: ${frame.box.width - left - right}px;
  height: ${frame.box.height - top - bottom}px;
  overflow: visible;
  clip-path: ${clip.hidden ? "inset(100%)" : `inset(${clip.edges.map((edge) => `${edge}px`).join(" ")} round ${radius}px)`};
  transform: translateZ(0);
}`}</style>
      )}
    </div>
  );
};
