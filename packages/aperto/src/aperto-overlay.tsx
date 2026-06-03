"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { m } from "motion/react";
import type { Transition } from "motion/react";
import type { CSSProperties, Ref } from "react";

import { useApertoContext } from "./context";
import { easings } from "./motion-tokens";

export interface ApertoOverlayProps {
  className?: string;
  /** Internal flag used to fade the overlay during measured close transitions. */
  fadeOut?: boolean;
  ref?: Ref<HTMLDivElement>;
  style?: CSSProperties;
}

/** Overlay always fades gently regardless of the content's motion preset. */
const OVERLAY_TRANSITION: Transition = {
  duration: 0.3,
  ease: easings.customGentle,
};

const OVERLAY_TRANSITION_REDUCED: Transition = {
  duration: 0.01,
  ease: "linear",
};

const ApertoOverlay = ({ className, fadeOut, ref, style }: ApertoOverlayProps) => {
  const ctx = useApertoContext();
  const transition = ctx.reduceMotion ? OVERLAY_TRANSITION_REDUCED : OVERLAY_TRANSITION;

  return (
    <Dialog.Overlay asChild forceMount>
      <m.div
        animate={{ opacity: fadeOut ? 0 : 1 }}
        className={className}
        data-slot="aperto-overlay"
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        ref={ref}
        style={style}
        transition={transition}
      />
    </Dialog.Overlay>
  );
};

ApertoOverlay.displayName = "ApertoOverlay";

export { ApertoOverlay };
