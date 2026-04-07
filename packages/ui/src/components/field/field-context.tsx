"use client";

import { createContext, useContext, useId } from "react";

interface FieldContextValue {
  fieldId: string;
}

const FieldContext = createContext<FieldContextValue | null>(null);

/**
 * Provides auto-generated IDs to field sub-components (FieldError, FieldDescription).
 * Used internally by Field — consumers should not use this directly.
 */
export function FieldProvider({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  return (
    <FieldContext.Provider value={{ fieldId }}>
      {children}
    </FieldContext.Provider>
  );
}

/**
 * Read field context from the nearest Field ancestor.
 * Returns null when used outside a Field.
 */
export function useFieldContext() {
  return useContext(FieldContext);
}

/**
 * Get auto-generated IDs for wiring `aria-describedby` on inputs.
 *
 * Must be called from a component rendered inside a `<Field>`.
 * Returns stable IDs for the input, error, and description elements,
 * plus a spread-ready `inputProps` object.
 *
 * @example
 * ```tsx
 * function EmailFieldInner() {
 *   const { inputProps } = useFieldIds();
 *   return (
 *     <>
 *       <FieldLabel>Email</FieldLabel>
 *       <Input {...inputProps} placeholder="you@example.com" />
 *       <FieldDescription>We will never share your email.</FieldDescription>
 *       <FieldError errors={errors.email ? [errors.email] : []} />
 *     </>
 *   );
 * }
 * ```
 */
export function useFieldIds() {
  const ctx = useFieldContext();
  if (!ctx) {
    throw new Error("useFieldIds must be used within a Field component");
  }
  const { fieldId } = ctx;
  const errorId = `${fieldId}-error`;
  const descriptionId = `${fieldId}-description`;

  return {
    fieldId,
    errorId,
    descriptionId,
    /** Spread onto the input element to wire up id and aria-describedby. */
    inputProps: {
      id: fieldId,
      "aria-describedby": `${descriptionId} ${errorId}`,
    },
  };
}
