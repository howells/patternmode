import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { AccordionContent } from "./accordion-content";
import { AccordionItem } from "./accordion-item";
import { Accordion } from "./accordion-root";
import { AccordionTrigger } from "./accordion-trigger";

const meta = {
  title: "Disclosure/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    type: "single",
  },
  render: () => (
    <div className="w-[32rem]">
      <Accordion collapsible defaultValue="item-1" type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>What belongs upstream?</AccordionTrigger>
          <AccordionContent>
            Shared primitives, tokens, and stable interaction patterns.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>What stays app-local?</AccordionTrigger>
          <AccordionContent>
            Workflow-heavy compositions and domain logic.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const ReviewSurface: Story = {
  args: {
    type: "single",
  },
  render: () => (
    <Card className="w-[32rem]">
      <CardHeader>
        <CardTitle>Expanded detail should stay calm</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion collapsible defaultValue="item-1" type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>Why use Materia as reference?</AccordionTrigger>
            <AccordionContent>
              Because it provides a proven package shape and primitive breadth,
              even though Patternmode keeps its own visual identity.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is the current goal?</AccordionTrigger>
            <AccordionContent>
              Build a credible shared UI foundation before moving into more
              expressive or domain-specific components.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  ),
};
