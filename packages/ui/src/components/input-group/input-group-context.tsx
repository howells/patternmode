"use client";

import { createContext, useContext } from "react";

import type { ComponentSize } from "../../lib/size";

interface InputGroupContextValue {
  disabled?: boolean;
  hasError?: boolean;
  size: ComponentSize;
}

const InputGroupContext = createContext<InputGroupContextValue | null>(null);

function useInputGroup() {
  const context = useContext(InputGroupContext);

  if (!context) {
    throw new Error("InputGroup components must be used within InputGroup");
  }

  return context;
}

function useOptionalInputGroup() {
  return useContext(InputGroupContext);
}

export { InputGroupContext, useInputGroup, useOptionalInputGroup };
