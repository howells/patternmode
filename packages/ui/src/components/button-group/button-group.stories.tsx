import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type { Radius } from "../../lib/radius";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Button } from "../button";
import { ButtonGroup } from "./button-group-root";

type ButtonGroupVariant = "joined" | "segmented";

const meta: Meta<typeof ButtonGroup> = {
  title: "ButtonGroup",
  component: ButtonGroup,
  argTypes: {
    variant: {
      control: "select",
      options: ["joined", "segmented"] satisfies ButtonGroupVariant[],
      description: "Visual style variant",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Layout direction",
    },
    radius: {
      control: "select",
      options: ["rounded", "square", "full"] satisfies Radius[],
      description: "Border radius style",
    },
    dividers: {
      control: "boolean",
      description:
        "Show dividers between items (auto-enabled for segmented variant)",
    },
  },
  args: {
    variant: "joined",
    orientation: "horizontal",
    radius: "full",
  },
  parameters: {
    builder: {
      category: "interactive",
      icon: "square",
    },
    docs: {
      description: {
        component:
          "Combines related buttons into a single visual unit. Supports horizontal/vertical orientation, joined/segmented variants, and can be combined with Input, Select, and DropdownMenu.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base story with all controllable props.
 * Use the controls panel to explore all button group options.
 */
export const Base: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button appearance="outline" variant="secondary">
        One
      </Button>
      <Button appearance="outline" variant="secondary">
        Two
      </Button>
      <Button appearance="outline" variant="secondary">
        Three
      </Button>
    </ButtonGroup>
  ),
};

/**
 * Matrix showing radius options across variants.
 */
export const RadiusMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Border radius options applied to button groups. For segmented variant, radius applies to both container and items.",
      },
    },
  },
  render: () => {
    const radii: { key: Radius; label: string }[] = [
      { key: "rounded", label: "Rounded" },
      { key: "square", label: "Square" },
      { key: "full", label: "Full" },
    ];

    const variants: { key: ButtonGroupVariant; label: string }[] = [
      { key: "joined", label: "Joined" },
      { key: "segmented", label: "Segmented" },
    ];

    return (
      <VariantGrid
        columns={variants}
        renderCell={(radius, variant) => (
          <ButtonGroup radius={radius} variant={variant}>
            <Button
              appearance={variant === "segmented" ? "ghost" : "outline"}
              variant="secondary"
            >
              One
            </Button>
            <Button
              appearance={variant === "segmented" ? "ghost" : "outline"}
              variant="secondary"
            >
              Two
            </Button>
            <Button
              appearance={variant === "segmented" ? "ghost" : "outline"}
              variant="secondary"
            >
              Three
            </Button>
          </ButtonGroup>
        )}
        rowLabels="Radius"
        rows={radii}
      />
    );
  },
};
