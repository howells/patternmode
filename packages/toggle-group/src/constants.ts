import { createContext } from "react";
import type { VariantProps } from "tailwind-variants";
import type { toggleGroupVariants } from "./variants";

export const ToggleGroupContext = createContext<{
  size: VariantProps<typeof toggleGroupVariants>["size"];
  variant: VariantProps<typeof toggleGroupVariants>["variant"];
}>({
  size: "base",
  variant: "default",
});
