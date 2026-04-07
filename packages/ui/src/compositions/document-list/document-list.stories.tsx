import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import "@patternmode/tailwind-config/shared-styles.css";
import { Download, FileText } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/button";
import { Stack } from "../../components/stack";
import { sizeArgType } from "../../lib/storybook";
import { maxWidthXl } from "../../lib/storybook-decorators";
import {
  DocumentList,
  DocumentListAction,
  DocumentListCheckbox,
  DocumentListContent,
  DocumentListIcon,
  DocumentListItem,
  DocumentListMeta,
  DocumentListSelectAll,
  DocumentListTitle,
} from "../document-list";

type DocumentListStoryArgs = React.ComponentProps<typeof DocumentList>;

const meta: Meta<DocumentListStoryArgs> = {
  title: "DocumentList",
  component: DocumentList,
  decorators: [maxWidthXl],
  argTypes: {
    // Visual
    variant: {
      control: "select",
      options: ["divided", "separated", "grouped"],
      description: "Visual style of the list",
    },
    size: sizeArgType,

    // State
    selectable: {
      control: "boolean",
      description: "Enable selection mode with checkboxes",
    },

    // Advanced (hidden)
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    variant: "separated",
    size: "base",
    selectable: false,
  },
  parameters: {
    builder: {
      category: "container",
      icon: "puzzle",
    },
    layout: "padded",
    docs: {
      description: {
        component:
          "DocumentList is a composable list component for displaying files and documents. Supports icons, titles, metadata, actions, and optional multi-select functionality.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  render: (args) => (
    <DocumentList
      selectable={args.selectable}
      size={args.size}
      variant={args.variant}
    >
      <DocumentListItem value="1">
        <DocumentListCheckbox />
        <DocumentListIcon icon={FileText} />
        <DocumentListContent>
          <DocumentListTitle>Technical Specification Sheet</DocumentListTitle>
        </DocumentListContent>
        <DocumentListMeta>2.4mb</DocumentListMeta>
        <DocumentListAction>
          <Button
            appearance="outline"
            icon={Download}
            size="sm"
            variant="secondary"
          />
        </DocumentListAction>
      </DocumentListItem>
      <DocumentListItem value="2">
        <DocumentListCheckbox />
        <DocumentListIcon icon={FileText} />
        <DocumentListContent>
          <DocumentListTitle>Product Catalog</DocumentListTitle>
        </DocumentListContent>
        <DocumentListMeta>8.7mb</DocumentListMeta>
        <DocumentListAction>
          <Button
            appearance="outline"
            icon={Download}
            size="sm"
            variant="secondary"
          />
        </DocumentListAction>
      </DocumentListItem>
      <DocumentListItem value="3">
        <DocumentListCheckbox />
        <DocumentListIcon icon={FileText} />
        <DocumentListContent>
          <DocumentListTitle>User Manual</DocumentListTitle>
        </DocumentListContent>
        <DocumentListMeta>1.2mb</DocumentListMeta>
        <DocumentListAction>
          <Button
            appearance="outline"
            icon={Download}
            size="sm"
            variant="secondary"
          />
        </DocumentListAction>
      </DocumentListItem>
    </DocumentList>
  ),
};

function WithSelectionDemo() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Stack gap="base">
      <DocumentList
        onValueChange={setSelected}
        selectable
        value={selected}
        variant="separated"
      >
        <DocumentListSelectAll />
        <DocumentListItem value="doc-1">
          <DocumentListCheckbox />
          <DocumentListIcon icon={FileText} />
          <DocumentListContent>
            <DocumentListTitle>Contract Agreement</DocumentListTitle>
          </DocumentListContent>
          <DocumentListMeta>234kb</DocumentListMeta>
          <DocumentListAction>
            <Button
              appearance="outline"
              icon={Download}
              size="sm"
              variant="secondary"
            />
          </DocumentListAction>
        </DocumentListItem>
        <DocumentListItem value="doc-2">
          <DocumentListCheckbox />
          <DocumentListIcon icon={FileText} />
          <DocumentListContent>
            <DocumentListTitle>NDA Template</DocumentListTitle>
          </DocumentListContent>
          <DocumentListMeta>178kb</DocumentListMeta>
          <DocumentListAction>
            <Button
              appearance="outline"
              icon={Download}
              size="sm"
              variant="secondary"
            />
          </DocumentListAction>
        </DocumentListItem>
        <DocumentListItem value="doc-3">
          <DocumentListCheckbox />
          <DocumentListIcon icon={FileText} />
          <DocumentListContent>
            <DocumentListTitle>Onboarding Checklist</DocumentListTitle>
          </DocumentListContent>
          <DocumentListMeta>95kb</DocumentListMeta>
          <DocumentListAction>
            <Button
              appearance="outline"
              icon={Download}
              size="sm"
              variant="secondary"
            />
          </DocumentListAction>
        </DocumentListItem>
      </DocumentList>
      {selected.length > 0 && (
        <Button variant="default">
          Download {selected.length} file{selected.length > 1 ? "s" : ""}
        </Button>
      )}
    </Stack>
  );
}

/**
 * Selection mode with select all and bulk actions.
 */
export const WithSelection: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Enable selection mode with the selectable prop. Checkboxes appear automatically when selectable is true.",
      },
    },
  },
  render: () => <WithSelectionDemo />,
};
