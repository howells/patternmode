"use client";

import { ScrollFrameNext, ScrollFramePrevious } from "./scroll-frame-controls";
import { ScrollFrameFade } from "./scroll-frame-fade";
import { ScrollFrameRoot } from "./scroll-frame-root";
import {
  ScrollFrameCorner,
  ScrollFrameScrollbar,
  ScrollFrameThumb,
} from "./scroll-frame-scrollbar";
import type { ScrollFrameAxis, ScrollFrameProps } from "./scroll-frame-types";
import { defaultControlAxis, shouldRenderFade, supportsAxis } from "./scroll-frame-utils";
import { ScrollFrameViewport } from "./scroll-frame-viewport";

const ScrollFrameBase = ({
  axes = "vertical",
  children,
  contentClassName,
  contentStyle,
  controls = false,
  controlVisibility,
  dragScroll,
  fades = true,
  ref,
  scrollbars = "auto",
  viewportClassName,
  viewportRef,
  viewportStyle,
  ...props
}: ScrollFrameProps) => {
  const controlConfig = typeof controls === "object" ? controls : {};
  const controlsEnabled = controls !== false;
  const controlAxis = controlConfig.axis ?? defaultControlAxis(axes);
  const visibility =
    controlConfig.visibility ?? controlVisibility ?? (controlsEnabled ? "auto" : "hidden");
  const fadeAxes: ScrollFrameAxis[] = axes === "both" ? ["vertical", "horizontal"] : [axes];

  return (
    <ScrollFrameRoot
      {...props}
      axes={axes}
      controlVisibility={visibility}
      dragScroll={dragScroll}
      ref={ref}
      scrollbars={scrollbars}
    >
      {controlsEnabled ? <ScrollFramePrevious axis={controlAxis} visibility={visibility} /> : null}
      <ScrollFrameViewport
        className={viewportClassName}
        contentClassName={contentClassName}
        contentStyle={contentStyle}
        style={viewportStyle}
        viewportRef={viewportRef}
      >
        {children}
      </ScrollFrameViewport>
      {fadeAxes.map((axis) =>
        (["start", "end"] as const).map((edge) =>
          shouldRenderFade(fades, axis, edge) ? (
            <ScrollFrameFade axis={axis} edge={edge} key={`${axis}-${edge}`} />
          ) : null,
        ),
      )}
      {supportsAxis(axes, "vertical") ? (
        <ScrollFrameScrollbar orientation="vertical">
          <ScrollFrameThumb />
        </ScrollFrameScrollbar>
      ) : null}
      {supportsAxis(axes, "horizontal") ? (
        <ScrollFrameScrollbar orientation="horizontal">
          <ScrollFrameThumb />
        </ScrollFrameScrollbar>
      ) : null}
      {axes === "both" ? <ScrollFrameCorner /> : null}
      {controlsEnabled ? <ScrollFrameNext axis={controlAxis} visibility={visibility} /> : null}
    </ScrollFrameRoot>
  );
};

const ScrollFrame = Object.assign(ScrollFrameBase, {
  Corner: ScrollFrameCorner,
  Fade: ScrollFrameFade,
  Next: ScrollFrameNext,
  Previous: ScrollFramePrevious,
  Root: ScrollFrameRoot,
  Scrollbar: ScrollFrameScrollbar,
  Thumb: ScrollFrameThumb,
  Viewport: ScrollFrameViewport,
});

export { ScrollFrame };
