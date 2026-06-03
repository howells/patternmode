"use client";

import { joinClassNames } from "@patternmode/system";
import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import type { ComponentPropsWithRef } from "react";

import { useScrollFrame } from "./scroll-frame-context";

export const ScrollFrameScrollbar = ({
  className,
  orientation,
  ref,
  ...props
}: ComponentPropsWithRef<typeof RadixScrollArea.Scrollbar>) => {
  const { axes, scrollbars } = useScrollFrame();
  const resolvedOrientation = orientation ?? (axes === "horizontal" ? "horizontal" : "vertical");
  return (
    <RadixScrollArea.Scrollbar
      {...props}
      className={joinClassNames("patternmode-scrollframe__scrollbar", className)}
      data-hidden={scrollbars === "hidden" ? "true" : undefined}
      data-slot="scrollframe-scrollbar"
      orientation={resolvedOrientation}
      ref={ref}
    />
  );
};

export const ScrollFrameThumb = ({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof RadixScrollArea.Thumb>) => (
  <RadixScrollArea.Thumb
    {...props}
    className={joinClassNames("patternmode-scrollframe__thumb", className)}
    data-slot="scrollframe-thumb"
    ref={ref}
  />
);

export const ScrollFrameCorner = RadixScrollArea.Corner;
