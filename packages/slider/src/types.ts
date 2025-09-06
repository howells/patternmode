import type { Slider as BaseSlider } from "@base-ui-components/react/slider";
import type * as React from "react";
import type { VariantProps } from "tailwind-variants";

import type { sliderVariants } from "./variants";

export type SliderValue = number | [number, number];

export type SliderProps = {
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
   * When using a range (two thumbs), this function is applied to each value.
   */
  valueFormatter?: (value: number) => string;

  /**
   * Controlled value. Pass a single number, or a tuple [min, max] for ranges.
   */
  value?: SliderValue;
  /**
   * Uncontrolled initial value. Single number or [min, max] for ranges.
   */
  defaultValue?: SliderValue;
  /**
   * Fires continuously while the value changes (dragging/keyboard).
   */
  onValueChange?: (value: SliderValue) => void;
  /**
   * Fires when interaction ends (pointer up/commit).
   */
  onValueCommit?: (value: SliderValue) => void;

  /** Standard constraints and state. */
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
} & Omit<
  React.ComponentPropsWithoutRef<typeof BaseSlider.Root>,
  "children" | "value" | "defaultValue" | "onValueChange" | "onValueCommit"
> &
  VariantProps<typeof sliderVariants>;
