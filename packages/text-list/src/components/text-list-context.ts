import { createContext } from "react";

type TextListContextValue = Record<string, never>;

export const TextListContext = createContext<TextListContextValue | null>(null);
