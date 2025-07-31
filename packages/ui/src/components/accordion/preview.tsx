import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@patternmode/ui";

// Example component for preview system
export const AccordionExample = ({
  orientation = "vertical",
  openMultiple = false,
  ...props
}: {
  orientation?: string;
  openMultiple?: boolean;
  [key: string]: unknown;
}) => {
  return (
    <Accordion
      orientation={orientation as "vertical" | "horizontal"}
      openMultiple={openMultiple}
      {...props}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Patternmode?</AccordionTrigger>
        <AccordionContent>
          Patternmode is a modern React component library that combines the best
          design patterns and developer experience from leading UI libraries
          while building on a solid, accessible foundation.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I install it?</AccordionTrigger>
        <AccordionContent>
          You can install Patternmode components using npm or pnpm. Each
          component is built on Base UI primitives for excellent accessibility
          and performance.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What makes it different?</AccordionTrigger>
        <AccordionContent>
          Patternmode combines the best patterns from shadcn/ui, Radix UI,
          Tailwind UI, and Tremor, all built on modern Base UI primitives with
          professional styling.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
