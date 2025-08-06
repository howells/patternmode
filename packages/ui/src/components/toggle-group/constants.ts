import type { VariantProps } from "tailwind-variants";
import type { toggleGroupVariants } from "./variants";
import { createContext } from "react";

// Create context for toggle group size
export const ToggleGroupContext = createContext<{
  size: VariantProps<typeof toggleGroupVariants>["size"];
  variant: VariantProps<typeof toggleGroupVariants>["variant"];
}>({
  size: "base",
  variant: "default",
});
