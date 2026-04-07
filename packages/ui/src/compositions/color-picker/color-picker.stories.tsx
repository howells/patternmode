import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { useState } from "react";
import type { SwatchSize } from "../../lib/size";
import { VariantGrid } from "../../stories/utils/variant-grid";
import type { ColorPickerProps } from "./color-picker-root";
import { ColorPicker } from "./color-picker-root";

const meta: Meta<ColorPickerProps> = {
  title: "ColorPicker",
  component: ColorPicker,
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "multiple"],
      description: "Selection mode",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "base", "lg", "xl"],
      description: "Swatch size",
    },
    collapsible: {
      control: "boolean",
      description: "Show preview with expand button",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
  args: {
    mode: "single",
    size: "base",
    collapsible: false,
    disabled: false,
  },
  parameters: {
    builder: {
      category: "forms",
      icon: "palette",
    },
    docs: {
      description: {
        component:
          "Grid-based color picker with curated patternmodel colors. Single or multiple selection.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

function BaseDemo(args: ColorPickerProps) {
  const [color, setColor] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-4">
      <ColorPicker {...args} mode="single" onChange={setColor} value={color} />
      <p className="text-muted-foreground text-sm">
        Selected: {color || "None"}
      </p>
    </div>
  );
}

/**
 * Base color picker.
 */
export const Base: Story = {
  render(args) {
    return <BaseDemo {...(args as ColorPickerProps)} />;
  },
};

function MultipleSelectionDemo() {
  const [colors, setColors] = useState<string[]>([]);
  return (
    <div className="flex flex-col gap-4">
      <ColorPicker mode="multiple" onChange={setColors} value={colors} />
      <p className="text-muted-foreground text-sm">
        Selected: {colors.length === 0 ? "None" : colors.join(", ")}
      </p>
    </div>
  );
}

/**
 * Multiple selection mode.
 */
export const MultipleSelection: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Pick multiple colors from the palette.",
      },
    },
  },
  render: () => <MultipleSelectionDemo />,
};

type PickerState = "default" | "disabled";

const SIZE_ROWS: { key: SwatchSize; label: string }[] = [
  { key: "xs", label: "XS" },
  { key: "sm", label: "Small" },
  { key: "base", label: "Base" },
  { key: "lg", label: "Large" },
  { key: "xl", label: "XL" },
];

const STATE_COLUMNS: { key: PickerState; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "disabled", label: "Disabled" },
];

/**
 * Size and state matrix.
 */
export const SizeMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "All swatch sizes in default and disabled states.",
      },
    },
  },
  render: () => {
    const renderCell = (size: SwatchSize, state: PickerState) => (
      <ColorPicker
        columns={3}
        disabled={state === "disabled"}
        initialRows={1}
        mode="single"
        size={size}
      />
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
