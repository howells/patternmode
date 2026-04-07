import type { LucideIcon } from "lucide-react";
import type React from "react";
import { createContext } from "react";
import type { ComponentSize } from "../../lib/size";

/** Radio card context value type definition */
export interface RadioCardContextValue {
  /** Whether the group is disabled */
  disabled?: boolean;
  /** Icon to display instead of the indicator */
  icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Position of the indicator/icon */
  indicatorSide?: "start" | "end";
  /** Name for form submission */
  name?: string;
  /** Callback when selected value changes */
  onValueChange?: (value: string) => void;
  /** Whether the group is required */
  required?: boolean;
  /** Only show icon when item is selected (for selection indicators like Check) */
  showIconOnlyWhenSelected?: boolean;
  /** Show indicator */
  showIndicator?: boolean;
  /** Component size */
  size?: ComponentSize;
  /** Current selected value */
  value?: string | null;
}

/**
 * RadioCardContext UI component.
 * Import from "@patternmode/ui/compositions/radio-card".
 */
export const RadioCardContext = createContext<RadioCardContextValue>({
  showIndicator: true,
  size: "base",
  indicatorSide: "start",
});
