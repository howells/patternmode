"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { useFieldContext } from "./field-context";

/**
 * Helper text or description displayed below a field label or above the control.
 *
 * @param props - The field description props
 * @param props.className - Additional CSS classes to apply.
 * @param props.children - Description text content (supports links).
 * @param props... - All other standard HTML paragraph element props.
 *
 * @example
 * ```tsx
 * <FieldDescription>Enter your full name as it appears on your ID.</FieldDescription>
 * ```
 */
export function FieldDescription({
  className,
  id,
  ...props
}: React.ComponentProps<"p">) {
  const ctx = useFieldContext();
  const descriptionId = id ?? (ctx ? `${ctx.fieldId}-description` : undefined);

  return (
    <p
      className={cn(
        "font-normal text-muted-foreground text-xs leading-normal group-has-[[data-orientation=horizontal]]/field:text-balance",
        "nth-last-2:-mt-1 last:mt-0 [[data-variant=legend]+&]:-mt-1.5",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className,
      )}
      data-component="field-description"
      data-slot="field-description"
      id={descriptionId}
      {...props}
    />
  );
}
