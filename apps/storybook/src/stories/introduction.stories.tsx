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
      <div className="mx-auto max-w-5xl rounded-[var(--radius-xl)] border border-border bg-white/90 p-8 shadow-sm">
        <p className="text-label text-muted-foreground uppercase">
          Patternmode
        </p>
        <h1 className="mt-4 font-display text-title">
          House style review surface
        </h1>
        <p className="mt-4 max-w-3xl text-body-lg text-muted-foreground">
          Storybook is the visual contract for exported user-facing primitives.
          Shared components should prove their baseline state, meaningful
          variants, and the family resemblance of the default theme here before
          they spread into consumer apps.
        </p>
      </div>
    </div>
  ),
};
