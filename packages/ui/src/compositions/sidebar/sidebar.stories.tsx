import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { Home, Inbox, Search, Settings } from "lucide-react";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { SidebarContent } from "./sidebar-content";
import { SidebarFooter } from "./sidebar-footer";
import { SidebarGroup } from "./sidebar-group";
import { SidebarHeader } from "./sidebar-header";
import { SidebarMenu } from "./sidebar-menu";
import { SidebarProvider } from "./sidebar-provider";
import { Sidebar } from "./sidebar-root";
import { SidebarTrigger } from "./sidebar-trigger";

type SidebarStoryArgs = React.ComponentProps<typeof Sidebar>;

const meta: Meta<SidebarStoryArgs> = {
  title: "Sidebar",
  component: Sidebar,
  argTypes: {
    side: {
      control: "select",
      options: ["left", "right"],
      description: "Which side the sidebar appears on",
    },
    variant: {
      control: "select",
      options: ["sidebar", "floating", "inset"],
      description: "Visual style variant",
    },
    collapsible: {
      control: "select",
      options: ["offcanvas", "icon", "none"],
      description: "Collapse behavior",
    },
  },
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "offcanvas",
  },
  parameters: {
    builder: {
      category: "navigation",
      icon: "sidebar",
    },
    docs: {
      description: {
        component:
          "Responsive sidebar navigation with multiple variants. Wrap with SidebarProvider.",
      },
    },
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
type SidebarVariant = NonNullable<SidebarStoryArgs["variant"]>;
type SidebarSide = NonNullable<SidebarStoryArgs["side"]>;

const SIDEBAR_VARIANTS: { key: SidebarVariant; label: string }[] = [
  { key: "sidebar", label: "Sidebar" },
  { key: "floating", label: "Floating" },
  { key: "inset", label: "Inset" },
];

const SIDEBAR_SIDES: { key: SidebarSide; label: string }[] = [
  { key: "left", label: "Left" },
  { key: "right", label: "Right" },
];

const MENU_ITEMS = [
  { icon: Home, label: "Dashboard", href: "#" },
  { icon: Inbox, label: "Inbox", href: "#" },
  { icon: Search, label: "Search", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
];

function SidebarDemo({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
}: SidebarStoryArgs) {
  return (
    <SidebarProvider>
      <div className="flex min-h-[400px] w-full">
        <Sidebar collapsible={collapsible} side={side} variant={variant}>
          <SidebarHeader className="p-4">
            <span className="font-semibold text-lg">App Name</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {MENU_ITEMS.map((item) => (
                  <a
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
                    href={item.href}
                    key={item.label}
                  >
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </a>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <span className="text-muted-foreground text-xs">v1.0.0</span>
          </SidebarFooter>
        </Sidebar>

        <main className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="font-semibold text-xl">Main Content</h1>
          </div>
          <div className="flex-1 rounded-lg border border-border border-dashed p-8 text-center text-muted-foreground">
            Page content goes here
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

/**
 * Base sidebar with controls.
 */
export const Base: Story = {
  render: (args) => <SidebarDemo {...args} />,
};

/**
 * Floating variant with icon collapse.
 */
export const FloatingVariant: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Floating variant with rounded corners. Click trigger to collapse to icons.",
      },
    },
  },
  render: () => <SidebarDemo collapsible="icon" variant="floating" />,
};

export const VariantMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Variant matrix showing sidebar shell styles across left and right placement. Use the Base story to explore collapse behaviors.",
      },
    },
  },
  render: () => (
    <VariantGrid<SidebarSide, SidebarVariant>
      columns={SIDEBAR_VARIANTS}
      renderCell={(side, variant) => (
        <div className="min-w-[320px] overflow-hidden rounded-xl border border-border bg-background">
          <SidebarDemo collapsible="offcanvas" side={side} variant={variant} />
        </div>
      )}
      rowLabels="Side"
      rows={SIDEBAR_SIDES}
    />
  ),
};
