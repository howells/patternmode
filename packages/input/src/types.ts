import type { Size } from "@patternmode/config/sizes";

export type InputProps = {
  className?: string;
  inputClassName?: string;
  hasError?: boolean;
  enableStepper?: boolean;
  size?: Size;
  type?: React.HTMLInputTypeAttribute;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  prefixText?: string;
  prefixIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  suffixText?: string;
  suffixIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  prefixStyling?: boolean;
  suffixStyling?: boolean;
  iconStrokeWidth?: number;
  minimal?: boolean;
  unstyled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

