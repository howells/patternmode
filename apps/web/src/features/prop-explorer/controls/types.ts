import type { PropMetadata } from "../../../lib/prop-explorer";

export type PropControlProps = {
  prop: PropMetadata;
  currentValue: unknown;
  onValueChange: (value: unknown) => void;
};
