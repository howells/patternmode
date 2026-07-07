"use client";

import { Dialog } from "@base-ui/react/dialog";
import { m } from "motion/react";
import type { Transition } from "motion/react";
import type { CSSProperties, Ref } from "react";

import { useApertoContext } from "./context";
import { easings } from "@howells/motion";

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
    // `hidden={false}` neutralises Base UI's `hidden: !mounted` so the backdrop
    // stays visible while Motion fades it out on close (Motion animations are
    // invisible to Base UI's `getAnimations()`-based unmount detection).
    <Dialog.Backdrop
      hidden={false}
      render={
        <m.div
          animate={{ opacity: fadeOut === true ? 0 : 1 }}
          className={className}
          data-slot="aperto-overlay"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          ref={ref}
          style={style}
          transition={transition}
        />
      }
    />
  );
};

ApertoOverlay.displayName = "ApertoOverlay";

export { ApertoOverlay };
