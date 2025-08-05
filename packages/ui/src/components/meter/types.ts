import type { Meter as BaseMeter } from "@base-ui-components/react/meter";
import type React from "react";
import type { GlobalSemanticVariant } from "../../lib/variants";

export type MeterProps = {
  /**
   * Current numeric value to display within the meter range.
   * This value determines how much of the meter track is filled by the indicator.
   */
  value: number;
  /**
   * Minimum value for the meter range.
   * The indicator will be empty when value equals min.
   * @default 0
   */
  min?: number;
  /**
   * Maximum value for the meter range.
   * The indicator will be completely filled when value equals max.
   * @default 100
   */
  max?: number;
  /**
   * Visual style variant affecting color scheme.
   * Uses semantic color mappings appropriate for progress indication.
   * @default "default"
   */
  variant?: GlobalSemanticVariant;
  /**
   * Optional descriptive label text displayed above the meter.
   */
  label?: string;
  /**
   * Whether to display the formatted value text above the meter.
   */
  showValue?: boolean;
  /**
   * Whether to enable smooth animation transitions when the value changes.
   */
  showAnimation?: boolean;
  /**
   * Function to format the displayed value.
   */
  formatValue?: (value: number, min: number, max: number) => string;
} & React.ComponentPropsWithoutRef<typeof BaseMeter.Root>;
