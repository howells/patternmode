"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, iconRegistry, List, ListItem } from "@patternmode/ui";

import React from "react";
// Pre-imported icons from registry
const { ChevronDown, ChevronRight, HelpCircle, Info, Settings } = iconRegistry;

// Default collapsible
export const DefaultExample = () => (
  <Collapsible>
    <CollapsibleTrigger>What is PatternMode?</CollapsibleTrigger>
    <CollapsibleContent>
      PatternMode is a modern React component library built on Base UI primitives with Tremor-inspired styling.
    </CollapsibleContent>
  </Collapsible>
);

// Default open
export const DefaultOpenExample = () => (
  <Collapsible defaultOpen>
    <CollapsibleTrigger>System Requirements</CollapsibleTrigger>
    <CollapsibleContent>
      <List>
        <ListItem>• React 18 or higher</ListItem>
        <ListItem>• Node.js 16 or higher</ListItem>
        <ListItem>• TypeScript 4.9 or higher</ListItem>
      </List>
    </CollapsibleContent>
  </Collapsible>
);

// Disabled collapsible
export const DisabledExample = () => (
  <Collapsible disabled>
    <CollapsibleTrigger>Coming Soon</CollapsibleTrigger>
    <CollapsibleContent>
      This feature is currently under development.
    </CollapsibleContent>
  </Collapsible>
);

// Rich content
export const NestedContentExample = () => (
  <Collapsible>
    <CollapsibleTrigger>Installation Guide</CollapsibleTrigger>
    <CollapsibleContent>
      <div className="space-y-3">
        <p>Install PatternMode in your project:</p>
        <code className="block bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-sm">
          pnpm add patternmode
        </code>
        <p>Then import components as needed:</p>
        <code className="block bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-sm">
          {`import { Button } from "patternmode"}`}
        </code>
      </div>
    </CollapsibleContent>
  </Collapsible>
);

// With custom icons
export const WithIconsExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center gap-2">
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        Advanced Settings
        <Settings className="h-4 w-4 ml-auto" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 space-y-2 pl-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            Enable experimental features
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            Show developer options
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            Enable debug mode
          </label>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

// FAQ accordion style
export const FaqExample = () => (
  <div className="space-y-2">
    <Collapsible>
      <CollapsibleTrigger className="text-left w-full">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          How do I get started with PatternMode?
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="pl-6 text-sm text-zinc-600 dark:text-zinc-400">
          Getting started is easy! Install the package using npm or pnpm, then import the components you need.
          Check out our documentation for detailed guides and examples.
        </p>
      </CollapsibleContent>
    </Collapsible>

    <Collapsible>
      <CollapsibleTrigger className="text-left w-full">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          Is PatternMode accessible?
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="pl-6 text-sm text-zinc-600 dark:text-zinc-400">
          Yes! All components are built with accessibility in mind, following WCAG guidelines
          and best practices for keyboard navigation and screen reader support.
        </p>
      </CollapsibleContent>
    </Collapsible>

    <Collapsible>
      <CollapsibleTrigger className="text-left w-full">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          Can I customize the styling?
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="pl-6 text-sm text-zinc-600 dark:text-zinc-400">
          Absolutely! PatternMode uses Tailwind CSS and supports full customization through
          className props, CSS variables, and theme configuration.
        </p>
      </CollapsibleContent>
    </Collapsible>
  </div>
);

// Card style collapsible
export const CardStyleExample = () => (
  <div className="border rounded-lg overflow-hidden">
    <Collapsible>
      <CollapsibleTrigger className="w-full p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-500" />
            <span className="font-medium">Important Information</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 pb-4 border-t pt-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            This section contains important information about your account settings
            and preferences. Please review carefully before making any changes.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
);

// Controlled collapsible
export const ControlledExample = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setOpen(true)}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Open
        </button>
        <button
          onClick={() => setOpen(false)}
          className="px-3 py-1 text-sm bg-zinc-200 dark:bg-zinc-800 rounded hover:bg-zinc-300 dark:hover:bg-zinc-700"
        >
          Close
        </button>
        <button
          onClick={() => setOpen(!open)}
          className="px-3 py-1 text-sm bg-zinc-200 dark:bg-zinc-800 rounded hover:bg-zinc-300 dark:hover:bg-zinc-700"
        >
          Toggle
        </button>
      </div>

      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger>Controlled Content</CollapsibleTrigger>
        <CollapsibleContent>
          <p>This collapsible is controlled by the buttons above.</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

// Nested collapsibles
export const NestedExample = () => (
  <Collapsible defaultOpen>
    <CollapsibleTrigger>Parent Section</CollapsibleTrigger>
    <CollapsibleContent>
      <div className="ml-4 mt-2 space-y-2">
        <p>This is the parent content.</p>

        <Collapsible>
          <CollapsibleTrigger>Child Section 1</CollapsibleTrigger>
          <CollapsibleContent>
            <p className="ml-4">This is nested content 1.</p>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger>Child Section 2</CollapsibleTrigger>
          <CollapsibleContent>
            <p className="ml-4">This is nested content 2.</p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </CollapsibleContent>
  </Collapsible>
); export const CollapsibleExample = DefaultExample;

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
    id: "DefaultOpenExample",
    title: "Default Open",
    description: "Default Open example",
    component: DefaultOpenExample,
  },
  {
    id: "DisabledExample",
    title: "Disabled",
    description: "Disabled example",
    component: DisabledExample,
  },
  {
    id: "NestedContentExample",
    title: "Nested Content",
    description: "Nested Content example",
    component: NestedContentExample,
  },
  {
    id: "WithIconsExample",
    title: "With Icons",
    description: "Example with icon integration",
    component: WithIconsExample,
  },
  {
    id: "FaqExample",
    title: "Faq",
    description: "Faq example",
    component: FaqExample,
  },
  {
    id: "CardStyleExample",
    title: "Card Style",
    description: "Card Style example",
    component: CardStyleExample,
  },
  {
    id: "ControlledExample",
    title: "Controlled",
    description: "Controlled example",
    component: ControlledExample,
  },
  {
    id: "NestedExample",
    title: "Nested",
    description: "Nested example",
    component: NestedExample,
  },
  {
    id: "CollapsibleExample",
    title: "Collapsible",
    description: "Collapsible example",
    component: CollapsibleExample,
  },
];
