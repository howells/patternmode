// Import local types and create registry from configs
import { type ComponentConfig, type ComponentConfigRegistry } from "./component-config-types";

// Import all component configs from the web app
import { componentConfig as buttonConfig } from "@/components/ui/button/config";
import { componentConfig as accordionConfig } from "@/components/ui/accordion/config";
import { componentConfig as alertDialogConfig } from "@/components/ui/alert-dialog/config";
import { componentConfig as areaChartConfig } from "@/components/ui/area-chart/config";
import { componentConfig as avatarConfig } from "@/components/ui/avatar/config";
import { componentConfig as badgeConfig } from "@/components/ui/badge/config";
import { componentConfig as barChartConfig } from "@/components/ui/bar-chart/config";
import { componentConfig as barListConfig } from "@/components/ui/bar-list/config";
import { componentConfig as breadcrumbsConfig } from "@/components/ui/breadcrumbs/config";
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
import { componentConfig as contextMenuConfig } from "@/components/ui/context-menu/config";
import { componentConfig as copyButtonConfig } from "@/components/ui/copy-button/config";
import { componentConfig as datePickerConfig } from "@/components/ui/date-picker/config";
import { componentConfig as dateRangePickerConfig } from "@/components/ui/date-range-picker/config";
import { componentConfig as descriptionListConfig } from "@/components/ui/description-list/config";
import { componentConfig as dialogConfig } from "@/components/ui/dialog/config";
import { componentConfig as dismissButtonConfig } from "@/components/ui/dismiss-button/config";
import { componentConfig as dividerConfig } from "@/components/ui/divider/config";
import { componentConfig as donutChartConfig } from "@/components/ui/donut-chart/config";
import { componentConfig as dotConfig } from "@/components/ui/dot/config";
import { componentConfig as drawerConfig } from "@/components/ui/drawer/config";
import { componentConfig as emptyStateConfig } from "@/components/ui/empty-state/config";
import { componentConfig as fieldConfig } from "@/components/ui/field/config";
import { componentConfig as fieldsetConfig } from "@/components/ui/fieldset/config";
import { componentConfig as formConfig } from "@/components/ui/form/config";
import { componentConfig as gridConfig } from "@/components/ui/grid/config";
import { componentConfig as headingElementConfig } from "@/components/ui/heading-element/config";
import { componentConfig as headingConfig } from "@/components/ui/heading/config";
import { componentConfig as iconContainerConfig } from "@/components/ui/icon-container/config";
import { componentConfig as iconSelectConfig } from "@/components/ui/icon-select/config";
import { componentConfig as iconConfig } from "@/components/ui/icon/config";
import { componentConfig as inputConfig } from "@/components/ui/input/config";
import { componentConfig as inspectorConfig } from "@/components/ui/inspector/config";
import { componentConfig as kbdConfig } from "@/components/ui/kbd/config";
import { componentConfig as labelConfig } from "@/components/ui/label/config";
import { componentConfig as lineChartConfig } from "@/components/ui/line-chart/config";
import { componentConfig as listConfig } from "@/components/ui/list/config";
import { componentConfig as loaderConfig } from "@/components/ui/loader/config";
import { componentConfig as menuBarConfig } from "@/components/ui/menu-bar/config";
import { componentConfig as menuConfig } from "@/components/ui/menu/config";
import { componentConfig as meterConfig } from "@/components/ui/meter/config";
import { componentConfig as navbarConfig } from "@/components/ui/navbar/config";
import { componentConfig as navigationMenuConfig } from "@/components/ui/navigation-menu/config";
import { componentConfig as numberFieldConfig } from "@/components/ui/number-field/config";
import { componentConfig as paginationConfig } from "@/components/ui/pagination/config";
import { componentConfig as popoverConfig } from "@/components/ui/popover/config";
import { componentConfig as previewCardConfig } from "@/components/ui/preview-card/config";
import { componentConfig as progressCircleConfig } from "@/components/ui/progress-circle/config";
import { componentConfig as progressConfig } from "@/components/ui/progress/config";
import { componentConfig as radioCardGroupConfig } from "@/components/ui/radio-card-group/config";
import { componentConfig as radioGroupConfig } from "@/components/ui/radio-group/config";
import { componentConfig as radioConfig } from "@/components/ui/radio/config";
import { componentConfig as responsiveDrawerConfig } from "@/components/ui/responsive-drawer/config";
import { componentConfig as scrollAreaConfig } from "@/components/ui/scroll-area/config";
import { componentConfig as selectNativeConfig } from "@/components/ui/select-native/config";
import { componentConfig as selectConfig } from "@/components/ui/select/config";
import { componentConfig as separatorConfig } from "@/components/ui/separator/config";
import { componentConfig as sheetConfig } from "@/components/ui/sheet/config";
import { componentConfig as sidebarConfig } from "@/components/ui/sidebar/config";
import { componentConfig as skeletonConfig } from "@/components/ui/skeleton/config";
import { componentConfig as sliderConfig } from "@/components/ui/slider/config";
import { componentConfig as sparkChartConfig } from "@/components/ui/spark-chart/config";
import { componentConfig as splitButtonConfig } from "@/components/ui/split-button/config";
import { componentConfig as stackConfig } from "@/components/ui/stack/config";
import { componentConfig as stackedListConfig } from "@/components/ui/stacked-list/config";
import { componentConfig as subheadingConfig } from "@/components/ui/subheading/config";
import { componentConfig as switchConfig } from "@/components/ui/switch/config";
import { componentConfig as tabNavigationConfig } from "@/components/ui/tab-navigation/config";
import { componentConfig as tableConfig } from "@/components/ui/table/config";
import { componentConfig as tabsConfig } from "@/components/ui/tabs/config";
import { componentConfig as tagInputConfig } from "@/components/ui/tag-input/config";
import { componentConfig as tagConfig } from "@/components/ui/tag/config";
import { componentConfig as textConfig } from "@/components/ui/text/config";
import { componentConfig as textareaConfig } from "@/components/ui/textarea/config";
import { componentConfig as toastConfig } from "@/components/ui/toast/config";
import { componentConfig as toggleGroupConfig } from "@/components/ui/toggle-group/config";
import { componentConfig as toggleConfig } from "@/components/ui/toggle/config";
import { componentConfig as toolbarConfig } from "@/components/ui/toolbar/config";
import { componentConfig as tooltipConfig } from "@/components/ui/tooltip/config";
import { componentConfig as touchTargetConfig } from "@/components/ui/touch-target/config";
import { componentConfig as trackerConfig } from "@/components/ui/tracker/config";

// Create basic configs for components without full documentation yet
const createBasicConfig = (id: string, name: string, category: "ui" | "inputs" | "forms" | "charts", description: string): ComponentConfig => ({
  id,
  name,
  description,
  category,
  componentId: name,
  importStatement: `import { ${name} } from "@patternmode/ui";`,
  examples: [{
    id: "basic",
    title: "Basic Usage",
    description: `Basic ${name.toLowerCase()} usage`,
    code: `<${name} />`
  }]
});

// Component registry with all component configs
export const componentRegistry: ComponentConfigRegistry = {
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
  "context-menu": contextMenuConfig,
  "copy-button": copyButtonConfig,
  "date-picker": datePickerConfig,
  "date-range-picker": dateRangePickerConfig,
  "description-list": descriptionListConfig,
  dialog: dialogConfig,
  "dismiss-button": dismissButtonConfig,
  divider: dividerConfig,
  "donut-chart": donutChartConfig,
  dot: dotConfig,
  drawer: drawerConfig,
  "empty-state": emptyStateConfig,
  field: fieldConfig,
  fieldset: fieldsetConfig,
  form: formConfig,
  grid: gridConfig,
  heading: headingConfig,
  "heading-element": headingElementConfig,
  icon: iconConfig,
  "icon-container": iconContainerConfig,
  "icon-select": iconSelectConfig,
  input: inputConfig,
  inspector: inspectorConfig,
  kbd: kbdConfig,
  label: labelConfig,
  "line-chart": lineChartConfig,
  list: listConfig,
  loader: loaderConfig,
  menu: menuConfig,
  "menu-bar": menuBarConfig,
  meter: meterConfig,
  navbar: navbarConfig,
  "navigation-menu": navigationMenuConfig,
  "number-field": numberFieldConfig,
  pagination: paginationConfig,
  popover: popoverConfig,
  "preview-card": previewCardConfig,
  progress: progressConfig,
  "progress-circle": progressCircleConfig,
  radio: radioConfig,
  "radio-card-group": radioCardGroupConfig,
  "radio-group": radioGroupConfig,
  "responsive-drawer": responsiveDrawerConfig,
  "scroll-area": scrollAreaConfig,
  select: selectConfig,
  "select-native": selectNativeConfig,
  separator: separatorConfig,
  sheet: sheetConfig,
  sidebar: sidebarConfig,
  skeleton: skeletonConfig,
  slider: sliderConfig,
  "spark-chart": sparkChartConfig,
  "split-button": splitButtonConfig,
  stack: stackConfig,
  "stacked-list": stackedListConfig,
  subheading: subheadingConfig,
  switch: switchConfig,
  table: tableConfig,
  "tab-navigation": tabNavigationConfig,
  tabs: tabsConfig,
  tag: tagConfig,
  "tag-input": tagInputConfig,
  text: textConfig,
  textarea: textareaConfig,
  toast: toastConfig,
  toggle: toggleConfig,
  "toggle-group": toggleGroupConfig,
  toolbar: toolbarConfig,
  tooltip: tooltipConfig,
  "touch-target": touchTargetConfig,
  tracker: trackerConfig,
};

// Component list organized by categories - ALL components from UI package
export const COMPONENT_LIST = {
  text: [
    "code-block",
    "heading",
    "heading-element", 
    "kbd",
    "subheading",
    "text",
  ],
  layout: [
    "card",
    "divider",
    "grid",
    "preview-card",
    "separator",
    "stack",
  ],
  navigation: [
    "breadcrumbs",
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
    "menu",
    "popover",
    "responsive-drawer",
    "sheet",
    "tooltip",
  ],
  data: [
    "accordion",
    "collapsible",
    "description-list",
    "list",
    "stacked-list",
    "table",
    "tracker",
  ],
  media: [
    "avatar",
    "carousel", 
    "empty-state",
    "icon",
    "icon-container",
    "inspector",
  ],
  utility: [
    "copy-button",
    "dismiss-button",
    "scroll-area",
    "touch-target",
  ],
  inputs: [
    "button",
    "calendar",
    "checkbox",
    "checkbox-group",
    "combobox",
    "date-picker",
    "date-range-picker",
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
  forms: ["field", "fieldset", "form", "label", "tag-input"],
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

// Web app specific functions for the prop explorer system
export function getComponentsByCategory(category: string) {
  const componentIds = COMPONENT_LIST[category as keyof typeof COMPONENT_LIST] || [];
  return componentIds.map(id => componentRegistry[id]).filter(Boolean);
}

export function getComponentConfig(componentId: string) {
  return componentRegistry[componentId];
}