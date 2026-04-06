import { Badge } from "@patternmode/ui/components/badge";
import { Button } from "@patternmode/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@patternmode/ui/components/card";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Primitives/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <Card className="w-[30rem]">
      <CardHeader>
        <Badge variant="accent">Release slice</Badge>
        <CardTitle>Polished surfaces for dense product UI</CardTitle>
        <CardDescription>
          Cards should feel neutral enough for broad reuse, but deliberate
          enough that downstream apps inherit the Patternmode family resemblance
          immediately.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="rounded-[calc(var(--radius-lg)-4px)] bg-secondary px-4 py-3 text-body text-secondary-foreground">
          Shared tokens own the surface language.
        </div>
        <div className="rounded-[calc(var(--radius-lg)-4px)] bg-accent-soft px-4 py-3 text-accent-foreground text-body">
          Accent treatments stay controlled.
        </div>
      </CardContent>
      <CardFooter>
        <Button>Publish primitive</Button>
        <Button variant="secondary">Open Storybook</Button>
      </CardFooter>
    </Card>
  ),
};
