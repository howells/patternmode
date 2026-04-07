import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Bell, CheckCircle, Info, Sparkles } from "lucide-react";
import {
  ICON_OPTIONS,
  iconControlArgType,
} from "../../stories/controls/icon-control";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Banner, type BannerProps } from "./banner-root";

type BannerStoryArgs = Parameters<typeof Banner>[0];

const BANNER_VARIANTS = [
  "default",
  "affirmative",
  "warning",
  "error",
  "brand",
  "dark",
] as const;

const meta: Meta<BannerStoryArgs> = {
  title: "Banner",
  component: Banner,
  argTypes: {
    variant: {
      control: "select",
      options: BANNER_VARIANTS,
      description: "Visual variant indicating the banner's purpose",
    },
    icon: {
      ...iconControlArgType,
      description: "Lucide icon displayed on the left",
    },
    progress: {
      control: { type: "range", min: 0, max: 100 },
      description:
        "Progress value (0-100). Shows circular progress instead of icon.",
    },
    size: {
      control: "select",
      options: ["2xs", "xs", "sm", "base", "lg", "xl", "2xl", "3xl"],
      description: "Size of the progress ring or icon",
    },
    children: {
      control: "text",
      description: "Main message content",
    },
    visible: {
      control: "boolean",
      description: "Controls visibility with animated enter/exit",
    },
    showDismiss: {
      control: "boolean",
      description: "Whether to show the dismiss button on hover",
    },
  },
  args: {
    children: "You've approved 25 patternmodels",
    variant: "default",
    icon: ICON_OPTIONS.Sparkles,
    visible: true,
    showDismiss: true,
  },
  parameters: {
    builder: {
      category: "feedback",
      icon: "bell",
    },
    docs: {
      description: {
        component:
          "Banner component for displaying contextual messages with optional actions, progress indicators, and dismissible behavior.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Base story with all controllable props.
 * Use the controls panel to explore all banner options.
 */
export const Base: Story = {
  args: {
    children: "You've approved 25 patternmodels",
    icon: ICON_OPTIONS.Sparkles,
    onDismiss: () => console.log("Dismissed"),
  },
};

type BannerVariant = BannerProps["variant"];
type BannerFeature = "icon" | "progress" | "actions";

const FEATURE_COLUMNS: { key: BannerFeature; label: string }[] = [
  { key: "icon", label: "With Icon" },
  { key: "progress", label: "With Progress" },
  { key: "actions", label: "With Actions" },
];

/**
 * Variant matrix showing all banner variants with different features.
 */
export const VariantMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Matrix showing all banner variants with icons, progress indicators, and action buttons.",
      },
    },
  },
  render: () => {
    const rows = BANNER_VARIANTS.map((variant) => ({
      key: variant,
      label: variant.charAt(0).toUpperCase() + variant.slice(1),
    }));

    const VARIANT_ICONS: Record<(typeof BANNER_VARIANTS)[number], LucideIcon> =
      {
        default: Info,
        affirmative: CheckCircle,
        warning: Bell,
        error: Bell,
        brand: Sparkles,
        dark: Sparkles,
      };

    const renderCell = (variant: BannerVariant, feature: BannerFeature) => {
      const IconComponent = VARIANT_ICONS[variant ?? "default"];

      switch (feature) {
        case "icon":
          return (
            <Banner icon={IconComponent} variant={variant}>
              Message with icon
            </Banner>
          );
        case "progress":
          return (
            <Banner progress={60} variant={variant}>
              Review 2 more to unlock
            </Banner>
          );
        case "actions":
          return (
            <Banner
              primaryAction={{
                label: "Update",
                onClick: () => {
                  // no-op
                },
                icon: ArrowRight,
              }}
              secondaryAction={{
                label: "Not now",
                onClick: () => {
                  // no-op
                },
              }}
              variant={variant}
            >
              Ready to update?
            </Banner>
          );
        default:
          return null;
      }
    };

    return (
      <VariantGrid
        columns={FEATURE_COLUMNS}
        renderCell={renderCell}
        rowLabels="Variant"
        rows={rows}
      />
    );
  },
};
