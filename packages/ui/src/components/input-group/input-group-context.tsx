"use client";

import { createContext, useContext } from "react";
import type { Radius } from "../../lib/radius";
import type { InputGroupSize } from "./input-group-types";

interface InputGroupContextValue {
  disabled: boolean;
  hasError: boolean;
  radius: Radius;
  size: InputGroupSize;
}

const InputGroupContext = createContext<InputGroupContextValue | null>(null);

/**
 * Hook to access InputGroup context.
 * Throws if used outside of InputGroup.
 */
export function useInputGroup(): InputGroupContextValue {
  const context = useContext(InputGroupContext);
  if (!context) {
    throw new Error("InputGroup components must be used within InputGroup");
  }
  return context;
}

/**
 * Hook to optionally access InputGroup context.
 * Returns null if used outside of InputGroup.
 */
export function useOptionalInputGroup(): InputGroupContextValue | null {
  return useContext(InputGroupContext);
}

export { InputGroupContext };
