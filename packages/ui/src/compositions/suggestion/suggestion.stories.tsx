import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { Suggestion, Suggestions } from "../suggestion";

const meta = {
  title: "Suggestion",
  component: Suggestions,
  parameters: {
    builder: {
      category: "interactive",
      icon: "lightbulb",
    },

    docs: {
      description: {
        component:
          "A suggestion component that displays a horizontal row of clickable suggestions for user interaction. Commonly used with AI chat interfaces to provide quick action buttons.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Base: Story = {
  render: () => (
    <Suggestions>
      <Suggestion
        onClick={(suggestion) => console.log("Clicked:", suggestion)}
        suggestion="Show me upholstery fabrics"
      />
      <Suggestion
        onClick={(suggestion) => console.log("Clicked:", suggestion)}
        suggestion="What patternmodels are eco-friendly?"
      />
      <Suggestion
        onClick={(suggestion) => console.log("Clicked:", suggestion)}
        suggestion="Filter by Kvadrat brand"
      />
    </Suggestions>
  ),
};

export const WithDifferentSizes: Story = {
  render: () => (
    <Suggestions>
      <Suggestion size="xs" suggestion="Extra small" />
      <Suggestion size="sm" suggestion="Small" />
      <Suggestion size="base" suggestion="Base" />
      <Suggestion size="lg" suggestion="Large" />
    </Suggestions>
  ),
};

export const WithDifferentVariants: Story = {
  render: () => (
    <Suggestions>
      <Suggestion
        appearance="outline"
        suggestion="Outline"
        variant="secondary"
      />
      <Suggestion appearance="ghost" suggestion="Ghost" />
      <Suggestion suggestion="Default" variant="default" />
    </Suggestions>
  ),
};

export const LongList: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When there are many suggestions, they scroll horizontally for a clean layout.",
      },
    },
  },
  render: () => {
    const suggestions = [
      "Show upholstery fabrics",
      "What's popular in residential textiles?",
      "Filter by Kvadrat brand",
      "Show me wool patternmodels",
      "What's trending this season?",
      "Show eco-friendly options",
      "PatternModels for outdoor use",
      "Best fabrics for high traffic areas",
    ];

    return (
      <Suggestions>
        {suggestions.map((suggestion) => (
          <Suggestion
            key={suggestion}
            onClick={(s) => console.log("Selected:", s)}
            suggestion={suggestion}
          />
        ))}
      </Suggestions>
    );
  },
};
