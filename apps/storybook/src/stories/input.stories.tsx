import { Button } from "@patternmode/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@patternmode/ui/components/card";
import { Input } from "@patternmode/ui/components/input";
import { Textarea } from "@patternmode/ui/components/textarea";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Primitives/Fields",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InputDefault: Story = {
  args: {
    placeholder: "Search release primitives",
  },
};

export const TextareaDefault: Story = {
  render: () => (
    <div className="w-[28rem]">
      <Textarea placeholder="Describe the local wrapper you still need..." />
    </div>
  ),
};

export const ReviewSurface: Story = {
  render: () => (
    <Card className="w-[34rem]">
      <CardHeader>
        <CardTitle>Field language should feel measured</CardTitle>
        <CardDescription>
          Inputs, textareas, and actions should share the same density, radius,
          and focus behavior.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <label
            className="text-label text-muted-foreground uppercase"
            htmlFor="story-name"
          >
            Theme preset name
          </label>
          <Input id="story-name" placeholder="Default house style" />
        </div>
        <div className="grid gap-2">
          <label
            className="text-label text-muted-foreground uppercase"
            htmlFor="story-notes"
          >
            Notes
          </label>
          <Textarea
            id="story-notes"
            placeholder="Accent stays bright, density stays product-oriented, motion stays restrained."
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save preset</Button>
        <Button variant="ghost">Cancel</Button>
      </CardFooter>
    </Card>
  ),
};
