"use client";

import { createContext, useContext } from "react";
import type { ComponentSize } from "../../lib/size";

interface SelectContextValue {
  size: ComponentSize;
}

const SelectContext = createContext<SelectContextValue>({
  size: "sm",
});

function useSelectContext() {
  return useContext(SelectContext);
}

export { SelectContext, useSelectContext };
