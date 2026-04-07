import { cn } from "@patternmode/ui/utils/cn";

type SkeletonVariant = "default" | "light";

interface SkeletonProps extends React.ComponentProps<"div"> {
  /** Visual variant - use "light" on white/background surfaces */
  variant?: SkeletonVariant;
}

const variantStyles: Record<SkeletonVariant, string> = {
  default: "bg-gray-200",
  light: "bg-gray-100",
};

/**
 * Skeleton loader component for showing loading states.
 * Displays animated placeholder with a shimmer gradient sweep.
 *
 * @param props - The skeleton props
 * @param props.variant - Visual variant: "default" (gray-200) or "light" (gray-100 for lighter surfaces)
 * @param props.className - Additional CSS classes to apply (use for width/height).
 * @param props... - All other standard HTML div element props.
 *
 * @example
 * ```tsx
 * <Skeleton className="h-4 w-32" />
 * <Skeleton className="h-20 w-full rounded-md" variant="light" />
 * ```
 */
function Skeleton({ className, variant = "default", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md",
        variantStyles[variant],
        className,
      )}
      data-component="skeleton"
      data-slot="skeleton"
      {...props}
    >
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}

export type { SkeletonProps, SkeletonVariant };
export { Skeleton };
