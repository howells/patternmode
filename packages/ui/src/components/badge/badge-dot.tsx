import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

export type BadgeDotProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * BadgeDot UI component.
 * Import from "@patternmode/ui/components/badge".
 */
export function BadgeDot({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "size-1.5 rounded-full bg-[currentColor] opacity-75",
        className,
      )}
      data-slot="badge-dot"
      {...props}
    />
  );
}
