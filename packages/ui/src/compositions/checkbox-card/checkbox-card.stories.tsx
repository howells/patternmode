import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import {
  Briefcase,
  Check,
  ChevronRight,
  CreditCard,
  Eye,
  Home,
  Leaf,
  MessageSquare,
  Rocket,
  Settings,
  Shield,
  Sparkles,
  TrendingDown,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Icon } from "../../components/icon";
import type { ComponentSize } from "../../lib/size";
import { sizeArgType } from "../../lib/storybook";
import { iconControlArgType } from "../../stories/controls/icon-control";
import { VariantGrid } from "../../stories/utils/variant-grid";
import {
  CheckboxCardContent,
  CheckboxCardDescription,
  CheckboxCardGroup,
  CheckboxCardIcon,
  CheckboxCardItem,
  CheckboxCardTitle,
} from "../checkbox-card";

const meta = {
  title: "CheckboxCard",
  component: CheckboxCardGroup,
  argTypes: {
    showIndicator: {
      control: "boolean",
      description: "Show checkbox indicator",
    },
    indicatorSide: {
      control: "radio",
      options: ["start", "end"],
      description: "Position of the indicator/icon",
    },
    icon: iconControlArgType,
    size: sizeArgType,
  },
  args: {
    showIndicator: true,
    indicatorSide: "start",
    size: "base",
  },
  parameters: {
    builder: {
      category: "form",
      icon: "square-check-big",
    },

    docs: {
      description: {
        component:
          "Multi-select options presented as interactive cards with icons and optional checkbox indicators.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;
type CheckboxCardMatrixVariant =
  | "indicator-start"
  | "indicator-end"
  | "without-indicator"
  | "with-icon";

const MATRIX_ROWS: { key: ComponentSize; label: string }[] = [
  { key: "sm", label: "sm" },
  { key: "base", label: "base" },
  { key: "lg", label: "lg" },
];

const MATRIX_COLUMNS: {
  key: CheckboxCardMatrixVariant;
  label: string;
}[] = [
  { key: "indicator-start", label: "Indicator Start" },
  { key: "indicator-end", label: "Indicator End" },
  { key: "without-indicator", label: "No Indicator" },
  { key: "with-icon", label: "With Icon" },
];

// Interactive story with controls - single card
export const Base: Story = {
  render: (args) => (
    <CheckboxCardGroup {...args} className="max-w-md">
      <CheckboxCardItem defaultChecked>
        <CheckboxCardContent>
          <CheckboxCardTitle>Option Title</CheckboxCardTitle>
          <CheckboxCardDescription>
            A brief description of this option and what it does.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
    </CheckboxCardGroup>
  ),
};

export const VariantMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Key checkbox-card combinations across sizes, indicator placement, and icon usage.",
      },
    },
  },
  render: () => (
    <VariantGrid<ComponentSize, CheckboxCardMatrixVariant>
      columns={MATRIX_COLUMNS}
      renderCell={(size, variant) => {
        const showIndicator = variant !== "without-indicator";
        const indicatorSide = variant === "indicator-end" ? "end" : "start";
        const withIcon = variant === "with-icon";

        return (
          <CheckboxCardGroup
            className="w-[220px]"
            indicatorSide={indicatorSide}
            showIndicator={showIndicator}
            size={size}
          >
            <CheckboxCardItem defaultChecked>
              {withIcon && (
                <CheckboxCardIcon>
                  <Icon icon={Sparkles} size="lg" />
                </CheckboxCardIcon>
              )}
              <CheckboxCardContent>
                <CheckboxCardTitle>Selection</CheckboxCardTitle>
                <CheckboxCardDescription>
                  Compare the checkbox-card shell across its primary variants.
                </CheckboxCardDescription>
              </CheckboxCardContent>
            </CheckboxCardItem>
          </CheckboxCardGroup>
        );
      }}
      rowLabels="Size"
      rows={MATRIX_ROWS}
    />
  ),
};

function WithoutIndicatorDemo() {
  const [selected, setSelected] = useState<string[]>(["option-1"]);

  return (
    <CheckboxCardGroup className="max-w-md" showIndicator={false}>
      <CheckboxCardItem
        checked={selected.includes("option-1")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "option-1"]
              : prev.filter((v) => v !== "option-1"),
          );
        }}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>Option One</CheckboxCardTitle>
          <CheckboxCardDescription>
            Pure card selection without visible checkbox indicator.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("option-2")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "option-2"]
              : prev.filter((v) => v !== "option-2"),
          );
        }}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>Option Two</CheckboxCardTitle>
          <CheckboxCardDescription>
            Selection state is shown through border and background changes.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("option-3")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "option-3"]
              : prev.filter((v) => v !== "option-3"),
          );
        }}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>Option Three</CheckboxCardTitle>
          <CheckboxCardDescription>
            Hover and focus states remain fully accessible.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
    </CheckboxCardGroup>
  );
}

// Docs-only stories
export const WithoutIndicator: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Set showIndicator to false to hide the checkbox indicator. Selection state is still visible through border and background changes.",
      },
    },
  },
  render: () => <WithoutIndicatorDemo />,
};

function WithIconsDemo() {
  const [selected, setSelected] = useState<string[]>(["starter", "pro"]);

  return (
    <CheckboxCardGroup className="max-w-md">
      <CheckboxCardItem
        checked={selected.includes("starter")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "starter"]
              : prev.filter((v) => v !== "starter"),
          );
        }}
      >
        <CheckboxCardIcon>
          <Icon icon={Rocket} size="lg" />
        </CheckboxCardIcon>
        <CheckboxCardContent>
          <CheckboxCardTitle>Starter Features</CheckboxCardTitle>
          <CheckboxCardDescription>
            Perfect for individuals and small teams getting started.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("pro")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked ? [...prev, "pro"] : prev.filter((v) => v !== "pro"),
          );
        }}
      >
        <CheckboxCardIcon>
          <Icon icon={Zap} size="lg" />
        </CheckboxCardIcon>
        <CheckboxCardContent>
          <CheckboxCardTitle>Pro Features</CheckboxCardTitle>
          <CheckboxCardDescription>
            Advanced features for growing businesses and professionals.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("enterprise")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "enterprise"]
              : prev.filter((v) => v !== "enterprise"),
          );
        }}
      >
        <CheckboxCardIcon>
          <Icon icon={Sparkles} size="lg" />
        </CheckboxCardIcon>
        <CheckboxCardContent>
          <CheckboxCardTitle>Enterprise Features</CheckboxCardTitle>
          <CheckboxCardDescription>
            Custom solutions with dedicated support and SLAs.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
    </CheckboxCardGroup>
  );
}

export const WithIcons: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Checkbox cards can include icons to visually represent each option, improving scannability and recognition.",
      },
    },
  },
  render: () => <WithIconsDemo />,
};

function WithIconsNoIndicatorDemo() {
  const [selected, setSelected] = useState<string[]>(["credit-card"]);

  return (
    <CheckboxCardGroup className="max-w-md" showIndicator={false}>
      <CheckboxCardItem
        checked={selected.includes("credit-card")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "credit-card"]
              : prev.filter((v) => v !== "credit-card"),
          );
        }}
      >
        <CheckboxCardIcon>
          <Icon icon={CreditCard} size="lg" />
        </CheckboxCardIcon>
        <CheckboxCardContent>
          <CheckboxCardTitle>Credit Card</CheckboxCardTitle>
          <CheckboxCardDescription>
            Pay with your credit or debit card.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("bank")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked ? [...prev, "bank"] : prev.filter((v) => v !== "bank"),
          );
        }}
      >
        <CheckboxCardIcon>
          <Icon icon={Home} size="lg" />
        </CheckboxCardIcon>
        <CheckboxCardContent>
          <CheckboxCardTitle>Bank Transfer</CheckboxCardTitle>
          <CheckboxCardDescription>
            Direct bank transfer via ACH or wire.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
    </CheckboxCardGroup>
  );
}

export const WithIconsNoIndicator: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Combine icons with hidden indicators for a cleaner card-based selection interface.",
      },
    },
  },
  render: () => <WithIconsNoIndicatorDemo />,
};

function GridLayoutTwoColumnsDemo() {
  const [selected, setSelected] = useState<string[]>(["settings", "team"]);

  return (
    <CheckboxCardGroup className="max-w-2xl grid-cols-2">
      <CheckboxCardItem
        checked={selected.includes("settings")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "settings"]
              : prev.filter((v) => v !== "settings"),
          );
        }}
      >
        <CheckboxCardIcon>
          <Icon icon={Settings} size="lg" />
        </CheckboxCardIcon>
        <CheckboxCardContent>
          <CheckboxCardTitle>Settings</CheckboxCardTitle>
          <CheckboxCardDescription>
            Manage your account preferences.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("security")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "security"]
              : prev.filter((v) => v !== "security"),
          );
        }}
      >
        <CheckboxCardIcon>
          <Icon icon={Shield} size="lg" />
        </CheckboxCardIcon>
        <CheckboxCardContent>
          <CheckboxCardTitle>Security</CheckboxCardTitle>
          <CheckboxCardDescription>
            Configure security settings.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("team")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked ? [...prev, "team"] : prev.filter((v) => v !== "team"),
          );
        }}
      >
        <CheckboxCardIcon>
          <Icon icon={Users} size="lg" />
        </CheckboxCardIcon>
        <CheckboxCardContent>
          <CheckboxCardTitle>Team</CheckboxCardTitle>
          <CheckboxCardDescription>
            Manage team members.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("support")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "support"]
              : prev.filter((v) => v !== "support"),
          );
        }}
      >
        <CheckboxCardIcon>
          <Icon icon={MessageSquare} size="lg" />
        </CheckboxCardIcon>
        <CheckboxCardContent>
          <CheckboxCardTitle>Support</CheckboxCardTitle>
          <CheckboxCardDescription>
            Get help and assistance.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
    </CheckboxCardGroup>
  );
}

export const GridLayoutTwoColumns: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Use grid layout classes to arrange checkbox cards in multiple columns for compact layouts.",
      },
    },
  },
  render: () => <GridLayoutTwoColumnsDemo />,
};

function GridLayoutThreeColumnsDemo() {
  const [selected, setSelected] = useState<string[]>(["option-2"]);

  return (
    <CheckboxCardGroup className="max-w-4xl grid-cols-3" showIndicator={false}>
      <CheckboxCardItem
        checked={selected.includes("option-1")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "option-1"]
              : prev.filter((v) => v !== "option-1"),
          );
        }}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>Basic</CheckboxCardTitle>
          <CheckboxCardDescription>
            Essential features only.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("option-2")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "option-2"]
              : prev.filter((v) => v !== "option-2"),
          );
        }}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>Standard</CheckboxCardTitle>
          <CheckboxCardDescription>
            Most popular choice.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("option-3")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "option-3"]
              : prev.filter((v) => v !== "option-3"),
          );
        }}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>Premium</CheckboxCardTitle>
          <CheckboxCardDescription>
            All features included.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
    </CheckboxCardGroup>
  );
}

export const GridLayoutThreeColumns: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Three-column grid layouts work well for simpler options with minimal content.",
      },
    },
  },
  render: () => <GridLayoutThreeColumnsDemo />,
};

function CompactStackDemo() {
  const [selected, setSelected] = useState<string[]>(["email", "push"]);

  return (
    <CheckboxCardGroup className="max-w-sm">
      <CheckboxCardItem
        checked={selected.includes("email")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked ? [...prev, "email"] : prev.filter((v) => v !== "email"),
          );
        }}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>Email Notifications</CheckboxCardTitle>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("push")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked ? [...prev, "push"] : prev.filter((v) => v !== "push"),
          );
        }}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>Push Notifications</CheckboxCardTitle>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("sms")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked ? [...prev, "sms"] : prev.filter((v) => v !== "sms"),
          );
        }}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>SMS Notifications</CheckboxCardTitle>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("none")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked ? [...prev, "none"] : prev.filter((v) => v !== "none"),
          );
        }}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>No Notifications</CheckboxCardTitle>
        </CheckboxCardContent>
      </CheckboxCardItem>
    </CheckboxCardGroup>
  );
}

export const CompactStack: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Compact stacked layout with title-only cards for simple selection lists.",
      },
    },
  },
  render: () => <CompactStackDemo />,
};

function WithDisabledStateDemo() {
  const [selected, setSelected] = useState<string[]>(["option-1"]);

  return (
    <CheckboxCardGroup className="max-w-md">
      <CheckboxCardItem
        checked={selected.includes("option-1")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "option-1"]
              : prev.filter((v) => v !== "option-1"),
          );
        }}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>Available Option</CheckboxCardTitle>
          <CheckboxCardDescription>
            This option is available for selection.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem disabled>
        <CheckboxCardContent>
          <CheckboxCardTitle>Disabled Option</CheckboxCardTitle>
          <CheckboxCardDescription>
            This option is currently unavailable.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("option-3")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "option-3"]
              : prev.filter((v) => v !== "option-3"),
          );
        }}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>Another Available Option</CheckboxCardTitle>
          <CheckboxCardDescription>
            This option is also available for selection.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
    </CheckboxCardGroup>
  );
}

export const WithDisabledState: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Checkbox cards can be disabled to prevent interaction while still displaying the option.",
      },
    },
  },
  render: () => <WithDisabledStateDemo />,
};

function ComplexContentDemo() {
  const [selected, setSelected] = useState<string[]>(["team"]);

  return (
    <CheckboxCardGroup className="max-w-xl">
      <CheckboxCardItem
        checked={selected.includes("personal")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "personal"]
              : prev.filter((v) => v !== "personal"),
          );
        }}
      >
        <CheckboxCardIcon>
          <Icon icon={Home} size="lg" />
        </CheckboxCardIcon>
        <CheckboxCardContent>
          <CheckboxCardTitle>Personal Workspace</CheckboxCardTitle>
          <CheckboxCardDescription>
            For individual use only. Includes 5 GB storage and basic features.
          </CheckboxCardDescription>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-medium text-2xl">$0</span>
            <span className="text-muted-foreground text-sm">/month</span>
          </div>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("team")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked ? [...prev, "team"] : prev.filter((v) => v !== "team"),
          );
        }}
      >
        <CheckboxCardIcon>
          <Icon icon={Users} size="lg" />
        </CheckboxCardIcon>
        <CheckboxCardContent>
          <CheckboxCardTitle>Team Workspace</CheckboxCardTitle>
          <CheckboxCardDescription>
            Collaborate with up to 10 team members. Includes 100 GB storage and
            advanced features.
          </CheckboxCardDescription>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-medium text-2xl">$29</span>
            <span className="text-muted-foreground text-sm">/month</span>
          </div>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("business")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "business"]
              : prev.filter((v) => v !== "business"),
          );
        }}
      >
        <CheckboxCardIcon>
          <Icon icon={Briefcase} size="lg" />
        </CheckboxCardIcon>
        <CheckboxCardContent>
          <CheckboxCardTitle>Business Workspace</CheckboxCardTitle>
          <CheckboxCardDescription>
            Unlimited team members with 1 TB storage, priority support, and
            enterprise features.
          </CheckboxCardDescription>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-medium text-2xl">$99</span>
            <span className="text-muted-foreground text-sm">/month</span>
          </div>
        </CheckboxCardContent>
      </CheckboxCardItem>
    </CheckboxCardGroup>
  );
}

export const ComplexContent: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Checkbox cards can contain complex content like pricing information, feature lists, or other rich content.",
      },
    },
  },
  render: () => <ComplexContentDemo />,
};

function IndicatorOnEndDemo() {
  const [selected, setSelected] = useState<string[]>(["option-1"]);

  return (
    <CheckboxCardGroup className="max-w-md" indicatorSide="end">
      <CheckboxCardItem
        checked={selected.includes("option-1")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "option-1"]
              : prev.filter((v) => v !== "option-1"),
          );
        }}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>Option One</CheckboxCardTitle>
          <CheckboxCardDescription>
            Indicator appears on the right side of the card.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("option-2")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "option-2"]
              : prev.filter((v) => v !== "option-2"),
          );
        }}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>Option Two</CheckboxCardTitle>
          <CheckboxCardDescription>
            Content is positioned at the start.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("option-3")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "option-3"]
              : prev.filter((v) => v !== "option-3"),
          );
        }}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>Option Three</CheckboxCardTitle>
          <CheckboxCardDescription>
            This layout works well for settings-style interfaces.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
    </CheckboxCardGroup>
  );
}

export const IndicatorOnEnd: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Checkbox cards with the indicator positioned on the right side.",
      },
    },
  },
  render: () => <IndicatorOnEndDemo />,
};

function WithCustomIconDemo() {
  const [selected, setSelected] = useState<string[]>(["option-1"]);

  return (
    <CheckboxCardGroup className="max-w-md" icon={Check}>
      <CheckboxCardItem
        checked={selected.includes("option-1")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "option-1"]
              : prev.filter((v) => v !== "option-1"),
          );
        }}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>Option One</CheckboxCardTitle>
          <CheckboxCardDescription>
            Uses a check icon instead of a checkbox indicator.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("option-2")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "option-2"]
              : prev.filter((v) => v !== "option-2"),
          );
        }}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>Option Two</CheckboxCardTitle>
          <CheckboxCardDescription>
            Icon color changes when selected.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("option-3")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "option-3"]
              : prev.filter((v) => v !== "option-3"),
          );
        }}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>Option Three</CheckboxCardTitle>
          <CheckboxCardDescription>
            Provides a cleaner alternative to checkbox indicators.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
    </CheckboxCardGroup>
  );
}

export const WithCustomIcon: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Checkbox cards with a custom icon instead of the checkbox indicator. The icon changes color when selected.",
      },
    },
  },
  render: () => <WithCustomIconDemo />,
};

function WithIconOnEndDemo() {
  const [selected, setSelected] = useState<string[]>(["option-2"]);

  return (
    <CheckboxCardGroup className="max-w-md" icon={Check} indicatorSide="end">
      <CheckboxCardItem
        checked={selected.includes("option-1")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "option-1"]
              : prev.filter((v) => v !== "option-1"),
          );
        }}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>Option One</CheckboxCardTitle>
          <CheckboxCardDescription>
            Icon positioned on the end of each card.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("option-2")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "option-2"]
              : prev.filter((v) => v !== "option-2"),
          );
        }}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>Option Two</CheckboxCardTitle>
          <CheckboxCardDescription>
            Great for selection confirmations.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("option-3")}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "option-3"]
              : prev.filter((v) => v !== "option-3"),
          );
        }}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>Option Three</CheckboxCardTitle>
          <CheckboxCardDescription>
            Combines icon and side positioning.
          </CheckboxCardDescription>
        </CheckboxCardContent>
      </CheckboxCardItem>
    </CheckboxCardGroup>
  );
}

export const WithIconOnEnd: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Checkbox cards with a custom icon positioned on the right side.",
      },
    },
  },
  render: () => <WithIconOnEndDemo />,
};

function WithPerItemIconsDemo() {
  const [selected, setSelected] = useState<string[]>(["looks-similar"]);

  return (
    <CheckboxCardGroup className="max-w-md">
      <CheckboxCardItem
        checked={selected.includes("looks-similar")}
        icon={Eye}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "looks-similar"]
              : prev.filter((v) => v !== "looks-similar"),
          );
        }}
        suffixIcon={ChevronRight}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>Looks similar</CheckboxCardTitle>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("sustainable")}
        icon={Leaf}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "sustainable"]
              : prev.filter((v) => v !== "sustainable"),
          );
        }}
        suffixIcon={ChevronRight}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>Sustainable</CheckboxCardTitle>
        </CheckboxCardContent>
      </CheckboxCardItem>
      <CheckboxCardItem
        checked={selected.includes("less-expensive")}
        icon={TrendingDown}
        onCheckedChange={(checked) => {
          setSelected((prev) =>
            checked
              ? [...prev, "less-expensive"]
              : prev.filter((v) => v !== "less-expensive"),
          );
        }}
        suffixIcon={ChevronRight}
      >
        <CheckboxCardContent>
          <CheckboxCardTitle>Less expensive</CheckboxCardTitle>
        </CheckboxCardContent>
      </CheckboxCardItem>
    </CheckboxCardGroup>
  );
}

export const WithPerItemIcons: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Each checkbox card item can have its own icon and optional suffix icon. Icons change color when selected.",
      },
    },
  },
  render: () => <WithPerItemIconsDemo />,
};
