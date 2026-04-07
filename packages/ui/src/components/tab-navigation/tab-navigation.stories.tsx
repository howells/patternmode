import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { Badge } from "../badge/badge-root";
import { Stack } from "../stack";
import {
  TabNavigation,
  TabNavigationLink,
  TabNavigationList,
} from "../tab-navigation";

type TabNavigationVariant = "pill" | "line";
const VARIANT_OPTIONS: TabNavigationVariant[] = ["pill", "line"];

type TabNavigationStoryArgs = React.ComponentProps<typeof TabNavigation> & {
  activeTab?: number;
};

const TABS = ["Dashboard", "Analytics", "Settings", "Reports"];

const meta: Meta<TabNavigationStoryArgs> = {
  title: "TabNavigation",
  component: TabNavigation,
  argTypes: {
    // Visual
    variant: {
      control: "select",
      options: VARIANT_OPTIONS,
      description: "Visual style: pill or line (underline)",
    },

    // State
    activeTab: {
      control: { type: "number", min: 0, max: 3 },
      description: "Index of the active tab (0-based)",
    },
  },
  args: {
    variant: "line",
    activeTab: 0,
  },
  parameters: {
    builder: {
      category: "navigation",
      icon: "navigation",
    },
    docs: {
      description: {
        component:
          "Navigation component for linking between pages with tab-like styling. Uses actual links for client-side routing.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<TabNavigationStoryArgs>;

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  render: (args) => (
    <TabNavigation variant={args.variant}>
      <TabNavigationList>
        {TABS.map((tab, index) => (
          <TabNavigationLink
            active={index === args.activeTab}
            href={`/${tab.toLowerCase()}`}
            key={tab}
          >
            {tab}
          </TabNavigationLink>
        ))}
      </TabNavigationList>
    </TabNavigation>
  ),
};

/**
 * Tabs with badge indicators.
 */
export const WithBadge: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Navigation tabs can include badge components for counts or status indicators.",
      },
    },
  },
  render: () => (
    <TabNavigation>
      <TabNavigationList>
        <TabNavigationLink active href="/inbox">
          Inbox
          <Badge size="xs" variant="secondary">
            12
          </Badge>
        </TabNavigationLink>
        <TabNavigationLink href="/archived">
          Archived
          <Badge size="xs" variant="secondary">
            3
          </Badge>
        </TabNavigationLink>
        <TabNavigationLink href="/sent">Sent</TabNavigationLink>
      </TabNavigationList>
    </TabNavigation>
  ),
};

/**
 * Vertical layout for sidebars.
 */
export const VerticalLayout: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Vertical navigation layout for sidebars or secondary navigation.",
      },
    },
  },
  render: () => (
    <Stack className="w-64">
      <TabNavigation>
        <TabNavigationList className="flex-col items-start">
          <TabNavigationLink active className="w-full" href="/profile">
            Profile
          </TabNavigationLink>
          <TabNavigationLink className="w-full" href="/account">
            Account
          </TabNavigationLink>
          <TabNavigationLink className="w-full" href="/appearance">
            Appearance
          </TabNavigationLink>
          <TabNavigationLink className="w-full" href="/notifications">
            Notifications
          </TabNavigationLink>
        </TabNavigationList>
      </TabNavigation>
    </Stack>
  ),
};
