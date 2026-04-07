import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import type React from "react";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Icon } from "../icon";
import { Stack } from "../stack";
import { Alert, AlertDescription, AlertTitle } from "./alert-root";

type AlertVariant = "default" | "destructive";
const ALERT_VARIANTS: AlertVariant[] = ["default", "destructive"];

type AlertStoryArgs = React.ComponentProps<typeof Alert> & {
  title?: string;
  description?: string;
};

const meta: Meta<AlertStoryArgs> = {
  title: "Alert",
  component: Alert,
  argTypes: {
    // Visual
    variant: {
      control: "select",
      options: ALERT_VARIANTS,
      description: "Visual style of the alert",
    },

    // Content
    title: {
      control: "text",
      description: "Alert title text",
    },
    description: {
      control: "text",
      description: "Alert description text",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
  },
  args: {
    variant: "default",
    title: "Alert Title",
    description: "This is the alert description with more details.",
  },
  parameters: {
    builder: {
      category: "feedback",
      icon: "alert-circle",
    },
    docs: {
      description: {
        component:
          "Alerts display important information to users. They support default and destructive variants, and can include optional icons and titles.",
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
  render: (args) => (
    <Alert variant={args.variant}>
      <AlertTitle>{args.title}</AlertTitle>
      <AlertDescription>{args.description}</AlertDescription>
    </Alert>
  ),
};

/**
 * Variant × Icon matrix showing alert configurations.
 */
type AlertConfig = "plain" | "with-icon";
export const VariantMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Matrix showing alert variants with and without icons.",
      },
    },
  },
  render: () => {
    const VARIANT_ROWS: { key: AlertVariant; label: string }[] =
      ALERT_VARIANTS.map((v) => ({ key: v, label: v }));
    const CONFIG_COLUMNS: { key: AlertConfig; label: string }[] = [
      { key: "plain", label: "Plain" },
      { key: "with-icon", label: "With Icon" },
    ];

    return (
      <VariantGrid<AlertVariant, AlertConfig>
        columns={CONFIG_COLUMNS}
        renderCell={(variant, config) => (
          <Alert className="w-80" variant={variant}>
            {config === "with-icon" && (
              <Icon icon={variant === "destructive" ? AlertTriangle : Info} />
            )}
            <AlertTitle>
              {variant === "destructive" ? "Error" : "Information"}
            </AlertTitle>
            <AlertDescription>
              {variant === "destructive"
                ? "Something went wrong."
                : "This is an informational message."}
            </AlertDescription>
          </Alert>
        )}
        rowLabels="Variant"
        rows={VARIANT_ROWS}
      />
    );
  },
};

/**
 * Alerts with different icons for semantic meaning.
 */
export const WithIcons: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Alerts can include icons to enhance visual communication. Icons are wrapped with the Icon component.",
      },
    },
  },
  render: () => (
    <Stack gap="base">
      <Alert variant="default">
        <Icon icon={Info} />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          This alert includes an icon rendered via the Icon wrapper.
        </AlertDescription>
      </Alert>

      <Alert variant="default">
        <Icon icon={CheckCircle} />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your changes have been saved successfully.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <Icon icon={AlertTriangle} />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Something requires your attention before proceeding.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <Icon icon={XCircle} />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>
    </Stack>
  ),
};

/**
 * Alerts without titles.
 */
export const WithoutTitle: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Alerts can be used with just a description for simpler messages.",
      },
    },
  },
  render: () => (
    <Stack gap="base">
      <Alert variant="default">
        <AlertDescription>
          This is a simple alert with only a description.
        </AlertDescription>
      </Alert>

      <Alert variant="default">
        <Icon icon={Info} />
        <AlertDescription>
          You can also combine an icon with just a description.
        </AlertDescription>
      </Alert>
    </Stack>
  ),
};
