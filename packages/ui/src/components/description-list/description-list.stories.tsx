import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import {
  DescriptionDetails,
  DescriptionItem,
  DescriptionList,
  DescriptionTerm,
} from "./description-list-root";

type DescriptionListStoryArgs = React.ComponentProps<typeof DescriptionList>;

const meta: Meta<DescriptionListStoryArgs> = {
  title: "DescriptionList",
  component: DescriptionList,
  argTypes: {
    // Visual
    showSeparators: {
      control: "boolean",
      description: "Show separator lines between items",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
  },
  args: {
    showSeparators: false,
  },
  parameters: {
    builder: {
      category: "container",
      icon: "puzzle",
    },
    docs: {
      description: {
        component: "Displays key-value pairs in an organized format.",
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
    <DescriptionList {...args}>
      <DescriptionItem>
        <DescriptionTerm>Year of Introduction</DescriptionTerm>
        <DescriptionDetails>2022</DescriptionDetails>
      </DescriptionItem>
      <DescriptionItem>
        <DescriptionTerm>Availability</DescriptionTerm>
        <DescriptionDetails>Typically Stocked</DescriptionDetails>
      </DescriptionItem>
      <DescriptionItem>
        <DescriptionTerm>Country of Origin</DescriptionTerm>
        <DescriptionDetails>Italy</DescriptionDetails>
      </DescriptionItem>
      <DescriptionItem>
        <DescriptionTerm>Intended Use</DescriptionTerm>
        <DescriptionDetails>
          Commercial project specification only
        </DescriptionDetails>
      </DescriptionItem>
    </DescriptionList>
  ),
};

/**
 * With separators between items.
 */
export const WithSeparators: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Description list with separator lines between items.",
      },
    },
  },
  render: () => (
    <div className="max-w-lg">
      <DescriptionList showSeparators>
        <DescriptionItem>
          <DescriptionTerm>Order Number</DescriptionTerm>
          <DescriptionDetails>#ORD-2024-0123</DescriptionDetails>
        </DescriptionItem>
        <DescriptionItem>
          <DescriptionTerm>Order Date</DescriptionTerm>
          <DescriptionDetails>January 15, 2024</DescriptionDetails>
        </DescriptionItem>
        <DescriptionItem>
          <DescriptionTerm>Status</DescriptionTerm>
          <DescriptionDetails>
            <span className="inline-flex rounded-full bg-affirmative-soft px-2 py-0.5 font-medium text-affirmative-foreground text-xs">
              Shipped
            </span>
          </DescriptionDetails>
        </DescriptionItem>
        <DescriptionItem>
          <DescriptionTerm>Tracking Number</DescriptionTerm>
          <DescriptionDetails>1Z999AA10123456784</DescriptionDetails>
        </DescriptionItem>
        <DescriptionItem>
          <DescriptionTerm>Total</DescriptionTerm>
          <DescriptionDetails className="text-base">
            $1,247.50
          </DescriptionDetails>
        </DescriptionItem>
      </DescriptionList>
    </div>
  ),
};

/**
 * Product specifications example.
 */
export const ProductSpecifications: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Product specification details with various data types.",
      },
    },
  },
  render: () => (
    <div className="max-w-2xl">
      <DescriptionList>
        <DescriptionItem>
          <DescriptionTerm>Product Name</DescriptionTerm>
          <DescriptionDetails>Calacatta Oro Marble Tile</DescriptionDetails>
        </DescriptionItem>
        <DescriptionItem>
          <DescriptionTerm>SKU</DescriptionTerm>
          <DescriptionDetails>CAL-ORO-12X24</DescriptionDetails>
        </DescriptionItem>
        <DescriptionItem>
          <DescriptionTerm>Dimensions</DescriptionTerm>
          <DescriptionDetails>12" × 24" × 3/8"</DescriptionDetails>
        </DescriptionItem>
        <DescriptionItem>
          <DescriptionTerm>PatternModel</DescriptionTerm>
          <DescriptionDetails>Natural Marble</DescriptionDetails>
        </DescriptionItem>
        <DescriptionItem>
          <DescriptionTerm>Finish</DescriptionTerm>
          <DescriptionDetails>Polished</DescriptionDetails>
        </DescriptionItem>
        <DescriptionItem>
          <DescriptionTerm>Price per sq ft</DescriptionTerm>
          <DescriptionDetails>$24.99</DescriptionDetails>
        </DescriptionItem>
        <DescriptionItem>
          <DescriptionTerm>Lead Time</DescriptionTerm>
          <DescriptionDetails>3-5 business days</DescriptionDetails>
        </DescriptionItem>
      </DescriptionList>
    </div>
  ),
};
