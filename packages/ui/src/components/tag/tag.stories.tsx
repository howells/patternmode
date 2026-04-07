import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { Star } from "lucide-react";
import { COMPONENT_SIZES, type ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import { iconControlArgType } from "../../stories/controls/icon-control";
import { VariantGrid } from "../../stories/utils/variant-grid";
import type { DotProps } from "../dot";
import { PILL_APPEARANCES, type PillAppearance } from "../pill";
import { TAG_VARIANTS, Tag, type TagVariant } from "../tag";

/** Map tag variant → matching dot variant */
const TAG_TO_DOT: Record<TagVariant, NonNullable<DotProps["variant"]>> = {
  default: "default",
  secondary: "secondary",
  affirmative: "affirmative",
  warning: "warning",
  outline: "default",
  info: "info",
  destructive: "destructive",
  brand: "brand",
};

const TAG_VARIANT_ROWS: { key: TagVariant; label: string }[] = TAG_VARIANTS.map(
  (v) => ({
    key: v,
    label: v.charAt(0).toUpperCase() + v.slice(1),
  }),
);

const SAMPLE_IMAGE =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=64&h=64&fit=crop";

const meta: Meta<typeof Tag> = {
  title: "Tag",
  component: Tag,
  argTypes: {
    variant: {
      control: "select",
      options: TAG_VARIANTS,
      description: "Semantic color variant",
    },
    appearance: {
      control: "select",
      options: PILL_APPEARANCES,
      description: "Visual appearance modifier",
    },
    size: sizeArgType,
    radius: {
      control: "select",
      options: ["rounded", "square", "full"],
      description: "Border radius style",
    },
    icon: iconControlArgType,
    dot: {
      control: "select",
      options: [
        undefined,
        "default",
        "primary",
        "affirmative",
        "warning",
        "info",
        "error",
        "destructive",
        "brand",
      ],
      description: "Leading status dot variant",
    },
    imageUrl: {
      control: "text",
      description: "Leading circular thumbnail image URL",
    },
    loading: { control: "boolean", description: "Show loading spinner" },
    disabled: { control: "boolean", description: "Disabled state" },
    hideDismiss: {
      control: "boolean",
      description: "Hide dismiss even when onDismiss is provided",
    },
    children: { control: "text", description: "Tag text content" },
    onDismiss: { action: "dismissed", description: "Dismiss handler" },
    onClick: { action: "clicked", description: "Click handler" },
    className: { table: { disable: true } },
  },
  args: {
    children: "Tag",
    variant: "default",
    appearance: "solid",
    size: "base",
    radius: "rounded",
    disabled: false,
    loading: false,
    hideDismiss: false,
  },
  parameters: {
    builder: { category: "forms", icon: "tag" },
    docs: {
      description: {
        component:
          "Interactive pill for selection, filtering, and multi-select. Shares pill styling with Badge but adds dismiss, click, icon, dot, image, and loading capabilities. Polymorphic element: <button>, <div>, or <span> based on interactivity.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Base interactive story with all controls. */
export const Base: Story = {
  args: {
    children: "Lobby",
    onDismiss: () => {
      // no-op
    },
  },
};

/**
 * Filter chip pattern — unselected and selected states.
 *
 * Use `appearance="input"` for the default (unselected) state: white bg, subtle shadow.
 * Add `variant="outline"` for the selected state: prominent ring border, no shadow.
 * Pass `onDismiss` when selected to show the dismiss X button.
 */
export const FilterChip: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Tag
        appearance="input"
        onClick={() => {
          // no-op
        }}
        radius="full"
        size="lg"
      >
        Ceiling
      </Tag>
      <Tag
        appearance="input"
        onClick={() => {
          // no-op
        }}
        onDismiss={() => {
          // no-op
        }}
        radius="full"
        size="lg"
        variant="outline"
      >
        Bath
      </Tag>
    </div>
  ),
};

/**
 * Variant x feature matrix.
 * Shows all 7 colour variants across appearances and interactive features:
 * appearances, icon, dot, image, loading, dismissible, disabled, pill shape.
 */
export const VariantFeatureMatrix: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    type ColKey =
      | PillAppearance
      | "icon"
      | "dot"
      | "image"
      | "loading"
      | "dismissible"
      | "disabled"
      | "pill";

    const columns: { key: ColKey; label: string }[] = [
      { key: "solid", label: "Solid" },
      { key: "light", label: "Light" },
      { key: "outline", label: "Outline" },
      { key: "ghost", label: "Ghost" },
      { key: "icon", label: "Icon" },
      { key: "dot", label: "Dot" },
      { key: "image", label: "Image" },
      { key: "loading", label: "Loading" },
      { key: "dismissible", label: "Dismiss" },
      { key: "disabled", label: "Disabled" },
      { key: "pill", label: "Pill" },
    ];

    const renderCell = (variant: TagVariant, col: ColKey) => {
      switch (col) {
        case "icon":
          return (
            <Tag icon={Star} variant={variant}>
              Tag
            </Tag>
          );
        case "dot":
          return (
            <Tag appearance="light" dot={TAG_TO_DOT[variant]} variant={variant}>
              Tag
            </Tag>
          );
        case "image":
          return (
            <Tag imageUrl={SAMPLE_IMAGE} variant={variant}>
              Tag
            </Tag>
          );
        case "loading":
          return (
            <Tag loading variant={variant}>
              Tag
            </Tag>
          );
        case "dismissible":
          return (
            <Tag
              onDismiss={() => {
                // no-op
              }}
              variant={variant}
            >
              Tag
            </Tag>
          );
        case "disabled":
          return (
            <Tag disabled variant={variant}>
              Tag
            </Tag>
          );
        case "pill":
          return (
            <Tag radius="full" variant={variant}>
              Tag
            </Tag>
          );
        default:
          return (
            <Tag appearance={col} variant={variant}>
              Tag
            </Tag>
          );
      }
    };

    return (
      <VariantGrid<TagVariant, ColKey>
        columns={columns}
        renderCell={renderCell}
        rowLabels="Variant"
        rows={TAG_VARIANT_ROWS}
      />
    );
  },
};

/**
 * Variant x dot matrix.
 * Shows all colour variants with matching dot across every appearance.
 */
export const DotMatrix: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    type ColKey = PillAppearance;

    const columns: { key: ColKey; label: string }[] = PILL_APPEARANCES.map(
      (a) => ({ key: a, label: a.charAt(0).toUpperCase() + a.slice(1) }),
    );

    const renderCell = (variant: TagVariant, col: ColKey) => (
      <Tag
        appearance={col}
        dot={TAG_TO_DOT[variant]}
        size="xl"
        variant={variant}
      >
        Tag
      </Tag>
    );

    return (
      <VariantGrid<TagVariant, ColKey>
        columns={columns}
        renderCell={renderCell}
        rowLabels="Variant"
        rows={TAG_VARIANT_ROWS}
      />
    );
  },
};

/**
 * Size matrix across representative variants and visual slots.
 */
export const SizeMatrix: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    type ColKey =
      | "default"
      | "with-icon"
      | "with-dot"
      | "with-image"
      | "dismissible"
      | "pill";

    const SIZE_ROWS: { key: ComponentSize; label: string }[] =
      COMPONENT_SIZES.map((s) => ({ key: s, label: s }));

    const columns: { key: ColKey; label: string }[] = [
      { key: "default", label: "Default" },
      { key: "with-icon", label: "Icon" },
      { key: "with-dot", label: "Dot" },
      { key: "with-image", label: "Image" },
      { key: "dismissible", label: "Dismiss" },
      { key: "pill", label: "Pill" },
    ];

    const renderCell = (size: ComponentSize, col: ColKey) => {
      switch (col) {
        case "with-icon":
          return (
            <Tag icon={Star} size={size}>
              Tag
            </Tag>
          );
        case "with-dot":
          return (
            <Tag appearance="light" dot="affirmative" size={size}>
              Tag
            </Tag>
          );
        case "with-image":
          return (
            <Tag imageUrl={SAMPLE_IMAGE} size={size}>
              Tag
            </Tag>
          );
        case "dismissible":
          return (
            <Tag
              onDismiss={() => {
                // no-op
              }}
              size={size}
            >
              Tag
            </Tag>
          );
        case "pill":
          return (
            <Tag radius="full" size={size}>
              Tag
            </Tag>
          );
        default:
          return <Tag size={size}>Tag</Tag>;
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
