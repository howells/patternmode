"use client";

import { Slider as BaseSlider } from "@base-ui-components/react/slider";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";
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
  } = sliderVariants();

  // Determine current values for rendering thumbs
  const renderValue = value ?? defaultValue ?? [0];
  const valueArray = Array.isArray(renderValue) ? renderValue : [renderValue];

  // Pass controlled or uncontrolled props appropriately
  const sliderProps =
    value !== undefined
      ? ({ ...props, value } as const)
      : ({ ...props, defaultValue: defaultValue ?? [0] } as const);

  if (props.orientation === "vertical") {
    return (
      <div className="flex h-full flex-col items-center">
        <BaseSlider.Root
          className={cx(root(), "flex flex-col items-center", className)}
          data-testid="slider"
          ref={forwardedRef as React.RefObject<HTMLDivElement>}
          {...sliderProps}
        >
          <BaseSlider.Control className={control()}>
            <BaseSlider.Track className={track()}>
              <BaseSlider.Indicator className={indicator()} />
              {valueArray.map((val, index) => (
                <BaseSlider.Thumb
                  className={thumb()}
                  getAriaLabel={() =>
                    ariaLabelThumb || `Slider thumb ${index + 1}`
                  }
                  key={`thumb-${String(val)}`}
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
                      {values.map((val) => (
                        <span key={`value-${String(val)}`}>
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
      >
        <BaseSlider.Control className={control()}>
          <BaseSlider.Track className={track()}>
            <BaseSlider.Indicator className={indicator()} />
            {valueArray.map((val, index) => (
              <BaseSlider.Thumb
                className={thumb()}
                getAriaLabel={() =>
                  ariaLabelThumb || `Slider thumb ${index + 1}`
                }
                key={`thumb-${String(val)}`}
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
                    {values.map((val) => (
                      <span key={`value-${String(val)}`}>
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
