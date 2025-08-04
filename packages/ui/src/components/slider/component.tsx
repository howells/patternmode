// Tremor Slider [v1.0.0] - Base UI

"use client";

import type { VariantProps } from "tailwind-variants";

import { Slider as BaseSlider } from "@base-ui-components/react/slider";
import * as React from "react";
import { tv } from "tailwind-variants";

import { cx, focusRing } from "../../lib/utils";

const sliderVariants = tv({
  slots: {
    root: [
      // base
      "relative flex cursor-pointer touch-none select-none",
      // orientation
      "data-[orientation='horizontal']:w-full data-[orientation='horizontal']:items-center",
      "data-[orientation='vertical']:h-full data-[orientation='vertical']:w-fit data-[orientation='vertical']:justify-center",
      // disabled
      "data-[disabled]:pointer-events-none",
    ],
    control: [
      // base
      "relative w-full h-full flex items-center",
      // orientation
      "data-[orientation='horizontal']:w-full",
      "data-[orientation='vertical']:h-full data-[orientation='vertical']:flex-col",
    ],
    track: [
      // base
      "relative grow rounded-full bg-zinc-200 dark:bg-zinc-800",
      // orientation
      "data-[orientation='horizontal']:h-1.5 data-[orientation='horizontal']:w-full",
      "data-[orientation='vertical']:h-full data-[orientation='vertical']:w-1.5",
    ],
    indicator: [
      // base
      "absolute rounded-full bg-blue-500 dark:bg-blue-500",
      // orientation
      "data-[orientation='horizontal']:h-full",
      "data-[orientation='vertical']:w-full",
      // disabled
      "data-[disabled]:bg-zinc-300 dark:data-[disabled]:bg-zinc-700",
    ],
    thumb: [
      // base
      "block size-4 shrink-0 rounded-full border shadow-sm",
      // border color
      "border-zinc-400 dark:border-zinc-500",
      // background color
      "bg-white dark:bg-white",
      // disabled
      "data-[disabled]:pointer-events-none data-[disabled]:bg-zinc-200 dark:data-[disabled]:border-zinc-800 dark:data-[disabled]:bg-zinc-600",
      // focus
      focusRing,
      "outline-offset-0",
    ],
    value: [
      // base
      "text-sm font-medium text-zinc-900 dark:text-zinc-50",
      // spacing
      "mb-2",
    ],
  },
});

type SliderProps = {
  /**
   * Aria label for the slider thumb for accessibility.
   * Provides context for screen readers about what the slider controls.
   */
  ariaLabelThumb?: string;
  /**
   * Whether to display the current value above or beside the slider.
   * Shows the formatted value to help users understand the current selection.
   */
  showValue?: boolean;
  /**
   * Function to format the displayed value when showValue is true.
   * Allows custom formatting like currency, percentages, or units.
   */
  valueFormatter?: (value: number) => string;
} & Omit<
      React.ComponentPropsWithoutRef<typeof BaseSlider.Root>,
      "children"
    > & VariantProps<typeof sliderVariants>;

/**
 * Range slider component for selecting numeric values within a specified range.
 */
const Slider = (
  { ref: forwardedRef, className, ariaLabelThumb, showValue = false, valueFormatter = value => value.toString(), value, defaultValue, ...props }: SliderProps & { ref?: React.RefObject<React.ElementRef<typeof BaseSlider.Root> | null> },
) => {
  const {
    root,
    control,
    track,
    indicator,
    thumb,
    value: valueClass,
  } = sliderVariants();
  
  // Ensure we always have a proper value to avoid hydration mismatches
  const currentValue = value ?? defaultValue ?? [0];
  const valueArray = Array.isArray(currentValue)
    ? currentValue
    : [currentValue];
  
  // Clean props to pass to BaseSlider - ensure value is never undefined
  const sliderProps = {
    ...props,
    value: currentValue,
    defaultValue: defaultValue ?? [0],
  };

  if (props.orientation === "vertical") {
    return (
      <div className="flex flex-col items-center h-full">
        <BaseSlider.Root
          ref={forwardedRef as any}
          className={cx(root(), "flex flex-col items-center", className)}
          data-testid="slider"
          {...sliderProps}
        >
          <BaseSlider.Control className={control()}>
            <BaseSlider.Track className={track()}>
              <BaseSlider.Indicator className={indicator()} />
              {valueArray.map((_, index) => (
                <BaseSlider.Thumb
                  key={index}
                  className={thumb()}
                  getAriaLabel={() =>
                    ariaLabelThumb || `Slider thumb ${index + 1}`}
                />
              ))}
            </BaseSlider.Track>
          </BaseSlider.Control>
          {showValue && (
            <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
              <BaseSlider.Value>
                {(formattedValues, values) =>
                  values.length === 1
                    ? (
                        <div className="text-center">
                          <span>{valueFormatter(values[0])}</span>
                        </div>
                      )
                    : (
                        <div className="flex flex-col items-center gap-1">
                          {values.map((val, index) => (
                            <span key={index}>{valueFormatter(val)}</span>
                          ))}
                        </div>
                      )}
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
        ref={forwardedRef as any}
        className={cx(root(), className)}
        data-testid="slider"
        {...sliderProps}
      >
        <BaseSlider.Control className={control()}>
          <BaseSlider.Track className={track()}>
            <BaseSlider.Indicator className={indicator()} />
            {valueArray.map((_, index) => (
              <BaseSlider.Thumb
                key={index}
                className={thumb()}
                getAriaLabel={() =>
                  ariaLabelThumb || `Slider thumb ${index + 1}`}
              />
            ))}
          </BaseSlider.Track>
        </BaseSlider.Control>
        {showValue && (
          <div className="ml-2 text-xs text-zinc-500 dark:text-zinc-400">
            <BaseSlider.Value>
              {(formattedValues, values) =>
                values.length === 1
                  ? (
                      <div className="w-full text-center">
                        <span>{valueFormatter(values[0])}</span>
                      </div>
                    )
                  : (
                      <div className="flex justify-between w-full">
                        {values.map((val, index) => (
                          <span key={index}>{valueFormatter(val)}</span>
                        ))}
                      </div>
                    )}
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

export { Slider, SliderControl, SliderIndicator, type SliderProps, SliderRoot, SliderThumb, SliderTrack, SliderValue, sliderVariants };
