import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { Button } from "../button";
import { Flex } from "../flex";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip-root";

type TooltipSide = "top" | "right" | "bottom" | "left";
const TOOLTIP_SIDES: TooltipSide[] = ["top", "right", "bottom", "left"];

const meta = {
  title: "Tooltip",
  component: Tooltip,
  argTypes: {
    // Visual
    side: {
      control: "select",
      options: TOOLTIP_SIDES,
      description: "Position of the tooltip relative to the trigger",
    },

    // Content
    buttonText: {
      control: "text",
      description: "Text shown on the trigger button",
    },
    tooltipText: {
      control: "text",
      description: "Text shown in the tooltip",
    },

    // Advanced (hidden)
    defaultOpen: { table: { disable: true } },
    open: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    delayDuration: { table: { disable: true } },
  },
  args: {
    side: "top",
    buttonText: "Hover me",
    tooltipText: "Tooltip text",
  },
  parameters: {
    builder: {
      category: "feedback",
      icon: "message-circle",
    },
    docs: {
      description: {
        component:
          "Displays helpful text on hover or focus. Supports multiple positions with automatic overflow handling.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  render: (args) => {
    const typedArgs = args as Record<string, unknown>;
    const side = (typedArgs.side as TooltipSide) || "top";
    const buttonText = (typedArgs.buttonText as string) || "Hover me";
    const tooltipText = (typedArgs.tooltipText as string) || "Tooltip text";
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="sm">{buttonText}</Button>
        </TooltipTrigger>
        <TooltipContent side={side}>{tooltipText}</TooltipContent>
      </Tooltip>
    );
  },
};

/**
 * All tooltip positions.
 */
export const AllPositions: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Tooltips can be positioned on any side of the trigger.",
      },
    },
  },
  render: () => (
    <Flex align="center" className="py-16" gap="lg" justify="center">
      {TOOLTIP_SIDES.map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button size="sm" variant="secondary">
              {side}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
        </Tooltip>
      ))}
    </Flex>
  ),
};
