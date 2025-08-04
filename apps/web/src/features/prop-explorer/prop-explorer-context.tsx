"use client";

import type { ReactNode } from "react";

import React, { createContext, useContext, useState } from "react";

type PropExplorerState = {
  [key: string]: unknown;
};

type PropExplorerContextValue = {
  props: PropExplorerState;
  updateProp: (key: string, value: unknown) => void;
  resetProps: () => void;
};

const PropExplorerContext = createContext<PropExplorerContextValue | null>(
  null,
);

type PropExplorerProviderProps = {
  children: ReactNode;
  defaultProps?: PropExplorerState;
};

export function PropExplorerProvider({
  children,
  defaultProps = {},
}: PropExplorerProviderProps) {
  const [props, setProps] = useState<PropExplorerState>(defaultProps);

  // Update state when defaultProps changes (e.g., when async loading completes)
  React.useEffect(() => {
    setProps(defaultProps);
  }, [defaultProps]);

  const updateProp = (key: string, value: unknown) => {
    setProps(prev => ({
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
      "usePropExplorer must be used within a PropExplorerProvider",
    );
  }
  return context;
}
