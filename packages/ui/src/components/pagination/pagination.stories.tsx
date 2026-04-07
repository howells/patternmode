import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Pagination } from "../pagination";

type PaginationStoryArgs = React.ComponentProps<typeof Pagination>;

const meta: Meta<PaginationStoryArgs> = {
  title: "Pagination",
  component: Pagination,
  argTypes: {
    page: {
      control: { type: "number", min: 1 },
      description: "Current page (1-indexed)",
    },
    totalPages: {
      control: { type: "number", min: 1 },
      description: "Total number of pages",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "base"],
      description: "Button size",
    },
    disabled: {
      control: "boolean",
      description: "Disable all controls",
    },
    className: { table: { disable: true } },
    onPageChange: { table: { disable: true } },
  },
  args: {
    page: 1,
    totalPages: 13,
    size: "sm",
    disabled: false,
  },
  parameters: {
    builder: {
      category: "navigation",
      icon: "arrow-right",
    },
    docs: {
      description: {
        component:
          "Standalone pagination with page numbers, ellipsis, and previous/next navigation. Works with any data source.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    page: 1,
    totalPages: 13,
    size: "sm",
    disabled: false,
    onPageChange: () => {},
  } satisfies PaginationStoryArgs,
};

type PageScenario = "start" | "middle" | "end" | "few-pages" | "single";
type SizeOption = "xs" | "sm" | "base";

const SCENARIO_COLS: { key: PageScenario; label: string }[] = [
  { key: "start", label: "Start (1/13)" },
  { key: "middle", label: "Middle (7/13)" },
  { key: "end", label: "End (13/13)" },
  { key: "few-pages", label: "Few (2/5)" },
  { key: "single", label: "Single (1/1)" },
];

const SIZE_ROWS: { key: SizeOption; label: string }[] = [
  { key: "xs", label: "xs" },
  { key: "sm", label: "sm" },
  { key: "base", label: "base" },
];

export const VariantMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "All sizes across different page positions showing ellipsis behavior, boundary states, and disabled navigation.",
      },
    },
  },
  render: () => {
    const scenarioProps: Record<
      PageScenario,
      { page: number; totalPages: number }
    > = {
      start: { page: 1, totalPages: 13 },
      middle: { page: 7, totalPages: 13 },
      end: { page: 13, totalPages: 13 },
      "few-pages": { page: 2, totalPages: 5 },
      single: { page: 1, totalPages: 1 },
    };

    return (
      <VariantGrid<SizeOption, PageScenario>
        columns={SCENARIO_COLS}
        renderCell={(size, scenario) => {
          const props = scenarioProps[scenario];
          return (
            <Pagination
              onPageChange={() => {
                // no-op
              }}
              page={props.page}
              size={size}
              totalPages={props.totalPages}
            />
          );
        }}
        rowLabels="Size"
        rows={SIZE_ROWS}
      />
    );
  },
};
