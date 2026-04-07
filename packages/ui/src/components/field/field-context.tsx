"use client";

import { createContext, useContext, useId } from "react";

interface FieldContextValue {
  descriptionId: string;
  errorId: string;
  fieldId: string;
}

const FieldContext = createContext<FieldContextValue | null>(null);

function FieldProvider({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <FieldContext.Provider
      value={{
        descriptionId: `${fieldId}-description`,
        errorId: `${fieldId}-error`,
        fieldId,
      }}
    >
      {children}
    </FieldContext.Provider>
  );
}

function useFieldContext() {
  return useContext(FieldContext);
}

function useFieldIds() {
  const context = useFieldContext();

  if (!context) {
    throw new Error("useFieldIds must be used within a Field component");
  }

  return {
    ...context,
    inputProps: {
      "aria-describedby": `${context.descriptionId} ${context.errorId}`,
      id: context.fieldId,
    },
  };
}

export { FieldProvider, useFieldContext, useFieldIds };
