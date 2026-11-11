import { m } from "motion/react";

import { useApertoContext } from "./context";
import { ApertoTransitionMedia } from "./media-rendering";
import { rectTarget } from "./media-transition-utils";
import type { ApertoMediaTransition } from "./media-transition-utils";
import type { RenderImage, RenderVideo } from "./types";

/**
 * Flies a copy of the media between the Thumbnail and the Expanded Media.
 * `onComplete` fires when Motion reports the flight finished, so springs end
 * when they settle rather than after a fixed duration.
 */
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

  if (transition === null) {
    return null;
  }

  return (
    <m.div
      animate={rectTarget(transition.to)}
      aria-hidden="true"
      data-slot="aperto-transition-media"
      initial={rectTarget(transition.from)}
      onAnimationComplete={onComplete}
      style={{
        borderRadius: "var(--aperto-radius, 0.5rem)",
        overflow: "hidden",
        pointerEvents: "none",
        position: "fixed",
        zIndex: "var(--patternmode-aperto-clone-z, 1002)",
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
