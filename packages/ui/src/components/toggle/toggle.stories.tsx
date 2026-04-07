import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { Bold, Italic, Underline } from "lucide-react";
import type React from "react";
import { iconControlArgType } from "../../stories/controls/icon-control";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Flex } from "../flex";
import { Icon } from "../icon";
import { Toggle, type ToggleSize } from "./toggle-root";

type ToggleStoryArgs = React.ComponentProps<typeof Toggle>;

const TOGGLE_VARIANTS = ["default", "secondary"] as const;
type ToggleVariant = (typeof TOGGLE_VARIANTS)[number];

const TOGGLE_SIZES: ToggleSize[] = ["sm", "base", "lg"];

const TOGGLE_SHAPES = ["square", "round"] as const;
type ToggleShape = (typeof TOGGLE_SHAPES)[number];

const meta: Meta<ToggleStoryArgs> = {
  title: "Toggle",
  component: Toggle,
  argTypes: {
    variant: {
      control: "select",
      options: TOGGLE_VARIANTS,
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: TOGGLE_SIZES,
      description: "Toggle size",
    },
    shape: {
      control: "select",
      options: TOGGLE_SHAPES,
      description: "Border radius shape",
    },
    icon: {
      ...iconControlArgType,
      description: "Icon to display",
    },
    iconPlacement: {
      control: "radio",
      options: ["start", "end"],
      description: "Icon position relative to text",
    },
    pressed: {
      control: "boolean",
      description: "Controlled pressed state",
    },
    defaultPressed: {
      control: "boolean",
      description: "Uncontrolled default pressed state",
    },
    disabled: {
      control: "boolean",
      description: "Disable the toggle",
    },
    children: {
      control: "text",
      description: "Toggle label text",
    },
    className: { table: { disable: true } },
    asChild: { table: { disable: true } },
  },
  args: {
    children: "Toggle",
    variant: "default",
    size: "base",
    shape: "square",
    iconPlacement: "start",
    pressed: false,
    disabled: false,
  },
  parameters: {
    builder: {
      category: "interactive",
      icon: "toggle-right",
    },
    docs: {
      description: {
        component: "Two-state button that can be on or off.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  args: {
    children: "Toggle",
  },
};

/**
 * State columns for the matrix.
 */
type ToggleState = "default" | "pressed" | "disabled";

const STATE_COLUMNS: { key: ToggleState; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "pressed", label: "Pressed" },
  { key: "disabled", label: "Disabled" },
];

/**
 * Row data with shape and variant.
 */
interface ShapeVariantRow {
  key: string;
  label: string;
  labels: [string];
  shape: ToggleShape;
  variant: ToggleVariant;
}

function buildVariantMatrixRows(): ShapeVariantRow[] {
  const rows: ShapeVariantRow[] = [];

  for (const shape of TOGGLE_SHAPES) {
    for (const variant of TOGGLE_VARIANTS) {
      rows.push({
        key: `${shape}|${variant}`,
        label: shape.charAt(0).toUpperCase() + shape.slice(1),
        labels: [variant.charAt(0).toUpperCase() + variant.slice(1)],
        shape,
        variant,
      });
    }
  }

  return rows;
}

const VARIANT_MATRIX_ROWS = buildVariantMatrixRows();

/**
 * Shape × Variant × State matrix.
 */
export const VariantMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Complete matrix showing shape and variant combinations across all states.",
      },
    },
  },
  render: () => {
    const renderCell = (rowKey: string, state: ToggleState) => {
      const row = VARIANT_MATRIX_ROWS.find((r) => r.key === rowKey);
      if (!row) {
        return null;
      }

      const { shape, variant } = row;

      const stateProps = (() => {
        switch (state) {
          case "pressed":
            return { defaultPressed: true };
          case "disabled":
            return { disabled: true };
          default:
            return {};
        }
      })();

      return (
        <Toggle shape={shape} variant={variant} {...stateProps}>
          Toggle
        </Toggle>
      );
    };

    return (
      <VariantGrid
        columns={STATE_COLUMNS}
        renderCell={renderCell}
        rowLabels={["Shape", "Variant"]}
        rows={VARIANT_MATRIX_ROWS}
      />
    );
  },
};

/**
 * Icon-only toggles for toolbars.
 */
export const WithIcons: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Icon-only toggles for toolbar formatting controls.",
      },
    },
  },
  render: () => (
    <Flex align="center" gap="xs">
      <Toggle aria-label="Bold">
        <Icon icon={Bold} />
      </Toggle>
      <Toggle aria-label="Italic">
        <Icon icon={Italic} />
      </Toggle>
      <Toggle aria-label="Underline">
        <Icon icon={Underline} />
      </Toggle>
    </Flex>
  ),
};

/**
 * All sizes demonstration.
 */
export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Toggle sizes: sm (32px), base (36px), lg (40px).",
      },
    },
  },
  render: () => {
    const SIZE_ROWS: { key: ToggleSize; label: string }[] = TOGGLE_SIZES.map(
      (s) => ({ key: s, label: s }),
    );

    const VARIANT_COLS: { key: ToggleVariant; label: string }[] = [
      { key: "default", label: "Default" },
      { key: "secondary", label: "Secondary" },
    ];

    return (
      <VariantGrid<ToggleSize, ToggleVariant>
        columns={VARIANT_COLS}
        renderCell={(size, variant) => (
          <Toggle size={size} variant={variant}>
            Toggle
          </Toggle>
        )}
        rowLabels="Size"
        rows={SIZE_ROWS}
      />
    );
  },
};
