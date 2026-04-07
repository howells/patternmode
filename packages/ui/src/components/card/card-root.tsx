import { cn } from "@patternmode/ui/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import type { WithTestId } from "../../lib/types";

const cardVariants = cva(
  "flex flex-col gap-6 rounded-xl py-5 text-card-foreground has-[[data-slot=card-footer]]:pb-0",
  {
    variants: {
      variant: {
        card: "bg-card shadow-xs",
        muted: "bg-muted shadow-xs",
        accent: "bg-accent shadow-xs",
        ghost: "border-0 bg-transparent shadow-none",
        interactive:
          "bg-card shadow-xs transition-[box-shadow,transform] duration-150 hover:-translate-y-px hover:shadow-md cursor-pointer active:translate-y-0",
      },
    },
    defaultVariants: {
      variant: "card",
    },
  },
);

/** Props for the Card container component. */
interface CardProps
  extends WithTestId<React.ComponentProps<"div">>,
    VariantProps<typeof cardVariants> {
  /** Border style. "solid" renders a standard border, "dashed" renders a dashed border, "none" (default) renders no border. */
  border?: "none" | "solid" | "dashed";
}

/**
 * Card container with optional border and variant-based background.
 *
 * @param props - The card props
 * @param props.variant - Background variant. Options: "card" (default, white bg), "muted", "accent", "ghost" (no border/bg).
 * @param props.border - Border style. Options: "solid", "none" (default), "dashed".
 * @param props.className - Additional CSS classes to apply.
 * @param props.testId - Test ID for testing purposes.
 * @param props.children - Card content (typically CardHeader, CardContent, CardFooter).
 * @param props... - All other standard HTML div element props.
 *
 * @example
 * ```tsx
 * <Card variant="card" border="solid">
 *   <CardHeader>Title</CardHeader>
 *   <CardContent>Content</CardContent>
 * </Card>
 * ```
 */
function Card({
  className,
  border = "none",
  variant,
  testId,
  ...props
}: CardProps) {
  let borderClasses: string;
  if (border === "none") {
    borderClasses = "border-0";
  } else if (border === "dashed") {
    borderClasses = "border border-dashed border-muted-foreground/25";
  } else {
    borderClasses = "border border-border";
  }
  return (
    <div
      className={cn(cardVariants({ variant }), borderClasses, className)}
      data-component="card"
      data-slot="card"
      data-testid={testId}
      {...props}
    />
  );
}

export { Card };
