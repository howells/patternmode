import { m } from "motion/react";
import { useEffect } from "react";

import { useApertoContext } from "./context";
import { ApertoTransitionMedia } from "./media-rendering";
import { rectTarget, transitionDurationMs } from "./media-transition-utils";
import type { ApertoMediaTransition } from "./media-transition-utils";
import type { RenderImage, RenderVideo } from "./types";

export const ApertoMediaTransitionClone = ({
  onComplete,
  renderImage,
  renderVideo,
  transition,
}: {
  onComplete: () => void;
  renderImage?: RenderImage;
  renderVideo?: RenderVideo;
  transition: ApertoMediaTransition | null;
}) => {
  const ctx = useApertoContext();

  useEffect(() => {
    if (!transition?.to) {
      return;
    }

    const timer = setTimeout(onComplete, transitionDurationMs(ctx.preset.transition));
    return () => clearTimeout(timer);
  }, [ctx.preset.transition, onComplete, transition]);

  if (!transition?.to) {
    return null;
  }

  return (
    <m.div
      animate={rectTarget(transition.to)}
      aria-hidden="true"
      data-slot="aperto-transition-media"
      initial={rectTarget(transition.from)}
      style={{
        borderRadius: "var(--aperto-radius, 0.5rem)",
        overflow: "hidden",
        pointerEvents: "none",
        position: "fixed",
        zIndex: 30,
      }}
      transition={ctx.preset.transition}
    >
      <ApertoTransitionMedia
        item={transition.item}
        renderImage={renderImage}
        renderVideo={renderVideo}
      />
    </m.div>
  );
};
