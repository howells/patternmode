import type { ComponentSize } from "../../lib/size";
import { cn } from "../../utils/cn";

const SPINNER_SIZE_CLASSES: Record<ComponentSize, string> = {
  sm: "size-4",
  base: "size-5",
  lg: "size-6",
};

export interface SpinnerProps {
  className?: string;
  size?: ComponentSize;
}

function Spinner({ className, size = "base" }: SpinnerProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex animate-spin rounded-full border-2 border-current/25 border-t-current",
        SPINNER_SIZE_CLASSES[size],
        className
      )}
      data-slot="spinner"
    />
  );
}

export { Spinner };
