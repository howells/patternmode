import type React from "react";

import type { ComponentConfig, PropMetadata } from "../lib/component-config-types";

// Import all component configs
import { accordionConfig } from "./accordion/config";
// Import all preview components
import { AccordionPreview } from "./accordion/preview";
import { alertDialogConfig } from "./alert-dialog/config";
import { AlertDialogPreview } from "./alert-dialog/preview";
import { areaChartConfig } from "./area-chart/config";
import { AreaChartPreview } from "./area-chart/preview";
import { avatarConfig } from "./avatar/config";
import { AvatarPreview } from "./avatar/preview";
import { badgeConfig } from "./badge/config";
import { BadgePreview } from "./badge/preview";
import { barChartConfig } from "./bar-chart/config";
import { BarChartPreview } from "./bar-chart/preview";
import { barListConfig } from "./bar-list/config";
import { BarListPreview } from "./bar-list/preview";
import { breadcrumbsConfig } from "./breadcrumbs/config";
import { BreadcrumbsPreview } from "./breadcrumbs/preview";
import { buttonGroupConfig } from "./button-group/config";
import { ButtonGroupPreview } from "./button-group/preview";
import { buttonConfig } from "./button/config";
import { ButtonPreview } from "./button/preview";
import { calendarConfig } from "./calendar/config";
import { CalendarPreview } from "./calendar/preview";
import { calloutConfig } from "./callout/config";
import { CalloutPreview } from "./callout/preview";
import { cardConfig } from "./card/config";
import { CardPreview } from "./card/preview";
import { carouselConfig } from "./carousel/config";
import { CarouselPreview } from "./carousel/preview";
import { categoryBarConfig } from "./category-bar/config";
import { CategoryBarPreview } from "./category-bar/preview";
import { checkboxGroupConfig } from "./checkbox-group/config";
import { CheckboxGroupPreview } from "./checkbox-group/preview";
import { checkboxConfig } from "./checkbox/config";
import { CheckboxPreview } from "./checkbox/preview";
import { codeBlockConfig } from "./code-block/config";
import { CodeBlockPreview } from "./code-block/preview";
import { collapsibleConfig } from "./collapsible/config";
import { CollapsiblePreview } from "./collapsible/preview";
import { comboChartConfig } from "./combo-chart/config";
import { ComboChartPreview } from "./combo-chart/preview";
import { comboboxConfig } from "./combobox/config";
import { ComboboxPreview } from "./combobox/preview";
import { contextMenuConfig } from "./context-menu/config";
import { ContextMenuPreview } from "./context-menu/preview";
import { copyButtonConfig } from "./copy-button/config";
import { CopyButtonPreview } from "./copy-button/preview";
import { datePickerConfig } from "./date-picker/config";
import { DatePickerPreview } from "./date-picker/preview";
import { descriptionListConfig } from "./description-list/config";
import { DescriptionListPreview } from "./description-list/preview";
import { dialogConfig } from "./dialog/config";
import { DialogPreview } from "./dialog/preview";
import { dismissButtonConfig } from "./dismiss-button/config";
import { DismissButtonPreview } from "./dismiss-button/preview";
import { dividerConfig } from "./divider/config";
import { DividerPreview } from "./divider/preview";
import { donutChartConfig } from "./donut-chart/config";
import { DonutChartPreview } from "./donut-chart/preview";
import { dotConfig } from "./dot/config";
import { DotPreview } from "./dot/preview";
import { drawerConfig } from "./drawer/config";
import { DrawerPreview } from "./drawer/preview";
import { dropdownItemConfig } from "./dropdown-item/config";
import { DropdownItemPreview } from "./dropdown-item/preview";
import { emptyStateConfig } from "./empty-state/config";
import { EmptyStatePreview } from "./empty-state/preview";
import { fieldArrayConfig } from "./field-array/config";
import { FieldArrayPreview } from "./field-array/preview";
import { fieldConfig } from "./field/config";
import { FieldPreview } from "./field/preview";
import { fieldsetConfig } from "./fieldset/config";
import { FieldsetPreview } from "./fieldset/preview";
import { formConfig } from "./form/config";
import { FormPreview } from "./form/preview";
import { gridConfig } from "./grid/config";
import { GridPreview } from "./grid/preview";
import { headingElementConfig } from "./heading-element/config";
import { HeadingElementPreview } from "./heading-element/preview";
import { headingConfig } from "./heading/config";
import { HeadingPreview } from "./heading/preview";
import { iconContainerConfig } from "./icon-container/config";
import { IconContainerPreview } from "./icon-container/preview";
import { iconSelectConfig } from "./icon-select/config";
import { IconSelectPreview } from "./icon-select/preview";
import { iconConfig } from "./icon/config";
import { IconPreview } from "./icon/preview";
import { inputConfig } from "./input/config";
import { InputPreview } from "./input/preview";
import { kbdConfig } from "./kbd/config";
import { KbdPreview } from "./kbd/preview";
import { labelConfig } from "./label/config";
import { LabelPreview } from "./label/preview";
import { lineChartConfig } from "./line-chart/config";

import { LineChartPreview } from "./line-chart/preview";
import { loaderConfig } from "./loader/config";
import { LoaderPreview } from "./loader/preview";
import { menuBarConfig } from "./menu-bar/config";
import { MenuBarPreview } from "./menu-bar/preview";
import { menuConfig } from "./menu/config";
import { MenuPreview } from "./menu/preview";
import { meterConfig } from "./meter/config";
import { MeterPreview } from "./meter/preview";
import { navbarConfig } from "./navbar/config";
import { NavbarPreview } from "./navbar/preview";
import { navigationMenuConfig } from "./navigation-menu/config";
import { NavigationMenuPreview } from "./navigation-menu/preview";
import { numberFieldConfig } from "./number-field/config";
import { NumberFieldPreview } from "./number-field/preview";
import { paginationConfig } from "./pagination/config";
import { PaginationPreview } from "./pagination/preview";
import { popoverConfig } from "./popover/config";
import { PopoverPreview } from "./popover/preview";
import { previewCardConfig } from "./preview-card/config";
import { PreviewCardPreview } from "./preview-card/preview";
import { progressCircleConfig } from "./progress-circle/config";
import { ProgressCirclePreview } from "./progress-circle/preview";
import { progressConfig } from "./progress/config";
import { ProgressPreview } from "./progress/preview";
import { radioCardGroupConfig } from "./radio-card-group/config";
import { RadioCardGroupPreview } from "./radio-card-group/preview";
import { radioGroupConfig } from "./radio-group/config";
import { RadioGroupPreview } from "./radio-group/preview";
import { radioConfig } from "./radio/config";
import { RadioPreview } from "./radio/preview";
import { responsiveDrawerConfig } from "./responsive-drawer/config";
import { ResponsiveDrawerPreview } from "./responsive-drawer/preview";
import { scrollAreaConfig } from "./scroll-area/config";
import { ScrollAreaPreview } from "./scroll-area/preview";
import { searchFieldConfig } from "./search-field/config";
import { SearchFieldPreview } from "./search-field/preview";
import { selectNativeConfig } from "./select-native/config";
import { SelectNativePreview } from "./select-native/preview";
import { selectConfig } from "./select/config";
import { SelectPreview } from "./select/preview";
import { separatorConfig } from "./separator/config";
import { SeparatorPreview } from "./separator/preview";
import { sheetConfig } from "./sheet/config";
import { SheetPreview } from "./sheet/preview";
import { sidebarConfig } from "./sidebar/config";
import { SidebarPreview } from "./sidebar/preview";
import { skeletonConfig } from "./skeleton/config";
import { SkeletonPreview } from "./skeleton/preview";
import { sliderConfig } from "./slider/config";
import { SliderPreview } from "./slider/preview";
import { sparkChartConfig } from "./spark-chart/config";
import { SparkChartPreview } from "./spark-chart/preview";
import { splitButtonConfig } from "./split-button/config";
import { SplitButtonPreview } from "./split-button/preview";
import { stackConfig } from "./stack/config";
import { StackPreview } from "./stack/preview";
import { stackedListConfig } from "./stacked-list/config";
import { StackedListPreview } from "./stacked-list/preview";
import { subheadingConfig } from "./subheading/config";
import { SubheadingPreview } from "./subheading/preview";
import { switchConfig } from "./switch/config";
import { SwitchPreview } from "./switch/preview";
import { tabNavigationConfig } from "./tab-navigation/config";
import { TabNavigationPreview } from "./tab-navigation/preview";
import { tableConfig } from "./table/config";
import { TablePreview } from "./table/preview";
import { tabsConfig } from "./tabs/config";
import { TabsPreview } from "./tabs/preview";
import { tagGroupConfig } from "./tag-group/config";
import { TagGroupPreview } from "./tag-group/preview";
import { tagInputConfig } from "./tag-input/config";
import { TagInputPreview } from "./tag-input/preview";
import { tagConfig } from "./tag/config";
import { TagPreview } from "./tag/preview";
import { textListConfig } from "./text-list/config";
import { TextListPreview } from "./text-list/preview";
import { textConfig } from "./text/config";
import { TextPreview } from "./text/preview";
import { textareaConfig } from "./textarea/config";
import { TextareaPreview } from "./textarea/preview";
import { toastConfig } from "./toast/config";
import { ToastPreview } from "./toast/preview";
import { toggleGroupConfig } from "./toggle-group/config";
import { ToggleGroupPreview } from "./toggle-group/preview";
import { toggleConfig } from "./toggle/config";
import { TogglePreview } from "./toggle/preview";
import { toolbarConfig } from "./toolbar/config";
import { ToolbarPreview } from "./toolbar/preview";
import { tooltipConfig } from "./tooltip/config";
import { TooltipPreview } from "./tooltip/preview";
import { trackerConfig } from "./tracker/config";
import { TrackerPreview } from "./tracker/preview";

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

// Static preview component registry
export const PREVIEW_REGISTRY = {
  "accordion": AccordionPreview,
  "alert-dialog": AlertDialogPreview,
  "area-chart": AreaChartPreview,
  "avatar": AvatarPreview,
  "badge": BadgePreview,
  "bar-chart": BarChartPreview,
  "bar-list": BarListPreview,
  "breadcrumbs": BreadcrumbsPreview,
  "button": ButtonPreview,
  "button-group": ButtonGroupPreview,
  "calendar": CalendarPreview,
  "callout": CalloutPreview,
  "card": CardPreview,
  "carousel": CarouselPreview,
  "category-bar": CategoryBarPreview,
  "checkbox": CheckboxPreview,
  "checkbox-group": CheckboxGroupPreview,
  "code-block": CodeBlockPreview,
  "collapsible": CollapsiblePreview,
  "combo-chart": ComboChartPreview,
  "combobox": ComboboxPreview,
  "context-menu": ContextMenuPreview,
  "copy-button": CopyButtonPreview,
  "date-picker": DatePickerPreview,
  "description-list": DescriptionListPreview,
  "dialog": DialogPreview,
  "dismiss-button": DismissButtonPreview,
  "divider": DividerPreview,
  "donut-chart": DonutChartPreview,
  "dot": DotPreview,
  "drawer": DrawerPreview,
  "dropdown-item": DropdownItemPreview,
  "empty-state": EmptyStatePreview,
  "field": FieldPreview,
  "field-array": FieldArrayPreview,
  "fieldset": FieldsetPreview,
  "form": FormPreview,
  "grid": GridPreview,
  "heading": HeadingPreview,
  "heading-element": HeadingElementPreview,
  "icon": IconPreview,
  "icon-container": IconContainerPreview,
  "icon-select": IconSelectPreview,
  "input": InputPreview,
  "kbd": KbdPreview,
  "label": LabelPreview,
  "line-chart": LineChartPreview,
  "loader": LoaderPreview,
  "menu": MenuPreview,
  "menu-bar": MenuBarPreview,
  "meter": MeterPreview,
  "navbar": NavbarPreview,
  "navigation-menu": NavigationMenuPreview,
  "number-field": NumberFieldPreview,
  "pagination": PaginationPreview,
  "popover": PopoverPreview,
  "preview-card": PreviewCardPreview,
  "progress": ProgressPreview,
  "progress-circle": ProgressCirclePreview,
  "radio": RadioPreview,
  "radio-card-group": RadioCardGroupPreview,
  "radio-group": RadioGroupPreview,
  "responsive-drawer": ResponsiveDrawerPreview,
  "scroll-area": ScrollAreaPreview,
  "search-field": SearchFieldPreview,
  "select": SelectPreview,
  "select-native": SelectNativePreview,
  "separator": SeparatorPreview,
  "sheet": SheetPreview,
  "sidebar": SidebarPreview,
  "skeleton": SkeletonPreview,
  "slider": SliderPreview,
  "spark-chart": SparkChartPreview,
  "split-button": SplitButtonPreview,
  "stack": StackPreview,
  "stacked-list": StackedListPreview,
  "subheading": SubheadingPreview,
  "switch": SwitchPreview,
  "tab-navigation": TabNavigationPreview,
  "table": TablePreview,
  "tabs": TabsPreview,
  "tag": TagPreview,
  "tag-group": TagGroupPreview,
  "tag-input": TagInputPreview,
  "text": TextPreview,
  "text-list": TextListPreview,
  "textarea": TextareaPreview,
  "toast": ToastPreview,
  "toggle": TogglePreview,
  "toggle-group": ToggleGroupPreview,
  "toolbar": ToolbarPreview,
  "tooltip": TooltipPreview,
  "tracker": TrackerPreview,
} as const satisfies Record<string, React.ComponentType<any>>;

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

export function getPreviewComponent(id: string): React.ComponentType<any> | undefined {
  // Static lookup from preview registry
  const previewComponent = PREVIEW_REGISTRY[id as ComponentId];

  if (previewComponent) {
    return previewComponent;
  }

  // Fallback to primary component from config if no preview exists
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

  return fallbackComponent;
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
