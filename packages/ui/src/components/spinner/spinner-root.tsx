import { cn } from "@patternmode/ui/utils/cn";
import { LoaderCircleIcon, type LucideProps } from "lucide-react";
import type { ComponentSize } from "../../lib/size";

const SPINNER_PX: Record<ComponentSize, number> = {
  "2xs": 12,
  xs: 16,
  sm: 18,
  base: 20,
  lg: 24,
  xl: 28,
  "2xl": 32,
  "3xl": 40,
};

export type SpinnerProps = LucideProps & {
  /** Component size */
  size?: ComponentSize;
};

/**
 * Loading spinner component. Animated circular indicator for async operations.
 *
 * @param props - The spinner props
 * @param props.size - Spinner size. Options: "2xs", "xs", "sm", "base" (default, 20px), "lg", "xl", "2xl", "3xl".
 * @param props.className - Additional CSS classes to apply.
 * @param props... - All other Lucide Icon props.
 *
 * @example
 * ```tsx
 * <Spinner size="base" />
 * <Spinner size="lg" className="text-primary" />
 * ```
 */
export function Spinner({ size = "base", className, ...props }: SpinnerProps) {
  const px = SPINNER_PX[size];
  return (
    <LoaderCircleIcon
      className={cn("animate-spin", className)}
      data-component="spinner"
      size={px}
      {...props}
    />
  );
}
