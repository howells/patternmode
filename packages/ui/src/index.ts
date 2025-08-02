// Main export file for @patternmode/ui
// This file exports all components, utilities, and types for external consumption

// Essential CSS styles for Tailwind 4 - consumers should import this
// import "@patternmode/ui/styles/globals.css"

// Data Components
export * from "./components/accordion";

// Form Components
export * from "./components/field-array";
export { FieldArrayExample } from "./components/field-array/preview";

// Export progress utilities (used by multiple chart components)
export * from "./components/progress-utils";

// Component Registry - for documentation and tooling
export * from "./components/registry";
export * from "./components/textarea";
// Overlay Components
export * from "./components/todo/alert-dialog/alert-dialog";

// Export specific components from their main files
// This avoids issues with missing index files and conflicting exports

// Chart Components
export {
  AreaChart,
  type AreaChartEventProps,
} from "./components/todo/area-chart/area-chart";
// Chart-specific TooltipProps (aliased to avoid conflicts)
export { type TooltipProps as AreaChartTooltipProps } from "./components/todo/area-chart/area-chart";
// Media Components
export * from "./components/todo/avatar/avatar";
// Feedback Components
export * from "./components/todo/badge/badge";
export {
  BarChart,
  type BarChartEventProps,
  type TooltipProps as BarChartTooltipProps,
} from "./components/todo/bar-chart/bar-chart";

export * from "./components/todo/bar-list/bar-list";
// Navigation Components
export * from "./components/todo/breadcrumbs/breadcrumbs";
// Input Components
export * from "./components/todo/button/button";
export * from "./components/todo/calendar/calendar";
export * from "./components/todo/callout/callout";
// Layout Components
export * from "./components/todo/card/card";

export * from "./components/todo/carousel/carousel";
export * from "./components/todo/category-bar/category-bar";
export * from "./components/todo/checkbox-group/checkbox-group";
export * from "./components/todo/checkbox/checkbox";
// Text Components
export * from "./components/todo/code-block/code-block";
export * from "./components/todo/collapsible/collapsible";
export {
  ComboChart,
  type ComboChartEventProps,
  type TooltipProps as ComboChartTooltipProps,
} from "./components/todo/combo-chart/combo-chart";
export * from "./components/todo/combobox/combobox";

export * from "./components/todo/context-menu/context-menu";
// Utility Components
export * from "./components/todo/copy-button/copy-button";
export * from "./components/todo/date-picker/date-picker";
export * from "./components/todo/description-list/description-list";
export * from "./components/todo/dialog/dialog";
export * from "./components/todo/dismiss-button/dismiss-button";
export * from "./components/todo/divider/divider";
export {
  DonutChart,
  type DonutChartEventProps,
  type TooltipProps as DonutChartTooltipProps,
} from "./components/todo/donut-chart/donut-chart";
export * from "./components/todo/dot/dot";
export * from "./components/todo/drawer/drawer";

// Utility Components
export * from "./components/todo/dropdown-item/dropdown-item";
export * from "./components/todo/empty-state/empty-state";
// Form Components
export * from "./components/todo/field/field";
export * from "./components/todo/fieldset/fieldset";
export * from "./components/todo/form/form";
export {
  Grid,
  GridAuto,
  GridCell,
  type GridCellProps,
  type GridProps,
} from "./components/todo/grid/grid";
export * from "./components/todo/heading-element/heading-element";
export * from "./components/todo/heading/heading";
export * from "./components/todo/icon-container/icon-container";

export * from "./components/todo/icon-select/icon-select";
export * from "./components/todo/icon/icon";
export * from "./components/todo/input/input";
export * from "./components/todo/inspector/inspector";
export * from "./components/todo/kbd/kbd";
export * from "./components/todo/label/label";

export {
  LineChart,
  type LineChartEventProps,
  type TooltipProps as LineChartTooltipProps,
} from "./components/todo/line-chart/line-chart";

export * from "./components/todo/list/list";
export * from "./components/todo/loader/loader";
export * from "./components/todo/menu-bar/menu-bar";
export * from "./components/todo/menu/menu";
export * from "./components/todo/meter/meter";
export * from "./components/todo/navbar/navbar";
export * from "./components/todo/navigation-menu/navigation-menu";
export * from "./components/todo/number-field/number-field";
export * from "./components/todo/pagination/pagination";

export * from "./components/todo/popover/popover";
export * from "./components/todo/preview-card/preview-card";
export * from "./components/todo/progress-circle/progress-circle";
export * from "./components/todo/progress/progress";
export * from "./components/todo/radio-card-group/radio-card-group";
export * from "./components/todo/radio-group/radio-group";
export * from "./components/todo/radio/radio";
export * from "./components/todo/responsive-drawer/responsive-drawer";
export * from "./components/todo/scroll-area/scroll-area";
export * from "./components/todo/select-native/select-native";
export * from "./components/todo/select/select";
export * from "./components/todo/separator/separator";
export * from "./components/todo/sheet/sheet";
export * from "./components/todo/sidebar/sidebar";
export * from "./components/todo/skeleton/skeleton";
export * from "./components/todo/slider/slider";
export * from "./components/todo/spark-chart/spark-chart";
export * from "./components/todo/split-button/split-button";
export * from "./components/todo/stack/stack";
export * from "./components/todo/stacked-list/stacked-list";

export * from "./components/todo/subheading/subheading";
export * from "./components/todo/switch/switch";
export * from "./components/todo/tab-navigation/tab-navigation";
export * from "./components/todo/table/table";
export * from "./components/todo/tabs/tabs";

export * from "./components/todo/tag-input/tag-input";
export * from "./components/todo/tag/tag";
export * from "./components/todo/text/text";
export * from "./components/todo/toast/toast";
export * from "./components/todo/toggle-group/toggle-group";
export * from "./components/todo/toggle/toggle";
export * from "./components/todo/toolbar/toolbar";
export * from "./components/todo/tooltip/tooltip";

export * from "./components/todo/tracker/tracker";
// Component registry utilities
// Component registry exports are now handled above via export * from "./components/registry"
// Component configuration types
export type { ComponentConfig, ComponentExample, PropMetadata } from "./lib/component-config-types";

export * from "./lib/config";
// Icon registry and utilities
export { getIconComponent, hasIcon, iconCount, iconNames, iconRegistry } from "./lib/icon-registry";
export type { LucideIconComponent } from "./lib/icon-registry";

// Core utilities and configuration
export * from "./lib/utils";

export * from "./lib/variants";
// Re-export commonly used types for convenience
export type {
  ButtonVariant,
  GlobalSemanticVariant,
  SemanticVariant,
  TailwindColor,
  TailwindShade,
} from "./lib/variants";
