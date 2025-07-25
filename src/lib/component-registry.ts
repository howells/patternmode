import { componentConfig as accordionConfig } from "@/components/ui/accordion/config";
import { componentConfig as alertDialogConfig } from "@/components/ui/alert-dialog/config";
import { componentConfig as areaChartConfig } from "@/components/ui/area-chart/config";
import { componentConfig as avatarConfig } from "@/components/ui/avatar/config";
import { componentConfig as badgeConfig } from "@/components/ui/badge/config";
import { componentConfig as barChartConfig } from "@/components/ui/bar-chart/config";
import { componentConfig as barListConfig } from "@/components/ui/bar-list/config";
import { componentConfig as breadcrumbsConfig } from "@/components/ui/breadcrumbs/config";
import { componentConfig as buttonConfig } from "@/components/ui/button/config";
import { componentConfig as calendarConfig } from "@/components/ui/calendar/config";
import { componentConfig as calloutConfig } from "@/components/ui/callout/config";
import { componentConfig as cardConfig } from "@/components/ui/card/config";
import { componentConfig as carouselConfig } from "@/components/ui/carousel/config";
import { componentConfig as categoryBarConfig } from "@/components/ui/category-bar/config";
import { componentConfig as checkboxGroupConfig } from "@/components/ui/checkbox-group/config";
import { componentConfig as checkboxConfig } from "@/components/ui/checkbox/config";
import { componentConfig as codeBlockConfig } from "@/components/ui/code-block/config";
import { componentConfig as collapsibleConfig } from "@/components/ui/collapsible/config";
import { componentConfig as comboChartConfig } from "@/components/ui/combo-chart/config";
import { componentConfig as comboboxConfig } from "@/components/ui/combobox/config";
import { componentConfig as commandConfig } from "@/components/ui/command/config";
import { componentConfig as copyButtonConfig } from "@/components/ui/copy-button/config";
import { componentConfig as dismissButtonConfig } from "@/components/ui/dismiss-button/config";
import { componentConfig as dividerConfig } from "@/components/ui/divider/config";
import { componentConfig as donutChartConfig } from "@/components/ui/donut-chart/config";
import { componentConfig as emptyStateConfig } from "@/components/ui/empty-state/config";
import { componentConfig as fieldConfig } from "@/components/ui/field/config";
import { componentConfig as gridConfig } from "@/components/ui/grid/config";
import { componentConfig as headingElementConfig } from "@/components/ui/heading-element/config";
import { componentConfig as iconSelectConfig } from "@/components/ui/icon-select/config";
import { componentConfig as inputConfig } from "@/components/ui/input/config";
import { componentConfig as kbdConfig } from "@/components/ui/kbd/config";
import { componentConfig as lineChartConfig } from "@/components/ui/line-chart/config";
import { componentConfig as loaderConfig } from "@/components/ui/loader/config";
import { componentConfig as meterConfig } from "@/components/ui/meter/config";
import { componentConfig as paginationConfig } from "@/components/ui/pagination/config";
import { componentConfig as radioCardGroupConfig } from "@/components/ui/radio-card-group/config";
import { componentConfig as radioGroupConfig } from "@/components/ui/radio-group/config";
import { componentConfig as radioConfig } from "@/components/ui/radio/config";
import { componentConfig as scrollAreaConfig } from "@/components/ui/scroll-area/config";
import { componentConfig as selectNativeConfig } from "@/components/ui/select-native/config";
import { componentConfig as selectConfig } from "@/components/ui/select/config";
import { componentConfig as separatorConfig } from "@/components/ui/separator/config";
import { componentConfig as sliderConfig } from "@/components/ui/slider/config";
import { componentConfig as sparkChartConfig } from "@/components/ui/spark-chart/config";
import { componentConfig as splitButtonConfig } from "@/components/ui/split-button/config";
import { componentConfig as stackConfig } from "@/components/ui/stack/config";
import { componentConfig as stackedListConfig } from "@/components/ui/stacked-list/config";
import { componentConfig as statusDotConfig } from "@/components/ui/status-dot/config";
import { componentConfig as switchConfig } from "@/components/ui/switch/config";
import { componentConfig as tabsConfig } from "@/components/ui/tabs/config";
import { componentConfig as tagConfig } from "@/components/ui/tag/config";
import { componentConfig as textConfig } from "@/components/ui/text/config";

// TODO: Update these components to use new ComponentConfig structure
import {
  ComponentConfig,
  ComponentConfigRegistry,
} from "./component-config-types";

// Placeholder configs for components not yet converted to three-file structure
const createPlaceholderConfig = (
  id: string,
  name: string,
  category:
    | "text"
    | "layout"
    | "navigation"
    | "feedback"
    | "overlay"
    | "data"
    | "media"
    | "utility"
    | "inputs"
    | "forms"
    | "charts" = "utility"
): ComponentConfig => ({
  id,
  name,
  description: `${name} component - conversion to new structure pending`,
  category,
  badge: category.charAt(0).toUpperCase() + category.slice(1),
  importStatement: `// TODO: Convert to new structure`,
  componentId: `${name.replace(/\s+/g, "")}Example`,
  props: [],
  examples: [
    {
      id: "default",
      title: "Default",
      description: `Basic ${name.toLowerCase()} example`,
      code: `// TODO: Add example code`,
    },
  ],
});

// Placeholder configurations for components not yet converted to three-file structure
// (Only for components that don't already have imports above)
const contextMenuConfig = createPlaceholderConfig(
  "context-menu",
  "Context Menu"
);
const descriptionListConfig = createPlaceholderConfig(
  "description-list",
  "Description List"
);
const dialogConfig = createPlaceholderConfig("dialog", "Dialog");
const drawerConfig = createPlaceholderConfig("drawer", "Drawer");
const headingConfig = createPlaceholderConfig("heading", "Heading");
const subheadingConfig = createPlaceholderConfig("subheading", "Subheading");
const labelConfig = createPlaceholderConfig("label", "Label");
const menuConfig = createPlaceholderConfig("menu", "Menu");
const menuBarConfig = createPlaceholderConfig("menu-bar", "Menu Bar");
const navbarConfig = createPlaceholderConfig("navbar", "Navbar");
const navigationMenuConfig = createPlaceholderConfig(
  "navigation-menu",
  "Navigation Menu"
);
const popoverConfig = createPlaceholderConfig("popover", "Popover");
const previewCardConfig = createPlaceholderConfig(
  "preview-card",
  "Preview Card"
);
const progressConfig = createPlaceholderConfig("progress", "Progress");
const progressCircleConfig = createPlaceholderConfig(
  "progress-circle",
  "Progress Circle"
);
const responsiveDrawerConfig = createPlaceholderConfig(
  "responsive-drawer",
  "Responsive Drawer"
);
// scrollAreaConfig is now imported from the actual config file
const sheetConfig = createPlaceholderConfig("sheet", "Sheet");
const sidebarConfig = createPlaceholderConfig("sidebar", "Sidebar");
const skeletonConfig = createPlaceholderConfig("skeleton", "Skeleton");
const tabNavigationConfig = createPlaceholderConfig(
  "tab-navigation",
  "Tab Navigation"
);
const tableConfig = createPlaceholderConfig("table", "Table");

const toastConfig = createPlaceholderConfig("toast", "Toast");
const toggleConfig = createPlaceholderConfig("toggle", "Toggle");
const toggleGroupConfig = createPlaceholderConfig(
  "toggle-group",
  "Toggle Group"
);
const toolbarConfig = createPlaceholderConfig("toolbar", "Toolbar");
const tooltipConfig = createPlaceholderConfig("tooltip", "Tooltip");
const touchTargetConfig = createPlaceholderConfig(
  "touch-target",
  "Touch Target"
);
const trackerConfig = createPlaceholderConfig("tracker", "Tracker");

// Missing components that need placeholders
const inspectorConfig = createPlaceholderConfig(
  "inspector",
  "Inspector",
  "utility"
);

// Placeholder configurations for inputs category
const datePickerConfig = createPlaceholderConfig(
  "date-picker",
  "Date Picker",
  "inputs"
);
const dateRangePickerConfig = createPlaceholderConfig(
  "date-range-picker",
  "Date Range Picker",
  "inputs"
);

const numberFieldConfig = createPlaceholderConfig(
  "number-field",
  "Number Field",
  "inputs"
);
// selectConfig is now imported from the actual config file
const textareaConfig = createPlaceholderConfig(
  "textarea",
  "Textarea",
  "inputs"
);

// Placeholder configurations for forms category
const fieldsetConfig = createPlaceholderConfig("fieldset", "Fieldset", "forms");
const formConfig = createPlaceholderConfig("form", "Form", "forms");

// Placeholder configurations for charts category

// Component registry with components using new config structure
export const componentRegistry: ComponentConfigRegistry = {
  // UI Components (with proper configs)
  accordion: accordionConfig,
  "alert-dialog": alertDialogConfig,
  "area-chart": areaChartConfig,
  avatar: avatarConfig,
  badge: badgeConfig,
  "bar-chart": barChartConfig,
  "bar-list": barListConfig,
  breadcrumbs: breadcrumbsConfig,
  button: buttonConfig,
  calendar: calendarConfig,
  callout: calloutConfig,
  card: cardConfig,
  carousel: carouselConfig,
  "category-bar": categoryBarConfig,
  checkbox: checkboxConfig,
  "checkbox-group": checkboxGroupConfig,
  "code-block": codeBlockConfig,
  collapsible: collapsibleConfig,
  "copy-button": copyButtonConfig,
  "dismiss-button": dismissButtonConfig,
  divider: dividerConfig,
  "empty-state": emptyStateConfig,
  grid: gridConfig,
  loader: loaderConfig,
  meter: meterConfig,
  separator: separatorConfig,
  "stacked-list": stackedListConfig,
  command: commandConfig,
  combobox: comboboxConfig,
  radio: radioConfig,
  "radio-group": radioGroupConfig,
  "radio-card-group": radioCardGroupConfig,
  slider: sliderConfig,
  switch: switchConfig,
  "select-native": selectNativeConfig,
  "combo-chart": comboChartConfig,
  "donut-chart": donutChartConfig,
  "line-chart": lineChartConfig,
  "spark-chart": sparkChartConfig,
  "split-button": splitButtonConfig,
  stack: stackConfig,
  "status-dot": statusDotConfig,

  // UI Components (placeholders)
  "context-menu": contextMenuConfig,
  "description-list": descriptionListConfig,
  dialog: dialogConfig,
  drawer: drawerConfig,
  heading: headingConfig,
  "heading-element": headingElementConfig,
  inspector: inspectorConfig,
  kbd: kbdConfig,
  subheading: subheadingConfig,
  label: labelConfig,
  menu: menuConfig,
  "menu-bar": menuBarConfig,
  navbar: navbarConfig,
  "navigation-menu": navigationMenuConfig,
  pagination: paginationConfig,
  popover: popoverConfig,
  "preview-card": previewCardConfig,
  progress: progressConfig,
  "progress-circle": progressCircleConfig,
  "responsive-drawer": responsiveDrawerConfig,
  "scroll-area": scrollAreaConfig,
  sheet: sheetConfig,
  sidebar: sidebarConfig,
  skeleton: skeletonConfig,
  "tab-navigation": tabNavigationConfig,
  table: tableConfig,
  tabs: tabsConfig,
  tag: tagConfig,
  text: textConfig,
  toast: toastConfig,
  toggle: toggleConfig,
  "toggle-group": toggleGroupConfig,
  toolbar: toolbarConfig,
  tooltip: tooltipConfig,
  "touch-target": touchTargetConfig,
  tracker: trackerConfig,

  // Input Components (placeholders)
  "date-picker": datePickerConfig,
  "date-range-picker": dateRangePickerConfig,
  "icon-select": iconSelectConfig,
  input: inputConfig,
  "number-field": numberFieldConfig,
  select: selectConfig,
  textarea: textareaConfig,

  // Form Components (placeholders)
  field: fieldConfig,
  fieldset: fieldsetConfig,
  form: formConfig,

  // Chart Components (placeholders)
};

// Helper to register a component config
export function registerComponent(config: ComponentConfig) {
  componentRegistry[config.id] = config;
}

// Helper functions
export function getComponentConfig(id: string) {
  return componentRegistry[id];
}

export function getComponentsByCategory(category: string) {
  return Object.values(componentRegistry).filter(
    (config) => config.category === category
  );
}

export function getAllComponents() {
  return Object.values(componentRegistry);
}

// List of all components by category for reference
export const COMPONENT_LIST = {
  text: [
    "code-block",
    "heading",
    "heading-element",
    "kbd",
    "label",
    "subheading",
    "text",
  ],
  layout: ["card", "grid", "separator", "stack"],
  navigation: [
    "breadcrumbs",
    "command",
    "menu",
    "menu-bar",
    "navbar",
    "navigation-menu",
    "pagination",
    "sidebar",
    "tab-navigation",
    "tabs",
    "toolbar",
  ],
  feedback: [
    "badge",
    "callout",
    "loader",
    "meter",
    "progress",
    "progress-circle",
    "skeleton",
    "status-dot",
    "tag",
    "toast",
  ],
  overlay: [
    "alert-dialog",
    "context-menu",
    "dialog",
    "drawer",
    "popover",
    "responsive-drawer",
    "sheet",
    "tooltip",
  ],
  data: [
    "accordion",
    "collapsible",
    "description-list",
    "preview-card",
    "stacked-list",
    "table",
  ],
  media: ["avatar", "carousel"],
  utility: [
    "copy-button",
    "empty-state",
    "inspector",
    "scroll-area",
    "touch-target",
    "tracker",
  ],
  inputs: [
    "button",
    "calendar",
    "checkbox",
    "checkbox-group",
    "combobox",
    "date-picker",
    "date-range-picker",
    "dismiss-button",
    "icon-select",
    "input",
    "number-field",
    "radio",
    "radio-card-group",
    "radio-group",
    "select",
    "select-native",
    "slider",
    "split-button",
    "switch",
    "textarea",
    "toggle",
    "toggle-group",
  ],
  forms: ["field", "fieldset", "form"],
  charts: [
    "area-chart",
    "bar-chart",
    "bar-list",
    "category-bar",
    "combo-chart",
    "donut-chart",
    "line-chart",
    "spark-chart",
  ],
};

// Type for component IDs
export type ComponentId =
  | (typeof COMPONENT_LIST.text)[number]
  | (typeof COMPONENT_LIST.layout)[number]
  | (typeof COMPONENT_LIST.navigation)[number]
  | (typeof COMPONENT_LIST.feedback)[number]
  | (typeof COMPONENT_LIST.overlay)[number]
  | (typeof COMPONENT_LIST.data)[number]
  | (typeof COMPONENT_LIST.media)[number]
  | (typeof COMPONENT_LIST.utility)[number]
  | (typeof COMPONENT_LIST.inputs)[number]
  | (typeof COMPONENT_LIST.forms)[number]
  | (typeof COMPONENT_LIST.charts)[number];
