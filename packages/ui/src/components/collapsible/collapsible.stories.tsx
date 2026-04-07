import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { CollapsibleContent } from "./collapsible-content";
import { Collapsible } from "./collapsible-root";
import { CollapsibleTrigger } from "./collapsible-trigger";

const meta = {
  title: "Disclosure/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Collapsible>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <div className="w-[32rem]">
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Why add a collapsible as well?</CollapsibleTrigger>
        <CollapsibleContent>
          Not every compact disclosure wants the full multi-item accordion
          treatment. Some views just need one expandable block.
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

export const ReviewSurface: Story = {
  render: () => (
    <Card className="w-[32rem]">
      <CardHeader>
        <CardTitle>Single disclosure still needs a shared style</CardTitle>
      </CardHeader>
      <CardContent>
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Current promotion rule</CollapsibleTrigger>
          <CollapsibleContent>
            If a pattern is stable, broadly reusable, and visually consistent,
            it belongs upstream instead of being reimplemented in each app.
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  ),
};
