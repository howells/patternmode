"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type { VariantProps } from "class-variance-authority";
import { Accordion as AccordionPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { useMemo, useState } from "react";
import { AccordionContext } from "./accordion-context";
import { accordionRootVariants } from "./accordion-variants";

/** Root accordion component that manages expand/collapse state for items */
function AccordionRoot(
  props: ComponentProps<typeof AccordionPrimitive.Root> &
    VariantProps<typeof accordionRootVariants> & {
      /** Icon type for expand/collapse indicator */
      indicator?: "arrow" | "plus";
    },
) {
  const {
    className,
    variant = "default",
    indicator = "arrow",
    children,
    value,
    defaultValue,
    onValueChange,
    ...rest
  } = props;

  // Extract type from rest for context
  const type = "type" in rest ? rest.type : undefined;

  // Track accordion value in state, initializing from defaultValue if provided
  const [internalValue, setInternalValue] = useState<string | string[]>(() => {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    return type === "multiple" ? [] : "";
  });

  // Use controlled value if provided, otherwise use internal state
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // Handle value changes
  const handleValueChange = (newValue: string | string[]) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue as never);
    }
  };

  const contextValue = useMemo(
    () => ({
      variant: variant || "default",
      indicator,
      value: currentValue,
      type,
    }),
    [variant, indicator, currentValue, type],
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <AccordionPrimitive.Root
        className={cn(accordionRootVariants({ variant }), className)}
        data-slot="accordion"
        {...rest}
        onValueChange={handleValueChange}
        value={currentValue as never}
      >
        {children}
      </AccordionPrimitive.Root>
    </AccordionContext.Provider>
  );
}

export { AccordionRoot };
