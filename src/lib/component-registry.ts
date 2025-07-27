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
import { componentConfig as dotConfigActual } from "@/components/ui/dot/config";
import { componentConfig as emptyStateConfig } from "@/components/ui/empty-state/config";
import { componentConfig as fieldConfig } from "@/components/ui/field/config";
import { componentConfig as gridConfig } from "@/components/ui/grid/config";
import { componentConfig as headingElementConfig } from "@/components/ui/heading-element/config";
import { componentConfig as headingConfig } from "@/components/ui/heading/config";
import { componentConfig as iconContainerConfig } from "@/components/ui/icon-container/config";
import { componentConfig as iconSelectConfig } from "@/components/ui/icon-select/config";
import { componentConfig as iconConfig } from "@/components/ui/icon/config";
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
import { componentConfig as switchConfig } from "@/components/ui/switch/config";
import { componentConfig as tabsConfig } from "@/components/ui/tabs/config";
import { componentConfig as tagInputConfig } from "@/components/ui/tag-input/config";
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
  icon: string,
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
  icon,
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
const contextMenuConfig = createPlaceholderConfig(
  "context-menu",
  "Context Menu",
  "MousePointer2",
  "overlay"
);
const datePickerConfig = createPlaceholderConfig(
  "date-picker",
  "Date Picker",
  "Calendar",
  "inputs"
);
const dateRangePickerConfig = createPlaceholderConfig(
  "date-range-picker",
  "Date Range Picker",
  "CalendarRange",
  "inputs"
);
const descriptionListConfig = createPlaceholderConfig(
  "description-list",
  "Description List",
  "List",
  "data"
);
const dialogConfig = createPlaceholderConfig(
  "dialog",
  "Dialog",
  "MessageSquare",
  "overlay"
);
// Dot config is now imported as dotConfigActual
const drawerConfig = createPlaceholderConfig(
  "drawer",
  "Drawer",
  "PanelRight",
  "overlay"
);
const fieldsetConfig = createPlaceholderConfig(
  "fieldset",
  "Fieldset",
  "Square",
  "forms"
);
const formConfig = createPlaceholderConfig("form", "Form", "FileText", "forms");
// Heading config imported above
const inspectorConfig = createPlaceholderConfig(
  "inspector",
  "Inspector",
  "Search",
  "utility"
);
const labelConfig = createPlaceholderConfig("label", "Label", "Tag", "text");
const menuConfig = createPlaceholderConfig(
  "menu",
  "Menu",
  "Menu",
  "navigation"
);
const menuBarConfig = createPlaceholderConfig(
  "menu-bar",
  "Menu Bar",
  "MenuSquare",
  "navigation"
);
const navbarConfig = createPlaceholderConfig(
  "navbar",
  "Navbar",
  "Navigation",
  "navigation"
);
const navigationMenuConfig = createPlaceholderConfig(
  "navigation-menu",
  "Navigation Menu",
  "Navigation2",
  "navigation"
);
const numberFieldConfig = createPlaceholderConfig(
  "number-field",
  "Number Field",
  "Hash",
  "inputs"
);
const popoverConfig = createPlaceholderConfig(
  "popover",
  "Popover",
  "MessageCircle",
  "overlay"
);
const previewCardConfig = createPlaceholderConfig(
  "preview-card",
  "Preview Card",
  "Eye",
  "data"
);
const progressConfig = createPlaceholderConfig(
  "progress",
  "Progress",
  "TrendingUp",
  "feedback"
);
const progressCircleConfig = createPlaceholderConfig(
  "progress-circle",
  "Progress Circle",
  "CircleProgress",
  "feedback"
);
const responsiveDrawerConfig = createPlaceholderConfig(
  "responsive-drawer",
  "Responsive Drawer",
  "PanelLeftOpen",
  "overlay"
);
const sheetConfig = createPlaceholderConfig(
  "sheet",
  "Sheet",
  "RectangleHorizontal",
  "overlay"
);
const sidebarConfig = createPlaceholderConfig(
  "sidebar",
  "Sidebar",
  "PanelLeft",
  "navigation"
);
const skeletonConfig = createPlaceholderConfig(
  "skeleton",
  "Skeleton",
  "Loader2",
  "feedback"
);
const subheadingConfig = createPlaceholderConfig(
  "subheading",
  "Subheading",
  "Heading2",
  "text"
);
const tabNavigationConfig = createPlaceholderConfig(
  "tab-navigation",
  "Tab Navigation",
  "Tabs",
  "navigation"
);
const tableConfig = createPlaceholderConfig("table", "Table", "Table", "data");
const textareaConfig = createPlaceholderConfig(
  "textarea",
  "Textarea",
  "AlignLeft",
  "inputs"
);
const toastConfig = createPlaceholderConfig(
  "toast",
  "Toast",
  "Bell",
  "feedback"
);
const toggleConfig = createPlaceholderConfig(
  "toggle",
  "Toggle",
  "ToggleLeft",
  "inputs"
);
const toggleGroupConfig = createPlaceholderConfig(
  "toggle-group",
  "Toggle Group",
  "ToggleRight",
  "inputs"
);
const toolbarConfig = createPlaceholderConfig(
  "toolbar",
  "Toolbar",
  "Wrench",
  "navigation"
);
const tooltipConfig = createPlaceholderConfig(
  "tooltip",
  "Tooltip",
  "Info",
  "overlay"
);
const touchTargetConfig = createPlaceholderConfig(
  "touch-target",
  "Touch Target",
  "Fingerprint",
  "utility"
);
const trackerConfig = createPlaceholderConfig(
  "tracker",
  "Tracker",
  "Activity",
  "utility"
);

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
  "combo-chart": comboChartConfig,
  combobox: comboboxConfig,
  command: commandConfig,
  "copy-button": copyButtonConfig,
  "dismiss-button": dismissButtonConfig,
  divider: dividerConfig,
  "donut-chart": donutChartConfig,
  "empty-state": emptyStateConfig,
  field: fieldConfig,
  grid: gridConfig,
  "heading-element": headingElementConfig,
  icon: iconConfig,
  "icon-container": iconContainerConfig,
  "icon-select": iconSelectConfig,
  input: inputConfig,
  kbd: kbdConfig,
  "line-chart": lineChartConfig,
  loader: loaderConfig,
  meter: meterConfig,
  pagination: paginationConfig,
  radio: radioConfig,
  "radio-card-group": radioCardGroupConfig,
  "radio-group": radioGroupConfig,
  "scroll-area": scrollAreaConfig,
  select: selectConfig,
  "select-native": selectNativeConfig,
  separator: separatorConfig,
  slider: sliderConfig,
  "spark-chart": sparkChartConfig,
  "split-button": splitButtonConfig,
  stack: stackConfig,
  "stacked-list": stackedListConfig,
  dot: dotConfigActual,
  switch: switchConfig,
  tabs: tabsConfig,
  tag: tagConfig,
  "tag-input": tagInputConfig,
  text: textConfig,

  // UI Components (placeholders - need to be converted to new structure)
  "context-menu": contextMenuConfig,
  "date-picker": datePickerConfig,
  "date-range-picker": dateRangePickerConfig,
  "description-list": descriptionListConfig,
  dialog: dialogConfig,
  drawer: drawerConfig,
  fieldset: fieldsetConfig,
  form: formConfig,
  heading: headingConfig,
  inspector: inspectorConfig,
  label: labelConfig,
  menu: menuConfig,
  "menu-bar": menuBarConfig,
  navbar: navbarConfig,
  "navigation-menu": navigationMenuConfig,
  "number-field": numberFieldConfig,
  popover: popoverConfig,
  "preview-card": previewCardConfig,
  progress: progressConfig,
  "progress-circle": progressCircleConfig,
  "responsive-drawer": responsiveDrawerConfig,
  sheet: sheetConfig,
  sidebar: sidebarConfig,
  skeleton: skeletonConfig,
  subheading: subheadingConfig,
  "tab-navigation": tabNavigationConfig,
  table: tableConfig,
  textarea: textareaConfig,
  toast: toastConfig,
  toggle: toggleConfig,
  "toggle-group": toggleGroupConfig,
  toolbar: toolbarConfig,
  tooltip: tooltipConfig,
  "touch-target": touchTargetConfig,
  tracker: trackerConfig,
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
    "dot",
    "loader",
    "meter",
    "progress",
    "progress-circle",
    "skeleton",
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
    "icon",
    "icon-container",
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
  forms: ["field", "fieldset", "form", "tag-input"],
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
