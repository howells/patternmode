// Main export file for @patternmode/ui
// This file exports all components, utilities, and types for external consumption

// Essential CSS styles for Tailwind 4 - consumers should import this
// import "@patternmode/ui/styles/globals.css"

// Data Components
export {
  Accordion,
  AccordionContent,
  type AccordionContentProps,
  AccordionItem,
  type AccordionItemProps,
  type AccordionProps,
  AccordionTrigger,
  type AccordionTriggerProps,
} from "./components/accordion";

// Overlay Components
export * from "./components/alert-dialog";
// Chart Components
export {
  AreaChart,
  type AreaChartEventProps,
} from "./components/area-chart";

// Chart-specific TooltipProps (aliased to avoid conflicts)
export { type TooltipProps as AreaChartTooltipProps } from "./components/area-chart";

// Media Components
export * from "./components/avatar";
// Feedback Components
export * from "./components/badge";

export {
  BarChart,
  type BarChartEventProps,
  type TooltipProps as BarChartTooltipProps,
} from "./components/bar-chart";

// Export specific components from their main files
// This avoids issues with missing index files and conflicting exports

export * from "./components/bar-list";
// Navigation Components
export * from "./components/breadcrumbs";

// Input Components
export * from "./components/button";

export * from "./components/calendar";

export * from "./components/callout";

// Layout Components
export * from "./components/card";

export * from "./components/carousel";

export * from "./components/category-bar";
export * from "./components/checkbox";
export * from "./components/checkbox-group";

// Text Components
export * from "./components/code-block";
export * from "./components/collapsible";
export {
  ComboChart,
  type ComboChartEventProps,
  type TooltipProps as ComboChartTooltipProps,
} from "./components/combo-chart";
export * from "./components/combobox";
export * from "./components/context-menu";

// Utility Components
export * from "./components/copy-button";
export * from "./components/date-picker";

export * from "./components/description-list";

export * from "./components/dialog";
export * from "./components/dismiss-button";

export * from "./components/divider";
export {
  DonutChart,
  type DonutChartEventProps,
  type TooltipProps as DonutChartTooltipProps,
} from "./components/donut-chart";
export * from "./components/dot";
export * from "./components/drawer";
export * from "./components/dropdown-item";
export * from "./components/empty-state";

// Form Components
export * from "./components/field";

// Form Components
export * from "./components/field-array";
export { FieldArrayExample } from "./components/field-array/preview";
export * from "./components/fieldset";
export * from "./components/form";

export {
  Grid,
  GridAuto,
  GridCell,
  type GridCellProps,
  type GridProps,
} from "./components/grid";
export * from "./components/heading";
export * from "./components/heading-element";

export * from "./components/icon";

export * from "./components/icon-container";
export * from "./components/icon-select";
export * from "./components/input";
export * from "./components/kbd";
export * from "./components/label";
export {
  LineChart,
  type LineChartEventProps,
  type TooltipProps as LineChartTooltipProps,
} from "./components/line-chart";
export * from "./components/loader";
export * from "./components/menu";
export * from "./components/menu-bar";

export * from "./components/meter";

export * from "./components/navbar";
export * from "./components/navigation-menu";
export * from "./components/number-field";
export * from "./components/pagination";
export * from "./components/popover";
export * from "./components/preview-card";
export * from "./components/progress";
export * from "./components/progress-circle";
// Export progress utilities (used by multiple chart components)
export * from "./components/progress-utils";
export * from "./components/radio";
export * from "./components/radio-card-group";
export * from "./components/radio-group";
// Component configs (exported with unique names to avoid conflicts)
export * from "./components/responsive-drawer";
export * from "./components/scroll-area";
// Component Registry - for documentation and tooling
// Component registry exports are handled separately - not exported to prevent componentConfig conflicts
// export * from "./components/registry";

// Search Components
export * from "./components/search-field";
export * from "./components/select";
export * from "./components/select-native";
export * from "./components/separator";
export * from "./components/sheet";
export * from "./components/sidebar";
export * from "./components/skeleton";
export * from "./components/slider";
export * from "./components/spark-chart";
export * from "./components/split-button";
export * from "./components/stack";
export * from "./components/stacked-list";
export * from "./components/subheading";
export * from "./components/switch";
export * from "./components/tab-navigation";
export * from "./components/table";
export * from "./components/tabs";
export * from "./components/tag";
export * from "./components/tag-input";
export * from "./components/text";
export * from "./components/text-list";
export * from "./components/textarea";
export * from "./components/toast";
export * from "./components/toggle";
export * from "./components/toggle-group";
export * from "./components/toolbar";
export * from "./components/tooltip";
export * from "./components/tracker";

// Component registry utilities
// Component registry exports are now handled above via export * from "./components/registry"

// Core utilities and configuration
export { BREAKPOINTS, MEDIA_QUERIES } from "./lib/breakpoints";

// Component configuration types
export type { ComponentConfig, ComponentExample, PropMetadata } from "./lib/component-config-types";
export * from "./lib/config";

// Icon registry and utilities
export { getIconComponent, hasIcon, iconCount, iconNames, iconRegistry } from "./lib/icon-registry";

export type { LucideIconComponent } from "./lib/icon-registry";
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
