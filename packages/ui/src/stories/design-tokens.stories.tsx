import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "../components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card";

const meta = {
  title: "Design System/Tokens",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function Swatch({
  label,
  sampleClassName,
  value,
}: {
  label: string;
  sampleClassName: string;
  value: string;
}) {
  return (
    <div className="grid gap-2">
      <div
        className={`h-16 rounded-[calc(var(--radius-lg)-4px)] border border-border/80 ${sampleClassName}`}
      />
      <div className="space-y-1">
        <p className="text-label text-muted-foreground uppercase">{label}</p>
        <p className="text-body text-foreground/80">{value}</p>
      </div>
    </div>
  );
}

export const Overview: Story = {
  render: () => (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <Badge variant="accent">Patternmode house style</Badge>
          <CardTitle>Design tokens define the family resemblance</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Swatch
            label="Primary"
            sampleClassName="bg-primary"
            value="Product-weighted neutral"
          />
          <Swatch
            label="Accent"
            sampleClassName="bg-accent"
            value="Bright but still disciplined"
          />
          <Swatch
            label="Secondary"
            sampleClassName="bg-secondary"
            value="Quiet surface elevation"
          />
          <Swatch
            label="Panel"
            sampleClassName="bg-panel"
            value="Default shared surface"
          />
        </CardContent>
      </Card>
    </div>
  ),
};
