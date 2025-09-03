"use client";

import type { ReactNode } from "react";

import React, { createContext, useContext, useState } from "react";

type PreviewState = {
  [key: string]: unknown;
};

type PreviewContextValue = {
  props: PreviewState;
  updateProp: (key: string, value: unknown) => void;
  resetProps: () => void;
};

const PreviewContext = createContext<PreviewContextValue | null>(null);

type PreviewProviderProps = {
  children: ReactNode;
  defaultProps?: PreviewState;
};

export function PreviewProvider({
  children,
  defaultProps = {},
}: PreviewProviderProps) {
  const [props, setProps] = useState<PreviewState>(defaultProps);

  // Update state when defaultProps changes (e.g., when async loading completes)
  React.useEffect(() => {
    setProps(defaultProps);
  }, [defaultProps]);

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
    <PreviewContext.Provider value={{ props, updateProp, resetProps }}>
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreview() {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error("usePreview must be used within a PreviewProvider");
  }
  return context;
}
