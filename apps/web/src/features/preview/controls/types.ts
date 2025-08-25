import type { PreviewProps as PropMetadata } from "@/types/preview-props";

export type PropControlProps = {
  prop: PropMetadata;
  currentValue: unknown;
  onValueChange: (value: unknown) => void;
};
