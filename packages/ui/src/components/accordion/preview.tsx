"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@patternmode/ui";

import React from "react";

export function AccordionExample(props: React.ComponentProps<typeof Accordion>) {
  return (
    <Accordion {...props} className="w-96 max-w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Patternmode?</AccordionTrigger>
        <AccordionContent>
          Patternmode is a modern React component library that combines the best
          design patterns and developer experience from leading UI libraries while
          building on a solid, accessible foundation.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I install it?</AccordionTrigger>
        <AccordionContent>
          You can install Patternmode components using npm or pnpm. Each component
          is built on Base UI primitives for excellent accessibility and
          performance.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
