"use client";

import { cx } from "@/lib/utils";
import { Separator } from "@patternmode/ui";

export function Example() {
  return (
    <div className="space-y-4 max-w-sm">
      <div className="text-sm">Content above separator</div>
      <Separator />
      <div className="text-sm">Content below separator</div>
    </div>
  );
}

// Export for the prop explorer system
export function SeparatorExample({
  children,
  orientation = "horizontal",
  variant = "default",
  size = "md",
  spacing = "md",
  className,
  ...props
}: {
  children?: string;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "subtle" | "strong";
  size?: "sm" | "md" | "lg";
  spacing?: "none" | "sm" | "md" | "lg";
  className?: string;
  [key: string]: unknown;
}) {
  if (orientation === "vertical") {
    return (
      <div className="flex items-center h-8 space-x-4">
        <span className="text-sm">Left</span>
        <Separator
          orientation={orientation}
          variant={variant}
          size={size}
          spacing={spacing}
          className={cx(className, "h-4")}
          {...props}
        >
          {children}
        </Separator>
        <span className="text-sm">Right</span>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-sm">
      <div className="text-sm">Content above</div>
      <Separator
        orientation={orientation}
        variant={variant}
        size={size}
        spacing={spacing}
        className={className}
        {...props}
      >
        {children}
      </Separator>
      <div className="text-sm">Content below</div>
    </div>
  );
}
