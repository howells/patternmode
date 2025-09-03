import type { Slider as BaseSlider } from "@base-ui-components/react/slider";
import type * as React from "react";
import type { VariantProps } from "tailwind-variants";

import type { sliderVariants } from "./variants";

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
   */
  valueFormatter?: (value: number) => string;
} & Omit<React.ComponentPropsWithoutRef<typeof BaseSlider.Root>, "children"> &
  VariantProps<typeof sliderVariants>;
