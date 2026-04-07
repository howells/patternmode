import { cn } from "@patternmode/ui/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import type * as React from "react";

type CardHeaderProps = React.ComponentProps<"div"> & {
  /** Merge props onto child */
  asChild?: boolean;
  /** Render a bottom border */
  border?: boolean;
};
/**
 * Header section of a card. Typically contains title, description, and optional action buttons.
 *
 * @param props - The card header props
 * @param props.asChild - Merge props onto child element using Slot. Defaults to false.
 * @param props.border - Render a bottom border. Defaults to false.
 * @param props.className - Additional CSS classes to apply.
 * @param props.children - Header content (CardTitle, CardDescription, CardAction, etc.).
 * @param props... - All other standard HTML div element props.
 *
 * @example
 * ```tsx
 * <CardHeader>
 *   <CardTitle>Card Title</CardTitle>
 *   <CardDescription>Card description</CardDescription>
 * </CardHeader>
 * ```
 */
function CardHeader({
  className,
  asChild = false,
  border,
  ...props
}: CardHeaderProps) {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-5 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        border === true && "border-border border-b",
        className,
      )}
      data-component="card-header"
      data-slot="card-header"
      {...props}
    />
  );
}

export { CardHeader };
