import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip-root";

const meta = {
  title: "Feedback/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        Patternmode keeps guidance brief and precise.
      </TooltipContent>
    </Tooltip>
  ),
};

export const ReviewSurface: Story = {
  render: () => (
    <Card className="w-[30rem]">
      <CardHeader>
        <CardTitle>Micro guidance should feel light, not sticky</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center py-10">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="accent">Hover for review note</Button>
          </TooltipTrigger>
          <TooltipContent>
            Use tooltips for short clarification, not for hiding core product
            information.
          </TooltipContent>
        </Tooltip>
      </CardContent>
    </Card>
  ),
};
