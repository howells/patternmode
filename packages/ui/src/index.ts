// Main export file for @patternmode/ui
// This file exports all components, utilities, and types for external consumption

// Essential CSS styles for Tailwind 4 - consumers should import this
// import "@patternmode/ui/styles/globals.css"

// Component registry utilities
export { COMPONENT_LIST, getComponentsByCategory } from "./component-registry";
// Data Components
export * from "./components/accordion/accordion";
// Overlay Components
export * from "./components/alert-dialog/alert-dialog";

// Export specific components from their main files
// This avoids issues with missing index files and conflicting exports

// Chart Components
export {
  AreaChart,
  type AreaChartEventProps,
} from "./components/area-chart/area-chart";
// Chart-specific TooltipProps (aliased to avoid conflicts)
export { type TooltipProps as AreaChartTooltipProps } from "./components/area-chart/area-chart";
// Media Components
export * from "./components/avatar/avatar";
// Feedback Components
export * from "./components/badge/badge";
export {
  BarChart,
  type BarChartEventProps,
  type TooltipProps as BarChartTooltipProps,
} from "./components/bar-chart/bar-chart";

export * from "./components/bar-list/bar-list";
// Navigation Components
export * from "./components/breadcrumbs/breadcrumbs";
// Input Components
export * from "./components/button/button";
export * from "./components/calendar/calendar";
export * from "./components/callout/callout";
// Layout Components
export * from "./components/card/card";

export * from "./components/carousel/carousel";
export * from "./components/category-bar/category-bar";
export * from "./components/checkbox-group/checkbox-group";
export * from "./components/checkbox/checkbox";
// Text Components
export * from "./components/code-block/code-block";
export * from "./components/collapsible/collapsible";
export {
  ComboChart,
  type ComboChartEventProps,
  type TooltipProps as ComboChartTooltipProps,
} from "./components/combo-chart/combo-chart";
export * from "./components/combobox/combobox";

export * from "./components/context-menu/context-menu";
// Utility Components
export * from "./components/copy-button/copy-button";
export * from "./components/date-picker/date-picker";
export * from "./components/description-list/description-list";
export * from "./components/dialog/dialog";
export * from "./components/dismiss-button/dismiss-button";
export * from "./components/divider/divider";
export {
  DonutChart,
  type DonutChartEventProps,
  type TooltipProps as DonutChartTooltipProps,
} from "./components/donut-chart/donut-chart";
export * from "./components/dot/dot";

export * from "./components/drawer/drawer";
export * from "./components/empty-state/empty-state";
// Form Components
export * from "./components/field/field";
export * from "./components/fieldset/fieldset";
export * from "./components/form/form";
export {
  Grid,
  GridAuto,
  GridCell,
  type GridCellProps,
  type GridProps,
} from "./components/grid/grid";
export * from "./components/heading-element/heading-element";
export * from "./components/heading/heading";
export * from "./components/icon-container/icon-container";

export * from "./components/icon-select/icon-select";
export * from "./components/icon/icon";
export * from "./components/input/input";
export * from "./components/inspector/inspector";
export * from "./components/kbd/kbd";
export * from "./components/label/label";

export {
  LineChart,
  type LineChartEventProps,
  type TooltipProps as LineChartTooltipProps,
} from "./components/line-chart/line-chart";

export * from "./components/list/list";
export * from "./components/loader/loader";
export * from "./components/menu-bar/menu-bar";
export * from "./components/menu/menu";
export * from "./components/meter/meter";
export * from "./components/navbar/navbar";
export * from "./components/navigation-menu/navigation-menu";
export * from "./components/number-field/number-field";
export * from "./components/pagination/pagination";

export * from "./components/popover/popover";
export * from "./components/preview-card/preview-card";
export * from "./components/progress-circle/progress-circle";
// Export progress utilities (used by multiple chart components)
export * from "./components/progress-utils";
export * from "./components/progress/progress";
export * from "./components/radio-card-group/radio-card-group";
export * from "./components/radio-group/radio-group";
export * from "./components/radio/radio";
export * from "./components/responsive-drawer/responsive-drawer";
export * from "./components/scroll-area/scroll-area";
export * from "./components/select-native/select-native";
export * from "./components/select/select";
export * from "./components/separator/separator";
export * from "./components/sheet/sheet";
export * from "./components/sidebar/sidebar";
export * from "./components/skeleton/skeleton";
export * from "./components/slider/slider";
export * from "./components/spark-chart/spark-chart";
export * from "./components/split-button/split-button";
export * from "./components/stack/stack";

export * from "./components/stacked-list/stacked-list";
export * from "./components/subheading/subheading";
export * from "./components/switch/switch";
export * from "./components/tab-navigation/tab-navigation";
export * from "./components/table/table";

export * from "./components/tabs/tabs";
export * from "./components/tag-input/tag-input";
export * from "./components/tag/tag";
export * from "./components/text/text";
export * from "./components/textarea/textarea";
export * from "./components/toast/toast";
export * from "./components/toggle-group/toggle-group";
export * from "./components/toggle/toggle";

export * from "./components/toolbar/toolbar";
export * from "./components/tooltip/tooltip";
export * from "./components/touch-target/touch-target";
export * from "./components/tracker/tracker";
export type { ComponentConfig } from "./lib/component-config-types";

export * from "./lib/config";

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
