import type { IconComponent } from "@patternmode/icons";
import {
  Monitor,
  SlidersHorizontal,
  LayoutGrid,
  Layers,
  Palette,
  MousePointerClick,
  Film,
  Type as TypeIcon,
  Compass,
  PieChart,
  AlertCircle,
  FormInput,
  Database,
  Keyboard,
  Wrench,
} from "lucide-react";

/**
 * Component categories for organizing the UI library.
 * Each category provides metadata for display and grouping in docs and tooling.
 */
type CategoryDef = {
  key:
    | "display"
    | "controls"
    | "layout"
    | "overlay"
    | "visual"
    | "actions"
    | "media"
    | "typography"
    | "navigation"
    | "charts"
    | "feedback"
    | "forms"
    | "data"
    | "inputs"
    | "utility";
  label: string;
  description: string;
  icon: IconComponent;
};

export const COMPONENT_CATEGORIES = [
  {
    key: "display",
    label: "Display",
    description:
      "Non-interactive primitives for presenting information and content.",
    icon: Monitor,
  },
  {
    key: "controls",
    label: "Controls",
    description:
      "Interactive elements that trigger actions or change state.",
    icon: SlidersHorizontal,
  },
  {
    key: "layout",
    label: "Layout",
    description:
      "Structural primitives for spacing, grids, and composition.",
    icon: LayoutGrid,
  },
  {
    key: "overlay",
    label: "Overlay",
    description:
      "Floating layers like dialogs, popovers, sheets, and tooltips.",
    icon: Layers,
  },
  {
    key: "visual",
    label: "Visual",
    description:
      "Decorative elements such as badges, tags, and avatars.",
    icon: Palette,
  },
  {
    key: "actions",
    label: "Actions",
    description:
      "Action helpers and affordances for user interactions.",
    icon: MousePointerClick,
  },
  {
    key: "media",
    label: "Media",
    description:
      "Components for images, video, carousels, and media containers.",
    icon: Film,
  },
  {
    key: "typography",
    label: "Typography",
    description: "Text primitives and typographic elements.",
    icon: TypeIcon,
  },
  {
    key: "navigation",
    label: "Navigation",
    description:
      "Menus, navigation bars, breadcrumbs, and related patterns.",
    icon: Compass,
  },
  {
    key: "charts",
    label: "Charts",
    description:
      "Data visualization primitives and chart components.",
    icon: PieChart,
  },
  {
    key: "feedback",
    label: "Feedback",
    description:
      "System and user feedback such as alerts, toasts, and loaders.",
    icon: AlertCircle,
  },
  {
    key: "forms",
    label: "Forms",
    description:
      "Form composition, fields, and validation structures.",
    icon: FormInput,
  },
  {
    key: "data",
    label: "Data",
    description:
      "Data presentation such as tables, lists, and metrics.",
    icon: Database,
  },
  {
    key: "inputs",
    label: "Inputs",
    description:
      "Input fields and entry components for capturing data.",
    icon: Keyboard,
  },
  {
    key: "utility",
    label: "Utility",
    description:
      "Utility primitives and helpers used across components.",
    icon: Wrench,
  },
] as const satisfies readonly CategoryDef[];

/**
 * String union of valid category keys (e.g., "display", "controls").
 */
export type ComponentCategory = (typeof COMPONENT_CATEGORIES)[number]["key"];

