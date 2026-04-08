import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { BarChart3, Home, Inbox, Plus, Search, Settings } from "lucide-react";
import { Badge } from "../components/badge";
import { Button } from "../components/button";
import { Icon } from "../components/icon";
import { Input } from "../components/input";
import { MenuItem } from "../components/menu-item";
import { ScrollArea } from "../components/scroll-area";
import { Separator } from "../components/separator";
import { HStack, VStack } from "../components/stack";
import { Text } from "../components/text";
import { AppShell, AppShellContent, AppShellSidebar } from "./app-shell";

/* -------------------------------------------------------------------------- */
/*  Shared helpers                                                            */
/* -------------------------------------------------------------------------- */

const PLACEHOLDER_CARDS = Array.from({ length: 12 }, (_, i) => i);

function PlaceholderCard({ index }: { index: number }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-xs">
      <div className="mb-3 h-24 rounded-md bg-muted" />
      <Text className="mb-1 font-medium" size="sm">
        Card {index + 1}
      </Text>
      <Text className="text-muted-foreground" size="xs">
        Placeholder description for card {index + 1}.
      </Text>
    </div>
  );
}

function SidebarNav({ variant }: { variant?: "bordered" | "framed" }) {
  return (
    <VStack className="h-full" gap="none">
      {/* Header */}
      <HStack align="center" className="shrink-0 px-3 py-3" gap="xs">
        <div className="flex size-6 items-center justify-center rounded-md bg-foreground">
          <Text className="font-bold text-background" size="xs">
            P
          </Text>
        </div>
        <Text className="font-semibold" size="sm">
          PatternMode
        </Text>
      </HStack>

      {/* Primary nav */}
      <VStack className="px-2" gap="3xs">
        <MenuItem icon={Home} isActive size="sm">
          Overview
        </MenuItem>
        <MenuItem icon={Inbox} size="sm">
          Inbox
        </MenuItem>
        <MenuItem icon={BarChart3} size="sm">
          Analytics
        </MenuItem>
      </VStack>

      <div className="px-3 py-2">
        <Separator />
      </div>

      {/* Categories */}
      <VStack className="px-2" gap="3xs">
        <MenuItem
          size="sm"
          suffix={
            <Badge appearance="light" size="xs">
              12
            </Badge>
          }
        >
          Design Systems
        </MenuItem>
        <MenuItem
          size="sm"
          suffix={
            <Badge appearance="light" size="xs">
              8
            </Badge>
          }
        >
          Components
        </MenuItem>
        <MenuItem
          size="sm"
          suffix={
            <Badge appearance="light" size="xs">
              24
            </Badge>
          }
        >
          Templates
        </MenuItem>
        <MenuItem
          size="sm"
          suffix={
            <Badge appearance="light" size="xs">
              3
            </Badge>
          }
        >
          Experiments
        </MenuItem>
      </VStack>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer */}
      <VStack className="px-2 pb-3" gap="3xs">
        <Separator className="mb-2" />
        <MenuItem icon={Settings} size="sm">
          Settings
        </MenuItem>
      </VStack>
    </VStack>
  );
}

function ContentArea() {
  return (
    <VStack className="h-full" gap="none">
      {/* Top bar */}
      <HStack
        align="center"
        className="shrink-0 border-b border-border px-4 py-2.5"
        gap="sm"
      >
        <HStack align="center" gap="xs">
          <Text className="font-semibold" size="sm">
            Dashboard
          </Text>
          <Badge appearance="light" size="xs" variant="secondary">
            Beta
          </Badge>
        </HStack>
        <div className="flex-1" />
        <HStack align="center" gap="xs">
          <div className="relative">
            <Icon
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              icon={Search}
              size="2xs"
            />
            <Input className="h-8 w-52 pl-8 text-sm" placeholder="Search..." />
          </div>
          <Button icon={Plus} size="sm">
            Create
          </Button>
        </HStack>
      </HStack>

      {/* Scrollable content */}
      <ScrollArea className="flex-1">
        <div className="grid grid-cols-3 gap-4 p-4">
          {PLACEHOLDER_CARDS.map((i) => (
            <PlaceholderCard index={i} key={i} />
          ))}
        </div>
      </ScrollArea>
    </VStack>
  );
}

/* -------------------------------------------------------------------------- */
/*  Storybook meta                                                            */
/* -------------------------------------------------------------------------- */

const meta: Meta<typeof AppShell> = {
  title: "Compositions/AppShell",
  component: AppShell,
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    docs: {
      description: {
        component:
          "Full-page app shell layout with configurable sidebar and content area. Supports bordered (Linear/Slack) and framed (Medusa/Vercel) variants.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Default bordered variant — white sidebar with right border,
 * content fills the remaining space. Linear / Slack style.
 */
export const Default: Story = {
  render: () => (
    <AppShell variant="bordered">
      <AppShellSidebar width="w-52">
        <SidebarNav variant="bordered" />
      </AppShellSidebar>
      <AppShellContent>
        <ContentArea />
      </AppShellContent>
    </AppShell>
  ),
};

/**
 * Framed variant — muted background with sidebar floating on bg,
 * content rendered as a raised white card panel. Medusa / Vercel style.
 */
export const Framed: Story = {
  render: () => (
    <AppShell variant="framed">
      <AppShellSidebar width="w-52">
        <SidebarNav variant="framed" />
      </AppShellSidebar>
      <AppShellContent>
        <ContentArea />
      </AppShellContent>
    </AppShell>
  ),
};

/**
 * Custom sidebar width — demonstrates a wider w-64 sidebar.
 */
export const CustomWidth: Story = {
  render: () => (
    <AppShell variant="bordered">
      <AppShellSidebar width="w-64">
        <SidebarNav variant="bordered" />
      </AppShellSidebar>
      <AppShellContent>
        <ContentArea />
      </AppShellContent>
    </AppShell>
  ),
};
