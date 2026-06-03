"use client";

import { joinClassNames, toCssSize } from "@patternmode/system";
import type { CSSProperties } from "react";

import { useScrollFrame } from "./scroll-frame-context";
import type { ScrollFrameFadeProps } from "./scroll-frame-types";

export const ScrollFrameFade = ({
  axis = "vertical",
  className,
  color,
  edge,
  size,
  style,
  ...props
}: ScrollFrameFadeProps) => {
  const { edgeState } = useScrollFrame();
  const axisState = edgeState[axis];
  const hidden = !axisState.scrollable || axisState[edge === "start" ? "atStart" : "atEnd"];
  const fadeStyle = {
    "--patternmode-scrollframe-fade-color": color,
    "--patternmode-scrollframe-fade-size": toCssSize(size),
    ...style,
  } as CSSProperties;

  return (
    <span
      {...props}
      aria-hidden="true"
      className={joinClassNames("patternmode-scrollframe__fade", className)}
      data-axis={axis}
      data-edge={edge}
      data-hidden={hidden ? "true" : "false"}
      data-slot="scrollframe-fade"
      data-testid={`scrollframe-fade-${axis}-${edge}`}
      style={fadeStyle}
    />
  );
};
