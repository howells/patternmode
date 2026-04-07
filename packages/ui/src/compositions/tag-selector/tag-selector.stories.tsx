// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { useState } from "react";
import { Button } from "../../components/button";
import type { TagColor, TagData } from "./tag-selector-context";
import { TagSelector } from "./tag-selector-root";

const SAMPLE_TAGS: TagData[] = [
  { id: "1", label: "Conference room" },
  { id: "2", label: "Lobby" },
  { id: "3", label: "Restaurant" },
  { id: "4", label: "Meeting room" },
  { id: "5", label: "Reception" },
  { id: "6", label: "Lounge" },
  { id: "7", label: "Rooftop bar" },
  { id: "8", label: "Spa" },
];

const meta: Meta<typeof TagSelector> = {
  title: "TagSelector",
  component: TagSelector,
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "base"],
      description: "Size of the component",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no tags selected",
    },
    searchPlaceholder: {
      control: "text",
      description: "Placeholder text for search input",
    },
    maxVisibleTags: {
      control: "number",
      description: 'Max visible tags before "+N more"',
    },
    emptyMessage: {
      control: "text",
      description: "Message shown when no tags match search",
    },
    allowCreate: {
      control: "boolean",
      description: "Allow creating new tags",
    },
    allowReorder: {
      control: "boolean",
      description: "Allow reordering tags via drag-and-drop",
    },
    allowManage: {
      control: "boolean",
      description: "Allow editing and deleting tags",
    },
    wrapTags: {
      control: "boolean",
      description: "Whether tags wrap (true) or scroll horizontally (false)",
    },
    triggerMaxHeight: {
      control: "text",
      description: 'Max height in wrap mode (e.g., "80px")',
    },
  },
  args: {
    size: "sm",
    placeholder: "Add tags\u2026",
    searchPlaceholder: "Search tags\u2026",
    maxVisibleTags: 3,
    emptyMessage: "No tags found.",
    allowCreate: false,
    allowReorder: false,
    allowManage: false,
    wrapTags: true,
  },
  parameters: {
    builder: {
      category: "forms",
      icon: "tags",
    },
    docs: {
      description: {
        component:
          "A multi-select tag component with search, create, edit, delete, and drag-to-reorder capabilities.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

type TagSelectorStoryArgs = React.ComponentProps<typeof TagSelector>;

function BaseDemo(args: TagSelectorStoryArgs) {
  const [value, setValue] = useState<TagData[]>([
    { id: "2", label: "Lobby" },
    { id: "3", label: "Restaurant" },
  ]);

  return (
    <div className="w-[320px]">
      <TagSelector
        {...args}
        onChange={setValue}
        tags={SAMPLE_TAGS}
        value={value}
      />
    </div>
  );
}

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  render: (args) => <BaseDemo {...args} />,
};

function WithCreateDemo(args: TagSelectorStoryArgs) {
  const [value, setValue] = useState<TagData[]>([{ id: "2", label: "Lobby" }]);
  const [tags, setTags] = useState<TagData[]>(SAMPLE_TAGS);

  const handleCreateTag = (label: string, color?: TagColor) => {
    const newTag: TagData = { id: `new-${Date.now()}`, label, color };
    setTags((prev) => [...prev, newTag]);
    return Promise.resolve(newTag);
  };

  return (
    <div className="w-[320px]">
      <TagSelector
        {...args}
        onChange={setValue}
        onCreateTag={handleCreateTag}
        tags={tags}
        value={value}
      />
    </div>
  );
}

/**
 * With create tag enabled.
 */
export const WithCreate: Story = {
  args: {
    allowCreate: true,
  },
  render: (args) => <WithCreateDemo {...args} />,
};

function WithReorderDemo(args: TagSelectorStoryArgs) {
  const [value, setValue] = useState<TagData[]>([
    { id: "2", label: "Lobby" },
    { id: "3", label: "Restaurant" },
    { id: "4", label: "Meeting room" },
  ]);
  const [tags, setTags] = useState<TagData[]>(SAMPLE_TAGS);

  return (
    <div className="w-[320px]">
      <TagSelector
        {...args}
        onChange={setValue}
        onReorder={setTags}
        tags={tags}
        value={value}
      />
    </div>
  );
}

/**
 * With drag-to-reorder enabled.
 */
export const WithReorder: Story = {
  args: {
    allowReorder: true,
  },
  render: (args) => <WithReorderDemo {...args} />,
};

function WithManageDemo(args: TagSelectorStoryArgs) {
  const [value, setValue] = useState<TagData[]>([{ id: "2", label: "Lobby" }]);
  const [tags, setTags] = useState<TagData[]>(SAMPLE_TAGS);

  const handleEditTag = (
    id: string,
    newLabel: string,
    color?: TagColor,
  ): Promise<void> => {
    setTags((prev) =>
      prev.map((t) => (t.id === id ? { ...t, label: newLabel, color } : t)),
    );
    return Promise.resolve();
  };

  const handleDeleteTag = (id: string): Promise<void> => {
    setTags((prev) => prev.filter((t) => t.id !== id));
    return Promise.resolve();
  };

  return (
    <div className="w-[320px]">
      <TagSelector
        {...args}
        onChange={setValue}
        onDeleteTag={handleDeleteTag}
        onEditTag={handleEditTag}
        tags={tags}
        value={value}
      />
    </div>
  );
}

/**
 * With edit/delete management enabled.
 */
export const WithManage: Story = {
  args: {
    allowManage: true,
  },
  render: (args) => <WithManageDemo {...args} />,
};

function FullFeaturedDemo(args: TagSelectorStoryArgs) {
  const [value, setValue] = useState<TagData[]>([
    { id: "2", label: "Lobby" },
    { id: "3", label: "Restaurant" },
    { id: "4", label: "Meeting room" },
  ]);
  const [tags, setTags] = useState<TagData[]>(SAMPLE_TAGS);

  const handleCreateTag = (label: string, color?: TagColor) => {
    const newTag: TagData = { id: `new-${Date.now()}`, label, color };
    setTags((prev) => [...prev, newTag]);
    return Promise.resolve(newTag);
  };

  const handleEditTag = (
    id: string,
    newLabel: string,
    color?: TagColor,
  ): Promise<void> => {
    setTags((prev) =>
      prev.map((t) => (t.id === id ? { ...t, label: newLabel, color } : t)),
    );
    return Promise.resolve();
  };

  const handleDeleteTag = (id: string): Promise<void> => {
    setTags((prev) => prev.filter((t) => t.id !== id));
    return Promise.resolve();
  };

  return (
    <div className="w-[320px]">
      <TagSelector
        {...args}
        onChange={setValue}
        onCreateTag={handleCreateTag}
        onDeleteTag={handleDeleteTag}
        onEditTag={handleEditTag}
        onReorder={setTags}
        tags={tags}
        value={value}
      />
    </div>
  );
}

/**
 * Full-featured with all capabilities enabled.
 */
export const FullFeatured: Story = {
  args: {
    allowCreate: true,
    allowReorder: true,
    allowManage: true,
  },
  render: (args) => <FullFeaturedDemo {...args} />,
};

function EmptyDemo(args: TagSelectorStoryArgs) {
  const [value, setValue] = useState<TagData[]>([]);

  return (
    <div className="w-[320px]">
      <TagSelector
        {...args}
        allowCreate
        onChange={setValue}
        tags={[]}
        value={value}
      />
    </div>
  );
}

/**
 * Empty state with no tags.
 */
export const Empty: Story = {
  render: (args) => <EmptyDemo {...args} />,
};

function ManySelectedDemo(args: TagSelectorStoryArgs) {
  const [value, setValue] = useState<TagData[]>([
    { id: "1", label: "Conference room" },
    { id: "2", label: "Lobby" },
    { id: "3", label: "Restaurant" },
    { id: "4", label: "Meeting room" },
    { id: "5", label: "Reception" },
    { id: "6", label: "Lounge" },
  ]);

  return (
    <div className="w-[320px]">
      <TagSelector
        {...args}
        maxVisibleTags={10}
        onChange={setValue}
        tags={SAMPLE_TAGS}
        value={value}
      />
    </div>
  );
}

/**
 * With many selected tags (wrapping demo).
 */
export const ManySelected: Story = {
  render: (args) => <ManySelectedDemo {...args} />,
};

function SizesDemo() {
  const [valueXs, setValueXs] = useState<TagData[]>([
    { id: "2", label: "Lobby" },
  ]);
  const [valueSm, setValueSm] = useState<TagData[]>([
    { id: "2", label: "Lobby" },
  ]);
  const [valueBase, setValueBase] = useState<TagData[]>([
    { id: "2", label: "Lobby" },
  ]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-muted-foreground text-xs">size="base"</p>
        <div className="w-[320px]">
          <TagSelector
            onChange={setValueXs}
            size="base"
            tags={SAMPLE_TAGS}
            value={valueXs}
          />
        </div>
      </div>
      <div>
        <p className="mb-2 text-muted-foreground text-xs">size="lg"</p>
        <div className="w-[320px]">
          <TagSelector
            onChange={setValueSm}
            size="lg"
            tags={SAMPLE_TAGS}
            value={valueSm}
          />
        </div>
      </div>
      <div>
        <p className="mb-2 text-muted-foreground text-xs">size="xl"</p>
        <div className="w-[320px]">
          <TagSelector
            onChange={setValueBase}
            size="xl"
            tags={SAMPLE_TAGS}
            value={valueBase}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Different sizes.
 */
export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <SizesDemo />,
};

function HorizontalScrollDemo(args: TagSelectorStoryArgs) {
  const [value, setValue] = useState<TagData[]>([
    { id: "1", label: "Conference room" },
    { id: "2", label: "Lobby" },
    { id: "3", label: "Restaurant" },
    { id: "4", label: "Meeting room" },
    { id: "5", label: "Reception" },
  ]);

  return (
    <div className="w-[320px]">
      <TagSelector
        {...args}
        onChange={setValue}
        tags={SAMPLE_TAGS}
        value={value}
      />
    </div>
  );
}

/**
 * Horizontal scroll mode (wrapTags={false}).
 * Tags scroll horizontally instead of wrapping.
 */
export const HorizontalScroll: Story = {
  args: {
    wrapTags: false,
  },
  render: (args) => <HorizontalScrollDemo {...args} />,
};

function CustomTriggerDemo() {
  const [value, setValue] = useState<TagData[]>([{ id: "2", label: "Lobby" }]);

  return (
    <div className="w-[320px]">
      <TagSelector
        onChange={setValue}
        tags={SAMPLE_TAGS}
        trigger={({ value: selected, open }) => (
          <Button className="w-full justify-between" variant="outline">
            {selected.length > 0
              ? `${selected.length} tag${selected.length > 1 ? "s" : ""} selected`
              : "Select tags"}
            <span className={open ? "rotate-180" : ""}>&#x25BE;</span>
          </Button>
        )}
        value={value}
      />
    </div>
  );
}

/**
 * Custom trigger using a simple button.
 */
export const CustomTrigger: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <CustomTriggerDemo />,
};

function ConstrainedHeightDemo(args: TagSelectorStoryArgs) {
  const [value, setValue] = useState<TagData[]>([
    { id: "1", label: "Conference room" },
    { id: "2", label: "Lobby" },
    { id: "3", label: "Restaurant" },
    { id: "4", label: "Meeting room" },
    { id: "5", label: "Reception" },
    { id: "6", label: "Lounge" },
  ]);

  return (
    <div className="w-[320px]">
      <TagSelector
        {...args}
        maxVisibleTags={20}
        onChange={setValue}
        tags={SAMPLE_TAGS}
        triggerMaxHeight="60px"
        value={value}
        wrapTags
      />
    </div>
  );
}

/**
 * Wrap mode with constrained max height.
 */
export const ConstrainedHeight: Story = {
  render: (args) => <ConstrainedHeightDemo {...args} />,
};

const COLORED_TAGS: TagData[] = [
  { id: "s1", label: "Considering", color: "warning" },
  { id: "s2", label: "Shortlist", color: "info" },
  { id: "s3", label: "Approved", color: "affirmative" },
  { id: "s4", label: "Rejected", color: "destructive" },
];

const STATUS_COLOR_PALETTE: TagColor[] = [
  "warning",
  "info",
  "affirmative",
  "destructive",
  "brand",
  "secondary",
];

function SingleSelectDemo(args: TagSelectorStoryArgs) {
  const [value, setValue] = useState<TagData[]>([{ id: "2", label: "Lobby" }]);

  return (
    <div className="w-[320px]">
      <TagSelector
        {...args}
        onChange={setValue}
        singleSelect
        tags={SAMPLE_TAGS}
        value={value}
      />
    </div>
  );
}

/**
 * Single-select mode: only one tag can be selected at a time.
 */
export const SingleSelect: Story = {
  render: (args) => <SingleSelectDemo {...args} />,
};

function WithColorsDemo(args: TagSelectorStoryArgs) {
  const [value, setValue] = useState<TagData[]>([
    { id: "s1", label: "Considering", color: "warning" },
  ]);

  return (
    <div className="w-[320px]">
      <TagSelector
        {...args}
        onChange={setValue}
        tags={COLORED_TAGS}
        value={value}
      />
    </div>
  );
}

/**
 * Tags with colors (dots and colored variants).
 */
export const WithColors: Story = {
  render: (args) => <WithColorsDemo {...args} />,
};

function ColorPickerDemo(args: TagSelectorStoryArgs) {
  const [value, setValue] = useState<TagData[]>([]);
  const [tags, setTags] = useState<TagData[]>(COLORED_TAGS);

  const handleCreateTag = (label: string, color?: TagColor) => {
    const newTag: TagData = { id: `new-${Date.now()}`, label, color };
    setTags((prev) => [...prev, newTag]);
    return Promise.resolve(newTag);
  };

  const handleEditTag = (
    id: string,
    newLabel: string,
    color?: TagColor,
  ): Promise<void> => {
    setTags((prev) =>
      prev.map((t) => (t.id === id ? { ...t, label: newLabel, color } : t)),
    );
    return Promise.resolve();
  };

  const handleDeleteTag = (id: string): Promise<void> => {
    setTags((prev) => prev.filter((t) => t.id !== id));
    return Promise.resolve();
  };

  return (
    <div className="w-[320px]">
      <TagSelector
        {...args}
        allowCreate
        allowManage
        colorPalette={STATUS_COLOR_PALETTE}
        onChange={setValue}
        onCreateTag={handleCreateTag}
        onDeleteTag={handleDeleteTag}
        onEditTag={handleEditTag}
        showColorPicker
        tags={tags}
        value={value}
      />
    </div>
  );
}

/**
 * Color picker enabled for creating and editing tags.
 */
export const ColorPicker: Story = {
  render: (args) => <ColorPickerDemo {...args} />,
};

function SingleSelectWithColorsDemo(args: TagSelectorStoryArgs) {
  const [value, setValue] = useState<TagData[]>([
    { id: "s3", label: "Approved", color: "affirmative" },
  ]);
  const [tags, setTags] = useState<TagData[]>(COLORED_TAGS);

  const handleCreateTag = (label: string, color?: TagColor) => {
    const newTag: TagData = { id: `new-${Date.now()}`, label, color };
    setTags((prev) => [...prev, newTag]);
    return Promise.resolve(newTag);
  };

  return (
    <div className="w-[320px]">
      <TagSelector
        {...args}
        allowCreate
        colorPalette={STATUS_COLOR_PALETTE}
        onChange={setValue}
        onCreateTag={handleCreateTag}
        showColorPicker
        singleSelect
        tags={tags}
        value={value}
      />
    </div>
  );
}

/**
 * Status selector pattern: single-select with colored tags and a color picker.
 * This is the pattern used for product status in the products table.
 */
export const SingleSelectWithColors: Story = {
  render: (args) => <SingleSelectWithColorsDemo {...args} />,
};
