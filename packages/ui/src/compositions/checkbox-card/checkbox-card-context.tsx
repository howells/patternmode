import type { LucideIcon } from "lucide-react";
import type React from "react";
import { createContext } from "react";
import type { ComponentSize } from "../../lib/size";

/** Checkbox card context value type definition */
export interface CheckboxCardContextValue {
  /** Whether the group is disabled */
  disabled?: boolean;
  /** Icon to display instead of the indicator */
  icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Position of the indicator/icon */
  indicatorSide?: "start" | "end";
  /** Name for form submission */
  name?: string;
  /** Callback when checked state changes */
  onCheckedChange?: (value: string, checked: boolean) => void;
  /** Whether the group is required */
  required?: boolean;
  /** Show indicator */
  showIndicator?: boolean;
  /** Component size */
  size?: ComponentSize;
  /** Controlled checked values */
  value?: string[];
}

/**
 * CheckboxCardContext UI component.
 * Import from "@patternmode/ui/compositions/checkbox-card".
 */
export const CheckboxCardContext = createContext<CheckboxCardContextValue>({
  showIndicator: true,
  size: "base",
  indicatorSide: "start",
});
