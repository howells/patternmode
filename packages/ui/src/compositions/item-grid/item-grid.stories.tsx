import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRight, FileText, Folder, Image } from "lucide-react";
import { Badge } from "../../components/badge";
import { Button } from "../../components/button";
import {
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../item";
import { ItemGrid, ItemGridItem } from "../item-grid";

const meta: Meta<typeof ItemGrid> = {
  title: "ItemGrid",
  component: ItemGrid,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "divided"],
      description: "Visual style of the grid",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    columns: {
      control: "select",
      options: [1, 2, 3, 4],
      description: "Number of columns",
      table: {
        defaultValue: { summary: "2" },
      },
    },
    gap: {
      control: "select",
      options: ["none", "xs", "sm", "base", "lg", "xl"],
      description: "Gap between items",
      table: {
        defaultValue: { summary: "base" },
      },
    },
  },
  args: {
    variant: "default",
    columns: 2,
    gap: "base",
  },
  parameters: {
    builder: {
      category: "container",
      icon: "grid-3x3",
    },

    layout: "padded",
    docs: {
      description: {
        component:
          "ItemGrid is a grid container for displaying items in a multi-column layout. Use with Item components for structured content. Perfect for suggestion lists, file browsers, or any grid of selectable items.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic two-column grid with item cards.
 */
export const Base: Story = {
  render: (args) => (
    <ItemGrid {...args}>
      <ItemGridItem size="sm" variant="card">
        <ItemContent>
          <ItemTitle>Living Room</ItemTitle>
          <ItemDescription>Category</ItemDescription>
        </ItemContent>
      </ItemGridItem>
      <ItemGridItem size="sm" variant="card">
        <ItemContent>
          <ItemTitle>Bedroom</ItemTitle>
          <ItemDescription>Category</ItemDescription>
        </ItemContent>
      </ItemGridItem>
      <ItemGridItem size="sm" variant="card">
        <ItemContent>
          <ItemTitle>Bathroom</ItemTitle>
          <ItemDescription>Category</ItemDescription>
        </ItemContent>
      </ItemGridItem>
      <ItemGridItem size="sm" variant="card">
        <ItemContent>
          <ItemTitle>Kitchen</ItemTitle>
          <ItemDescription>Category</ItemDescription>
        </ItemContent>
      </ItemGridItem>
    </ItemGrid>
  ),
};

/**
 * Grid with clickable items and actions.
 */
export const WithActions: Story = {
  args: {
    gap: "sm",
  },
  render: (args) => (
    <ItemGrid {...args}>
      <ItemGridItem
        className="cursor-pointer rounded-xl hover:bg-accent/50"
        size="sm"
        variant="default"
      >
        <ItemContent>
          <ItemTitle>Sofas & Loveseats</ItemTitle>
          <ItemDescription>Category</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button appearance="ghost" icon={ChevronRight} size="2xs" />
        </ItemActions>
      </ItemGridItem>
      <ItemGridItem
        className="cursor-pointer rounded-xl hover:bg-accent/50"
        size="sm"
        variant="default"
      >
        <ItemContent>
          <ItemTitle>Armchairs</ItemTitle>
          <ItemDescription>Category</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button appearance="ghost" icon={ChevronRight} size="2xs" />
        </ItemActions>
      </ItemGridItem>
      <ItemGridItem
        className="cursor-pointer rounded-xl hover:bg-accent/50"
        size="sm"
        variant="default"
      >
        <ItemContent>
          <ItemTitle>Coffee Tables</ItemTitle>
          <ItemDescription>Category</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button appearance="ghost" icon={ChevronRight} size="2xs" />
        </ItemActions>
      </ItemGridItem>
      <ItemGridItem
        className="cursor-pointer rounded-xl hover:bg-accent/50"
        size="sm"
        variant="default"
      >
        <ItemContent>
          <ItemTitle>Side Tables</ItemTitle>
          <ItemDescription>Category</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button appearance="ghost" icon={ChevronRight} size="2xs" />
        </ItemActions>
      </ItemGridItem>
    </ItemGrid>
  ),
};

/**
 * Grid with icons/media.
 */
export const WithMedia: Story = {
  args: {
    columns: 3,
    gap: "sm",
  },
  render: (args) => (
    <ItemGrid {...args}>
      <ItemGridItem size="sm" variant="card">
        <ItemMedia icon={Folder} variant="icon" />
        <ItemContent>
          <ItemTitle>Documents</ItemTitle>
          <ItemDescription>12 files</ItemDescription>
        </ItemContent>
      </ItemGridItem>
      <ItemGridItem size="sm" variant="card">
        <ItemMedia icon={Image} variant="icon" />
        <ItemContent>
          <ItemTitle>Images</ItemTitle>
          <ItemDescription>48 files</ItemDescription>
        </ItemContent>
      </ItemGridItem>
      <ItemGridItem size="sm" variant="card">
        <ItemMedia icon={FileText} variant="icon" />
        <ItemContent>
          <ItemTitle>Notes</ItemTitle>
          <ItemDescription>5 files</ItemDescription>
        </ItemContent>
      </ItemGridItem>
    </ItemGrid>
  ),
};

/**
 * Grid with badges.
 */
export const WithBadges: Story = {
  args: {
    gap: "sm",
  },
  render: (args) => (
    <ItemGrid {...args}>
      <ItemGridItem size="sm" variant="card">
        <ItemContent>
          <ItemTitle>Herman Miller</ItemTitle>
          <ItemDescription>Brand</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Badge size="sm" variant="secondary">
            Premium
          </Badge>
        </ItemActions>
      </ItemGridItem>
      <ItemGridItem size="sm" variant="card">
        <ItemContent>
          <ItemTitle>Vitra</ItemTitle>
          <ItemDescription>Brand</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Badge size="sm" variant="secondary">
            Premium
          </Badge>
        </ItemActions>
      </ItemGridItem>
      <ItemGridItem size="sm" variant="card">
        <ItemContent>
          <ItemTitle>IKEA</ItemTitle>
          <ItemDescription>Brand</ItemDescription>
        </ItemContent>
      </ItemGridItem>
      <ItemGridItem size="sm" variant="card">
        <ItemContent>
          <ItemTitle>West Elm</ItemTitle>
          <ItemDescription>Brand</ItemDescription>
        </ItemContent>
      </ItemGridItem>
    </ItemGrid>
  ),
};

/**
 * Different column configurations.
 */
export const ColumnVariations: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-2 font-medium text-sm">1 Column</h3>
        <ItemGrid columns={1} gap="sm">
          <ItemGridItem size="sm" variant="card">
            <ItemContent>
              <ItemTitle>Item One</ItemTitle>
            </ItemContent>
          </ItemGridItem>
          <ItemGridItem size="sm" variant="card">
            <ItemContent>
              <ItemTitle>Item Two</ItemTitle>
            </ItemContent>
          </ItemGridItem>
        </ItemGrid>
      </div>
      <div>
        <h3 className="mb-2 font-medium text-sm">2 Columns</h3>
        <ItemGrid columns={2} gap="sm">
          <ItemGridItem size="sm" variant="card">
            <ItemContent>
              <ItemTitle>Item One</ItemTitle>
            </ItemContent>
          </ItemGridItem>
          <ItemGridItem size="sm" variant="card">
            <ItemContent>
              <ItemTitle>Item Two</ItemTitle>
            </ItemContent>
          </ItemGridItem>
          <ItemGridItem size="sm" variant="card">
            <ItemContent>
              <ItemTitle>Item Three</ItemTitle>
            </ItemContent>
          </ItemGridItem>
          <ItemGridItem size="sm" variant="card">
            <ItemContent>
              <ItemTitle>Item Four</ItemTitle>
            </ItemContent>
          </ItemGridItem>
        </ItemGrid>
      </div>
      <div>
        <h3 className="mb-2 font-medium text-sm">3 Columns</h3>
        <ItemGrid columns={3} gap="sm">
          <ItemGridItem size="sm" variant="card">
            <ItemContent>
              <ItemTitle>Item One</ItemTitle>
            </ItemContent>
          </ItemGridItem>
          <ItemGridItem size="sm" variant="card">
            <ItemContent>
              <ItemTitle>Item Two</ItemTitle>
            </ItemContent>
          </ItemGridItem>
          <ItemGridItem size="sm" variant="card">
            <ItemContent>
              <ItemTitle>Item Three</ItemTitle>
            </ItemContent>
          </ItemGridItem>
        </ItemGrid>
      </div>
      <div>
        <h3 className="mb-2 font-medium text-sm">4 Columns</h3>
        <ItemGrid columns={4} gap="sm">
          <ItemGridItem size="sm" variant="card">
            <ItemContent>
              <ItemTitle>One</ItemTitle>
            </ItemContent>
          </ItemGridItem>
          <ItemGridItem size="sm" variant="card">
            <ItemContent>
              <ItemTitle>Two</ItemTitle>
            </ItemContent>
          </ItemGridItem>
          <ItemGridItem size="sm" variant="card">
            <ItemContent>
              <ItemTitle>Three</ItemTitle>
            </ItemContent>
          </ItemGridItem>
          <ItemGridItem size="sm" variant="card">
            <ItemContent>
              <ItemTitle>Four</ItemTitle>
            </ItemContent>
          </ItemGridItem>
        </ItemGrid>
      </div>
    </div>
  ),
};

/**
 * Compact suggestion-style grid.
 */
export const SuggestionsGrid: Story = {
  args: {
    columns: 2,
    gap: "xs",
  },
  parameters: {
    docs: {
      description: {
        story:
          "A compact grid layout ideal for search suggestions or autocomplete results.",
      },
    },
  },
  render: (args) => (
    <div className="w-[500px] rounded-xl border border-border bg-popover p-2">
      <ItemGrid {...args}>
        <ItemGridItem
          className="cursor-pointer rounded-lg hover:bg-accent/50"
          size="xs"
        >
          <ItemContent>
            <ItemTitle>Sofas & Loveseats</ItemTitle>
            <ItemDescription className="text-xs">
              Living Room / Seating
            </ItemDescription>
          </ItemContent>
        </ItemGridItem>
        <ItemGridItem
          className="cursor-pointer rounded-lg hover:bg-accent/50"
          size="xs"
        >
          <ItemContent>
            <ItemTitle>Sofa Beds</ItemTitle>
            <ItemDescription className="text-xs">
              Living Room / Sleeper
            </ItemDescription>
          </ItemContent>
        </ItemGridItem>
        <ItemGridItem
          className="cursor-pointer rounded-lg hover:bg-accent/50"
          size="xs"
        >
          <ItemContent>
            <ItemTitle>Sectional Sofas</ItemTitle>
            <ItemDescription className="text-xs">
              Living Room / Seating
            </ItemDescription>
          </ItemContent>
        </ItemGridItem>
        <ItemGridItem
          className="cursor-pointer rounded-lg hover:bg-accent/50"
          size="xs"
        >
          <ItemContent>
            <ItemTitle>Sofa Tables</ItemTitle>
            <ItemDescription className="text-xs">
              Living Room / Tables
            </ItemDescription>
          </ItemContent>
        </ItemGridItem>
      </ItemGrid>
    </div>
  ),
};
