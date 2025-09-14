"use client";

import { cx } from "@patternmode/utils/cx";
import type * as React from "react";
import { useCarousel } from "./carousel-root";

export const CarouselItem = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.RefObject<HTMLDivElement | null>;
}) => {
  const { orientation } = useCarousel();

  return (
    <div
      className={cx(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      ref={ref}
      {...props}
    />
  );
};
CarouselItem.displayName = "CarouselItem";
