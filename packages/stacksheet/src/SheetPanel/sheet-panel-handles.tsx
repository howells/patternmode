import { m } from "motion/react";
import type { CSSProperties } from "react";
import type { Side } from "../types";

export const BottomHandle = ({ onDismiss }: { onDismiss?: () => void }) => (
  <button
    aria-label="Dismiss"
    className="absolute inset-x-0 top-0 z-10 flex w-full cursor-grab touch-none items-center justify-center border-none bg-transparent pt-2.5 pb-2"
    data-stacksheet-handle=""
    onClick={onDismiss}
    type="button"
  >
    <div aria-hidden="true" className="h-[5px] w-9 rounded-full bg-current/15" />
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
      className="absolute top-0 bottom-0 flex w-6 cursor-grab touch-none items-center justify-center border-none bg-transparent p-0 text-inherit"
      data-stacksheet-handle=""
      onClick={onDismiss}
      style={position}
      transition={{ duration: isHovered ? 0.15 : 0.4, ease: "easeOut" }}
      type="button"
    >
      <div aria-hidden="true" className="h-8 w-1 rounded-full bg-current/20" />
    </m.button>
  );
};
