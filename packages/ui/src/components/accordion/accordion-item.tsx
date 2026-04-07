"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Accordion as AccordionPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { useMemo } from "react";
import { AccordionItemContext, useAccordionContext } from "./accordion-context";
import { accordionItemVariants } from "./accordion-variants";

/** Individual accordion item containing a trigger and collapsible content */
function AccordionItem(props: ComponentProps<typeof AccordionPrimitive.Item>) {
  const { className, children, value, ...rest } = props;
  const { variant, value: accordionValue, type } = useAccordionContext();

  // Determine if this item is open based on accordion type
  const isOpen = useMemo(() => {
    if (type === "multiple" && Array.isArray(accordionValue)) {
      return accordionValue.includes(value);
    }
    return accordionValue === value;
  }, [accordionValue, value, type]);

  const contextValue = useMemo(() => ({ value, isOpen }), [value, isOpen]);

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <AccordionPrimitive.Item
        className={cn(accordionItemVariants({ variant }), className)}
        data-slot="accordion-item"
        data-testid={`accordion-item-${value}`}
        value={value}
        {...rest}
      >
        {children}
      </AccordionPrimitive.Item>
    </AccordionItemContext.Provider>
  );
}

export { AccordionItem };
