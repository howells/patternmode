import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { Download, Heart, Search, Settings, Star, User } from "lucide-react";
import { Icon } from "./icon";

// Example components for the config
function DefaultExample() {
  return <Icon icon={Search} />;
}

function SizesExample() {
  return (
    <div className="flex items-center gap-4">
      <Icon icon={Heart} size="xs" />
      <Icon icon={Heart} size="sm" />
      <Icon icon={Heart} size="base" />
      <Icon icon={Heart} size="lg" />
      <Icon icon={Heart} size="xl" />
      <Icon icon={Heart} size="2xl" />
      <Icon icon={Heart} size="3xl" />
    </div>
  );
}

function WithTextExample() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon icon={User} />
        <span>Profile</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon icon={Settings} />
        <span>Settings</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon icon={Download} />
        <span>Download</span>
      </div>
    </div>
  );
}

function CustomStrokeExample() {
  return (
    <div className="flex items-center gap-4">
      <Icon icon={Star} strokeWidth={1} />
      <Icon icon={Star} strokeWidth={1.5} />
      <Icon icon={Star} strokeWidth={2} />
      <Icon icon={Star} strokeWidth={2.5} />
    </div>
  );
}

function LayoutExample() {
  return (
    <div className="space-y-4">
      {/* Flex with gap */}
      <div className="flex items-center gap-2 p-3 border rounded">
        <Icon icon={Search} />
        <span>Search with flex gap</span>
      </div>

      {/* Manual margin */}
      <div className="flex items-center p-3 border rounded">
        <Icon icon={User} className="mr-2" />
        <span>User with margin-right</span>
      </div>

      {/* Different gap sizes */}
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <Icon icon={Star} size="sm" />
          <span className="text-sm">Small gap</span>
        </div>
        <div className="flex items-center gap-3">
          <Icon icon={Heart} />
          <span>Large gap</span>
        </div>
      </div>
    </div>
  );
}

export const componentConfig: ComponentConfig = {
  id: "icon",
  name: "Icon",
  description:
    "Centralized icon component that provides consistent sizing and styling across all UI components. Built for Lucide React icons with automatic sizing based on context.",
  category: "utility" as const,
  icon: "Star",

  installation: {
    npm: "lucide-react",
  },
  importStatement: `import { Icon } from "@/components/ui/icon";`,
  componentId: "IconExample",
  props: [
    {
      name: "icon",
      type: "component",
      required: true,
      description: "The Lucide icon component to render.",
    },
    {
      name: "size",
      type: "select",
      options: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl"],
      defaultValue: "base",
      description:
        "Size of the icon. xs=12px, sm=14px, base=16px, lg=20px, xl=24px, 2xl=32px, 3xl=48px.",
    },
    {
      name: "strokeWidth",
      type: "number",
      defaultValue: "1.5",
      description: "Stroke width for the icon (defaults to global config).",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to apply to the icon.",
    },
  ],
  examples: [
    {
      id: "default",
      title: "Default Icon",
      description: "Basic icon with default size and stroke width.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "sizes",
      title: "Different Sizes",
      description: "Icons in all available sizes from xs (12px) to 3xl (48px).",
      code: jsxToString(<SizesExample />),
    },
    {
      id: "with-text",
      title: "Icons with Text",
      description:
        "Icons paired with text using flex layout and gap for proper spacing.",
      code: jsxToString(<WithTextExample />),
    },
    {
      id: "custom-stroke",
      title: "Custom Stroke Width",
      description: "Icons with different stroke widths for visual variety.",
      code: jsxToString(<CustomStrokeExample />),
    },
    {
      id: "layout",
      title: "Layout Examples",
      description:
        "Different ways to handle spacing and layout with icons - using flex gap, margins, and different gap sizes.",
      code: jsxToString(<LayoutExample />),
    },
  ],
};
