"use client";

import type { ReactNode, Ref } from "react";

/**
 * A box that holds one Stacksheet instance: its sheets slide and stack inside
 * the box instead of over the page. Pass the box's container element to the
 * instance's provider as `container`; the stack renders into it.
 *
 * `inset` is the gap between the box and the sheets: top, right, bottom,
 * left, in px. Pair the instance with `modal: false`: a modal stack would
 * lock the page's scrolling and take focus on load.
 */
export const SheetStage = ({
  children,
  className,
  containerRef,
  inset,
  radius,
}: {
  children?: ReactNode;
  className: string;
  /** Receives the element the stack renders into. */
  containerRef: Ref<HTMLDivElement>;
  inset: [number, number, number, number];
  radius: number;
}) => {
  const [top, right, bottom, left] = inset;
  return (
    <div className={className}>
      {children}
      <div
        ref={containerRef}
        style={{
          borderRadius: radius,
          bottom,
          // The stack's z-indexes stay inside the box.
          isolation: "isolate",
          left,
          overflow: "hidden",
          pointerEvents: "none",
          position: "absolute",
          right,
          top,
        }}
      />
    </div>
  );
};
