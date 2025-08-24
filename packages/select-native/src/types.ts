import type { Size } from "@patternmode/config/sizes";

export type SelectNativeProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  hasError?: boolean;
  size?: Size;
};

