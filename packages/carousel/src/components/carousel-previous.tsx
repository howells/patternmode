"use client";

import { Button } from "@patternmode/button";
import { cx } from "@patternmode/utils/cx";
import { ArrowLeft } from "lucide-react";
import type * as React from "react";
import { useCarousel } from "./carousel-root";

export const CarouselPrevious = ({
  ref,
  className,
  variant = "secondary",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button> & {
  ref?: React.RefObject<HTMLButtonElement | null>;
}) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      className={cx(
        "absolute",
        orientation === "horizontal"
          ? "-left-12 -translate-y-1/2 top-1/2"
          : "-top-12 -translate-x-1/2 left-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      leftIcon={ArrowLeft}
      onClick={scrollPrev}
      ref={ref}
      rounded={true}
      size={size}
      variant={variant}
      {...props}
    >
      <span className="sr-only">Previous slide</span>
    </Button>
  );
};
CarouselPrevious.displayName = "CarouselPrevious";
