"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Range, Root, Thumb, Track } from "@radix-ui/react-slider";
import type React from "react";
import { useMemo } from "react";

/**
 * Range slider component with single or multi-thumb support.
 * Accepts a single number or an array for multi-range selection.
 * Built on Radix UI primitives for accessible behavior.
 *
 * @example
 * ```tsx
 * // Single value
 * <Slider defaultValue={50} />
 *
 * // Range selection
 * <Slider defaultValue={[25, 75]} />
 *
 * // Controlled
 * <Slider value={volume} onValueChange={setVolume} min={0} max={100} />
 * ```
 */
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof Root>) {
  // Coerce single number to array for ergonomic API
  const normalizedDefault = useMemo(() => {
    if (Array.isArray(defaultValue)) return defaultValue;
    if (typeof defaultValue === "number") return [defaultValue];
    return undefined;
  }, [defaultValue]);

  const normalizedValue = useMemo(() => {
    if (Array.isArray(value)) return value;
    if (typeof value === "number") return [value];
    return undefined;
  }, [value]);

  const _values = useMemo(() => {
    if (normalizedValue) return normalizedValue;
    if (normalizedDefault) return normalizedDefault;
    return [min, max];
  }, [normalizedValue, normalizedDefault, min, max]);
  const thumbKeys = useMemo(
    () =>
      Array.from(
        { length: _values.length },
        (_, index) => `slider-thumb-${index}`,
      ),
    [_values.length],
  );

  return (
    <Root
      className={cn(
        "relative flex w-full touch-none select-none items-center py-3 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[disabled]:opacity-50",
        className,
      )}
      data-component="slider"
      data-slot="slider"
      defaultValue={normalizedDefault}
      max={max}
      min={min}
      value={normalizedValue}
      {...props}
    >
      <Track
        className={cn(
          "relative grow overflow-hidden rounded-full bg-gray-200 data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1.5",
        )}
        data-component="slider-track"
        data-slot="slider-track"
      >
        <Range
          className={cn(
            "absolute bg-gray-500 data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
          )}
          data-component="slider-range"
          data-slot="slider-range"
        />
      </Track>
      {thumbKeys.map((thumbKey) => (
        <Thumb
          className="relative block size-6 shrink-0 rounded-full border border-gray-200 bg-white shadow-lg ring-gray-400/30 transition-[color,box-shadow] after:absolute after:top-1/2 after:left-1/2 after:size-3 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-gray-500 hover:ring-4 focus-visible:outline-hidden focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50"
          data-component="slider-thumb"
          data-slot="slider-thumb"
          key={thumbKey}
        />
      ))}
    </Root>
  );
}

export { Slider };
