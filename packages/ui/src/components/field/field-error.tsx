"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { useMemo } from "react";
import { useFieldContext } from "./field-context";

/**
 * Error message display for field validation. Shows single or multiple error messages.
 *
 * @param props - The field error props
 * @param props.errors - Array of error objects with optional message property.
 * @param props.children - Custom error content (overrides errors array).
 * @param props.className - Additional CSS classes to apply.
 * @param props... - All other standard HTML div element props.
 *
 * @example
 * ```tsx
 * <FieldError errors={[{ message: "This field is required" }]} />
 * <FieldError>Custom error message</FieldError>
 * ```
 */
export function FieldError({
  className,
  children,
  errors,
  id,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  const ctx = useFieldContext();
  const errorId = id ?? (ctx ? `${ctx.fieldId}-error` : undefined);
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ];

    if (uniqueErrors?.length === 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map((error) =>
          error?.message ? <li key={error.message}>{error.message}</li> : null,
        )}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      className={cn("font-normal text-destructive text-sm", className)}
      data-component="field-error"
      data-slot="field-error"
      id={errorId}
      role="alert"
      {...props}
    >
      {content}
    </div>
  );
}
