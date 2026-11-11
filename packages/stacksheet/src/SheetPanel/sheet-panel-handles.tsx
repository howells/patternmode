import { easings } from "@howells/motion";
import { m } from "motion/react";
import type { CSSProperties } from "react";
import type { HandlePosition, Side } from "../types";

export const BottomHandle = ({
  onDismiss,
  position = "inside",
}: {
  onDismiss?: () => void;
  position?: HandlePosition;
}) => (
  <button
    aria-label="Dismiss"
    className="patternmode-stacksheet__bottom-handle"
    data-stacksheet-handle=""
    data-stacksheet-handle-position={position}
    onClick={onDismiss}
    type="button"
  >
    <div aria-hidden="true" className="patternmode-stacksheet__bottom-handle-pill" />
  </button>
);
export const SideHandle = ({
  side,
  isHovered,
  onDismiss,
}: {
  side: Side;
  isHovered: boolean;
  onDismiss?: () => void;
}) => {
  const position: CSSProperties = side === "right" ? { right: "100%" } : { left: "100%" };
  return (
    <m.button
      animate={{ opacity: isHovered ? 1 : 0 }}
      aria-label="Dismiss"
      className="patternmode-stacksheet__side-handle"
      data-stacksheet-handle=""
      onClick={onDismiss}
      style={position}
      transition={{ duration: isHovered ? 0.15 : 0.4, ease: easings.snappy }}
      type="button"
    >
      <div aria-hidden="true" className="patternmode-stacksheet__side-handle-pill" />
    </m.button>
  );
};
