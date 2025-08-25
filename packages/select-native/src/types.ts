import type { Size } from "@patternmode/config/sizes";

export type SelectNativeProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
  hasError?: boolean;
  size?: Size;
};
