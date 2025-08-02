// Tremor Slider [v1.0.0] - Base UI

"use client";

import type { VariantProps } from "tailwind-variants";

import { Slider as BaseSlider } from "@base-ui-components/react/slider";
import * as React from "react";
import { tv } from "tailwind-variants";

import { cx, focusRing } from "../../../lib/utils";

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
 * @augments Omit<React.ComponentPropsWithoutRef<typeof BaseSlider.Root>, "children">
 * @augments VariantProps<typeof sliderVariants>
 * @example
 * ```tsx
 * <Slider defaultValue={50} />
 * ```
 */
type SliderProps = {
  /**
   * Aria label for the slider thumb.
   */
  ariaLabelThumb?: string;
  /**
   * Whether to show the current value.
   */
  showValue?: boolean;
  /**
   * Function to format the displayed value.
   */
  valueFormatter?: (value: number) => string;
} & Omit<
      React.ComponentPropsWithoutRef<typeof BaseSlider.Root>,
      "children"
    > & VariantProps<typeof sliderVariants>;

/**
 * A highly accessible range input slider component for selecting numeric values within a specified range.
 *
 * Built on Base UI's Slider primitive, this component provides smooth, interactive control for numeric
 * input with full keyboard accessibility and customizable appearance. Supports both single values and
 * range selection with optional value display and custom formatting.
 *
 * **Key Features:**
 * - **Single & Range Values**: Support for single value selection or range selection with two thumbs
 * - **Keyboard Accessible**: Full keyboard navigation with arrow keys and page up/down
 * - **Orientation Support**: Both horizontal (default) and vertical orientations
 * - **Value Display**: Optional current value display with custom formatting
 * - **Step Control**: Configurable step increments for precise value control
 * - **Smooth Interaction**: Responsive dragging with visual feedback
 * - **Touch Support**: Optimized for touch devices with proper touch targets.
 *
 * **Common Use Cases:**
 * - Price range filters in e-commerce
 * - Volume or brightness controls
 * - Date range selection (with numeric values)
 * - Percentage settings and configurations
 * - Image or video scrubbing controls
 * - Quantity selectors with visual feedback
 * - Settings panels for numeric preferences.
 *
 * **Accessibility:**
 * - Full keyboard navigation with arrow keys, home, end, page up/down
 * - Proper ARIA labels and value announcements
 * - Screen reader compatible with value changes announced
 * - Focus management and visual focus indicators
 * - Semantic slider role with proper min/max/value attributes.
 *
 * @category inputs
 * @icon SlidersHorizontal
 * @example
 * ```tsx
 * // Basic single value slider
 * <Slider
 *   defaultValue={[50]}
 *   min={0}
 *   max={100}
 *   step={1}
 *   onValueChange={(values) => console.log('Value:', values[0])}
 * />
 *
 * // Price range filter with value display
 * <Slider
 *   defaultValue={[25, 75]}
 *   min={0}
 *   max={200}
 *   step={5}
 *   showValue
 *   valueFormatter={(value) => `$${value}`}
 *   onValueChange={(range) => setpriceRange(range)}
 * />
 *
 * // Percentage slider with custom formatting
 * <Slider
 *   value={[opacity]}
 *   onValueChange={([value]) => setOpacity(value)}
 *   min={0}
 *   max={100}
 *   step={1}
 *   showValue
 *   valueFormatter={(value) => `${value}% opacity`}
 *   ariaLabelThumb="Opacity level"
 * />
 *
 * // Vertical volume control
 * <div className="h-32 flex justify-center">
 *   <Slider
 *     defaultValue={[volume]}
 *     min={0}
 *     max={100}
 *     orientation="vertical"
 *     onValueChange={([value]) => setVolume(value)}
 *     ariaLabelThumb="Volume level"
 *   />
 * </div>
 *
 * // Temperature range selector
 * <Slider
 *   value={temperatureRange}
 *   onValueChange={setTemperatureRange}
 *   min={-10}
 *   max={40}
 *   step={0.5}
 *   showValue
 *   valueFormatter={(value) => `${value}°C`}
 *   className="w-full"
 * />
 *
 * // Form integration with validation
 * <div className="space-y-2">
 *   <label htmlFor="budget-slider" className="text-sm font-medium">
 *     Budget Range
 *   </label>
 *   <Slider
 *     id="budget-slider"
 *     value={budgetRange}
 *     onValueChange={setBudgetRange}
 *     min={1000}
 *     max={50000}
 *     step={500}
 *     showValue
 *     valueFormatter={(value) => `$${value.toLocaleString()}`}
 *     disabled={isSubmitting}
 *   />
 *   {errors.budget && (
 *     <p className="text-sm text-red-600">{errors.budget}</p>
 *   )}
 * </div>
 * ```
 */
/**
 * Range slider component for selecting numeric values within a defined range.
 *
 * @id slider
 * @name Slider
 * @icon Sliders
 * @category inputs
 * @component
 * @param props - Component properties.
 */
const Slider = (
  { ref: forwardedRef, className, ariaLabelThumb, showValue = false, valueFormatter = value => value.toString(), ...props }: SliderProps & { ref?: React.RefObject<React.ElementRef<typeof BaseSlider.Root> | null> },
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
