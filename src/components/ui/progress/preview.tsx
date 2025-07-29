"use client";

import { Progress } from "@patternmode/ui";

export function Example({
  value = 65,
  variant = "default",
  showAnimation = true,
  showValue = true,
  label,
  ...props
}: {
  value?: number | null;
  variant?: "default" | "neutral" | "warning" | "error" | "success";
  showAnimation?: boolean;
  showValue?: boolean;
  label?: string;
  [key: string]: any;
}) {
  return (
    <div className="w-full">
      <Progress value={value} aria-label={label} {...props} />
    </div>
  );
}
