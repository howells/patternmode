import React from "react";

export type RadioCardsContextValue = {
  showIndicator: boolean;
  selectedValue?: string;
};

export const RadioCardsContext =
  React.createContext<RadioCardsContextValue | null>(null);

