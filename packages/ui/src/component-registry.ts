// Import local types and create registry from configs
import type { ComponentConfig, ComponentConfigRegistry } from "./lib/component-config-types";

// Import all component configs from the web app
import { componentConfig as accordionConfig } from "./components/accordion/config";
import { componentConfig as alertDialogConfig } from "./components/alert-dialog/config";
import { componentConfig as areaChartConfig } from "./components/area-chart/config";
import { componentConfig as avatarConfig } from "./components/avatar/config";
import { componentConfig as badgeConfig } from "./components/badge/config";
import { componentConfig as barChartConfig } from "./components/bar-chart/config";
import { componentConfig as barListConfig } from "./components/bar-list/config";
import { componentConfig as breadcrumbsConfig } from "./components/breadcrumbs/config";
import { componentConfig as buttonConfig } from "./components/button/config";
import { componentConfig as calendarConfig } from "./components/calendar/config";
import { componentConfig as calloutConfig } from "./components/callout/config";
import { componentConfig as cardConfig } from "./components/card/config";
import { componentConfig as carouselConfig } from "./components/carousel/config";
import { componentConfig as categoryBarConfig } from "./components/category-bar/config";
import { componentConfig as checkboxGroupConfig } from "./components/checkbox-group/config";
import { componentConfig as checkboxConfig } from "./components/checkbox/config";
import { componentConfig as codeBlockConfig } from "./components/code-block/config";
import { componentConfig as collapsibleConfig } from "./components/collapsible/config";
import { componentConfig as comboChartConfig } from "./components/combo-chart/config";
import { componentConfig as comboboxConfig } from "./components/combobox/config";
import { componentConfig as contextMenuConfig } from "./components/context-menu/config";
import { componentConfig as copyButtonConfig } from "./components/copy-button/config";
import { componentConfig as datePickerConfig } from "./components/date-picker/config";
import { componentConfig as dateRangePickerConfig } from "./components/date-range-picker/config";
import { componentConfig as descriptionListConfig } from "./components/description-list/config";
import { componentConfig as dialogConfig } from "./components/dialog/config";
import { componentConfig as dismissButtonConfig } from "./components/dismiss-button/config";
import { componentConfig as dividerConfig } from "./components/divider/config";
import { componentConfig as donutChartConfig } from "./components/donut-chart/config";
import { componentConfig as dotConfig } from "./components/dot/config";
import { componentConfig as drawerConfig } from "./components/drawer/config";
import { componentConfig as emptyStateConfig } from "./components/empty-state/config";
import { componentConfig as fieldConfig } from "./components/field/config";
import { componentConfig as fieldsetConfig } from "./components/fieldset/config";
import { componentConfig as formConfig } from "./components/form/config";
import { componentConfig as gridConfig } from "./components/grid/config";
import { componentConfig as headingElementConfig } from "./components/heading-element/config";
import { componentConfig as headingConfig } from "./components/heading/config";
import { componentConfig as iconContainerConfig } from "./components/icon-container/config";
import { componentConfig as iconSelectConfig } from "./components/icon-select/config";
import { componentConfig as iconConfig } from "./components/icon/config";
import { componentConfig as inputConfig } from "./components/input/config";
import { componentConfig as inspectorConfig } from "./components/inspector/config";
import { componentConfig as kbdConfig } from "./components/kbd/config";
import { componentConfig as labelConfig } from "./components/label/config";
import { componentConfig as lineChartConfig } from "./components/line-chart/config";
import { componentConfig as listConfig } from "./components/list/config";
import { componentConfig as loaderConfig } from "./components/loader/config";
import { componentConfig as menuBarConfig } from "./components/menu-bar/config";
import { componentConfig as menuConfig } from "./components/menu/config";
import { componentConfig as meterConfig } from "./components/meter/config";
import { componentConfig as navbarConfig } from "./components/navbar/config";
import { componentConfig as navigationMenuConfig } from "./components/navigation-menu/config";
import { componentConfig as numberFieldConfig } from "./components/number-field/config";
import { componentConfig as paginationConfig } from "./components/pagination/config";
import { componentConfig as popoverConfig } from "./components/popover/config";
import { componentConfig as previewCardConfig } from "./components/preview-card/config";
import { componentConfig as progressCircleConfig } from "./components/progress-circle/config";
import { componentConfig as progressConfig } from "./components/progress/config";
import { componentConfig as radioCardGroupConfig } from "./components/radio-card-group/config";
import { componentConfig as radioGroupConfig } from "./components/radio-group/config";
import { componentConfig as radioConfig } from "./components/radio/config";
import { componentConfig as responsiveDrawerConfig } from "./components/responsive-drawer/config";
import { componentConfig as scrollAreaConfig } from "./components/scroll-area/config";
import { componentConfig as selectNativeConfig } from "./components/select-native/config";
import { componentConfig as selectConfig } from "./components/select/config";
import { componentConfig as separatorConfig } from "./components/separator/config";
import { componentConfig as sheetConfig } from "./components/sheet/config";
import { componentConfig as sidebarConfig } from "./components/sidebar/config";
import { componentConfig as skeletonConfig } from "./components/skeleton/config";
import { componentConfig as sliderConfig } from "./components/slider/config";
import { componentConfig as sparkChartConfig } from "./components/spark-chart/config";
import { componentConfig as splitButtonConfig } from "./components/split-button/config";
import { componentConfig as stackConfig } from "./components/stack/config";
import { componentConfig as stackedListConfig } from "./components/stacked-list/config";
import { componentConfig as subheadingConfig } from "./components/subheading/config";
import { componentConfig as switchConfig } from "./components/switch/config";
import { componentConfig as tabNavigationConfig } from "./components/tab-navigation/config";
import { componentConfig as tableConfig } from "./components/table/config";
import { componentConfig as tabsConfig } from "./components/tabs/config";
import { componentConfig as tagInputConfig } from "./components/tag-input/config";
import { componentConfig as tagConfig } from "./components/tag/config";
import { componentConfig as textConfig } from "./components/text/config";
import { componentConfig as textareaConfig } from "./components/textarea/config";
import { componentConfig as toastConfig } from "./components/toast/config";
import { componentConfig as toggleGroupConfig } from "./components/toggle-group/config";
import { componentConfig as toggleConfig } from "./components/toggle/config";
import { componentConfig as toolbarConfig } from "./components/toolbar/config";
import { componentConfig as tooltipConfig } from "./components/tooltip/config";
import { componentConfig as touchTargetConfig } from "./components/touch-target/config";
import { componentConfig as trackerConfig } from "./components/tracker/config";

// Create basic configs for components without full documentation yet
const createBasicConfig = (
  id: string,
  name: string,
  category: "ui" | "inputs" | "forms" | "charts",
  description: string,
): ComponentConfig => ({
  id,
  name,
  description,
  category,
  componentId: name,
  importStatement: `import { ${name} } from "@patternmode/ui";`,
  props: [],
  examples: [
    {
      id: "basic",
      title: "Basic Usage",
      description: `Basic ${name.toLowerCase()} usage`,
      code: `<${name} />`,
    },
  ],
});

// Component registry with all component configs
export const componentRegistry: ComponentConfigRegistry = {
  "accordion": accordionConfig,
  "alert-dialog": alertDialogConfig,
  "area-chart": areaChartConfig,
  "avatar": avatarConfig,
  "badge": badgeConfig,
  "bar-chart": barChartConfig,
  "bar-list": barListConfig,
  "breadcrumbs": breadcrumbsConfig,
  "button": buttonConfig,
  "calendar": calendarConfig,
  "callout": calloutConfig,
  "card": cardConfig,
  "carousel": carouselConfig,
  "category-bar": categoryBarConfig,
  "checkbox": checkboxConfig,
  "checkbox-group": checkboxGroupConfig,
  "code-block": codeBlockConfig,
  "collapsible": collapsibleConfig,
  "combo-chart": comboChartConfig,
  "combobox": comboboxConfig,
  "context-menu": contextMenuConfig,
  "copy-button": copyButtonConfig,
  "date-picker": datePickerConfig,
  "date-range-picker": dateRangePickerConfig,
  "description-list": descriptionListConfig,
  "dialog": dialogConfig,
  "dismiss-button": dismissButtonConfig,
  "divider": dividerConfig,
  "donut-chart": donutChartConfig,
  "dot": dotConfig,
  "drawer": drawerConfig,
  "empty-state": emptyStateConfig,
  "field": fieldConfig,
  "fieldset": fieldsetConfig,
  "form": formConfig,
  "grid": gridConfig,
  "heading": headingConfig,
  "heading-element": headingElementConfig,
  "icon": iconConfig,
  "icon-container": iconContainerConfig,
  "icon-select": iconSelectConfig,
  "input": inputConfig,
  "inspector": inspectorConfig,
  "kbd": kbdConfig,
  "label": labelConfig,
  "line-chart": lineChartConfig,
  "list": listConfig,
  "loader": loaderConfig,
  "menu": menuConfig,
  "menu-bar": menuBarConfig,
  "meter": meterConfig,
  "navbar": navbarConfig,
  "navigation-menu": navigationMenuConfig,
  "number-field": numberFieldConfig,
  "pagination": paginationConfig,
  "popover": popoverConfig,
  "preview-card": previewCardConfig,
  "progress": progressConfig,
  "progress-circle": progressCircleConfig,
  "radio": radioConfig,
  "radio-card-group": radioCardGroupConfig,
  "radio-group": radioGroupConfig,
  "responsive-drawer": responsiveDrawerConfig,
  "scroll-area": scrollAreaConfig,
  "select": selectConfig,
  "select-native": selectNativeConfig,
  "separator": separatorConfig,
  "sheet": sheetConfig,
  "sidebar": sidebarConfig,
  "skeleton": skeletonConfig,
  "slider": sliderConfig,
  "spark-chart": sparkChartConfig,
  "split-button": splitButtonConfig,
  "stack": stackConfig,
  "stacked-list": stackedListConfig,
  "subheading": subheadingConfig,
  "switch": switchConfig,
  "table": tableConfig,
  "tab-navigation": tabNavigationConfig,
  "tabs": tabsConfig,
  "tag": tagConfig,
  "tag-input": tagInputConfig,
  "text": textConfig,
  "textarea": textareaConfig,
  "toast": toastConfig,
  "toggle": toggleConfig,
  "toggle-group": toggleGroupConfig,
  "toolbar": toolbarConfig,
  "tooltip": tooltipConfig,
  "touch-target": touchTargetConfig,
  "tracker": trackerConfig,
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
  layout: ["card", "divider", "grid", "preview-card", "separator", "stack"],
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
  utility: ["copy-button", "dismiss-button", "scroll-area", "touch-target"],
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
export type ComponentId
  = | (typeof COMPONENT_LIST.text)[number]
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
  const componentIds
    = COMPONENT_LIST[category as keyof typeof COMPONENT_LIST] || [];
  return componentIds.map(id => componentRegistry[id]).filter(Boolean);
}

export function getComponentConfig(componentId: string) {
  return componentRegistry[componentId];
}
