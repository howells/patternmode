import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { ChevronDown, ChevronUp } from "lucide-react";
import type React from "react";
import { COMPONENT_SIZES, type ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { ExpandButton } from "./expand-button-root";

type ExpandButtonStoryArgs = React.ComponentProps<typeof ExpandButton>;

const meta: Meta<ExpandButtonStoryArgs> = {
  title: "ExpandButton",
  component: ExpandButton,
  argTypes: {
    expanded: {
      control: "boolean",
      description: "Whether the button shows expanded or collapsed state",
    },
    size: {
      ...sizeArgType,
      description: "Button size following the component size scale",
    },
    disabled: {
      control: "boolean",
      description: "Disable interaction",
    },
  },
  args: {
    expanded: false,
    size: "sm",
    disabled: false,
  },
  parameters: {
    builder: {
      category: "interactive",
      icon: "plus",
    },
    docs: {
      description: {
        component:
          "A small toggle button for expand/collapse actions. Displays Plus when collapsed and Minus when expanded by default. Custom icons can be provided.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base story with all controllable props.
 * Toggle the expanded state to see the icon change.
 */
export const Base: Story = {
  args: {
    expanded: false,
  },
};

type ExpandedState = "collapsed" | "expanded";

const STATE_COLUMNS: { key: ExpandedState; label: string }[] = [
  { key: "collapsed", label: "Collapsed" },
  { key: "expanded", label: "Expanded" },
];

const SIZE_ROWS: { key: ComponentSize; label: string }[] = COMPONENT_SIZES.map(
  (s) => ({
    key: s,
    label: s,
  }),
);

/**
 * Size matrix showing all sizes in both expanded and collapsed states.
 */
export const SizeMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Matrix showing all component sizes in both collapsed and expanded states.",
      },
    },
  },
  render: () => {
    const renderCell = (size: ComponentSize, state: ExpandedState) => (
      <ExpandButton expanded={state === "expanded"} size={size} />
    );

    return (
      <VariantGrid
        columns={STATE_COLUMNS}
        renderCell={renderCell}
        rowLabels="Size"
        rows={SIZE_ROWS}
      />
    );
  },
};

/**
 * Custom icons example using chevrons instead of plus/minus.
 */
export const CustomIcons: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Expand buttons can use custom icons for expanded/collapsed states.",
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-4">
      <ExpandButton
        collapsedIcon={ChevronDown}
        expanded={false}
        expandedIcon={ChevronUp}
      />
      <ExpandButton
        collapsedIcon={ChevronDown}
        expanded={true}
        expandedIcon={ChevronUp}
      />
    </div>
  ),
};
