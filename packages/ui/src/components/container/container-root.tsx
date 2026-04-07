import { forwardRef, type HTMLAttributes } from "react";

import type { ComponentSize } from "../../lib/size";
import { cn } from "../../utils/cn";

type ContainerSize = ComponentSize | "xl";

const MAX_WIDTH_CLASSES: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  base: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

const PADDING_X_CLASSES: Record<ComponentSize, string> = {
  sm: "px-4",
  base: "px-6",
  lg: "px-8",
};

const PADDING_Y_CLASSES: Record<ComponentSize, string> = {
  sm: "py-4",
  base: "py-6",
  lg: "py-10",
};

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  fluid?: boolean;
  px?: ComponentSize;
  py?: ComponentSize;
  size?: ContainerSize;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    { className, fluid = false, px = "base", py, size = "xl", ...props },
    ref
  ) => {
    return (
      <div
        className={cn(
          "mx-auto w-full",
          fluid ? undefined : MAX_WIDTH_CLASSES[size],
          PADDING_X_CLASSES[px],
          py ? PADDING_Y_CLASSES[py] : undefined,
          className
        )}
        data-slot="container"
        ref={ref}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

export { Container };
