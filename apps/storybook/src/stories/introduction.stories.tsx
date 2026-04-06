import { Badge } from "@patternmode/ui/components/badge";
import { Button } from "@patternmode/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@patternmode/ui/components/card";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Foundations/Introduction",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen bg-background px-8 py-10 text-foreground">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden">
          <CardHeader className="gap-4">
            <Badge variant="accent">Patternmode canonical upstream</Badge>
            <div className="space-y-4">
              <p className="text-label text-muted-foreground uppercase">
                Review surface
              </p>
              <h1 className="max-w-3xl font-display text-title-lg">
                A shared visual language for active projects.
              </h1>
              <CardDescription className="text-body-lg">
                Storybook is where house style, token discipline, and component
                APIs prove themselves before they spread into consumer apps.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button>Review primitives</Button>
            <Button variant="secondary">Stress test themes</Button>
            <Button variant="ghost">Document boundaries</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-label text-muted-foreground uppercase">
              Launch guardrails
            </p>
            <CardTitle>Shared, typed, and visually coherent</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {[
              "Tokens own the aesthetic baseline.",
              "Primitives stay narrow and reusable.",
              "Storybook is the contract, not a sidecar.",
              "Projects wrap locally before they fork.",
            ].map((rule) => (
              <div
                className="rounded-[calc(var(--radius-lg)-4px)] bg-secondary px-4 py-3 text-body text-secondary-foreground"
                key={rule}
              >
                {rule}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};
