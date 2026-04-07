"use client";

import { Range, Root, Thumb, Track } from "@radix-ui/react-slider";
import { type ComponentPropsWithoutRef, useMemo } from "react";

import { cn } from "../../utils/cn";

export interface SliderProps extends ComponentPropsWithoutRef<typeof Root> {}

function Slider({
  className,
  defaultValue,
  max = 100,
  min = 0,
  value,
  ...props
}: SliderProps) {
  const values = useMemo(() => {
    if (Array.isArray(value)) {
      return value;
    }

    if (Array.isArray(defaultValue)) {
      return defaultValue;
    }

    return [min];
  }, [defaultValue, min, value]);

  return (
    <Root
      className={cn(
        "relative flex w-full touch-none select-none items-center py-3",
        "data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-6 data-[orientation=vertical]:flex-col",
        "data-[disabled]:opacity-45",
        className
      )}
      data-slot="slider"
      defaultValue={defaultValue}
      max={max}
      min={min}
      value={value}
      {...props}
    >
      <Track
        className={cn(
          "relative grow overflow-hidden rounded-full bg-secondary/90",
          "data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2"
        )}
        data-slot="slider-track"
      >
        <Range
          className={cn(
            "absolute bg-accent",
            "data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          )}
          data-slot="slider-range"
        />
      </Track>

      {values.map((currentValue) => (
        <Thumb
          className={cn(
            "block size-5 rounded-full border border-white bg-panel shadow-sm outline-none transition-[box-shadow,border-color]",
            "after:absolute after:inset-1 after:rounded-full after:bg-accent",
            "focus-visible:ring-4 focus-visible:ring-ring/15 disabled:pointer-events-none disabled:opacity-45"
          )}
          data-slot="slider-thumb"
          key={`slider-thumb-${currentValue}`}
        />
      ))}
    </Root>
  );
}

export { Slider };
