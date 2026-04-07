import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

export interface PropertyFieldProps extends React.ComponentProps<"div"> {
  /** Compact inline label (e.g., "X", "Width", "Gap") */
  label: string;
  /** Width of the label column. Default "auto". */
  labelWidth?: string;
}

/**
 * Compact inline field for dense property panels (Figma-style inspector).
 * Renders label and children side by side in a single row.
 *
 * Use this instead of Field + FieldLabel + FieldContent when you need
 * tight, horizontal label-input pairs.
 *
 * @example
 * ```tsx
 * <PropertyField label="X">
 *   <Input size="sm" defaultValue="0" />
 * </PropertyField>
 *
 * <PropertyField label="Width">
 *   <Input size="sm" defaultValue="320" />
 * </PropertyField>
 * ```
 */
export function PropertyField({
  children,
  className,
  label,
  labelWidth,
  ...props
}: PropertyFieldProps) {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      data-component="property-field"
      data-slot="property-field"
      {...props}
    >
      <span
        className="shrink-0 text-xs text-muted-foreground"
        style={labelWidth ? { width: labelWidth } : undefined}
      >
        {label}
      </span>
      <div className="flex min-w-0 flex-1">{children}</div>
    </div>
  );
}
