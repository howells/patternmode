import { cx } from "../../lib/utils";
import type React from "react";

/**
 * A skeleton loading placeholder component with pulse animation.
 * 
 * Provides a simple animated placeholder for content that is loading.
 * Features a subtle pulse animation and Tremor-inspired styling that
 * works well in both light and dark modes. Perfect for indicating
 * loading states in cards, lists, and forms.
 *
 * @param className - Additional CSS classes to apply
 *
 * @component
 * @example
 * ```tsx
 * // Basic skeleton placeholder
 * <Skeleton className="h-4 w-full" />
 * 
 * // Skeleton for a user card
 * <div className="flex items-center space-x-4">
 *   <Skeleton className="h-12 w-12 rounded-full" />
 *   <div className="space-y-2">
 *     <Skeleton className="h-4 w-[250px]" />
 *     <Skeleton className="h-4 w-[200px]" />
 *   </div>
 * </div>
 * 
 * // Skeleton for article preview
 * <div className="space-y-3">
 *   <Skeleton className="h-[200px] w-full rounded-lg" />
 *   <div className="space-y-2">
 *     <Skeleton className="h-4 w-full" />
 *     <Skeleton className="h-4 w-4/5" />
 *     <Skeleton className="h-4 w-3/5" />
 *   </div>
 * </div>
 * 
 * // Skeleton table rows
 * <div className="space-y-2">
 *   {Array.from({ length: 3 }).map((_, i) => (
 *     <div key={i} className="flex space-x-4">
 *       <Skeleton className="h-4 w-[100px]" />
 *       <Skeleton className="h-4 w-[150px]" />
 *       <Skeleton className="h-4 w-[80px]" />
 *     </div>
 *   ))}
 * </div>
 * ```
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx(
        "animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
