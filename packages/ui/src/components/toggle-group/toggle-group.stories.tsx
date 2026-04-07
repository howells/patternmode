import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import {
  Bold,
  Italic,
  Layers,
  LayoutGrid,
  LayoutList,
  Monitor,
  Smartphone,
  Tablet,
  Underline,
} from "lucide-react";
import type React from "react";
import type { ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Stack } from "../stack";
import { Text } from "../text";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group-root";

type ToggleGroupStoryArgs = React.ComponentProps<typeof ToggleGroup>;

/**
 * ToggleGroup variants.
 */
const TOGGLE_GROUP_VARIANTS = ["default", "outline", "pill"] as const;
type ToggleGroupVariant = (typeof TOGGLE_GROUP_VARIANTS)[number];

const meta: Meta<ToggleGroupStoryArgs> = {
  title: "ToggleGroup",
  component: ToggleGroup,
  argTypes: {
    // Behavior
    type: {
      control: "radio",
      options: ["single", "multiple"],
      description: "Single or multiple selection mode",
    },

    // Visual
    variant: {
      control: "select",
      options: TOGGLE_GROUP_VARIANTS,
      description: "Visual style variant",
    },
    size: {
      ...sizeArgType,
      description: "Size using shared ComponentSize scale",
    },

    // States
    disabled: {
      control: "boolean",
      description: "Disable all items",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
    asChild: { table: { disable: true } },
  },
  args: {
    type: "single",
    variant: "outline",
    size: "sm",
  },
  parameters: {
    builder: {
      category: "interactive",
      icon: "toggle-right",
    },
    docs: {
      description: {
        component:
          "Select one or multiple options from a set. Uses shared ComponentSize scale.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<ToggleGroupStoryArgs>;

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  render: (args: ToggleGroupStoryArgs) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem aria-label="Desktop" icon={Monitor} value="desktop" />
      <ToggleGroupItem aria-label="Tablet" icon={Tablet} value="tablet" />
      <ToggleGroupItem aria-label="Mobile" icon={Smartphone} value="mobile" />
    </ToggleGroup>
  ),
};

/**
 * Variant × Size matrix.
 */
export const VariantSizeMatrix: Story = {
  args: {},
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Complete matrix showing all variants across sizes.",
      },
    },
  },
  render: () => {
    const sizes: ComponentSize[] = ["xs", "sm", "base", "lg", "xl"];
    const SIZE_ROWS: { key: ComponentSize; label: string }[] = sizes.map(
      (s) => ({ key: s, label: s }),
    );

    const VARIANT_COLS: { key: ToggleGroupVariant; label: string }[] = [
      { key: "default", label: "Default" },
      { key: "outline", label: "Outline" },
      { key: "pill", label: "Pill" },
    ];

    return (
      <VariantGrid<ComponentSize, ToggleGroupVariant>
        columns={VARIANT_COLS}
        renderCell={(size, variant) => (
          <ToggleGroup
            defaultValue="desktop"
            size={size}
            type="single"
            variant={variant}
          >
            <ToggleGroupItem
              aria-label="Desktop"
              icon={Monitor}
              value="desktop"
            />
            <ToggleGroupItem aria-label="Tablet" icon={Tablet} value="tablet" />
            <ToggleGroupItem
              aria-label="Mobile"
              icon={Smartphone}
              value="mobile"
            />
          </ToggleGroup>
        )}
        rowLabels="Size"
        rows={SIZE_ROWS}
      />
    );
  },
};

/**
 * Single vs Multiple selection modes.
 */
export const Types: Story = {
  args: {},
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Single-select (radio-like) and multi-select (checkbox-like) modes.",
      },
    },
  },
  render: () => (
    <Stack gap="base">
      <Stack gap="xs">
        <Text className="text-muted-foreground text-xs">Single</Text>
        <ToggleGroup type="single">
          <ToggleGroupItem
            aria-label="Desktop"
            icon={Monitor}
            value="desktop"
          />
          <ToggleGroupItem aria-label="Tablet" icon={Tablet} value="tablet" />
          <ToggleGroupItem
            aria-label="Mobile"
            icon={Smartphone}
            value="mobile"
          />
        </ToggleGroup>
      </Stack>
      <Stack gap="xs">
        <Text className="text-muted-foreground text-xs">Multiple</Text>
        <ToggleGroup type="multiple">
          <ToggleGroupItem aria-label="Bold" icon={Bold} value="bold" />
          <ToggleGroupItem aria-label="Italic" icon={Italic} value="italic" />
          <ToggleGroupItem
            aria-label="Underline"
            icon={Underline}
            value="underline"
          />
        </ToggleGroup>
      </Stack>
    </Stack>
  ),
};

/**
 * With text labels.
 */
export const WithText: Story = {
  args: {},
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Items with text labels, with or without icons.",
      },
    },
  },
  render: () => (
    <Stack gap="base">
      <Stack gap="xs">
        <Text className="text-muted-foreground text-xs">Text only</Text>
        <ToggleGroup type="single">
          <ToggleGroupItem value="desktop">Desktop</ToggleGroupItem>
          <ToggleGroupItem value="tablet">Tablet</ToggleGroupItem>
          <ToggleGroupItem value="mobile">Mobile</ToggleGroupItem>
        </ToggleGroup>
      </Stack>
      <Stack gap="xs">
        <Text className="text-muted-foreground text-xs">Icon with text</Text>
        <ToggleGroup size="base" type="single">
          <ToggleGroupItem icon={Monitor} value="desktop">
            Desktop
          </ToggleGroupItem>
          <ToggleGroupItem icon={Tablet} value="tablet">
            Tablet
          </ToggleGroupItem>
          <ToggleGroupItem icon={Smartphone} value="mobile">
            Mobile
          </ToggleGroupItem>
        </ToggleGroup>
      </Stack>
    </Stack>
  ),
};

/**
 * View mode pattern.
 */
export const ViewModes: Story = {
  args: {},
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Common pattern for view mode toggles.",
      },
    },
  },
  render: () => (
    <ToggleGroup defaultValue="list" type="single">
      <ToggleGroupItem aria-label="List view" icon={LayoutList} value="list" />
      <ToggleGroupItem aria-label="Grid view" icon={LayoutGrid} value="grid" />
      <ToggleGroupItem aria-label="Stack view" icon={Layers} value="stack" />
    </ToggleGroup>
  ),
};

/**
 * Many items in a narrow container scroll horizontally.
 * The pill variant includes a ScrollFade hint on the right edge.
 */
export const Overflow: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "When items exceed the container width, the pill variant scrolls horizontally with a fade hint on the trailing edge.",
      },
    },
  },
  render: () => {
    const ROWS: { key: ToggleGroupVariant; label: string }[] = [
      { key: "pill", label: "pill" },
      { key: "outline", label: "outline" },
      { key: "default", label: "default" },
    ];
    const COLS: { key: "narrow"; label: string }[] = [
      { key: "narrow", label: "Narrow (w-64)" },
    ];

    return (
      <VariantGrid<ToggleGroupVariant, "narrow">
        columns={COLS}
        renderCell={(variant) => (
          <div className="w-64">
            <ToggleGroup defaultValue="all" type="single" variant={variant}>
              <ToggleGroupItem value="all">All</ToggleGroupItem>
              <ToggleGroupItem value="flooring">Flooring</ToggleGroupItem>
              <ToggleGroupItem value="tile">Tile</ToggleGroupItem>
              <ToggleGroupItem value="wallcovering">
                Wallcovering
              </ToggleGroupItem>
              <ToggleGroupItem value="carpet">Carpet</ToggleGroupItem>
              <ToggleGroupItem value="stone">Stone</ToggleGroupItem>
            </ToggleGroup>
          </div>
        )}
        rowLabels="Variant"
        rows={ROWS}
      />
    );
  },
};
