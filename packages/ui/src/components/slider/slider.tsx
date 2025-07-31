// Tremor Slider [v1.0.0] - Base UI

"use client";

import { cx, focusRing } from "../../lib/utils";
import { Slider as BaseSlider } from "@base-ui-components/react/slider";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

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

/**
 * Props for the Slider component.
 *
 * @interface SliderProps
 * @extends Omit<React.ComponentPropsWithoutRef<typeof BaseSlider.Root>, "children">
 * @extends VariantProps<typeof sliderVariants>
 * @example
 * ```tsx
 * <Slider defaultValue={50} />
 * ```
 */
interface SliderProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof BaseSlider.Root>,
      "children"
    >,
    VariantProps<typeof sliderVariants> {
  /** Aria label for the slider thumb */
  ariaLabelThumb?: string;
  /** Whether to show the current value */
  showValue?: boolean;
  /** Function to format the displayed value */
  valueFormatter?: (value: number) => string;
}

/**
 * A range input slider component built on Base UI's Slider primitive.
 *
 * Based on Base UI's Slider (https://base-ui.com/react/components/slider),
 * providing accessible range input controls with keyboard navigation and
 * customizable appearance. Supports single values, ranges, and custom formatting.
 *
 * @param value - Current slider value(s)
 * @param defaultValue - Default slider value(s)
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @param step - Step increment for value changes
 * @param orientation - Slider orientation (horizontal or vertical)
 * @param disabled - Whether the slider is disabled
 * @param ariaLabelThumb - Accessibility label for the thumb
 * @param showValue - Whether to display the current value
 * @param valueFormatter - Function to format displayed values
 *
 *
 * @id slider
 * @name Slider
 * @component
 * @example
 * ```tsx
 * // Basic slider
 * <Slider defaultValue={[50]} min={0} max={100} />
 *
 * // With value display
 * <Slider
 *   defaultValue={[25]}
 *   min={0}
 *   max={100}
 *   showValue
 *   step={5}
 * />
 *
 * // Custom value formatting
 * <Slider
 *   defaultValue={[75]}
 *   min={0}
 *   max={100}
 *   showValue
 *   valueFormatter={(value) => `${value}%`}
 * />
 *
 * // Range slider
 * <Slider defaultValue={[25, 75]} min={0} max={100} showValue />
 *
 * // Vertical orientation
 * <Slider
 *   defaultValue={[50]}
 *   orientation="vertical"
 *   className="h-32"
 * />
 *
 * // Controlled slider
 * <Slider
 *   value={sliderValue}
 *   onValueChange={setSliderValue}
 *   min={0}
 *   max={200}
 *   step={10}
 *   showValue
 *   valueFormatter={(value) => `$${value}`}
 * />
 *
 * // Disabled slider
 * <Slider defaultValue={[30]} disabled />
 * ```
 *
 * @see https://base-ui.com/react/components/slider - Base UI documentation
 */
/**
 * An input where the user selects a value from within a given range.
 *
 * @id slider
 * @name Slider
 * @component
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof BaseSlider.Root>,
  SliderProps
>(
  (
    {
      className,
      ariaLabelThumb,
      showValue = false,
      valueFormatter = (value) => value.toString(),
      ...props
    },
    forwardedRef
  ) => {
    const {
      root,
      control,
      track,
      indicator,
      thumb,
      value: valueClass,
    } = sliderVariants();
    const currentValue = props.value || props.defaultValue || [0];
    const valueArray = Array.isArray(currentValue)
      ? currentValue
      : [currentValue];

    if (props.orientation === "vertical") {
      return (
        <div className="flex flex-col items-center h-full">
          <BaseSlider.Root
            ref={forwardedRef as any}
            className={cx(root(), "flex flex-col items-center", className)}
            {...props}
          >
            <BaseSlider.Control className={control()}>
              <BaseSlider.Track className={track()}>
                <BaseSlider.Indicator className={indicator()} />
                {valueArray.map((_, index) => (
                  <BaseSlider.Thumb
                    key={index}
                    className={thumb()}
                    getAriaLabel={() =>
                      ariaLabelThumb || `Slider thumb ${index + 1}`
                    }
                  />
                ))}
              </BaseSlider.Track>
            </BaseSlider.Control>
            {showValue && (
              <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
                <BaseSlider.Value>
                  {(formattedValues, values) =>
                    values.length === 1 ? (
                      <div className="text-center">
                        <span>{valueFormatter(values[0])}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        {values.map((val, index) => (
                          <span key={index}>{valueFormatter(val)}</span>
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
          ref={forwardedRef as any}
          className={cx(root(), className)}
          {...props}
        >
          <BaseSlider.Control className={control()}>
            <BaseSlider.Track className={track()}>
              <BaseSlider.Indicator className={indicator()} />
              {valueArray.map((_, index) => (
                <BaseSlider.Thumb
                  key={index}
                  className={thumb()}
                  getAriaLabel={() =>
                    ariaLabelThumb || `Slider thumb ${index + 1}`
                  }
                />
              ))}
            </BaseSlider.Track>
          </BaseSlider.Control>
          {showValue && (
            <div className="ml-2 text-xs text-zinc-500 dark:text-zinc-400">
              <BaseSlider.Value>
                {(formattedValues, values) =>
                  values.length === 1 ? (
                    <div className="w-full text-center">
                      <span>{valueFormatter(values[0])}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between w-full">
                      {values.map((val, index) => (
                        <span key={index}>{valueFormatter(val)}</span>
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
);

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
  sliderVariants,
};
