import { cn } from "@patternmode/ui/utils/cn";
import type { ComponentProps } from "react";

export type SwatchSelectorMoreProps = ComponentProps<"div"> & {
  count: number;
};

/**
 * SwatchSelectorMore UI component.
 * Import from "@patternmode/ui/compositions/swatch-selector".
 */
export function SwatchSelectorMore({
  count,
  className,
  ...props
}: SwatchSelectorMoreProps) {
  return (
    <div
      className={cn("font-medium text-foreground text-xs", className)}
      data-component="swatch-more"
      {...props}
    >
      +{count}
    </div>
  );
}
