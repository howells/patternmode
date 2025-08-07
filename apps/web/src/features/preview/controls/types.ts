import type { PropMetadata } from "@patternmode/ui/lib/component-config-types";

export type PropControlProps = {
  prop: PropMetadata;
  currentValue: unknown;
  onValueChange: (value: unknown) => void;
};
