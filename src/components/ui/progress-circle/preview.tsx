"use client";

import { ProgressCircle } from "@patternmode/ui";

export function Example({ 
  value = 65,
  variant = "default",
  size = "md",
  showAnimation = true,
  showValue = true,
  label,
  ...props 
}: { 
  value?: number | null;
  variant?: "default" | "neutral" | "warning" | "error" | "success";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showAnimation?: boolean;
  showValue?: boolean;
  label?: string;
  [key: string]: any;
}) {
  return (
    <div className="flex items-center justify-center p-8">
      <ProgressCircle
        value={value}
        variant={variant}
        size={size}
        showAnimation={showAnimation}
        showValue={showValue}
        label={label}
        {...props}
      />
    </div>
  );
}