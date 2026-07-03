import { m } from "motion/react";
import { useEffect, useRef } from "react";

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
  // Hold the latest onComplete in a ref so parent re-renders (which recreate the
  // callback) do not restart the completion countdown mid-transition.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (transition?.to !== undefined) {
      timer = setTimeout(() => {
        onCompleteRef.current();
      }, transitionDurationMs(ctx.preset.transition));
    }

    return () => {
      if (timer !== undefined) {
        clearTimeout(timer);
      }
    };
  }, [ctx.preset.transition, transition]);

  if (transition?.to === undefined) {
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
