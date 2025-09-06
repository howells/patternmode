"use client";

import { Slider as BaseSlider } from "@base-ui-components/react/slider";
import { cx } from "@patternmode/utils/cx";
import * as React from "react";
import type { SliderProps } from "./types";
import { sliderVariants } from "./variants";

/**
 * Range slider component for selecting numeric values within a specified range.
 */
const Slider = ({
  ref: forwardedRef,
  className,
  ariaLabelThumb,
  showValue = false,
  valueFormatter = (v) => v.toString(),
  value,
  defaultValue,
  onValueChange,
  onValueCommit,
  ...props
}: SliderProps & {
  ref?: React.RefObject<React.ElementRef<typeof BaseSlider.Root> | null>;
}) => {
  const {
    root,
    control,
    track,
    indicator,
    thumb,
    value: _valueClass,
  } = sliderVariants({ accent: (props as { accent?: boolean }).accent });

  // Helpers to normalize value
  const toArray = (v: number | [number, number]) =>
    (Array.isArray(v) ? v : [v]) as number[];
  const toUnion = (arr: number[]): number | [number, number] =>
    arr.length === 1
      ? arr[0]
      : ([Math.min(arr[0], arr[1]), Math.max(arr[0], arr[1])] as [
          number,
          number,
        ]);

  // Controlled vs uncontrolled internal state (Base UI expects arrays)
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<number[]>(
    toArray(defaultValue ?? 0)
  );
  const currentArray = isControlled ? toArray(value!) : internal;

  // Determine current values for rendering thumbs
  const renderValue = value ?? defaultValue ?? [0];
  const valueArray = Array.isArray(renderValue) ? renderValue : [renderValue];

  // Accessible default labels for a 2-thumb range when a custom label isn't provided
  const getThumbAriaLabel = (index: number) => {
    if (ariaLabelThumb) return ariaLabelThumb;
    if (valueArray.length === 2) {
      return index === 0 ? "Minimum value" : "Maximum value";
    }
    return `Slider thumb ${index + 1}`;
  };

  // Pass controlled or uncontrolled props appropriately (Base UI expects arrays)
  const sliderProps = { ...props, value: currentArray } as const;

  const updateValue = (next: number[]) => {
    const sorted = next.length === 2 ? [...next].sort((a, b) => a - b) : next;
    if (!isControlled) setInternal(sorted);
    onValueChange?.(toUnion(sorted));
  };

  const commitValue = (vals: number[]) => {
    const sorted = vals.length === 2 ? [...vals].sort((a, b) => a - b) : vals;
    onValueCommit?.(toUnion(sorted));
  };

  // Click-on-track support: jump nearest thumb to clicked position
  const hitRef = React.useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = React.useState(false);
  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if ((props as { disabled?: boolean }).disabled) return;
    if (
      e.target instanceof Element &&
      e.target.closest('[data-thumb="true"]')
    ) {
      // Let thumb drags be handled natively by the slider
      return;
    }
    const el = hitRef.current;
    if (!el) return;
    setDragging(true);
    const rect = el.getBoundingClientRect();
    const horizontal = props.orientation !== "vertical";
    const min = (props as { min?: number }).min ?? 0;
    const max = (props as { max?: number }).max ?? 100;
    const step = (props as { step?: number }).step ?? 1;

    let ratio = 0;
    if (horizontal) ratio = (e.clientX - rect.left) / rect.width;
    else ratio = 1 - (e.clientY - rect.top) / rect.height;
    ratio = Math.min(1, Math.max(0, ratio));
    const raw = min + ratio * (max - min);
    const snapped = Math.min(
      max,
      Math.max(min, min + Math.round((raw - min) / step) * step)
    );

    const curr = currentArray;
    const next =
      curr.length === 2
        ? (() => {
            const d0 = Math.abs(curr[0] - snapped);
            const d1 = Math.abs(curr[1] - snapped);
            const idx = d0 <= d1 ? 0 : 1;
            const arr = [...curr];
            arr[idx] = snapped;
            return arr;
          })()
        : [snapped];

    updateValue(next);
    commitValue(next);
  };

  if (props.orientation === "vertical") {
    return (
      <div className="flex h-full flex-col items-center">
        <BaseSlider.Root
          className={cx(root(), "flex flex-col items-center", className)}
          data-testid="slider"
          ref={forwardedRef as React.RefObject<HTMLDivElement>}
          {...sliderProps}
          onValueChange={(vals: number[]) => onValueChange?.(toUnion(vals))}
          onValueCommitted={(vals: number[]) => onValueCommit?.(toUnion(vals))}
        >
          <BaseSlider.Control
            className={control()}
            onPointerCancel={() => setDragging(false)}
            onPointerDown={handlePointerDown}
            onPointerUp={() => setDragging(false)}
            ref={hitRef}
          >
            <BaseSlider.Track className={track()}>
              <BaseSlider.Indicator className={indicator()} />
              {valueArray.map((val, index) => (
                <BaseSlider.Thumb
                  className={cx(
                    thumb(),
                    dragging
                      ? "scale-105 transform duration-0"
                      : "transform transition-transform duration-200 ease-out"
                  )}
                  data-thumb="true"
                  getAriaLabel={() => getThumbAriaLabel(index)}
                  key={`thumb-${index}-${String(val)}`}
                  onPointerCancel={() => setDragging(false)}
                  onPointerDown={() => setDragging(true)}
                  onPointerUp={() => setDragging(false)}
                />
              ))}
            </BaseSlider.Track>
          </BaseSlider.Control>
          {showValue && (
            <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
              <BaseSlider.Value>
                {(_formattedValues, values) =>
                  values.length === 1 ? (
                    <div className="text-center">
                      <span>{valueFormatter(values[0])}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      {values.map((val, i) => (
                        <span key={`value-${i}-${String(val)}`}>
                          {valueFormatter(val)}
                        </span>
                      ))}
                    </div>
                  )
                }
              </BaseSlider.Value>
            </div>
          )}
        </BaseSlider.Root>
      </div>
    );
  }

  return (
    <div className="w-full">
      <BaseSlider.Root
        className={cx(root(), className)}
        data-testid="slider"
        ref={forwardedRef as React.RefObject<HTMLDivElement>}
        {...sliderProps}
        onValueChange={(vals: number[]) => updateValue(vals)}
        onValueCommitted={(vals: number[]) => commitValue(vals)}
      >
        <BaseSlider.Control
          className={control()}
          onPointerCancel={() => setDragging(false)}
          onPointerDown={handlePointerDown}
          onPointerUp={() => setDragging(false)}
          ref={hitRef}
        >
          <BaseSlider.Track className={track()}>
            <BaseSlider.Indicator className={indicator()} />
            {valueArray.map((val, index) => (
              <BaseSlider.Thumb
                className={cx(
                  thumb(),
                  dragging
                    ? "scale-105 transform duration-0"
                    : "transform transition-transform duration-200 ease-out"
                )}
                data-thumb="true"
                getAriaLabel={() => getThumbAriaLabel(index)}
                key={`thumb-${index}-${String(val)}`}
                onPointerCancel={() => setDragging(false)}
                onPointerDown={() => setDragging(true)}
                onPointerUp={() => setDragging(false)}
              />
            ))}
          </BaseSlider.Track>
        </BaseSlider.Control>
        {showValue && (
          <div className="ml-2 text-xs text-zinc-500 dark:text-zinc-400">
            <BaseSlider.Value>
              {(_formattedValues, values) =>
                values.length === 1 ? (
                  <div className="w-full text-center">
                    <span>{valueFormatter(values[0])}</span>
                  </div>
                ) : (
                  <div className="flex w-full justify-between">
                    {values.map((val, i) => (
                      <span key={`value-${i}-${String(val)}`}>
                        {valueFormatter(val)}
                      </span>
                    ))}
                  </div>
                )
              }
            </BaseSlider.Value>
          </div>
        )}
      </BaseSlider.Root>
    </div>
  );
};

Slider.displayName = "Slider";

// Export individual components for advanced usage
const SliderRoot = BaseSlider.Root;
const SliderValue = BaseSlider.Value;
const SliderControl = BaseSlider.Control;
const SliderTrack = BaseSlider.Track;
const SliderIndicator = BaseSlider.Indicator;
const SliderThumb = BaseSlider.Thumb;

export {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  SliderValue,
};
