import type { ComponentConfig } from "../lib/component-config-types";

// Import all component configs
import { componentConfig as accordionConfig } from "./accordion/component.config";
import { componentConfig as alertDialogConfig } from "./alert-dialog/component.config";
import { componentConfig as areaChartConfig } from "./area-chart/component.config";
import { componentConfig as avatarConfig } from "./avatar/component.config";
import { componentConfig as badgeConfig } from "./badge/component.config";
import { componentConfig as barChartConfig } from "./bar-chart/component.config";
import { componentConfig as barListConfig } from "./bar-list/component.config";
import { componentConfig as breadcrumbsConfig } from "./breadcrumbs/component.config";
import { componentConfig as buttonConfig } from "./button/component.config";
import { componentConfig as calendarConfig } from "./calendar/component.config";
import { componentConfig as calloutConfig } from "./callout/component.config";
import { componentConfig as cardConfig } from "./card/component.config";
import { componentConfig as carouselConfig } from "./carousel/component.config";
import { componentConfig as categoryBarConfig } from "./category-bar/component.config";
import { componentConfig as checkboxGroupConfig } from "./checkbox-group/component.config";
import { componentConfig as checkboxConfig } from "./checkbox/component.config";
import { componentConfig as codeBlockConfig } from "./code-block/component.config";
import { componentConfig as collapsibleConfig } from "./collapsible/component.config";
import { componentConfig as comboChartConfig } from "./combo-chart/component.config";
import { componentConfig as comboboxConfig } from "./combobox/component.config";
import { componentConfig as contextMenuConfig } from "./context-menu/component.config";
import { componentConfig as copyButtonConfig } from "./copy-button/component.config";
import { componentConfig as datePickerConfig } from "./date-picker/component.config";
import { componentConfig as descriptionListConfig } from "./description-list/component.config";
import { componentConfig as dialogConfig } from "./dialog/component.config";
import { componentConfig as dismissButtonConfig } from "./dismiss-button/component.config";
import { componentConfig as dividerConfig } from "./divider/component.config";
import { componentConfig as donutChartConfig } from "./donut-chart/component.config";
import { componentConfig as dotConfig } from "./dot/component.config";
import { componentConfig as drawerConfig } from "./drawer/component.config";
import { componentConfig as dropdownItemConfig } from "./dropdown-item/component.config";
import { componentConfig as emptyStateConfig } from "./empty-state/component.config";
import { componentConfig as fieldArrayConfig } from "./field-array/component.config";
import { componentConfig as fieldConfig } from "./field/component.config";
import { componentConfig as fieldsetConfig } from "./fieldset/component.config";
import { componentConfig as formConfig } from "./form/component.config";
import { componentConfig as gridConfig } from "./grid/component.config";
import { componentConfig as headingElementConfig } from "./heading-element/component.config";
import { componentConfig as headingConfig } from "./heading/component.config";
import { componentConfig as iconContainerConfig } from "./icon-container/component.config";
import { componentConfig as iconSelectConfig } from "./icon-select/component.config";
import { componentConfig as iconConfig } from "./icon/component.config";
import { componentConfig as inputConfig } from "./input/component.config";
import { componentConfig as inspectorConfig } from "./inspector/component.config";
import { componentConfig as kbdConfig } from "./kbd/component.config";
import { componentConfig as labelConfig } from "./label/component.config";
import { componentConfig as lineChartConfig } from "./line-chart/component.config";
import { componentConfig as textListConfig } from "./text-list/component.config";
import { componentConfig as loaderConfig } from "./loader/component.config";
import { componentConfig as menuBarConfig } from "./menu-bar/component.config";
import { componentConfig as menuConfig } from "./menu/component.config";
import { componentConfig as meterConfig } from "./meter/component.config";
import { componentConfig as navbarConfig } from "./navbar/component.config";
import { componentConfig as navigationMenuConfig } from "./navigation-menu/component.config";
import { componentConfig as numberFieldConfig } from "./number-field/component.config";
import { componentConfig as paginationConfig } from "./pagination/component.config";
import { componentConfig as popoverConfig } from "./popover/component.config";
import { componentConfig as previewCardConfig } from "./preview-card/component.config";
import { componentConfig as progressCircleConfig } from "./progress-circle/component.config";
import { componentConfig as progressConfig } from "./progress/component.config";
import { componentConfig as radioCardGroupConfig } from "./radio-card-group/component.config";
import { componentConfig as radioGroupConfig } from "./radio-group/component.config";
import { componentConfig as radioConfig } from "./radio/component.config";
import { componentConfig as responsiveDrawerConfig } from "./responsive-drawer/component.config";
import { componentConfig as scrollAreaConfig } from "./scroll-area/component.config";
import { componentConfig as selectNativeConfig } from "./select-native/component.config";
import { componentConfig as selectConfig } from "./select/component.config";
import { componentConfig as separatorConfig } from "./separator/component.config";
import { componentConfig as sheetConfig } from "./sheet/component.config";
import { componentConfig as sidebarConfig } from "./sidebar/component.config";
import { componentConfig as skeletonConfig } from "./skeleton/component.config";
import { componentConfig as sliderConfig } from "./slider/component.config";
import { componentConfig as sparkChartConfig } from "./spark-chart/component.config";
import { componentConfig as splitButtonConfig } from "./split-button/component.config";
import { componentConfig as stackConfig } from "./stack/component.config";
import { componentConfig as stackedListConfig } from "./stacked-list/component.config";
import { componentConfig as subheadingConfig } from "./subheading/component.config";
import { componentConfig as switchConfig } from "./switch/component.config";
import { componentConfig as tabNavigationConfig } from "./tab-navigation/component.config";
import { componentConfig as tableConfig } from "./table/component.config";
import { componentConfig as tabsConfig } from "./tabs/component.config";
import { componentConfig as tagInputConfig } from "./tag-input/component.config";
import { componentConfig as tagConfig } from "./tag/component.config";
import { componentConfig as textConfig } from "./text/component.config";
import { componentConfig as textareaConfig } from "./textarea/component.config";
import { componentConfig as toastConfig } from "./toast/component.config";
import { componentConfig as toggleGroupConfig } from "./toggle-group/component.config";
import { componentConfig as toggleConfig } from "./toggle/component.config";
import { componentConfig as toolbarConfig } from "./toolbar/component.config";
import { componentConfig as tooltipConfig } from "./tooltip/component.config";
import { componentConfig as trackerConfig } from "./tracker/component.config";

export const COMPONENT_REGISTRY = {
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
  "description-list": descriptionListConfig,
  "dialog": dialogConfig,
  "dismiss-button": dismissButtonConfig,
  "divider": dividerConfig,
  "donut-chart": donutChartConfig,
  "dot": dotConfig,
  "drawer": drawerConfig,
  "dropdown-item": dropdownItemConfig,
  "empty-state": emptyStateConfig,
  "field": fieldConfig,
  "field-array": fieldArrayConfig,
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
  "text-list": textListConfig,
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
  "tab-navigation": tabNavigationConfig,
  "table": tableConfig,
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
  "tracker": trackerConfig,
} as const satisfies Record<string, ComponentConfig>;

// Derive types automatically
export type ComponentId = keyof typeof COMPONENT_REGISTRY;

// Helper functions
export function getComponentConfig(id: string): ComponentConfig | undefined {
  return COMPONENT_REGISTRY[id as ComponentId];
}

export function getAllComponents(): ComponentConfig[] {
  return Object.values(COMPONENT_REGISTRY);
}

export function getComponentsByCategory(category: string): ComponentConfig[] {
  return Object.values(COMPONENT_REGISTRY).filter(
    config => config.category === category,
  );
}

export function getTotalComponentsCount(): number {
  return Object.keys(COMPONENT_REGISTRY).length;
}

// Component list organized by categories (derived automatically)
export const COMPONENT_LIST = Object.values(COMPONENT_REGISTRY).reduce((acc, config) => {
  const category = config.category;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(config.id);
  return acc;
}, {} as Record<string, string[]>);

// Category configuration for web app
export const CATEGORY_CONFIG = [
  { key: "data", name: "Data", description: "Components for displaying data" },
  { key: "ui", name: "Interface", description: "Core UI components" },
  { key: "charts", name: "Charts", description: "Data visualization components" },
  { key: "navigation", name: "Navigation", description: "Navigation components" },
  { key: "inputs", name: "Inputs", description: "Form input components" },
  { key: "utility", name: "Utility", description: "Utility components" },
  { key: "forms", name: "Forms", description: "Form components" },
  { key: "layout", name: "Layout", description: "Layout components" },
  { key: "typography", name: "Typography", description: "Text components" },
  { key: "feedback", name: "Feedback", description: "Feedback components" },
  { key: "media", name: "Media", description: "Media and visual components" },
  { key: "overlay", name: "Overlay", description: "Overlay and modal components" },
  { key: "text", name: "Text", description: "Text and typography components" },
] as const;

export type CategoryKey = typeof CATEGORY_CONFIG[number]["key"];

// Legacy compatibility exports (for existing imports)
export const componentRegistry = COMPONENT_REGISTRY;
export type ComponentConfigRegistry = typeof COMPONENT_REGISTRY;
