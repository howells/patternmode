import type { PreviewProps as PropMetadata } from "@patternmode/ui/types/preview-props-type";

export type PropControlProps = {
  prop: PropMetadata;
  currentValue: unknown;
  onValueChange: (value: unknown) => void;
};
