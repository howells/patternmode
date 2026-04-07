import { cn } from "@patternmode/ui/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import type * as React from "react";

type CardContentProps = React.ComponentProps<"div"> & {
  /**
   * Change the default rendered element for the one passed as a child,
   * merging their props and behavior
   */
  /** Merge props onto child */
  asChild?: boolean;
};
/**
 * Main content area of a card. Provides consistent padding for card body content.
 *
 * @param props - The card content props
 * @param props.asChild - Merge props onto child element using Slot. Defaults to false.
 * @param props.className - Additional CSS classes to apply.
 * @param props.children - Card body content.
 * @param props... - All other standard HTML div element props.
 *
 * @example
 * ```tsx
 * <CardContent>
 *   <Text>Main card content goes here.</Text>
 * </CardContent>
 * ```
 */
function CardContent({
  className,
  asChild = false,
  ...props
}: CardContentProps) {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      className={cn("px-6", className)}
      data-component="card-content"
      data-slot="card-content"
      {...props}
    />
  );
}

export { CardContent };
