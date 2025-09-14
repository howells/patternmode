"use client";

import { Button } from "@patternmode/button";
import { cx } from "@patternmode/utils/cx";
import { ArrowRight } from "lucide-react";
import type * as React from "react";
import { useCarousel } from "./carousel-root";

export const CarouselNext = ({
  ref,
  className,
  variant = "secondary",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button> & {
  ref?: React.RefObject<HTMLButtonElement | null>;
}) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      className={cx(
        "absolute",
        orientation === "horizontal"
          ? "-right-12 -translate-y-1/2 top-1/2"
          : "-bottom-12 -translate-x-1/2 left-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      leftIcon={ArrowRight}
      onClick={scrollNext}
      ref={ref}
      rounded={true}
      size={size}
      variant={variant}
      {...props}
    >
      <span className="sr-only">Next slide</span>
    </Button>
  );
};
CarouselNext.displayName = "CarouselNext";
