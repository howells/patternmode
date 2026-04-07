import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { Check, X } from "lucide-react";

import type { SwatchSize } from "../../lib/size";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Swatch } from "./swatch";

/** Broad palette for the matrix — light to dark, warm and cool */
const PALETTE = [
  { label: "White", color: "#FAFAFA" },
  { label: "Cream", color: "#F5EEDD" },
  { label: "Gold", color: "#F7DC6F" },
  { label: "Sage", color: "#C5D5C0" },
  { label: "Azure", color: "#3D7AB8" },
  { label: "Coral", color: "#E07B5F" },
  { label: "Crimson", color: "#B83A3A" },
  { label: "Navy", color: "#2B4A6B" },
  { label: "Walnut", color: "#7D5A3C" },
  { label: "Charcoal", color: "#525252" },
  { label: "Black", color: "#171717" },
];

const SIZES: SwatchSize[] = ["xs", "sm", "base", "lg", "xl"];

const meta: Meta<typeof Swatch> = {
  title: "Swatch",
  component: Swatch,
  argTypes: {
    color: { control: "color", description: "CSS color value" },
    size: {
      control: "radio",
      options: SIZES,
      description: "Size from shared swatch size system",
    },
    selected: {
      control: "boolean",
      description: "Whether swatch appears selected",
    },
    icon: {
      control: "select",
      options: [undefined, "Check", "X"],
      mapping: { Check, X, undefined },
      description: "Icon shown when selected (contrast-aware)",
    },
    raised: {
      control: "boolean",
      description: "White border ring for embedding in inputs",
    },
    showRing: {
      control: "boolean",
      description: "Show selection ring when selected",
    },
    unavailable: {
      control: "boolean",
      description: "Unavailable (out of stock) state",
    },
    isLight: {
      control: "boolean",
      description: "Override light color detection",
    },
  },
  args: {
    color: "#3D7AB8",
    size: "base",
    selected: false,
    showRing: true,
    unavailable: false,
  },
  parameters: {
    builder: { category: "display", icon: "palette" },
    docs: {
      description: {
        component:
          "Low-level visual primitive for rendering color or image swatches with consistent selection styling. Sets contrast-aware text color so icons and children automatically adapt. Purely visual — wrap in button/radio for interactivity.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Base interactive story with all controls. */
export const Base: Story = {
  args: {
    selected: true,
    icon: Check,
  },
};

/**
 * Comprehensive matrix: color × feature.
 * Shows light/dark contrast handling, selection states, icon overlay,
 * sizes, and unavailable state across the full palette.
 */
export const VariantMatrix: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    type ColKey =
      | "plain"
      | "selected-ring"
      | "selected-check"
      | "selected-x"
      | "raised"
      | "unavailable"
      | SwatchSize;

    const colorRows = PALETTE.map((p) => ({
      key: p.color,
      label: (
        <span className="flex items-center gap-2">
          <Swatch color={p.color} size="xs" />
          {p.label}
        </span>
      ),
    }));

    const columns: { key: ColKey; label: string }[] = [
      { key: "plain", label: "Plain" },
      { key: "selected-ring", label: "Ring" },
      { key: "selected-check", label: "Check" },
      { key: "selected-x", label: "X icon" },
      { key: "raised", label: "Raised" },
      { key: "unavailable", label: "Unavail." },
      ...SIZES.map((s) => ({ key: s as ColKey, label: s })),
    ];

    const renderCell = (color: string, col: ColKey) => {
      switch (col) {
        case "plain":
          return <Swatch color={color} />;
        case "selected-ring":
          return <Swatch color={color} selected />;
        case "selected-check":
          return <Swatch color={color} icon={Check} selected />;
        case "selected-x":
          return <Swatch color={color} icon={X} selected showRing={false} />;
        case "raised":
          return <Swatch color={color} raised />;
        case "unavailable":
          return <Swatch color={color} unavailable />;
        default:
          return (
            <Swatch
              color={color}
              icon={Check}
              selected
              size={col as SwatchSize}
            />
          );
      }
    };

    return (
      <VariantGrid<string, ColKey>
        columns={columns}
        renderCell={renderCell}
        rowLabels="Color"
        rows={colorRows}
      />
    );
  },
};
