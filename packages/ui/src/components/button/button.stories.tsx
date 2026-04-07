import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { RADIUS_OPTIONS } from "../../lib/radius";
import { COMPONENT_SIZES, type ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import {
  ICON_OPTIONS,
  iconControlArgType,
} from "../../stories/controls/icon-control";
import { VariantGrid } from "../../stories/utils/variant-grid";
import {
  BUTTON_APPEARANCES,
  BUTTON_VARIANTS,
  Button,
  type ButtonAppearance,
  type ButtonSize,
  type ButtonVariant,
} from "./button-root";

type ButtonStoryArgs = React.ComponentProps<typeof Button>;

const meta: Meta<ButtonStoryArgs> = {
  title: "Button",
  component: Button,
  argTypes: {
    // Visual
    variant: {
      control: "select",
      options: BUTTON_VARIANTS,
      description: "Visual style variant",
    },
    appearance: {
      control: "select",
      options: BUTTON_APPEARANCES,
      description: "Optional appearance modifier",
    },
    radius: {
      control: "select",
      options: RADIUS_OPTIONS,
      description: "Border radius style",
    },
    size: {
      ...sizeArgType,
      description: "Button size (standard or icon-* for icon buttons)",
    },
    // Icon
    icon: {
      ...iconControlArgType,
      description: "Icon component to display at start",
    },
    suffixIcon: {
      ...iconControlArgType,
      description: "Icon component to display at end",
    },

    // States
    loading: {
      control: "boolean",
      description: "Show loading spinner",
    },
    disabled: {
      control: "boolean",
      description: "Disable interaction",
    },
    focused: {
      control: "boolean",
      description: "Force focus ring (for documentation)",
    },
    hovered: {
      control: "boolean",
      description: "Force hover state (for documentation)",
    },
    pressed: {
      control: "boolean",
      description: "Force pressed state (for documentation)",
    },

    // Content
    children: {
      control: "text",
      description: "Button label text",
    },
    loadingLabel: {
      control: "text",
      description: "Label shown during loading",
    },

    // Advanced
    asChild: { table: { disable: true } },
    align: {
      control: "select",
      options: ["center", "start", "end"],
      description: "Content alignment",
    },
  },
  args: {
    children: "Button",
    variant: "default",
    appearance: "solid",
    radius: "rounded",
    size: "base",
    loading: false,
    disabled: false,
    focused: false,
    hovered: false,
    align: "center",
  },
  parameters: {
    builder: {
      category: "interactive",
      icon: "mouse-pointer-click",
    },
    docs: {
      description: {
        component:
          "Interactive button component with configurable variants, sizes, appearances, and states. Use icon-* sizes for icon-only buttons.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base story with all controllable props.
 * Use the controls panel to explore all button options.
 */
export const Base: Story = {
  args: {
    children: "Button",
  },
};

// State configuration for variant matrix
type ButtonState =
  | "default"
  | "hover"
  | "focus"
  | "loading"
  | "disabled"
  | "pressed";

const STATE_COLUMNS: { key: ButtonState; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "hover", label: "Hover" },
  { key: "focus", label: "Focus" },
  { key: "loading", label: "Loading" },
  { key: "disabled", label: "Disabled" },
  { key: "pressed", label: "Pressed" },
];

// Sizes for text buttons and icon buttons
const TEXT_SIZES: ButtonSize[] = ["base", "sm", "lg", "xl"];
const ICON_SIZES: ButtonSize[] = ["icon-base", "icon-sm", "icon-lg", "icon-xl"];

// Row data with variant and size stored directly
interface VariantSizeRow {
  key: string;
  label: string;
  labels: [string];
  size: ButtonSize;
  variant: ButtonVariant;
}

function buildVariantMatrixRows(): VariantSizeRow[] {
  const variants: ButtonVariant[] = [
    "default",
    "secondary",
    "destructive",
    "outline",
    "ghost",
    "link",
    "brand",
  ];

  const rows: VariantSizeRow[] = [];

  for (const variant of variants) {
    // Link variant only has text sizes (no icon sizes)
    const sizes =
      variant === "link" ? TEXT_SIZES : [...TEXT_SIZES, ...ICON_SIZES];

    for (const size of sizes) {
      rows.push({
        key: `${variant}|${size}`,
        label: variant.charAt(0).toUpperCase() + variant.slice(1),
        labels: [size],
        variant,
        size,
      });
    }
  }

  return rows;
}

const VARIANT_MATRIX_ROWS = buildVariantMatrixRows();

/**
 * Comprehensive variant matrix showing all variants, sizes, and states.
 */
export const VariantMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Comprehensive matrix showing all button variants, sizes, and states. Matches the Figma design system layout.",
      },
    },
  },
  render: () => {
    const renderCell = (rowKey: string, state: ButtonState) => {
      const row = VARIANT_MATRIX_ROWS.find((r) => r.key === rowKey);
      if (!row) {
        return null;
      }

      const { variant, size } = row;
      const isIcon = size.startsWith("icon-");

      const stateProps = (() => {
        switch (state) {
          case "hover":
            return { hovered: true };
          case "focus":
            return { focused: true };
          case "loading":
            return { loading: true };
          case "disabled":
            return { disabled: true };
          case "pressed":
            return { pressed: true };
          default:
            return {};
        }
      })();

      return (
        <Button
          aria-label={isIcon ? `${variant} icon button` : undefined}
          icon={isIcon ? ICON_OPTIONS.Circle : undefined}
          size={size}
          variant={variant}
          {...stateProps}
        >
          {isIcon ? null : "Button"}
        </Button>
      );
    };

    return (
      <VariantGrid
        columns={STATE_COLUMNS}
        renderCell={renderCell}
        rowLabels={["Variant", "Size"]}
        rows={VARIANT_MATRIX_ROWS}
      />
    );
  },
};

/**
 * All sizes from the component size scale.
 */
export const SizeMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Complete size scale from 2xs to 3xl for both text and icon buttons.",
      },
    },
  },
  render: () => {
    const SIZE_ROWS: { key: ComponentSize; label: string }[] =
      COMPONENT_SIZES.map((s) => ({ key: s, label: s }));

    const VARIANT_COLS: { key: ButtonVariant; label: string }[] = [
      { key: "default", label: "Default" },
      { key: "secondary", label: "Secondary" },
      { key: "destructive", label: "Destructive" },
    ];

    return (
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="mb-4 font-medium text-muted-foreground text-sm">
            Text Buttons
          </h3>
          <VariantGrid<ComponentSize, ButtonVariant>
            columns={VARIANT_COLS}
            renderCell={(size, variant) => (
              <Button size={size} variant={variant}>
                Button
              </Button>
            )}
            rowLabels="Size"
            rows={SIZE_ROWS}
          />
        </div>
        <div>
          <h3 className="mb-4 font-medium text-muted-foreground text-sm">
            Icon Buttons
          </h3>
          <VariantGrid<ComponentSize, ButtonVariant>
            columns={VARIANT_COLS}
            renderCell={(size, variant) => (
              <Button
                aria-label={`${variant} icon button`}
                icon={ICON_OPTIONS.Circle}
                size={`icon-${size}` as ButtonSize}
                variant={variant}
              />
            )}
            rowLabels="Size"
            rows={SIZE_ROWS}
          />
        </div>
      </div>
    );
  },
};

/**
 * Appearance matrix showing variant × appearance combinations at base size.
 */
export const AppearanceMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Matrix showing how appearance modifiers combine with different variants. All variants × all appearances.",
      },
    },
  },
  render: () => {
    const variants: ButtonVariant[] = [
      "default",
      "secondary",
      "destructive",
      "outline",
      "ghost",
      "link",
      "brand",
    ];
    const appearances: ButtonAppearance[] = [
      "solid",
      "outline",
      "ghost",
      "dashed",
      "transparent",
      "input",
    ];

    const rows = variants.map((variant) => ({
      key: variant,
      label: variant.charAt(0).toUpperCase() + variant.slice(1),
    }));

    const columns = appearances.map((appearance) => ({
      key: appearance,
      label: appearance.charAt(0).toUpperCase() + appearance.slice(1),
    }));

    const renderCell = (
      variant: ButtonVariant,
      appearance: ButtonAppearance,
    ) => (
      <Button appearance={appearance} variant={variant}>
        Button
      </Button>
    );

    return (
      <VariantGrid
        columns={columns}
        renderCell={renderCell}
        rowLabels="Variant"
        rows={rows}
      />
    );
  },
};

// Icon configuration types
type IconConfig = "icon-start" | "icon-end" | "icon-only" | "no-icon";

const ICON_CONFIGS: { key: IconConfig; label: string }[] = [
  { key: "no-icon", label: "No Icon" },
  { key: "icon-start", label: "Icon Start" },
  { key: "icon-end", label: "Icon End" },
  { key: "icon-only", label: "Icon Only" },
];

/**
 * Icon matrix showing different icon configurations across variants.
 */
export const IconMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Matrix showing icon placement configurations (no icon, icon start, icon end, icon only) across variants.",
      },
    },
  },
  render: () => {
    const variants: ButtonVariant[] = [
      "default",
      "secondary",
      "destructive",
      "outline",
      "ghost",
      "link",
      "brand",
    ];

    const rows = variants.map((variant) => ({
      key: variant,
      label: variant.charAt(0).toUpperCase() + variant.slice(1),
    }));

    const renderCell = (variant: ButtonVariant, config: IconConfig) => {
      switch (config) {
        case "no-icon":
          return <Button variant={variant}>Button</Button>;
        case "icon-start":
          return (
            <Button icon={ICON_OPTIONS.Plus} variant={variant}>
              Button
            </Button>
          );
        case "icon-end":
          return (
            <Button suffixIcon={ICON_OPTIONS.ChevronRight} variant={variant}>
              Button
            </Button>
          );
        case "icon-only":
          return (
            <Button
              aria-label={`${variant} action`}
              icon={ICON_OPTIONS.Circle}
              size="icon-base"
              variant={variant}
            />
          );
        default:
          return null;
      }
    };

    return (
      <VariantGrid
        columns={ICON_CONFIGS}
        renderCell={renderCell}
        rowLabels="Variant"
        rows={rows}
      />
    );
  },
};

// Loading button types
type LoadingType = "text" | "with-label" | "icon";

const LOADING_COLUMNS: { key: LoadingType; label: string }[] = [
  { key: "text", label: "Text" },
  { key: "with-label", label: "Custom Label" },
  { key: "icon", label: "Icon Only" },
];

/**
 * Loading states with spinner across variants.
 */
export const LoadingStates: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Buttons in loading state show a spinner and disable interaction. Matrix showing loading across all variants and button types.",
      },
    },
  },
  render: () => {
    const variants: ButtonVariant[] = [
      "default",
      "secondary",
      "destructive",
      "outline",
      "ghost",
      "link",
      "brand",
    ];

    const rows = variants.map((variant) => ({
      key: variant,
      label: variant.charAt(0).toUpperCase() + variant.slice(1),
    }));

    const renderCell = (variant: ButtonVariant, type: LoadingType) => {
      switch (type) {
        case "text":
          return (
            <Button loading variant={variant}>
              Button
            </Button>
          );
        case "with-label":
          return (
            <Button loading loadingLabel="Saving…" variant={variant}>
              Button
            </Button>
          );
        case "icon":
          return (
            <Button
              aria-label="Loading action"
              icon={ICON_OPTIONS.Circle}
              loading
              size="icon-base"
              variant={variant}
            />
          );
        default:
          return null;
      }
    };

    return (
      <VariantGrid
        columns={LOADING_COLUMNS}
        renderCell={renderCell}
        rowLabels="Variant"
        rows={rows}
      />
    );
  },
};
