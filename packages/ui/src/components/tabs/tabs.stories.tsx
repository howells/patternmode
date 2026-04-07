import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { Calendar, Settings, User } from "lucide-react";
import type React from "react";
import type { ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Badge } from "../badge";
import { Stack } from "../stack";
import { Tabs, TabsContent, TabsList, TabsTrigger, tabsAnatomy } from "../tabs";
import { Text } from "../text";

type TabsVariant = "pill" | "line";
const VARIANT_OPTIONS: TabsVariant[] = ["pill", "line"];

type TabsStoryArgs = React.ComponentProps<typeof Tabs>;

const meta: Meta<TabsStoryArgs> = {
  title: "Tabs",
  component: Tabs,
  argTypes: {
    // Visual
    variant: {
      control: "select",
      options: VARIANT_OPTIONS,
      description: "Visual style of the tabs: pill or line",
    },
    size: {
      ...sizeArgType,
      description: "Size of the tabs",
    },
    fullWidth: {
      control: "boolean",
      description: "Tabs fill container width equally",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
    asChild: { table: { disable: true } },
  },
  args: {
    variant: "pill",
    size: "base",
    fullWidth: false,
    defaultValue: "tab1",
  },
  parameters: {
    builder: {
      category: "container",
      icon: "layout-list",
    },
    docs: {
      description: {
        component:
          "Organize content into separate views where only one is visible at a time. Supports multiple variants and sizes.",
      },
      anatomy: tabsAnatomy,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger icon={Settings} value="tab1">
          Account
        </TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
        <TabsTrigger value="tab3">Settings</TabsTrigger>
      </TabsList>
      <TabsContent className="mt-4" value="tab1">
        <Stack className="text-sm" gap="xs">
          <h3 className="font-medium">Account Information</h3>
          <Text variant="muted">
            Manage your account settings and preferences here.
          </Text>
        </Stack>
      </TabsContent>
      <TabsContent className="mt-4" value="tab2">
        <Stack className="text-sm" gap="xs">
          <h3 className="font-medium">Password Settings</h3>
          <Text variant="muted">
            Update your password and security settings.
          </Text>
        </Stack>
      </TabsContent>
      <TabsContent className="mt-4" value="tab3">
        <Stack className="text-sm" gap="xs">
          <h3 className="font-medium">Application Settings</h3>
          <Text variant="muted">
            Configure your application preferences and options.
          </Text>
        </Stack>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Variant × Size matrix showing visual combinations.
 */
export const VariantSizeMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Matrix showing variant and size combinations.",
      },
    },
  },
  render: () => {
    const SIZE_ROWS: { key: ComponentSize; label: string }[] = [
      { key: "xs", label: "xs" },
      { key: "sm", label: "sm" },
      { key: "base", label: "base" },
      { key: "lg", label: "lg" },
    ];
    const VARIANT_COLUMNS: { key: TabsVariant; label: string }[] = [
      { key: "pill", label: "pill" },
      { key: "line", label: "line" },
    ];

    return (
      <VariantGrid<ComponentSize, TabsVariant>
        columns={VARIANT_COLUMNS}
        renderCell={(size, variant) => (
          <Tabs defaultValue="home" size={size} variant={variant}>
            <TabsList>
              <TabsTrigger value="home">Home</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>
          </Tabs>
        )}
        rowLabels="Size"
        rows={SIZE_ROWS}
      />
    );
  },
};

/**
 * Tabs with icons.
 */
export const WithIcons: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Tabs with icons alongside text labels using the icon prop.",
      },
    },
  },
  render: () => (
    <div className="w-96">
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger icon={User} value="profile">
            Profile
          </TabsTrigger>
          <TabsTrigger icon={Calendar} value="calendar">
            Calendar
          </TabsTrigger>
          <TabsTrigger icon={Settings} value="settings">
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent className="mt-4" value="profile">
          <Text variant="muted">Profile settings and information.</Text>
        </TabsContent>
        <TabsContent className="mt-4" value="calendar">
          <Text variant="muted">Calendar view and events.</Text>
        </TabsContent>
        <TabsContent className="mt-4" value="settings">
          <Text variant="muted">Application settings.</Text>
        </TabsContent>
      </Tabs>
    </div>
  ),
};

/**
 * Many tabs in a narrow container scroll horizontally via ScrollArea.
 */
export const Overflow: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "When tabs exceed the container width, they scroll horizontally.",
      },
    },
  },
  render: () => {
    const ROWS: { key: TabsVariant; label: string }[] = [
      { key: "pill", label: "pill" },
      { key: "line", label: "line" },
    ];
    const COLS: { key: "narrow"; label: string }[] = [
      { key: "narrow", label: "Narrow (w-64)" },
    ];

    return (
      <VariantGrid<TabsVariant, "narrow">
        columns={COLS}
        renderCell={(variant) => (
          <div className="w-64">
            <Tabs defaultValue="all" variant={variant}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="flooring">Flooring</TabsTrigger>
                <TabsTrigger value="tile">Tile</TabsTrigger>
                <TabsTrigger value="wallcovering">Wallcovering</TabsTrigger>
                <TabsTrigger value="carpet">Carpet</TabsTrigger>
                <TabsTrigger value="stone">Stone</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}
        rowLabels="Variant"
        rows={ROWS}
      />
    );
  },
};

/**
 * Tabs with badge counts.
 */
export const WithBadges: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Tabs with badge components for counts or status.",
      },
    },
  },
  render: () => (
    <div className="w-96">
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">
            All
            <Badge size="xs" variant="secondary">
              24
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="active">
            Active
            <Badge size="xs" variant="affirmative">
              8
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending
            <Badge size="xs" variant="warning">
              3
            </Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent className="mt-4" value="all">
          <Text variant="muted">All items (24 total).</Text>
        </TabsContent>
        <TabsContent className="mt-4" value="active">
          <Text variant="muted">Active items (8 total).</Text>
        </TabsContent>
        <TabsContent className="mt-4" value="pending">
          <Text variant="muted">Pending items (3 total).</Text>
        </TabsContent>
      </Tabs>
    </div>
  ),
};
