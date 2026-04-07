"use client";

import { createContext, useContext } from "react";
import type { ComponentSize } from "../../lib/size";

export type EmptySize = Extract<ComponentSize, "sm" | "base" | "lg">;

interface EmptyContextValue {
  size: EmptySize;
}

const EmptyContext = createContext<EmptyContextValue | null>(null);

export function EmptyProvider({
  children,
  size,
}: {
  children: React.ReactNode;
  size: EmptySize;
}) {
  return (
    <EmptyContext.Provider value={{ size }}>{children}</EmptyContext.Provider>
  );
}

export function useEmptyContext() {
  const context = useContext(EmptyContext);
  if (!context) {
    throw new Error("Empty components must be used within an Empty component");
  }
  return context;
}
