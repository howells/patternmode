import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { Check } from "lucide-react";
import { COMPONENT_SIZES, type ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import {
  BADGE_APPEARANCES,
  BADGE_VARIANTS,
  type BadgeAppearance,
  type BadgeVariant,
} from "../../lib/variant";
import { iconControlArgType } from "../../stories/controls/icon-control";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Badge, BadgeButton, BadgeDot } from "../badge";

const BADGE_VARIANT_ROWS: { key: BadgeVariant; label: string }[] =
  BADGE_VARIANTS.map((v) => ({
    key: v,
    label: v.charAt(0).toUpperCase() + v.slice(1),
  }));

const meta: Meta<typeof Badge> = {
  title: "Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: BADGE_VARIANTS,
      description: "Semantic color variant",
    },
    appearance: {
      control: "select",
      options: BADGE_APPEARANCES,
      description: "Visual appearance modifier",
    },
    size: sizeArgType,
    radius: {
      control: "select",
      options: ["rounded", "square", "full"],
      description: "Border radius style",
    },
    icon: iconControlArgType,
    iconPlacement: {
      control: "radio",
      options: ["start", "end"],
      description: "Icon position relative to content",
    },
    disabled: { control: "boolean", description: "Disabled state" },
    focused: { control: "boolean", description: "Force focus ring" },
    hovered: { control: "boolean", description: "Force hover state" },
    loading: { control: "boolean", description: "Show loading spinner" },
    loadingLabel: { control: "text", description: "Label during loading" },
    label: { control: "text", description: "Label text (left of divider)" },
    value: { control: "text", description: "Value text (right of divider)" },
    children: { control: "text", description: "Badge text content" },
    asChild: { table: { disable: true } },
    className: { table: { disable: true } },
    testid: { table: { disable: true } },
  },
  args: {
    children: "Badge",
    variant: "default",
    appearance: "solid",
    size: "base",
    radius: "rounded",
    iconPlacement: "start",
    disabled: false,
    focused: false,
    hovered: false,
    loading: false,
  },
  parameters: {
    builder: { category: "feedback", icon: "tag" },
    docs: {
      description: {
        component:
          "Display-only pill for contextual metadata: status, category, or counts. Uses shared pill styling with semantic color variants.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Base interactive story with all controls. */
export const Base: Story = {};

/**
 * Variant x Appearance matrix.
 * Shows all 7 colour variants across all 5 appearance styles,
 * plus states (icon, loading, disabled, rounded, with parts).
 */
export const VariantAppearanceMatrix: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    type ColKey =
      | BadgeAppearance
      | "icon"
      | "loading"
      | "disabled"
      | "rounded"
      | "with-dot"
      | "with-button";

    const columns: { key: ColKey; label: string }[] = [
      { key: "solid", label: "Solid" },
      { key: "light", label: "Light" },
      { key: "outline", label: "Outline" },
      { key: "ghost", label: "Ghost" },
      { key: "icon", label: "Icon" },
      { key: "loading", label: "Loading" },
      { key: "disabled", label: "Disabled" },
      { key: "rounded", label: "Pill" },
      { key: "with-dot", label: "Dot" },
      { key: "with-button", label: "Dismiss" },
    ];

    const renderCell = (variant: BadgeVariant, col: ColKey) => {
      switch (col) {
        case "icon":
          return (
            <Badge icon={Check} variant={variant}>
              Badge
            </Badge>
          );
        case "loading":
          return (
            <Badge loading variant={variant}>
              Badge
            </Badge>
          );
        case "disabled":
          return (
            <Badge disabled variant={variant}>
              Badge
            </Badge>
          );
        case "rounded":
          return (
            <Badge radius="full" variant={variant}>
              8
            </Badge>
          );
        case "with-dot":
          return (
            <Badge appearance="light" variant={variant}>
              <BadgeDot />
              Badge
            </Badge>
          );
        case "with-button":
          return (
            <Badge appearance="light" variant={variant}>
              Badge
              <BadgeButton aria-label="Remove badge" />
            </Badge>
          );
        default:
          return (
            <Badge appearance={col} variant={variant}>
              Badge
            </Badge>
          );
      }
    };

    return (
      <VariantGrid<BadgeVariant, ColKey>
        columns={columns}
        renderCell={renderCell}
        rowLabels="Variant"
        rows={BADGE_VARIANT_ROWS}
      />
    );
  },
};

/**
 * Size matrix across representative variants and radius options.
 */
export const SizeMatrix: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    type ColKey = "default" | "secondary" | "destructive" | "pill" | "square";

    const SIZE_ROWS: { key: ComponentSize; label: string }[] =
      COMPONENT_SIZES.map((s) => ({ key: s, label: s }));

    const columns: { key: ColKey; label: string }[] = [
      { key: "default", label: "Default" },
      { key: "secondary", label: "Secondary" },
      { key: "destructive", label: "Destructive" },
      { key: "pill", label: "Pill (full)" },
      { key: "square", label: "Square" },
    ];

    const renderCell = (size: ComponentSize, col: ColKey) => {
      switch (col) {
        case "pill":
          return (
            <Badge radius="full" size={size}>
              Badge
            </Badge>
          );
        case "square":
          return (
            <Badge radius="square" size={size}>
              Badge
            </Badge>
          );
        default:
          return (
            <Badge size={size} variant={col as BadgeVariant}>
              Badge
            </Badge>
          );
      }
    };

    return (
      <VariantGrid<ComponentSize, ColKey>
        columns={columns}
        renderCell={renderCell}
        rowLabels="Size"
        rows={SIZE_ROWS}
      />
    );
  },
};
