"use client";

import { Button } from "@patternmode/button";
import { ButtonGroup } from "@patternmode/button-group";
import { VStack } from "@patternmode/stack";
import { Code, Text } from "@patternmode/text";
import { TextList, TextListItem } from "@patternmode/text-list";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./component";

// Default collapsible
export const DefaultExample = () => (
  <Collapsible>
    <CollapsibleTrigger>What is PatternMode?</CollapsibleTrigger>
    <CollapsibleContent>
      PatternMode is a modern React component library built on Base UI
      primitives.
    </CollapsibleContent>
  </Collapsible>
);

// Default open
export const DefaultOpenExample = () => (
  <Collapsible defaultOpen>
    <CollapsibleTrigger>System Requirements</CollapsibleTrigger>
    <CollapsibleContent>
      <TextList>
        <TextListItem>React 18 or higher</TextListItem>
        <TextListItem>Node.js 16 or higher</TextListItem>
        <TextListItem>TypeScript 4.9 or higher</TextListItem>
      </TextList>
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
  <Collapsible className="max-w-md">
    <CollapsibleTrigger>Installation Guide</CollapsibleTrigger>
    <CollapsibleContent>
      <VStack>
        <Text>Install PatternMode in your project:</Text>
        <Code className="block rounded bg-zinc-100 p-2 text-sm dark:bg-zinc-800">
          pnpm add patternmode
        </Code>
        <Text>Then import components as needed:</Text>
        <Code className="block rounded bg-zinc-100 p-2 text-sm dark:bg-zinc-800">
          {`import { Button } from "patternmode"`}
        </Code>
      </VStack>
    </CollapsibleContent>
  </Collapsible>
);

// Controlled collapsible
export const ControlledExample = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <VStack className="min-w-md">
      <ButtonGroup size="xs">
        <Button onClick={() => setOpen(true)} variant="secondary">
          Open
        </Button>
        <Button onClick={() => setOpen(false)} variant="secondary">
          Close
        </Button>
        <Button onClick={() => setOpen(!open)} variant="secondary">
          Toggle
        </Button>
      </ButtonGroup>

      <Collapsible onOpenChange={setOpen} open={open}>
        <CollapsibleTrigger>Controlled Content</CollapsibleTrigger>
        <CollapsibleContent>
          <Text>This collapsible is controlled by the buttons above.</Text>
        </CollapsibleContent>
      </Collapsible>
    </VStack>
  );
};

// Nested collapsibles
export const NestedExample = () => (
  <Collapsible defaultOpen>
    <CollapsibleTrigger>Parent Section</CollapsibleTrigger>
    <CollapsibleContent>
      <VStack>
        <Text>This is the parent content.</Text>

        <Collapsible>
          <CollapsibleTrigger>Child Section 1</CollapsibleTrigger>
          <CollapsibleContent>
            <Text>This is nested content 1.</Text>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger>Child Section 2</CollapsibleTrigger>
          <CollapsibleContent>
            <Text>This is nested content 2.</Text>
          </CollapsibleContent>
        </Collapsible>
      </VStack>
    </CollapsibleContent>
  </Collapsible>
);
