import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../components/button";
import {
  Sidepanel,
  SidepanelBody,
  SidepanelClose,
  SidepanelContent,
  SidepanelDescription,
  SidepanelFooter,
  SidepanelHeader,
  SidepanelTitle,
  SidepanelTrigger,
} from "../sidepanel";

type SidepanelStoryArgs = React.ComponentProps<typeof Sidepanel> & {
  triggerLabel?: string;
  title?: string;
  description?: string;
  bodyContent?: string;
};

const meta: Meta<SidepanelStoryArgs> = {
  title: "Sidepanel",
  component: Sidepanel,
  argTypes: {
    // Content
    triggerLabel: {
      control: "text",
      description: "Text for the trigger button",
    },
    title: {
      control: "text",
      description: "Sidepanel title",
    },
    description: {
      control: "text",
      description: "Sidepanel description",
    },
    bodyContent: {
      control: "text",
      description: "Main body content",
    },

    // Behavior
    modal: {
      control: "boolean",
      description: "Whether background is blocked when open",
    },

    // Advanced (hidden)
    open: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    defaultOpen: { table: { disable: true } },
  },
  args: {
    triggerLabel: "Open Sidepanel",
    title: "Sidepanel Title",
    description: "This is a description of the sidepanel content.",
    bodyContent: "Sidepanel content goes here.",
    modal: true,
  },
  parameters: {
    layout: "centered",
    builder: {
      category: "container",
      icon: "panel-right",
    },
    docs: {
      description: {
        component:
          "A slide-out panel from the side of the screen. Supports modal and non-modal modes, nested panels, and controlled state.",
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
    <Sidepanel modal={args.modal}>
      <SidepanelTrigger asChild>
        <Button>{args.triggerLabel}</Button>
      </SidepanelTrigger>
      <SidepanelContent>
        <SidepanelBody>
          <SidepanelHeader>
            <SidepanelTitle>{args.title}</SidepanelTitle>
            <SidepanelDescription>{args.description}</SidepanelDescription>
          </SidepanelHeader>
          <div className="flex-1 overflow-y-auto p-6">
            <p>{args.bodyContent}</p>
          </div>
          <SidepanelFooter>
            <SidepanelClose asChild>
              <Button variant="secondary">Cancel</Button>
            </SidepanelClose>
            <Button>Save</Button>
          </SidepanelFooter>
        </SidepanelBody>
      </SidepanelContent>
    </Sidepanel>
  ),
};

/**
 * Nested sidepanels.
 */
export const Nested: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Sidepanels can be nested to show hierarchical content. The outer panel shifts when the inner panel opens.",
      },
    },
  },
  render: () => (
    <Sidepanel>
      <SidepanelTrigger asChild>
        <Button>Open Outer</Button>
      </SidepanelTrigger>
      <SidepanelContent>
        <SidepanelBody>
          <SidepanelHeader>
            <SidepanelTitle>Outer Panel</SidepanelTitle>
            <SidepanelDescription>
              Outer panel with nested content.
            </SidepanelDescription>
          </SidepanelHeader>
          <div className="flex-1 p-6">
            <Sidepanel>
              <SidepanelTrigger asChild>
                <Button>Open Nested</Button>
              </SidepanelTrigger>
              <SidepanelContent>
                <SidepanelBody>
                  <SidepanelHeader>
                    <SidepanelTitle>Nested Panel</SidepanelTitle>
                    <SidepanelDescription>
                      This is a nested sidepanel.
                    </SidepanelDescription>
                  </SidepanelHeader>
                  <div className="flex-1 p-6">
                    <p>This is a nested sidepanel.</p>
                  </div>
                </SidepanelBody>
              </SidepanelContent>
            </Sidepanel>
          </div>
        </SidepanelBody>
      </SidepanelContent>
    </Sidepanel>
  ),
};
