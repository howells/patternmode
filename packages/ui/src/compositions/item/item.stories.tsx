import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRight, FileText, Folder, Image, Star } from "lucide-react";
import { Badge } from "../../components/badge";
import { Button } from "../../components/button";
import { Icon } from "../../components/icon";
import type { ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import { VariantGrid } from "../../stories/utils/variant-grid";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "../item";
import { ItemGrid } from "../item-grid";

type ItemVariant = "default" | "outline" | "muted" | "card";
type ItemGroupVariant = "divided" | "separated" | "grouped";
type ItemSize = Extract<ComponentSize, "xs" | "sm" | "base">;

const ITEM_VARIANTS: ItemVariant[] = ["default", "outline", "muted", "card"];
const GROUP_VARIANTS: ItemGroupVariant[] = ["divided", "separated", "grouped"];
const SIZES: ItemSize[] = ["xs", "sm", "base"];

const meta: Meta<typeof Item> = {
  title: "Item",
  component: Item,
  argTypes: {
    variant: {
      control: "select",
      options: ITEM_VARIANTS,
      description: "Visual style of the item",
      table: { defaultValue: { summary: "default" } },
    },
    size: sizeArgType,
  },
  args: {
    variant: "default",
    size: "sm",
  },
  parameters: {
    builder: {
      category: "container",
      icon: "package",
    },
    layout: "padded",
    docs: {
      description: {
        component:
          "Item is a flexible container for displaying structured content. Use with ItemContent, ItemTitle, ItemDescription for rich layouts. Works standalone or within ItemGroup/ItemGrid.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic item with title and description.
 */
export const Base: Story = {
  render: (args) => (
    <Item {...args}>
      <ItemMedia icon={FileText} variant="icon" />
      <ItemContent>
        <ItemTitle>Document.pdf</ItemTitle>
        <ItemDescription>Last modified 2 days ago</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Icon icon={ChevronRight} size="sm" />
      </ItemActions>
    </Item>
  ),
};

/**
 * Matrix of Item variants × sizes.
 */
export const VariantSizeMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "All Item variant and size combinations.",
      },
    },
  },
  render: () => (
    <VariantGrid<ItemVariant, ItemSize>
      columns={SIZES.map((s) => ({ key: s, label: s }))}
      renderCell={(variant, size) => (
        <Item size={size} variant={variant}>
          <ItemMedia icon={FileText} variant="icon" />
          <ItemContent>
            <ItemTitle>Title</ItemTitle>
            <ItemDescription>Description text</ItemDescription>
          </ItemContent>
        </Item>
      )}
      rowLabels="Variant"
      rows={ITEM_VARIANTS.map((v) => ({ key: v, label: v }))}
    />
  ),
};

/**
 * ItemGroup variants showing different grouping styles.
 */
export const ItemGroupVariants: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "ItemGroup provides three variants: divided (minimal with dividers), separated (individual cards), and grouped (connected items in one card).",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      {GROUP_VARIANTS.map((variant) => (
        <div key={variant}>
          <h3 className="mb-3 font-medium text-muted-foreground text-sm">
            {variant}
          </h3>
          <ItemGroup variant={variant}>
            <Item size="sm">
              <ItemMedia icon={Folder} variant="icon" />
              <ItemContent>
                <ItemTitle>Documents</ItemTitle>
                <ItemDescription>12 files</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Icon icon={ChevronRight} size="sm" />
              </ItemActions>
            </Item>
            <Item size="sm">
              <ItemMedia icon={Image} variant="icon" />
              <ItemContent>
                <ItemTitle>Photos</ItemTitle>
                <ItemDescription>48 files</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Icon icon={ChevronRight} size="sm" />
              </ItemActions>
            </Item>
            <Item size="sm">
              <ItemMedia icon={Star} variant="icon" />
              <ItemContent>
                <ItemTitle>Saves</ItemTitle>
                <ItemDescription>8 files</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Icon icon={ChevronRight} size="sm" />
              </ItemActions>
            </Item>
          </ItemGroup>
        </div>
      ))}
    </div>
  ),
};

/**
 * ItemGroup variants in a matrix.
 */
export const GroupVariantMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "ItemGroup variants × item count.",
      },
    },
  },
  render: () => {
    const ITEM_COUNTS = [2, 3, 4] as const;

    return (
      <VariantGrid<ItemGroupVariant, (typeof ITEM_COUNTS)[number]>
        columns={ITEM_COUNTS.map((c) => ({
          key: c,
          label: `${c} items`,
        }))}
        renderCell={(variant, count) => (
          <ItemGroup variant={variant}>
            {Array.from(
              { length: count },
              (_, itemNumber) => itemNumber + 1,
            ).map((itemNumber) => (
              <Item key={itemNumber} size="xs">
                <ItemMedia icon={FileText} variant="icon" />
                <ItemContent>
                  <ItemTitle>Item {itemNumber}</ItemTitle>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
        )}
        rowLabels="Variant"
        rows={GROUP_VARIANTS.map((v) => ({ key: v, label: v }))}
      />
    );
  },
};

/**
 * ItemMedia variants showing icon, image, and default.
 */
export const MediaVariants: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "ItemMedia supports icon, image, and default variants.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Item size="sm" variant="card">
        <ItemMedia icon={FileText} variant="icon" />
        <ItemContent>
          <ItemTitle>Icon variant</ItemTitle>
          <ItemDescription>Uses IconBox internally</ItemDescription>
        </ItemContent>
      </Item>

      <Item size="sm" variant="card">
        <ItemMedia variant="image">
          <img
            alt="User"
            height={80}
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop"
            width={80}
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Image variant</ItemTitle>
          <ItemDescription>Rounded image with object-cover</ItemDescription>
        </ItemContent>
      </Item>

      <Item size="sm" variant="card">
        <ItemMedia>
          <Badge variant="secondary">NEW</Badge>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Default variant</ItemTitle>
          <ItemDescription>Any content as children</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  ),
};

/**
 * Item with actions.
 */
export const WithActions: Story = {
  args: {
    variant: "card",
    size: "sm",
  },
  render: (args) => (
    <Item {...args}>
      <ItemMedia icon={FileText} variant="icon" />
      <ItemContent>
        <ItemTitle>Document.pdf</ItemTitle>
        <ItemDescription>Last modified 2 days ago</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button appearance="ghost" size="sm">
          Edit
        </Button>
        <Button appearance="ghost" size="sm">
          Delete
        </Button>
      </ItemActions>
    </Item>
  ),
};

/**
 * Clickable item using asChild.
 */
export const AsLink: Story = {
  args: {
    variant: "card",
    size: "sm",
  },
  render: (args) => (
    <Item {...args} asChild>
      <a className="cursor-pointer hover:bg-accent/50" href="#example">
        <ItemMedia icon={FileText} variant="icon" />
        <ItemContent>
          <ItemTitle>Click me</ItemTitle>
          <ItemDescription>
            This item is wrapped in an anchor tag
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Icon icon={ChevronRight} size="sm" />
        </ItemActions>
      </a>
    </Item>
  ),
};

/**
 * Items in a grid layout.
 */
export const InGrid: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Items can be placed inside ItemGrid for multi-column layouts.",
      },
    },
  },
  render: () => (
    <ItemGrid columns={2} gap="sm">
      {["Documents", "Photos", "Music", "Videos"].map((name) => (
        <Item key={name} size="sm" variant="card">
          <ItemMedia icon={Folder} variant="icon" />
          <ItemContent>
            <ItemTitle>{name}</ItemTitle>
            <ItemDescription>Folder</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </ItemGrid>
  ),
};

/**
 * Compact items for dense layouts.
 */
export const Compact: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <ItemGroup variant="grouped">
      {["index.ts", "package.json", "README.md", "tsconfig.json"].map(
        (name) => (
          <Item key={name} size="xs">
            <ItemMedia icon={FileText} variant="icon" />
            <ItemContent>
              <ItemTitle>{name}</ItemTitle>
            </ItemContent>
          </Item>
        ),
      )}
    </ItemGroup>
  ),
};
