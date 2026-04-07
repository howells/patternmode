"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "../../utils/cn";
import { useFieldContext } from "./field-context";

function renderErrors(
  errors?: Array<{ message?: string } | undefined>
): ReactNode {
  const messages = [
    ...new Set(errors?.map((error) => error?.message).filter(Boolean)),
  ];

  if (!messages.length) {
    return null;
  }

  if (messages.length === 1) {
    return messages[0];
  }

  return (
    <ul className="ml-4 list-disc">
      {messages.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  );
}

function FieldError({
  children,
  className,
  errors,
  id,
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  const context = useFieldContext();
  const content = children ?? renderErrors(errors);

  if (!content) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      className={cn("text-body text-destructive", className)}
      data-slot="field-error"
      id={id ?? context?.errorId}
      role="alert"
      {...props}
    >
      {content}
    </div>
  );
}

export { FieldError };
