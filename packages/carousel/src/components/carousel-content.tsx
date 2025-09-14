"use client";

import { cx } from "@patternmode/utils/cx";
import type * as React from "react";
import { useCarousel } from "./carousel-root";

export const CarouselContent = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.RefObject<HTMLDivElement | null>;
}) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div className="overflow-hidden" ref={carouselRef}>
      <div
        className={cx(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
};
CarouselContent.displayName = "CarouselContent";
