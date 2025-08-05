import type React from "react";

import type { ComponentConfig, PropMetadata } from "../lib/component-config-types";

// Import all component configs
import { accordionConfig } from "./accordion/config";
import { alertDialogConfig } from "./alert-dialog/config";
import { areaChartConfig } from "./area-chart/config";
import { avatarConfig } from "./avatar/config";
import { badgeConfig } from "./badge/config";
import { barChartConfig } from "./bar-chart/config";
import { barListConfig } from "./bar-list/config";
import { breadcrumbsConfig } from "./breadcrumbs/config";
import { buttonConfig } from "./button/config";
import { buttonGroupConfig } from "./button-group/config";
import { calendarConfig } from "./calendar/config";
import { calloutConfig } from "./callout/config";
import { cardConfig } from "./card/config";
import { carouselConfig } from "./carousel/config";
import { categoryBarConfig } from "./category-bar/config";
import { checkboxConfig } from "./checkbox/config";
import { checkboxGroupConfig } from "./checkbox-group/config";
import { codeBlockConfig } from "./code-block/config";
import { collapsibleConfig } from "./collapsible/config";
import { comboChartConfig } from "./combo-chart/config";
import { comboboxConfig } from "./combobox/config";
import { contextMenuConfig } from "./context-menu/config";
import { copyButtonConfig } from "./copy-button/config";
import { datePickerConfig } from "./date-picker/config";
import { descriptionListConfig } from "./description-list/config";
import { dialogConfig } from "./dialog/config";
import { dismissButtonConfig } from "./dismiss-button/config";
import { dividerConfig } from "./divider/config";
import { donutChartConfig } from "./donut-chart/config";
import { dotConfig } from "./dot/config";
import { drawerConfig } from "./drawer/config";
import { dropdownItemConfig } from "./dropdown-item/config";
import { emptyStateConfig } from "./empty-state/config";
import { fieldConfig } from "./field/config";
import { fieldArrayConfig } from "./field-array/config";
import { fieldsetConfig } from "./fieldset/config";
import { formConfig } from "./form/config";
import { gridConfig } from "./grid/config";
import { headingConfig } from "./heading/config";
import { headingElementConfig } from "./heading-element/config";
import { iconConfig } from "./icon/config";
import { iconContainerConfig } from "./icon-container/config";
import { iconSelectConfig } from "./icon-select/config";
import { inputConfig } from "./input/config";
import { kbdConfig } from "./kbd/config";
import { labelConfig } from "./label/config";
import { lineChartConfig } from "./line-chart/config";
import { loaderConfig } from "./loader/config";
import { menuConfig } from "./menu/config";
import { menuBarConfig } from "./menu-bar/config";
import { meterConfig } from "./meter/config";
import { navbarConfig } from "./navbar/config";
import { navigationMenuConfig } from "./navigation-menu/config";
import { numberFieldConfig } from "./number-field/config";
import { paginationConfig } from "./pagination/config";
import { popoverConfig } from "./popover/config";
import { previewCardConfig } from "./preview-card/config";
import { progressConfig } from "./progress/config";
import { progressCircleConfig } from "./progress-circle/config";
import { radioConfig } from "./radio/config";
import { radioCardGroupConfig } from "./radio-card-group/config";
import { radioGroupConfig } from "./radio-group/config";
import { responsiveDrawerConfig } from "./responsive-drawer/config";
import { scrollAreaConfig } from "./scroll-area/config";
import { searchFieldConfig } from "./search-field/config";
import { selectConfig } from "./select/config";
import { selectNativeConfig } from "./select-native/config";
import { separatorConfig } from "./separator/config";
import { sheetConfig } from "./sheet/config";
import { sidebarConfig } from "./sidebar/config";
import { skeletonConfig } from "./skeleton/config";
import { sliderConfig } from "./slider/config";
import { sparkChartConfig } from "./spark-chart/config";
import { splitButtonConfig } from "./split-button/config";
import { stackConfig } from "./stack/config";
import { stackedListConfig } from "./stacked-list/config";
import { subheadingConfig } from "./subheading/config";
import { switchConfig } from "./switch/config";
import { tabNavigationConfig } from "./tab-navigation/config";
import { tableConfig } from "./table/config";
import { tabsConfig } from "./tabs/config";
import { tagConfig } from "./tag/config";
import { tagGroupConfig } from "./tag-group/config";
import { tagInputConfig } from "./tag-input/config";
import { textConfig } from "./text/config";
import { textListConfig } from "./text-list/config";
import { textareaConfig } from "./textarea/config";
import { toastConfig } from "./toast/config";
import { toggleConfig } from "./toggle/config";
import { toggleGroupConfig } from "./toggle-group/config";
import { toolbarConfig } from "./toolbar/config";
import { tooltipConfig } from "./tooltip/config";
import { trackerConfig } from "./tracker/config";

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
  "button-group": buttonGroupConfig,
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
  "kbd": kbdConfig,
  "label": labelConfig,
  "line-chart": lineChartConfig,
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
  "search-field": searchFieldConfig,
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
  "tag-group": tagGroupConfig,
  "tag-input": tagInputConfig,
  "text": textConfig,
  "text-list": textListConfig,
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

// Cache for dynamically imported preview components
const previewComponentCache = new Map<string, React.ComponentType<any> | null>();

export async function getPreviewComponent(id: string): Promise<React.ComponentType<any> | undefined> {
  // Check cache first
  if (previewComponentCache.has(id)) {
    const cached = previewComponentCache.get(id);
    return cached || undefined;
  }

  try {
    // Convert kebab-case to PascalCase for the preview component name
    const componentName = id
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");

    const previewComponentName = `${componentName}Preview`;

    // Dynamically import the preview component
    const previewModule = await import(`./${id}/preview`);
    const PreviewComponent = previewModule[previewComponentName];

    if (PreviewComponent) {
      previewComponentCache.set(id, PreviewComponent);
      return PreviewComponent;
    } else {
      // Cache null to avoid repeated failed imports
      previewComponentCache.set(id, null);
      return undefined;
    }
  } catch {
    // If preview doesn't exist, try to get the primary component from config
    const config = getComponentConfig(id);
    let fallbackComponent: React.ComponentType<any> | undefined;

    // First try the direct component property
    if (config?.component) {
      fallbackComponent = config.component;
    }
    // Then try the primary component from components array
    else if (config?.components) {
      const primaryComponent = config.components.find(c => c.primary);
      fallbackComponent = primaryComponent?.component || config.components[0]?.component;
    }

    // Cache the result (null if no fallback found)
    previewComponentCache.set(id, fallbackComponent || null);
    return fallbackComponent;
  }
}

export function getPreviewProps(id: string): PropMetadata[] {
  const config = getComponentConfig(id);
  return config?.props || [];
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
  { key: "display", name: "Display & Content", description: "Components for displaying and organizing content" },
  { key: "controls", name: "Interactive Controls", description: "User interaction and input components" },
  { key: "layout", name: "Layout & Structure", description: "Components for page structure and spacing" },
  { key: "overlay", name: "Overlays & Modals", description: "Components that appear over content" },
  { key: "visual", name: "Visual Elements", description: "Small visual indicators and decorative elements" },
  { key: "actions", name: "Actions & Commands", description: "Components that trigger actions or display commands" },
  { key: "media", name: "Media & Rich Content", description: "Components for rich media and complex content display" },
  { key: "typography", name: "Typography", description: "Text and typography components" },
  { key: "navigation", name: "Navigation", description: "Navigation and wayfinding components" },
  { key: "charts", name: "Charts", description: "Data visualization components for displaying metrics and analytics" },
  { key: "feedback", name: "Feedback", description: "Status indicators, notifications, and user feedback components" },
  { key: "forms", name: "Forms", description: "Form layouts and validation components for complex data entry" },
  { key: "data", name: "Data", description: "Components for displaying and organizing structured data" },
  { key: "ui", name: "UI", description: "Core user interface components for building applications" },
  { key: "inputs", name: "Inputs", description: "Form inputs and interactive controls for user data collection" },
  { key: "utility", name: "Utility", description: "Helper components and tools for enhanced functionality" },
] as const;

export type CategoryKey = typeof CATEGORY_CONFIG[number]["key"];

export function getCategoryInfo(categoryKey: string) {
  const category = CATEGORY_CONFIG.find(c => c.key === categoryKey);
  if (!category) {
    return null;
  }

  return {
    title: `${category.name} Components`,
    description: category.description,
  };
}

// Legacy compatibility exports (for existing imports)
export const componentRegistry = COMPONENT_REGISTRY;
export type ComponentConfigRegistry = typeof COMPONENT_REGISTRY;
