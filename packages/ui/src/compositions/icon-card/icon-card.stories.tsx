import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type { LucideIcon } from "lucide-react";
import { Building2, Home, Store, Warehouse } from "lucide-react";
import {
  ICON_OPTIONS,
  iconControlArgType,
} from "../../stories/controls/icon-control";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { IconCard } from "./icon-card";

type IconCardStoryArgs = React.ComponentProps<typeof IconCard>;

const meta: Meta<IconCardStoryArgs> = {
  title: "IconCard",
  component: IconCard,
  argTypes: {
    icon: {
      ...iconControlArgType,
      description: "Lucide icon component to display",
    },
    label: {
      control: "text",
      description: "Text label below the icon",
    },
    selected: {
      control: "boolean",
      description: "Whether the card is in selected state",
    },
    disabled: {
      control: "boolean",
      description: "Whether the card is disabled",
    },
  },
  args: {
    icon: ICON_OPTIONS.Home,
    label: "Residential",
    selected: false,
    disabled: false,
  },
  parameters: {
    builder: {
      category: "interactive",
      icon: "square",
    },
    docs: {
      description: {
        component:
          "A selectable card with an icon and label, typically used for option selection like property type or category choices.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base story with all controllable props.
 * Toggle selected state to see the visual change.
 */
export const Base: Story = {
  args: {
    icon: ICON_OPTIONS.Home,
    label: "Residential",
    selected: false,
  },
};

type SelectionState = "default" | "selected" | "disabled";

const STATE_COLUMNS: { key: SelectionState; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "selected", label: "Selected" },
  { key: "disabled", label: "Disabled" },
];

const OPTION_ROWS: { key: string; label: string }[] = [
  { key: "residential", label: "Residential" },
  { key: "commercial", label: "Commercial" },
  { key: "retail", label: "Retail" },
  { key: "industrial", label: "Industrial" },
];

/**
 * State matrix showing different options in various states.
 */
export const StateMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Matrix showing icon cards in default, selected, and disabled states.",
      },
    },
  },
  render: () => {
    const icons: Record<string, LucideIcon> = {
      residential: Home,
      commercial: Building2,
      retail: Store,
      industrial: Warehouse,
    };

    const labels: Record<string, string> = {
      residential: "Residential",
      commercial: "Commercial",
      retail: "Retail",
      industrial: "Industrial",
    };

    const renderCell = (option: string, state: SelectionState) => {
      const icon = icons[option];
      if (!icon) {
        return null;
      }
      return (
        <div className="w-24">
          <IconCard
            disabled={state === "disabled"}
            icon={icon}
            label={labels[option] ?? ""}
            selected={state === "selected"}
          />
        </div>
      );
    };

    return (
      <VariantGrid
        columns={STATE_COLUMNS}
        renderCell={renderCell}
        rowLabels="Option"
        rows={OPTION_ROWS}
      />
    );
  },
};

/**
 * Selection group example showing typical usage.
 */
export const SelectionGroup: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "A typical selection group where one option is selected.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <IconCard icon={Home} label="Residential" selected={true} />
      <IconCard icon={Building2} label="Commercial" selected={false} />
      <IconCard icon={Store} label="Retail" selected={false} />
      <IconCard icon={Warehouse} label="Industrial" selected={false} />
    </div>
  ),
};
