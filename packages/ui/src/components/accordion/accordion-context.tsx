import { createContext, useContext } from "react";

/** Context type for accordion styling and behavior configuration */
interface AccordionContextType {
  /** Icon type for expand/collapse indicator */
  indicator?: "arrow" | "plus" | "none";
  /** Whether single or multiple items can be open */
  type?: "single" | "multiple";
  /** Currently opened accordion item(s) */
  value?: string | string[];
  /** Visual style variant */
  variant?: "default" | "outline" | "solid";
}

/** Context type for individual accordion item state */
interface AccordionItemContextType {
  /** Whether the item is currently expanded */
  isOpen: boolean;
  /** Unique identifier for the item */
  value: string;
}

/**
 * AccordionContext UI component.
 * Import from "@patternmode/ui/components/accordion".
 */
const AccordionContext = createContext<AccordionContextType>({
  variant: "default",
  indicator: "arrow",
});

/**
 * AccordionItemContext UI component.
 * Import from "@patternmode/ui/components/accordion".
 */
const AccordionItemContext = createContext<AccordionItemContextType | null>(
  null,
);

/** Hook to access accordion-level configuration and state */
function useAccordionContext() {
  return useContext(AccordionContext);
}

/** Hook to access individual accordion item state */
function useAccordionItem() {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      "AccordionTrigger/Content must be used within AccordionItem",
    );
  }
  return context;
}

export type { AccordionContextType, AccordionItemContextType };
export {
  AccordionContext,
  AccordionItemContext,
  useAccordionContext,
  useAccordionItem,
};
