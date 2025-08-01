"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Text,
} from "@patternmode/ui";

import React from "react";

// Default accordion
export const DefaultExample = () => (
  <Accordion>
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

// Multiple open accordion
export const MultipleOpenExample = () => (
  <Accordion openMultiple>
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

// Mixed content types - demonstrates string vs component handling
export const MixedContentExample = () => (
  <Accordion>
    <AccordionItem value="string-content">
      <AccordionTrigger>String Content (Auto Text Component)</AccordionTrigger>
      <AccordionContent>
        This is a plain string that gets automatically wrapped with the Text
        component, inheriting the muted text colors and proper typography from
        the design system.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="component-content">
      <AccordionTrigger>
        <div className="flex items-center gap-2">
          Component Trigger
          <Badge variant="info" size="sm">
            New
          </Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-3">
          <Text className="text-blue-600 font-medium">
            This content uses components that manage their own styling.
          </Text>
          <Text size="sm" className="text-green-700">
            Each Text component can have its own colors and sizes.
          </Text>
          <div className="flex gap-2">
            <Badge variant="success">Feature</Badge>
            <Badge variant="blue">Documentation</Badge>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="mixed-trigger">
      <AccordionTrigger>Mixed String Trigger</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-2">
          <Text>This demonstrates mixed content:</Text>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>
              <Text size="sm">List items with custom Text components</Text>
            </li>
            <li>
              <Text size="sm" className="text-amber-600">
                Custom colored text that overrides defaults
              </Text>
            </li>
          </ul>
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "MultipleOpenExample",
    title: "Multiple Open",
    description: "Example allowing multiple items to be open",
    component: MultipleOpenExample,
  },
  {
    id: "MixedContentExample",
    title: "Mixed Content",
    description: "Example with mixed content types",
    component: MixedContentExample,
  },
];
