"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

interface PropExplorerState {
  [key: string]: unknown;
}

interface PropExplorerContextValue {
  props: PropExplorerState;
  updateProp: (key: string, value: unknown) => void;
  resetProps: () => void;
}

const PropExplorerContext = createContext<PropExplorerContextValue | null>(
  null
);

interface PropExplorerProviderProps {
  children: ReactNode;
  defaultProps?: PropExplorerState;
}

export function PropExplorerProvider({
  children,
  defaultProps = {},
}: PropExplorerProviderProps) {
  const [props, setProps] = useState<PropExplorerState>(defaultProps);

  const updateProp = (key: string, value: unknown) => {
    setProps((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetProps = () => {
    setProps(defaultProps);
  };

  return (
    <PropExplorerContext.Provider value={{ props, updateProp, resetProps }}>
      {children}
    </PropExplorerContext.Provider>
  );
}

export function usePropExplorer() {
  const context = useContext(PropExplorerContext);
  if (!context) {
    throw new Error(
      "usePropExplorer must be used within a PropExplorerProvider"
    );
  }
  return context;
}
