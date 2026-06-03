"use client";

import { createContext, use } from "react";

import type { ApertoContextValue } from "./types";

export const ApertoContext = createContext<ApertoContextValue | null>(null);

export const useApertoContext = (): ApertoContextValue => {
  const ctx = use(ApertoContext);
  if (!ctx) {
    throw new Error("Aperto components must be used within <Aperto.Root>");
  }
  return ctx;
};
