import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import {
  FileQuestion,
  FolderOpen,
  Inbox,
  Plus,
  Search,
  Upload,
  Users,
} from "lucide-react";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Button } from "../button";
import { Stack } from "../stack";
import { EmptyActions } from "./empty-actions";
import type { EmptySize } from "./empty-context";
import { EmptyDescription } from "./empty-description";
import { EmptyHeader } from "./empty-header";
import { EmptyMedia } from "./empty-media";
import { Empty } from "./empty-root";
import { EmptyTitle } from "./empty-title";

type EmptyLayout = "centered" | "card" | "card-dashed";
const EMPTY_LAYOUTS: EmptyLayout[] = ["centered", "card", "card-dashed"];
const EMPTY_SIZES: EmptySize[] = ["sm", "base", "lg"];

const meta = {
  title: "Empty",
  component: Empty,
  parameters: {
    layout: "centered",
    builder: {
      category: "feedback",
      icon: "inbox",
    },
    docs: {
      description: {
        component:
          "Empty states provide guidance when no content is available. Compose EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, and EmptyActions for flexible empty states.",
      },
    },
  },
  argTypes: {
    // Visual
    layout: {
      control: "select",
      options: EMPTY_LAYOUTS,
      description: "Layout variant",
    },
    size: {
      control: "select",
      options: EMPTY_SIZES,
      description: "Size variant affecting spacing and typography",
    },
    minHeight: {
      control: "text",
      description: "Minimum height for centered layout",
    },

    // Advanced (hidden)
    className: { table: { disable: true } },
  },
  args: {
    layout: "centered",
    size: "base",
  },
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  render: (args) => (
    <Empty layout={args.layout} size={args.size}>
      <EmptyHeader>
        <EmptyMedia icon={Inbox} />
        <EmptyTitle>No messages</EmptyTitle>
        <EmptyDescription>
          Your inbox is empty. Messages will appear here.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
};

/**
 * Layout × Size matrix showing all combinations.
 */
export const LayoutSizeMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Matrix showing all layout and size combinations.",
      },
    },
  },
  render: () => {
    const LAYOUT_ROWS: { key: EmptyLayout; label: string }[] =
      EMPTY_LAYOUTS.map((l) => ({ key: l, label: l }));
    const SIZE_COLUMNS: { key: EmptySize; label: string }[] = EMPTY_SIZES.map(
      (s) => ({ key: s, label: s }),
    );

    return (
      <VariantGrid<EmptyLayout, EmptySize>
        columns={SIZE_COLUMNS}
        renderCell={(layout, size) => (
          <Empty layout={layout} size={size}>
            <EmptyHeader>
              <EmptyMedia icon={Inbox} />
              <EmptyTitle>No items</EmptyTitle>
              <EmptyDescription>Nothing here yet.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
        rowLabels="Layout"
        rows={LAYOUT_ROWS}
      />
    );
  },
};

/**
 * Empty state with a call-to-action button.
 */
export const WithAction: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia icon={FolderOpen} />
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>
          Get started by creating your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyActions>
        <Button icon={Plus}>Create Project</Button>
      </EmptyActions>
    </Empty>
  ),
};

/**
 * Empty state inside a card container.
 */
export const InCard: Story = {
  render: () => (
    <Empty layout="card" size="sm">
      <EmptyHeader>
        <EmptyMedia icon={Users} />
        <EmptyTitle>No team members</EmptyTitle>
        <EmptyDescription>
          Invite people to collaborate on this project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyActions>
        <Button icon={Plus} size="sm">
          Invite Members
        </Button>
      </EmptyActions>
    </Empty>
  ),
};

/**
 * Empty state with dashed card border.
 */
export const CardDashed: Story = {
  render: () => (
    <Empty layout="card-dashed">
      <EmptyHeader>
        <EmptyMedia icon={Upload} />
        <EmptyTitle>Upload files</EmptyTitle>
        <EmptyDescription>
          Drag and drop files here, or click to browse.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyActions>
        <Button appearance="outline" icon={Upload} variant="secondary">
          Browse Files
        </Button>
      </EmptyActions>
    </Empty>
  ),
};

/**
 * Empty search results state.
 */
export const SearchResults: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia icon={Search} />
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          We couldn't find anything matching "design systems". Try adjusting
          your search or filters.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
};

/**
 * Empty state with multiple actions.
 */
export const MultipleActions: Story = {
  render: () => (
    <Empty size="lg">
      <EmptyHeader>
        <EmptyMedia icon={FileQuestion} />
        <EmptyTitle>No documents</EmptyTitle>
        <EmptyDescription>
          You haven't created any documents yet.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyActions>
        <Button appearance="outline" icon={Upload} variant="secondary">
          Import
        </Button>
        <Button icon={Plus}>Create New</Button>
      </EmptyActions>
    </Empty>
  ),
};

/**
 * Small size variant for compact spaces.
 */
export const SmallSize: Story = {
  render: () => (
    <Empty layout="card" size="sm">
      <EmptyHeader>
        <EmptyMedia icon={Inbox} />
        <EmptyTitle>No notifications</EmptyTitle>
        <EmptyDescription>You're all caught up!</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
};

/**
 * Large size variant for prominent empty states.
 */
export const LargeSize: Story = {
  render: () => (
    <Empty size="lg">
      <EmptyHeader>
        <EmptyMedia icon={FolderOpen} />
        <EmptyTitle>Welcome to your workspace</EmptyTitle>
        <EmptyDescription>
          This is where all your projects will live. Create your first project
          to get started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyActions>
        <Button icon={Plus} size="lg">
          Create First Project
        </Button>
      </EmptyActions>
    </Empty>
  ),
};

/**
 * Empty state with semantic icon colors.
 */
export const SemanticColors: Story = {
  render: () => (
    <Stack gap="lg">
      <Empty layout="card" size="sm">
        <EmptyHeader>
          <EmptyMedia icon={Users} variant="secondary" />
          <EmptyTitle>No connections</EmptyTitle>
          <EmptyDescription>
            Connect with others to see their activity.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyActions>
          <Button appearance="outline" size="sm" variant="secondary">
            Find People
          </Button>
        </EmptyActions>
      </Empty>

      <Empty layout="card" size="sm">
        <EmptyHeader>
          <EmptyMedia icon={FolderOpen} variant="warning" />
          <EmptyTitle>Folder is empty</EmptyTitle>
          <EmptyDescription>
            Add files to this folder to organize your content.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyActions>
          <Button
            appearance="outline"
            icon={Plus}
            size="sm"
            variant="secondary"
          >
            Add Files
          </Button>
        </EmptyActions>
      </Empty>

      <Empty layout="card" size="sm">
        <EmptyHeader>
          <EmptyMedia icon={Search} variant="destructive" />
          <EmptyTitle>No matches</EmptyTitle>
          <EmptyDescription>
            Try different keywords or remove filters.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </Stack>
  ),
};

/**
 * All size variants comparison.
 */
export const SizeComparison: Story = {
  render: () => (
    <Stack gap="xl">
      <Empty layout="card" size="sm">
        <EmptyHeader>
          <EmptyMedia icon={Inbox} />
          <EmptyTitle>Small (sm)</EmptyTitle>
          <EmptyDescription>
            Compact empty state for tight spaces.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>

      <Empty layout="card" size="base">
        <EmptyHeader>
          <EmptyMedia icon={Inbox} />
          <EmptyTitle>Base (default)</EmptyTitle>
          <EmptyDescription>
            Standard empty state for most use cases.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>

      <Empty layout="card" size="lg">
        <EmptyHeader>
          <EmptyMedia icon={Inbox} />
          <EmptyTitle>Large (lg)</EmptyTitle>
          <EmptyDescription>
            Prominent empty state for important areas.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </Stack>
  ),
};
