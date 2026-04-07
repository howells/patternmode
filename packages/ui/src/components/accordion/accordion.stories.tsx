import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { responsiveWidth } from "../../lib/storybook-decorators";
import { VariantGrid } from "../../stories/utils/variant-grid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  accordionAnatomy,
} from "../accordion";

type AccordionVariant = "default" | "outline" | "solid";
type AccordionIndicator = "arrow" | "plus";

const VARIANT_OPTIONS: AccordionVariant[] = ["default", "outline", "solid"];
const INDICATOR_OPTIONS: AccordionIndicator[] = ["arrow", "plus"];

interface AccordionStoryArgs {
  collapsible?: boolean;
  indicator?: AccordionIndicator;
  onValueChange?: (value: string | string[]) => void;
  type?: "single" | "multiple";
  variant?: AccordionVariant;
}

const meta: Meta<AccordionStoryArgs> = {
  title: "Accordion",
  decorators: [responsiveWidth],
  argTypes: {
    // Behavior
    type: {
      control: "radio",
      options: ["single", "multiple"],
      description: "Whether one or multiple items can be open at a time",
    },
    collapsible: {
      control: "boolean",
      description: "Allow all items to be closed (single type only)",
    },

    // Visual
    variant: {
      control: "select",
      options: VARIANT_OPTIONS,
      description: "Visual variant of the accordion",
    },
    indicator: {
      control: "select",
      options: INDICATOR_OPTIONS,
      description: "Type of indicator icon",
    },

    // Events
    onValueChange: {
      action: "onValueChange",
      description: "Callback fired when accordion value changes",
    },
  },
  args: {
    type: "single",
    collapsible: true,
    variant: "default",
    indicator: "arrow",
  },
  parameters: {
    builder: {
      category: "container",
      icon: "chevrons-down-up",
    },
    docs: {
      description: {
        component:
          "A collapsible panel that can be expanded or collapsed. Compose with AccordionItem, AccordionTrigger, and AccordionContent.",
      },
      anatomy: accordionAnatomy,
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
    <Accordion
      collapsible={args.collapsible}
      indicator={args.indicator}
      onValueChange={args.onValueChange}
      type="single"
      variant={args.variant}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Asset Management</AccordionTrigger>
        <AccordionContent>
          Organize and find your digital assets quickly across teams.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Brand Consistency</AccordionTrigger>
        <AccordionContent>
          Keep your brand patternmodels up to date and easily accessible.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Team Collaboration</AccordionTrigger>
        <AccordionContent>
          Work together seamlessly with shared libraries and permissions.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * Variant × Indicator matrix showing visual combinations.
 */
export const VariantIndicatorMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Matrix showing variant and indicator combinations.",
      },
    },
  },
  render: () => {
    const VARIANT_ROWS: { key: AccordionVariant; label: string }[] = [
      { key: "default", label: "default" },
      { key: "outline", label: "outline" },
      { key: "solid", label: "solid" },
    ];
    const INDICATOR_COLUMNS: { key: AccordionIndicator; label: string }[] = [
      { key: "arrow", label: "arrow" },
      { key: "plus", label: "plus" },
    ];

    return (
      <VariantGrid<AccordionVariant, AccordionIndicator>
        columns={INDICATOR_COLUMNS}
        renderCell={(variant, indicator) => (
          <Accordion
            collapsible
            defaultValue="item-1"
            indicator={indicator}
            type="single"
            variant={variant}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>First Item</AccordionTrigger>
              <AccordionContent>Content of the first item.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Second Item</AccordionTrigger>
              <AccordionContent>Content of the second item.</AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        rowLabels="Variant"
        rows={VARIANT_ROWS}
      />
    );
  },
};

/**
 * Nested accordion structure.
 */
export const Nested: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Nested accordions demonstrating hierarchical content organization.",
      },
    },
  },
  render: () => (
    <Accordion collapsible type="single" variant="outline">
      <AccordionItem value="parent-1">
        <AccordionTrigger>Getting Started</AccordionTrigger>
        <AccordionContent>
          <Accordion
            className="ml-4"
            collapsible
            type="single"
            variant="default"
          >
            <AccordionItem value="nested-1-1">
              <AccordionTrigger>Installation</AccordionTrigger>
              <AccordionContent>
                Install the package using your preferred package manager.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="nested-1-2">
              <AccordionTrigger>Configuration</AccordionTrigger>
              <AccordionContent>
                Configure the component in your project settings.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="parent-2">
        <AccordionTrigger>Advanced Usage</AccordionTrigger>
        <AccordionContent>
          <Accordion
            className="ml-4"
            collapsible
            type="single"
            variant="default"
          >
            <AccordionItem value="nested-2-1">
              <AccordionTrigger>Customization</AccordionTrigger>
              <AccordionContent>
                Customize the component to match your design system.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="nested-2-2">
              <AccordionTrigger>API Reference</AccordionTrigger>
              <AccordionContent>
                Detailed API documentation for all component props.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * Interaction test for accordion behavior.
 */
export const InteractionTest: Story = {
  render: () => (
    <Accordion collapsible type="single">
      <AccordionItem value="item-1">
        <AccordionTrigger>First Item</AccordionTrigger>
        <AccordionContent>
          Content of the first accordion item.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Item</AccordionTrigger>
        <AccordionContent>
          Content of the second accordion item.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third Item</AccordionTrigger>
        <AccordionContent>
          Content of the third accordion item.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
