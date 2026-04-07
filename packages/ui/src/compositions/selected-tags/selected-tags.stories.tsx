import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { useState } from "react";
import { Stack } from "../../components/stack";
import { Text } from "../../components/text";
import { type SelectedTag, SelectedTags } from "./selected-tags-root";

const meta = {
  title: "SelectedTags",
  component: SelectedTags,
  parameters: {
    builder: {
      category: "form",
      icon: "tags",
    },

    docs: {
      description: {
        component:
          "Display component for showing selected tags with remove functionality. Supports different tag types (classification, brand, category, default) with appropriate badge variants.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const sampleTags: SelectedTag[] = [
  { id: "1", label: "Modern", value: "modern", type: "default" },
  { id: "2", label: "Kitchen", value: "kitchen", type: "category" },
  { id: "3", label: "IKEA", value: "ikea", type: "brand" },
  {
    id: "4",
    label: "Sustainable",
    value: "sustainable",
    type: "classification",
  },
];

export const Base: Story = {
  name: "Basic Tags",
  parameters: { controls: { disable: true } },
  render: () => {
    const [tags, setTags] = useState<SelectedTag[]>(sampleTags);

    const handleRemove = (id: string) => {
      setTags((prev) => prev.filter((tag) => tag.id !== id));
    };

    return (
      <Stack gap="base">
        <SelectedTags
          label="Selected filters"
          onRemove={handleRemove}
          tags={tags}
        />
        <Text className="text-muted-foreground text-xs">
          Click the × button on any tag to remove it
        </Text>
      </Stack>
    );
  },
};

export const WithClear: Story = {
  name: "With Clear All",
  parameters: { controls: { disable: true } },
  render: () => {
    const [tags, setTags] = useState<SelectedTag[]>(sampleTags);

    const handleRemove = (id: string) => {
      setTags((prev) => prev.filter((tag) => tag.id !== id));
    };

    const handleClear = () => {
      setTags([]);
    };

    return (
      <Stack gap="base">
        <SelectedTags
          label="Active filters"
          onClear={handleClear}
          onRemove={handleRemove}
          tags={tags}
        />
        <Text className="text-muted-foreground text-xs">
          Use "Clear all" to remove all tags at once
        </Text>
      </Stack>
    );
  },
};

export const TagTypes: Story = {
  name: "Different Tag Types",
  parameters: { controls: { disable: true } },
  render: () => {
    const [tags, setTags] = useState<SelectedTag[]>([
      { id: "1", label: "Modern Style", value: "modern", type: "default" },
      { id: "2", label: "IKEA", value: "ikea", type: "brand" },
      {
        id: "3",
        label: "Sustainable",
        value: "sustainable",
        type: "classification",
      },
      { id: "4", label: "Kitchen", value: "kitchen", type: "category" },
      { id: "5", label: "Minimalist", value: "minimalist", type: "default" },
    ]);

    const handleRemove = (id: string) => {
      setTags((prev) => prev.filter((tag) => tag.id !== id));
    };

    return (
      <Stack gap="base">
        <SelectedTags
          label="Selected filters"
          onRemove={handleRemove}
          tags={tags}
        />
        <Stack className="text-muted-foreground text-xs" gap="3xs">
          <Text>• Default tags use primary variant</Text>
          <Text>• Brand tags use secondary variant</Text>
          <Text>• Classification tags use outline variant</Text>
          <Text>• Category tags use primary variant</Text>
        </Stack>
      </Stack>
    );
  },
};

export const ManyTags: Story = {
  name: "Many Tags",
  parameters: { controls: { disable: true } },
  render: () => {
    const [tags, setTags] = useState<SelectedTag[]>([
      { id: "1", label: "Modern", value: "modern", type: "default" },
      { id: "2", label: "Kitchen", value: "kitchen", type: "category" },
      { id: "3", label: "IKEA", value: "ikea", type: "brand" },
      {
        id: "4",
        label: "Sustainable",
        value: "sustainable",
        type: "classification",
      },
      { id: "5", label: "Minimalist", value: "minimalist", type: "default" },
      {
        id: "6",
        label: "Scandinavian",
        value: "scandinavian",
        type: "default",
      },
      { id: "7", label: "Wood", value: "wood", type: "category" },
      { id: "8", label: "White", value: "white", type: "default" },
      {
        id: "9",
        label: "Contemporary",
        value: "contemporary",
        type: "default",
      },
      {
        id: "10",
        label: "Herman Miller",
        value: "herman-miller",
        type: "brand",
      },
    ]);

    const handleRemove = (id: string) => {
      setTags((prev) => prev.filter((tag) => tag.id !== id));
    };

    const handleClear = () => {
      setTags([]);
    };

    return (
      <Stack gap="base">
        <SelectedTags
          label="Active filters"
          onClear={handleClear}
          onRemove={handleRemove}
          tags={tags}
        />
        <Text className="text-muted-foreground text-xs">
          Tags wrap to multiple lines when needed
        </Text>
      </Stack>
    );
  },
};

export const Empty: Story = {
  name: "Empty State",
  parameters: { controls: { disable: true } },
  render: () => {
    const [tags] = useState<SelectedTag[]>([]);

    const handleRemove = () => {
      // No-op
    };

    return (
      <Stack gap="base">
        <SelectedTags
          label="Selected filters"
          onRemove={handleRemove}
          tags={tags}
        />
        <Text className="text-muted-foreground text-xs">
          Component returns null when no tags are present
        </Text>
      </Stack>
    );
  },
};

export const CustomLabel: Story = {
  name: "Custom Label",
  parameters: { controls: { disable: true } },
  render: () => {
    const [tags, setTags] = useState<SelectedTag[]>(sampleTags);

    const handleRemove = (id: string) => {
      setTags((prev) => prev.filter((tag) => tag.id !== id));
    };

    return (
      <Stack gap="base">
        <SelectedTags
          label="Applied filters"
          onRemove={handleRemove}
          tags={tags}
        />
        <Text className="text-muted-foreground text-xs">
          Label text can be customized
        </Text>
      </Stack>
    );
  },
};
