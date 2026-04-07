"use client";

import { createContext, type ReactNode, useContext } from "react";
import type { ComponentSize } from "../../lib/size";

export interface AvatarContextValue {
  size: ComponentSize;
}

const AvatarContext = createContext<AvatarContextValue | undefined>(undefined);

export interface AvatarProviderProps {
  children: ReactNode;
  size: ComponentSize;
}

/**
 * AvatarProvider UI component.
 * Import from "@patternmode/ui/components/avatar".
 */
export function AvatarProvider({ children, size }: AvatarProviderProps) {
  return (
    <AvatarContext.Provider value={{ size }}>{children}</AvatarContext.Provider>
  );
}

/**
 * useAvatarContext React hook.
 * Import from "@patternmode/ui/components/avatar".
 */
export function useAvatarContext(): AvatarContextValue {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error("useAvatarContext must be used within an AvatarProvider");
  }
  return context;
}
