import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { ProgressDots } from "./progress-dots-root";

type ProgressDotsStoryArgs = React.ComponentProps<typeof ProgressDots>;

const meta: Meta<ProgressDotsStoryArgs> = {
  title: "ProgressDots",
  component: ProgressDots,
  argTypes: {
    current: {
      control: { type: "number", min: 0 },
      description:
        "Current step (0-indexed). Steps before this are marked completed.",
    },
    total: {
      control: { type: "number", min: 1, max: 10 },
      description: "Total number of steps/dots to display",
    },
    labels: {
      control: "object",
      description: "Labels for each step (shown in tooltips)",
    },
  },
  args: {
    current: 2,
    total: 5,
  },
  parameters: {
    builder: {
      category: "feedback",
      icon: "circle",
    },
    docs: {
      description: {
        component:
          "Progress indicator showing dots that expand and change color based on completion status. Dots before the current step are marked as completed. Optionally interactive with click handlers.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base story with all controllable props.
 * Adjust current and total to see the progress change.
 */
export const Base: Story = {
  args: {
    current: 2,
    total: 5,
  },
};

/**
 * Progress states showing different completion levels.
 */
export const ProgressStates: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Examples showing progress at different stages: start, middle, and complete.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-sm">Start (0/5)</span>
        <ProgressDots current={0} total={5} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-sm">In Progress (2/5)</span>
        <ProgressDots current={2} total={5} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-sm">Complete (4/5)</span>
        <ProgressDots current={4} total={5} />
      </div>
    </div>
  ),
};

/**
 * Interactive dots with click handlers for navigation.
 */
export const Interactive: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Dots can be made interactive with an onDotClick handler for step navigation.",
      },
    },
  },
  render: () => (
    <ProgressDots
      current={2}
      labels={["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"]}
      onDotClick={(index) => console.log(`Navigate to step ${index + 1}`)}
      total={5}
    />
  ),
};

/**
 * With tooltip labels for each step.
 */
export const WithLabels: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Labels appear as tooltips when hovering over each dot.",
      },
    },
  },
  render: () => (
    <ProgressDots
      current={1}
      labels={["Select Type", "Add Details", "Review", "Confirm"]}
      total={4}
    />
  ),
};
