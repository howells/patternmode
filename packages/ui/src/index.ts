// Main export file for @patternmode/ui
// This file exports all components, utilities, and types for external consumption

// Essential CSS styles for Tailwind 4 - consumers should import this
// import "@patternmode/ui/styles/globals.css"

// Core utilities and configuration
export * from "./lib/utils";
export * from "./lib/config";
export * from "./lib/variants";

// Export specific components from their main files
// This avoids issues with missing index files and conflicting exports

// Text Components
export * from "./components/code-block/code-block";
export * from "./components/heading/heading";
export * from "./components/heading-element/heading-element";
export * from "./components/kbd/kbd";
export * from "./components/subheading/subheading";
export * from "./components/text/text";

// Layout Components
export * from "./components/card/card";
export * from "./components/divider/divider";
export { Grid, GridAuto, GridCell, type GridProps, type GridCellProps } from "./components/grid/grid";
export * from "./components/preview-card/preview-card";
export * from "./components/separator/separator";
export * from "./components/stack/stack";

// Navigation Components
export * from "./components/breadcrumbs/breadcrumbs";
export * from "./components/menu-bar/menu-bar";
export * from "./components/navbar/navbar";
export * from "./components/navigation-menu/navigation-menu";
export * from "./components/pagination/pagination";
export * from "./components/sidebar/sidebar";
export * from "./components/tab-navigation/tab-navigation";
export * from "./components/tabs/tabs";
export * from "./components/toolbar/toolbar";

// Feedback Components
export * from "./components/badge/badge";
export * from "./components/callout/callout";
export * from "./components/dot/dot";
export * from "./components/loader/loader";
export * from "./components/meter/meter";
export * from "./components/progress/progress";
export * from "./components/progress-circle/progress-circle";
export * from "./components/skeleton/skeleton";
export * from "./components/tag/tag";
export * from "./components/toast/toast";

// Overlay Components
export * from "./components/alert-dialog/alert-dialog";
export * from "./components/context-menu/context-menu";
export * from "./components/dialog/dialog";
export * from "./components/drawer/drawer";
export * from "./components/menu/menu";
export * from "./components/popover/popover";
export * from "./components/responsive-drawer/responsive-drawer";
export * from "./components/sheet/sheet";
export * from "./components/tooltip/tooltip";

// Data Components
export * from "./components/accordion/accordion";
export * from "./components/collapsible/collapsible";
export * from "./components/description-list/description-list";
export * from "./components/list/list";
export * from "./components/stacked-list/stacked-list";
export * from "./components/table/table";

// Media Components
export * from "./components/avatar/avatar";
export * from "./components/carousel/carousel";

// Utility Components
export * from "./components/copy-button/copy-button";
export * from "./components/dismiss-button/dismiss-button";
export * from "./components/empty-state/empty-state";
export * from "./components/icon/icon";
export * from "./components/icon-container/icon-container";
export * from "./components/inspector/inspector";
export * from "./components/scroll-area/scroll-area";
export * from "./components/touch-target/touch-target";
export * from "./components/tracker/tracker";

// Input Components
export * from "./components/button/button";
export * from "./components/calendar/calendar";
export * from "./components/checkbox/checkbox";
export * from "./components/checkbox-group/checkbox-group";
export * from "./components/combobox/combobox";
export * from "./components/date-picker/date-picker";
export * from "./components/date-range-picker/date-range-picker";
export * from "./components/icon-select/icon-select";
export * from "./components/input/input";
export * from "./components/number-field/number-field";
export * from "./components/radio/radio";
export * from "./components/radio-card-group/radio-card-group";
export * from "./components/radio-group/radio-group";
export * from "./components/select/select";
export * from "./components/select-native/select-native";
export * from "./components/slider/slider";
export * from "./components/split-button/split-button";
export * from "./components/switch/switch";
export * from "./components/textarea/textarea";
export * from "./components/toggle/toggle";
export * from "./components/toggle-group/toggle-group";

// Form Components
export * from "./components/field/field";
export * from "./components/fieldset/fieldset";
export * from "./components/form/form";
export * from "./components/label/label";
export * from "./components/tag-input/tag-input";

// Chart Components
export { AreaChart, type AreaChartEventProps } from "./components/area-chart/area-chart";
export { BarChart, type BarChartEventProps } from "./components/bar-chart/bar-chart";
export * from "./components/bar-list/bar-list";
export * from "./components/category-bar/category-bar";
export { ComboChart, type ComboChartEventProps } from "./components/combo-chart/combo-chart";
export { DonutChart, type DonutChartEventProps } from "./components/donut-chart/donut-chart";
export { LineChart, type LineChartEventProps } from "./components/line-chart/line-chart";
export * from "./components/spark-chart/spark-chart";

// Chart-specific TooltipProps (aliased to avoid conflicts)
export { type TooltipProps as AreaChartTooltipProps } from "./components/area-chart/area-chart";
export { type TooltipProps as BarChartTooltipProps } from "./components/bar-chart/bar-chart";
export { type TooltipProps as ComboChartTooltipProps } from "./components/combo-chart/combo-chart";
export { type TooltipProps as DonutChartTooltipProps } from "./components/donut-chart/donut-chart";
export { type TooltipProps as LineChartTooltipProps } from "./components/line-chart/line-chart";

// Export progress utilities (used by multiple chart components)
export * from "./components/progress-utils";

// Re-export commonly used types for convenience
export type {
  GlobalSemanticVariant,
  ButtonVariant,
  SemanticVariant,
  TailwindColor,
  TailwindShade,
} from "./lib/variants";


