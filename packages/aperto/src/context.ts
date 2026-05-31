"use client";

import { createContext, useContext } from "react";
import type { ApertoContextValue } from "./types";

export const ApertoContext = createContext<ApertoContextValue | null>(null);

export function useApertoContext(): ApertoContextValue {
  const ctx = useContext(ApertoContext);
  if (!ctx) {
    throw new Error("Aperto components must be used within <Aperto.Root>");
  }
  return ctx;
}
