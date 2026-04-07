import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cardAnatomy,
} from "../card";
import { Stack } from "../stack";
import { Text } from "../text";

type CardVariant = "card" | "muted" | "accent";
type CardBorder = "none" | "solid" | "dashed";

const VARIANT_OPTIONS: CardVariant[] = ["card", "muted", "accent"];
const BORDER_OPTIONS: CardBorder[] = ["none", "solid", "dashed"];

type CardStoryArgs = React.ComponentProps<typeof Card>;

const meta: Meta<CardStoryArgs> = {
  title: "Card",
  component: Card,
  argTypes: {
    // Visual
    variant: {
      control: "select",
      options: VARIANT_OPTIONS,
      description: "Background color variant",
    },
    border: {
      control: "select",
      options: BORDER_OPTIONS,
      description: "Border style",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
  },
  args: {
    variant: "card",
    border: "none",
  },
  parameters: {
    builder: {
      category: "container",
      icon: "square",
    },
    docs: {
      description: {
        component:
          "Containers for grouping related content. Supports header with title and description, content area, and optional footer.",
      },
      anatomy: cardAnatomy,
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
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Short description of the card</CardDescription>
      </CardHeader>
      <CardContent>
        <Text variant="muted">Content area can include any elements.</Text>
      </CardContent>
    </Card>
  ),
};

/**
 * Variant × Border matrix showing visual combinations.
 */
export const VariantBorderMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Matrix showing variant and border combinations.",
      },
    },
  },
  render: () => {
    const VARIANT_ROWS: { key: CardVariant; label: string }[] = [
      { key: "card", label: "card" },
      { key: "muted", label: "muted" },
      { key: "accent", label: "accent" },
    ];
    const BORDER_COLUMNS: { key: CardBorder; label: string }[] = [
      { key: "solid", label: "solid" },
      { key: "dashed", label: "dashed" },
      { key: "none", label: "none" },
    ];

    return (
      <VariantGrid<CardVariant, CardBorder>
        columns={BORDER_COLUMNS}
        renderCell={(variant, border) => (
          <Card border={border} className="min-w-48" variant={variant}>
            <CardHeader>
              <CardTitle>Title</CardTitle>
              <CardDescription>Description text here</CardDescription>
            </CardHeader>
          </Card>
        )}
        rowLabels="Variant"
        rows={VARIANT_ROWS}
      />
    );
  },
};

/**
 * Footer action patterns.
 */
export const FooterPatterns: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Common footer patterns for different use cases.",
      },
    },
  },
  render: () => (
    <Stack gap="base">
      <Card>
        <CardHeader>
          <CardTitle>Single action</CardTitle>
          <CardDescription>For simple, affirmative flows</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>Continue</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Dual actions</CardTitle>
          <CardDescription>Cancel and confirm pattern</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button appearance="outline" variant="secondary">
            Cancel
          </Button>
          <Button>Save</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Multiple actions</CardTitle>
          <CardDescription>Complex action hierarchy</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button appearance="outline" variant="secondary">
            Reset
          </Button>
          <Button appearance="outline" variant="secondary">
            Save draft
          </Button>
          <Button>Publish</Button>
        </CardFooter>
      </Card>
    </Stack>
  ),
};
