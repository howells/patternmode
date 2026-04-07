import { cn } from "@patternmode/ui/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import type * as React from "react";

export interface CenterProps extends React.ComponentProps<"div"> {
  /** Merge props onto child element */
  asChild?: boolean;
  /**
   * Use inline-flex instead of flex for inline centering
   */
  inline?: boolean;
}

/**
 * Center centers its children both vertically and horizontally using flexbox.
 *
 * **Important:** Children that use CSS Grid with `fr` units must define their own
 * width (e.g., `w-96`, `max-w-md`). This is because `fr` units require a defined
 * container width to calculate available space, but flex items without explicit
 * width use intrinsic sizing—creating a circular dependency where the grid
 * collapses to minimum content width.
 *
 * @example
 * ```tsx
 * <Center>
 *   <Button>Centered Button</Button>
 * </Center>
 * ```
 *
 * @example
 * ```tsx
 * // Grid children need explicit width
 * <Center>
 *   <Card className="w-96">...</Card>
 * </Center>
 * ```
 *
 * @example
 * ```tsx
 * <Center inline>
 *   <Icon name="check" />
 *   <span>Inline centered content</span>
 * </Center>
 * ```
 *
 * @example
 * ```tsx
 * <Center asChild>
 *   <section>Centered section</section>
 * </Center>
 * ```
 */
export function Center({
  children,
  className,
  inline = false,
  asChild = false,
  ...props
}: CenterProps) {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      className={cn(
        "items-center justify-center",
        inline ? "inline-flex" : "flex",
        className,
      )}
      data-component="center"
      {...props}
    >
      {children}
    </Component>
  );
}
