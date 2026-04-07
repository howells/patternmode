import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { Calendar, LayoutGrid, List, Settings, User } from "lucide-react";
import { Stack } from "../../components/stack";
import {
  TabNavigation,
  TabNavigationLink,
  TabNavigationList,
} from "../../components/tab-navigation";
import { Tabs, TabsList, TabsTrigger } from "../../components/tabs";
import { Text } from "../../components/text";
import { ToggleGroup, ToggleGroupItem } from "../../components/toggle-group";
import type { ComponentSize } from "../../lib/size";
import { VariantGrid } from "../../stories/utils/variant-grid";

/**
 * Segmented Controls — Shared Visual Language
 *
 * Three components share the `segmented-variants.ts` primitives:
 * - **Tabs** — stateful content switching (Radix Tabs)
 * - **TabNavigation** — router-based navigation links
 * - **ToggleGroup** — multi-option toggle selection (Radix ToggleGroup)
 *
 * All three use the same shell (`SEGMENTED_SHELL_BASE`), padding
 * (`SEGMENTED_SHELL_PADDING`, `SEGMENTED_TRIGGER_PADDING`), and
 * indicator (`SEGMENTED_INDICATOR_CLASS`) tokens.
 *
 * The `pill` variant should look identical across all three at any given size.
 */
const meta: Meta = {
  title: "Design System/Segmented Controls",
  parameters: {
    docs: {
      description: {
        component:
          "Comparison of all components that share the segmented pill visual language. They should look identical at the same size.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

const SIZES: ComponentSize[] = ["xs", "sm", "base", "lg"];

function SectionLabel({ children }: { children: string }) {
  return (
    <Text className="text-gray-400" size="xs" weight="medium">
      {children}
    </Text>
  );
}

/** Canonical segmented-controls entry story. */
export const Base: Story = {
  render: () => (
    <Stack gap="xl">
      <Stack gap="xs">
        <SectionLabel>Tabs (pill, sm)</SectionLabel>
        <Tabs defaultValue="overview" size="sm" variant="pill">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </Tabs>
      </Stack>

      <Stack gap="xs">
        <SectionLabel>TabNavigation (pill, sm)</SectionLabel>
        <TabNavigation size="sm" variant="pill">
          <TabNavigationList>
            <TabNavigationLink active href="#">
              Overview
            </TabNavigationLink>
            <TabNavigationLink href="#">Analytics</TabNavigationLink>
            <TabNavigationLink href="#">Settings</TabNavigationLink>
          </TabNavigationList>
        </TabNavigation>
      </Stack>

      <Stack gap="xs">
        <SectionLabel>ToggleGroup (pill, sm)</SectionLabel>
        <ToggleGroup
          defaultValue="overview"
          size="sm"
          type="single"
          variant="pill"
        >
          <ToggleGroupItem value="overview">Overview</ToggleGroupItem>
          <ToggleGroupItem value="analytics">Analytics</ToggleGroupItem>
          <ToggleGroupItem value="settings">Settings</ToggleGroupItem>
        </ToggleGroup>
      </Stack>
    </Stack>
  ),
};

/** Matrix showing the shared segmented language across components and sizes. */
export const VariantMatrix: Story = {
  name: "Pill — Size Scale",
  parameters: { controls: { disable: true } },
  render: () => (
    <VariantGrid
      columns={[
        { key: "tabs", label: "Tabs" },
        { key: "nav", label: "TabNavigation" },
        { key: "toggle", label: "ToggleGroup" },
      ]}
      renderCell={(size, component) => {
        if (component === "tabs") {
          return (
            <Tabs defaultValue="a" size={size} variant="pill">
              <TabsList>
                <TabsTrigger value="a">Overview</TabsTrigger>
                <TabsTrigger value="b">Analytics</TabsTrigger>
                <TabsTrigger value="c">Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          );
        }
        if (component === "nav") {
          return (
            <TabNavigation size={size} variant="pill">
              <TabNavigationList>
                <TabNavigationLink active href="#">
                  Overview
                </TabNavigationLink>
                <TabNavigationLink href="#">Analytics</TabNavigationLink>
                <TabNavigationLink href="#">Settings</TabNavigationLink>
              </TabNavigationList>
            </TabNavigation>
          );
        }
        return (
          <ToggleGroup
            defaultValue="a"
            size={size}
            type="single"
            variant="pill"
          >
            <ToggleGroupItem value="a">Overview</ToggleGroupItem>
            <ToggleGroupItem value="b">Analytics</ToggleGroupItem>
            <ToggleGroupItem value="c">Settings</ToggleGroupItem>
          </ToggleGroup>
        );
      }}
      rows={SIZES.map((s) => ({ key: s, label: s }))}
    />
  ),
};

/** Line variant comparison (Tabs + TabNavigation only — ToggleGroup uses outline). */
export const LineComparison: Story = {
  name: "Line — Side by Side",
  render: () => (
    <Stack gap="xl">
      <Stack gap="xs">
        <SectionLabel>Tabs (line, sm)</SectionLabel>
        <Tabs defaultValue="overview" size="sm" variant="line">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </Tabs>
      </Stack>

      <Stack gap="xs">
        <SectionLabel>TabNavigation (line, sm)</SectionLabel>
        <TabNavigation size="sm" variant="line">
          <TabNavigationList>
            <TabNavigationLink active href="#">
              Overview
            </TabNavigationLink>
            <TabNavigationLink href="#">Analytics</TabNavigationLink>
            <TabNavigationLink href="#">Settings</TabNavigationLink>
          </TabNavigationList>
        </TabNavigation>
      </Stack>
    </Stack>
  ),
};

/** With icons — pill variant. */
export const WithIcons: Story = {
  name: "Pill — With Icons",
  render: () => (
    <Stack gap="xl">
      <Stack gap="xs">
        <SectionLabel>Tabs</SectionLabel>
        <Tabs defaultValue="profile" size="sm" variant="pill">
          <TabsList>
            <TabsTrigger icon={User} value="profile">
              Profile
            </TabsTrigger>
            <TabsTrigger icon={Calendar} value="schedule">
              Schedule
            </TabsTrigger>
            <TabsTrigger icon={Settings} value="settings">
              Settings
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </Stack>

      <Stack gap="xs">
        <SectionLabel>ToggleGroup</SectionLabel>
        <ToggleGroup defaultValue="grid" size="sm" type="single" variant="pill">
          <ToggleGroupItem
            aria-label="Grid view"
            icon={LayoutGrid}
            value="grid"
          >
            Grid
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="List view" icon={List} value="list">
            List
          </ToggleGroupItem>
        </ToggleGroup>
      </Stack>
    </Stack>
  ),
};
