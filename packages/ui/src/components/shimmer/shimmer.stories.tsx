import "@patternmode/tailwind-config/shared-styles.css";
import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import { Shimmer } from "./shimmer-root";

type ShimmerStoryArgs = React.ComponentProps<typeof Shimmer>;

const meta: Meta<ShimmerStoryArgs> = {
  title: "Shimmer",
  component: Shimmer,
  argTypes: {
    children: {
      control: "text",
      description: "Text content to apply shimmer effect",
    },
    variant: {
      control: "select",
      options: ["light", "dark"],
      description:
        "Color variant (light = white highlight, dark = foreground highlight)",
    },
    duration: {
      control: { type: "number", min: 0.5, max: 5, step: 0.1 },
      description: "Animation duration in seconds",
    },
    repeat: {
      control: { type: "number", min: 1, max: 10 },
      description: "Number of repeats (Infinity for continuous)",
    },
    repeatDelay: {
      control: { type: "number", min: 0, max: 2, step: 0.1 },
      description: "Delay between repeats in seconds",
    },
    spread: {
      control: { type: "number", min: 1, max: 10 },
      description: "Gradient spread width per character",
    },
    as: {
      control: "select",
      options: ["span", "p", "h1", "h2", "h3", "div"],
      description: "HTML element to render as",
    },
    className: { table: { disable: true } },
  },
  args: {
    children: "Shimmering text effect",
    variant: "light",
    duration: 1.2,
    spread: 2.5,
    as: "span",
  },
  parameters: {
    builder: {
      category: "feedback",
      icon: "sparkles",
    },
    docs: {
      description: {
        component:
          "Animated shimmer effect for text. Creates a gradient sweep animation for loading states and AI-generated content.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base story - all props controllable via args panel.
 * Shimmer loops infinitely by default until the component unmounts.
 */
export const Base: Story = {};
