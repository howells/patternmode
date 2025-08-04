"use client";

import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./component";

// Props that users can configure in the prop explorer
export type AccordionPreviewProps = {
  openMultiple?: boolean;
  disabled?: boolean;
  className?: string;
  triggerText1?: string;
  contentText1?: string;
  triggerText2?: string;
  contentText2?: string;
};

// Prop metadata for the prop explorer - single source of truth
export const accordionPreviewProps = [
  {
    name: "openMultiple",
    type: "boolean",
    description: "Whether multiple accordion items can be open at once.",
    defaultValue: false,
  },
  {
    name: "disabled",
    type: "boolean",
    description: "Whether the accordion is disabled.",
    defaultValue: false,
  },
  {
    name: "triggerText1",
    type: "string",
    description: "Text for the first accordion trigger.",
    defaultValue: "What is Patternmode?",
  },
  {
    name: "contentText1",
    type: "textarea",
    description: "Content for the first accordion panel.",
    defaultValue: "Patternmode is a modern React component library that combines the best design patterns and developer experience.",
  },
  {
    name: "triggerText2",
    type: "string",
    description: "Text for the second accordion trigger.",
    defaultValue: "How do I install it?",
  },
  {
    name: "contentText2",
    type: "textarea",
    description: "Content for the second accordion panel.",
    defaultValue: "You can install Patternmode components using npm or pnpm. Each component is built on Base UI primitives.",
  },
];

export function AccordionExample(props: AccordionPreviewProps) {
  const {
    openMultiple = false,
    disabled = false,
    className = "",
    triggerText1 = "What is Patternmode?",
    contentText1 = "Patternmode is a modern React component library that combines the best design patterns and developer experience from leading UI libraries while building on a solid, accessible foundation.",
    triggerText2 = "How do I install it?",
    contentText2 = "You can install Patternmode components using npm or pnpm. Each component is built on Base UI primitives for excellent accessibility and performance.",
  } = props;

  return (
    <Accordion
      openMultiple={openMultiple}
      disabled={disabled}
      className={`w-96 max-w-full ${className}`}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>{triggerText1}</AccordionTrigger>
        <AccordionContent>
          {contentText1}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>{triggerText2}</AccordionTrigger>
        <AccordionContent>
          {contentText2}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
