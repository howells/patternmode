import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { VariantGrid } from "../../stories/utils/variant-grid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb-root";

type BreadcrumbMode = "simple" | "collapsed" | "long-path";
type BreadcrumbTone = "standard" | "verbose";

interface BreadcrumbStoryArgs {
  currentPage: string;
  mode: BreadcrumbMode;
  rootLabel: string;
  sectionLabel: string;
}

const meta: Meta<BreadcrumbStoryArgs> = {
  title: "Breadcrumb",
  component: BreadcrumbDemo,
  argTypes: {
    mode: {
      control: "select",
      options: ["simple", "collapsed", "long-path"] satisfies BreadcrumbMode[],
      description: "Path composition pattern",
    },
    rootLabel: {
      control: "text",
      description: "Root breadcrumb label",
    },
    sectionLabel: {
      control: "text",
      description: "Intermediate breadcrumb label",
    },
    currentPage: {
      control: "text",
      description: "Current page label",
    },
  },
  args: {
    mode: "simple",
    rootLabel: "PatternModels",
    sectionLabel: "Tiles",
    currentPage: "Terracotta Tiles",
  },
  parameters: {
    builder: {
      category: "navigation",
      icon: "chevron-right",
    },
    docs: {
      description: {
        component:
          "Shows current location in a hierarchy and enables navigation across simple, collapsed, and deeper breadcrumb paths.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const MATRIX_COLUMNS: { key: BreadcrumbMode; label: string }[] = [
  { key: "simple", label: "Simple" },
  { key: "collapsed", label: "Collapsed" },
  { key: "long-path", label: "Long Path" },
];

const MATRIX_ROWS: { key: BreadcrumbTone; label: string }[] = [
  { key: "standard", label: "Standard Labels" },
  { key: "verbose", label: "Verbose Labels" },
];

function getCurrentPageLabel(tone: BreadcrumbTone): string {
  return tone === "verbose"
    ? "Carrara White Marble Collection"
    : "Carrara White";
}

function getRootLabel(tone: BreadcrumbTone): string {
  return tone === "verbose" ? "Architectural PatternModels" : "PatternModels";
}

function getSectionLabel(mode: BreadcrumbMode, tone: BreadcrumbTone): string {
  if (mode === "long-path") {
    return tone === "verbose" ? "Italian Marble Finishes" : "Italian Marble";
  }

  return tone === "verbose" ? "Premium Tile Collections" : "Tiles";
}

function BreadcrumbDemo({
  currentPage,
  mode,
  rootLabel,
  sectionLabel,
}: BreadcrumbStoryArgs) {
  if (mode === "collapsed") {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{rootLabel}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Stone</DropdownMenuItem>
                <DropdownMenuItem>Concrete</DropdownMenuItem>
                <DropdownMenuItem>Wood</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/tiles">{sectionLabel}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{currentPage}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  if (mode === "long-path") {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{rootLabel}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/stone">Stone</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/stone/marble">Marble</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/stone/marble/italian">
              {sectionLabel}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{currentPage}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">{rootLabel}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/tiles">{sectionLabel}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export const Base: Story = {
  args: {
    mode: "simple",
    rootLabel: "PatternModels",
    sectionLabel: "Tiles",
    currentPage: "Terracotta Tiles",
  },
};

export const VariantMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Key breadcrumb path compositions across concise and verbose label sets.",
      },
    },
  },
  render: () => (
    <VariantGrid<BreadcrumbTone, BreadcrumbMode>
      columns={MATRIX_COLUMNS}
      renderCell={(tone, mode) => {
        return (
          <BreadcrumbDemo
            currentPage={getCurrentPageLabel(tone)}
            mode={mode}
            rootLabel={getRootLabel(tone)}
            sectionLabel={getSectionLabel(mode, tone)}
          />
        );
      }}
      rowLabels="Label Tone"
      rows={MATRIX_ROWS}
    />
  ),
};

export const WithDropdown: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Collapsed breadcrumb path using a dropdown to reveal hidden levels.",
      },
    },
  },
  render: () => (
    <BreadcrumbDemo
      currentPage="Porcelain Tiles"
      mode="collapsed"
      rootLabel="PatternModels"
      sectionLabel="Tiles"
    />
  ),
};

export const LongPath: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Long breadcrumb path showing how labels wrap and remain readable in denser hierarchies.",
      },
    },
  },
  render: () => (
    <BreadcrumbDemo
      currentPage="Carrara White Marble"
      mode="long-path"
      rootLabel="PatternModels"
      sectionLabel="Italian Marble"
    />
  ),
};
