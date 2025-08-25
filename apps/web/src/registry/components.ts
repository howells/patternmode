import type React from "react";

import type { ComponentConfig } from "@patternmode/config/component-types";
import type { PreviewProps } from "@/types/preview-props";

// Import all component configs
import { avatarConfig } from "@patternmode/avatar/config";
import { badgeConfig } from "@patternmode/badge/config";
import { buttonConfig } from "@patternmode/button/config";
import { checkboxConfig } from "@patternmode/checkbox/config";
import { comboboxConfig } from "@patternmode/combobox/config";
import { dismissButtonConfig } from "@patternmode/dismiss-button/config";
import { dotConfig } from "@patternmode/dot/config";
import { dropdownItemConfig } from "@patternmode/dropdown-item/config";
import { gridConfig } from "@patternmode/grid/config";
import { headingConfig } from "@patternmode/heading/config";
import { iconConfig } from "@patternmode/icon/config";
import { iconContainerConfig } from "@patternmode/icon-container/config";
import { iconSelectConfig } from "@patternmode/icon-select/config";
import { inputConfig } from "@patternmode/input/config";
import { kbdConfig } from "@patternmode/kbd/config";
import { labelConfig } from "@patternmode/label/config";
import { loaderConfig } from "@patternmode/loader/config";
import { numberFieldConfig } from "@patternmode/number-field/config";
import { selectConfig } from "@patternmode/select/config";
import { selectNativeConfig } from "@patternmode/select-native/config";
import { separatorConfig } from "@patternmode/separator/config";
import { stackConfig } from "@patternmode/stack/config";
import { subheadingConfig } from "@patternmode/subheading/config";
import { switchConfig } from "@patternmode/switch/config";
import { tagConfig } from "@patternmode/tag/config";
import { tagGroupConfig } from "@patternmode/tag-group/config";
import { tagInputConfig } from "@patternmode/tag-input/config";
import { textConfig } from "@patternmode/text/config";
import { textListConfig } from "@patternmode/text-list/config";
import { textareaConfig } from "@patternmode/textarea/config";
import { tooltipConfig } from "@patternmode/tooltip/config";
import { accordionConfig } from "@patternmode/accordion/config";
import { alertDialogConfig } from "@patternmode/alert-dialog/config";
import { breadcrumbsConfig } from "@patternmode/breadcrumbs/config";
import { buttonGroupConfig } from "@patternmode/button-group/config";
import { calendarConfig } from "@patternmode/calendar/config";
import { calloutConfig } from "@patternmode/callout/config";
import { cardConfig } from "@patternmode/card/config";
import { carouselConfig } from "@patternmode/carousel/config";
import { checkboxGroupConfig } from "@patternmode/checkbox-group/config";
import { codeBlockConfig } from "@patternmode/code-block/config";
import { collapsibleConfig } from "@patternmode/collapsible/config";
import { contextMenuConfig } from "@patternmode/context-menu/config";
import { copyButtonConfig } from "@patternmode/copy-button/config";
import { datePickerConfig } from "@patternmode/date-picker/config";
import { descriptionListConfig } from "@patternmode/description-list/config";
import { dialogConfig } from "@patternmode/dialog/config";
import { drawerConfig } from "@patternmode/drawer/config";
import { emptyStateConfig } from "@patternmode/empty-state/config";
import { fieldConfig } from "@patternmode/field/config";
import { fieldArrayConfig } from "@patternmode/field-array/config";
import { fieldsetConfig } from "@patternmode/fieldset/config";
import { formConfig } from "@patternmode/form/config";
import { headingElementConfig } from "@patternmode/heading-element/config";
import { menuConfig } from "@patternmode/menu/config";
import { menuBarConfig } from "@patternmode/menu-bar/config";
import { meterConfig } from "@patternmode/meter/config";
import { navbarConfig } from "@patternmode/navbar/config";
import { navigationMenuConfig } from "@patternmode/navigation-menu/config";
import { paginationConfig } from "@patternmode/pagination/config";
import { popoverConfig } from "@patternmode/popover/config";
import { previewCardConfig } from "@patternmode/preview-card/config";
import { progressConfig } from "@patternmode/progress/config";
import { progressCircleConfig } from "@patternmode/progress-circle/config";
import { radioConfig } from "@patternmode/radio/config";
import { radioCardGroupConfig } from "@patternmode/radio-card-group/config";
import { responsiveDrawerConfig } from "@patternmode/responsive-drawer/config";
import { scrollAreaConfig } from "@patternmode/scroll-area/config";
import { searchFieldConfig } from "@patternmode/search-field/config";
import { sheetConfig } from "@patternmode/sheet/config";
import { skeletonConfig } from "@patternmode/skeleton/config";
import { sliderConfig } from "@patternmode/slider/config";
import { sortableListConfig } from "@patternmode/sortable-list/config";
import { splitButtonConfig } from "@patternmode/split-button/config";
import { stackedListConfig } from "@patternmode/stacked-list/config";
import { tabNavigationConfig } from "@patternmode/tab-navigation/config";
import { tableConfig } from "@patternmode/table/config";
import { tabsConfig } from "@patternmode/tabs/config";
import { themeToggleConfig } from "@patternmode/theme-toggle/config";
import { toastConfig } from "@patternmode/toast/config";
import { toggleConfig } from "@patternmode/toggle/config";
import { toggleGroupConfig } from "@patternmode/toggle-group/config";
import { toolbarConfig } from "@patternmode/toolbar/config";

// Import all preview components and props
import { AvatarPreview, avatarPreviewProps } from "@patternmode/avatar/preview";
import { BadgePreview, badgePreviewProps } from "@patternmode/badge/preview";
import { ButtonPreview, buttonPreviewProps } from "@patternmode/button/preview";
import { CheckboxPreview, checkboxPreviewProps } from "@patternmode/checkbox/preview";
import { ComboboxPreview, comboboxPreviewProps } from "@patternmode/combobox/preview";
import { DismissButtonPreview, dismissButtonPreviewProps } from "@patternmode/dismiss-button/preview";
import { DotPreview, dotPreviewProps } from "@patternmode/dot/preview";
import { DropdownItemPreview, dropdownItemPreviewProps } from "@patternmode/dropdown-item/preview";
import { GridPreview, gridPreviewProps } from "@patternmode/grid/preview";
import { HeadingPreview, headingPreviewProps } from "@patternmode/heading/preview";
import { IconPreview, iconPreviewProps } from "@patternmode/icon/preview";
import { IconContainerPreview, iconContainerPreviewProps } from "@patternmode/icon-container/preview";
import { IconSelectPreview, iconSelectPreviewProps } from "@patternmode/icon-select/preview";
import { InputPreview, inputPreviewProps } from "@patternmode/input/preview";
import { KbdPreview, kbdPreviewProps } from "@patternmode/kbd/preview";
import { LabelPreview, labelPreviewProps } from "@patternmode/label/preview";
import { LoaderPreview, loaderPreviewProps } from "@patternmode/loader/preview";
import { NumberFieldPreview, numberFieldPreviewProps } from "@patternmode/number-field/preview";
import { SelectPreview, selectPreviewProps } from "@patternmode/select/preview";
import { SelectNativePreview, selectNativePreviewProps } from "@patternmode/select-native/preview";
import { SeparatorPreview, separatorPreviewProps } from "@patternmode/separator/preview";
import { StackPreview, stackPreviewProps } from "@patternmode/stack/preview";
import { SubheadingPreview, subheadingPreviewProps } from "@patternmode/subheading/preview";
import { SwitchPreview, switchPreviewProps } from "@patternmode/switch/preview";
import { TagPreview, tagPreviewProps } from "@patternmode/tag/preview";
import { TagGroupPreview, tagGroupPreviewProps } from "@patternmode/tag-group/preview";
import { TagInputPreview, tagInputPreviewProps } from "@patternmode/tag-input/preview";
import { TextPreview, textPreviewProps } from "@patternmode/text/preview";
import { TextListPreview, textListPreviewProps } from "@patternmode/text-list/preview";
import { TextareaPreview, textareaPreviewProps } from "@patternmode/textarea/preview";
import { TooltipPreview, tooltipPreviewProps } from "@patternmode/tooltip/preview";
import { AccordionPreview, accordionPreviewProps } from "@patternmode/accordion/preview";
import { AlertDialogPreview, alertDialogPreviewProps } from "@patternmode/alert-dialog/preview";
import { BreadcrumbsPreview, breadcrumbsPreviewProps } from "@patternmode/breadcrumbs/preview";
import { ButtonGroupPreview, buttonGroupPreviewProps } from "@patternmode/button-group/preview";
import { CalendarPreview, calendarPreviewProps } from "@patternmode/calendar/preview";
import { CalloutPreview, calloutPreviewProps } from "@patternmode/callout/preview";
import { CardPreview, cardPreviewProps } from "@patternmode/card/preview";
import { CarouselPreview, carouselPreviewProps } from "@patternmode/carousel/preview";
import { CheckboxGroupPreview, checkboxGroupPreviewProps } from "@patternmode/checkbox-group/preview";
import { CodeBlockPreview, codeBlockPreviewProps } from "@patternmode/code-block/preview";
import { CollapsiblePreview, collapsiblePreviewProps } from "@patternmode/collapsible/preview";
import { ContextMenuPreview, contextMenuPreviewProps } from "@patternmode/context-menu/preview";
import { CopyButtonPreview, copyButtonPreviewProps } from "@patternmode/copy-button/preview";
import { DatePickerPreview, datePickerPreviewProps } from "@patternmode/date-picker/preview";
import { DescriptionListPreview, descriptionListPreviewProps } from "@patternmode/description-list/preview";
import { DialogPreview, dialogPreviewProps } from "@patternmode/dialog/preview";
import { DrawerPreview, drawerPreviewProps } from "@patternmode/drawer/preview";
import { EmptyStatePreview, emptyStatePreviewProps } from "@patternmode/empty-state/preview";
import { FieldPreview, fieldPreviewProps } from "@patternmode/field/preview";
import { FieldArrayPreview, fieldArrayPreviewProps } from "@patternmode/field-array/preview";
import { FieldsetPreview, fieldsetPreviewProps } from "@patternmode/fieldset/preview";
import { FormPreview, formPreviewProps } from "@patternmode/form/preview";
import { HeadingElementPreview, headingElementPreviewProps } from "@patternmode/heading-element/preview";
import { MenuPreview, menuPreviewProps } from "@patternmode/menu/preview";
import { MenuBarPreview, menuBarPreviewProps } from "@patternmode/menu-bar/preview";
import { MeterPreview, meterPreviewProps } from "@patternmode/meter/preview";
import { NavbarPreview, navbarPreviewProps } from "@patternmode/navbar/preview";
import { NavigationMenuPreview, navigationMenuPreviewProps } from "@patternmode/navigation-menu/preview";
import { PaginationPreview, paginationPreviewProps } from "@patternmode/pagination/preview";
import { PopoverPreview, popoverPreviewProps } from "@patternmode/popover/preview";
import { PreviewCardPreview, previewCardPreviewProps } from "@patternmode/preview-card/preview";
import { ProgressPreview, progressPreviewProps } from "@patternmode/progress/preview";
import { ProgressCirclePreview, progressCirclePreviewProps } from "@patternmode/progress-circle/preview";
import { RadioPreview, radioPreviewProps } from "@patternmode/radio/preview";
import { RadioCardGroupPreview, radioCardGroupPreviewProps } from "@patternmode/radio-card-group/preview";
import { ResponsiveDrawerPreview, responsiveDrawerPreviewProps } from "@patternmode/responsive-drawer/preview";
import { ScrollAreaPreview, scrollAreaPreviewProps } from "@patternmode/scroll-area/preview";
import { SearchFieldPreview, searchFieldPreviewProps } from "@patternmode/search-field/preview";
import { SheetPreview, sheetPreviewProps } from "@patternmode/sheet/preview";
import { SkeletonPreview } from "@patternmode/skeleton/preview";
import { SliderPreview, sliderPreviewProps } from "@patternmode/slider/preview";
import { SortableListPreview, sortableListPreviewProps } from "@patternmode/sortable-list/preview";
import { SplitButtonPreview, splitButtonPreviewProps } from "@patternmode/split-button/preview";
import { StackedListPreview, stackedListPreviewProps } from "@patternmode/stacked-list/preview";
import { TabNavigationPreview, tabNavigationPreviewProps } from "@patternmode/tab-navigation/preview";
import { TablePreview, tablePreviewProps } from "@patternmode/table/preview";
import { TabsPreview, tabsPreviewProps } from "@patternmode/tabs/preview";
import { ThemeTogglePreview } from "@patternmode/theme-toggle/preview";
import { ToastPreview, toastPreviewProps } from "@patternmode/toast/preview";
import { TogglePreview, togglePreviewProps } from "@patternmode/toggle/preview";
import { ToggleGroupPreview, toggleGroupPreviewProps } from "@patternmode/toggle-group/preview";
import { ToolbarPreview, toolbarPreviewProps } from "@patternmode/toolbar/preview";

export const COMPONENT_REGISTRY = {
  accordion: accordionConfig,
  "alert-dialog": alertDialogConfig,
  avatar: avatarConfig,
  badge: badgeConfig,
  breadcrumbs: breadcrumbsConfig,
  button: buttonConfig,
  "button-group": buttonGroupConfig,
  calendar: calendarConfig,
  callout: calloutConfig,
  card: cardConfig,
  carousel: carouselConfig,
  checkbox: checkboxConfig,
  "checkbox-group": checkboxGroupConfig,
  "code-block": codeBlockConfig,
  collapsible: collapsibleConfig,
  combobox: comboboxConfig,
  "context-menu": contextMenuConfig,
  "copy-button": copyButtonConfig,
  "date-picker": datePickerConfig,
  "description-list": descriptionListConfig,
  dialog: dialogConfig,
  "dismiss-button": dismissButtonConfig,
  dot: dotConfig,
  drawer: drawerConfig,
  "dropdown-item": dropdownItemConfig,
  "empty-state": emptyStateConfig,
  field: fieldConfig,
  "field-array": fieldArrayConfig,
  fieldset: fieldsetConfig,
  form: formConfig,
  grid: gridConfig,
  heading: headingConfig,
  "heading-element": headingElementConfig,
  icon: iconConfig,
  "icon-container": iconContainerConfig,
  "icon-select": iconSelectConfig,
  input: inputConfig,
  kbd: kbdConfig,
  label: labelConfig,
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
  "responsive-drawer": responsiveDrawerConfig,
  "scroll-area": scrollAreaConfig,
  "search-field": searchFieldConfig,
  select: selectConfig,
  "select-native": selectNativeConfig,
  separator: separatorConfig,
  sheet: sheetConfig,
  skeleton: skeletonConfig,
  slider: sliderConfig,
  "sortable-list": sortableListConfig,
  "split-button": splitButtonConfig,
  stack: stackConfig,
  "stacked-list": stackedListConfig,
  subheading: subheadingConfig,
  switch: switchConfig,
  "tab-navigation": tabNavigationConfig,
  table: tableConfig,
  tabs: tabsConfig,
  tag: tagConfig,
  "tag-group": tagGroupConfig,
  "tag-input": tagInputConfig,
  text: textConfig,
  "text-list": textListConfig,
  textarea: textareaConfig,
  "theme-toggle": themeToggleConfig,
  toast: toastConfig,
  toggle: toggleConfig,
  "toggle-group": toggleGroupConfig,
  toolbar: toolbarConfig,
  tooltip: tooltipConfig,
} as const satisfies Record<string, ComponentConfig>;

export const PREVIEW_REGISTRY = {
  accordion: AccordionPreview,
  "alert-dialog": AlertDialogPreview,
  avatar: AvatarPreview,
  badge: BadgePreview,
  breadcrumbs: BreadcrumbsPreview,
  button: ButtonPreview,
  "button-group": ButtonGroupPreview,
  calendar: CalendarPreview,
  callout: CalloutPreview,
  card: CardPreview,
  carousel: CarouselPreview,
  checkbox: CheckboxPreview,
  "checkbox-group": CheckboxGroupPreview,
  "code-block": CodeBlockPreview,
  collapsible: CollapsiblePreview,
  combobox: ComboboxPreview,
  "context-menu": ContextMenuPreview,
  "copy-button": CopyButtonPreview,
  "date-picker": DatePickerPreview,
  "description-list": DescriptionListPreview,
  dialog: DialogPreview,
  "dismiss-button": DismissButtonPreview,
  dot: DotPreview,
  drawer: DrawerPreview,
  "dropdown-item": DropdownItemPreview,
  "empty-state": EmptyStatePreview,
  field: FieldPreview,
  "field-array": FieldArrayPreview,
  fieldset: FieldsetPreview,
  form: FormPreview,
  grid: GridPreview,
  heading: HeadingPreview,
  "heading-element": HeadingElementPreview,
  icon: IconPreview,
  "icon-container": IconContainerPreview,
  "icon-select": IconSelectPreview,
  input: InputPreview,
  kbd: KbdPreview,
  label: LabelPreview,
  loader: LoaderPreview,
  menu: MenuPreview,
  "menu-bar": MenuBarPreview,
  meter: MeterPreview,
  navbar: NavbarPreview,
  "navigation-menu": NavigationMenuPreview,
  "number-field": NumberFieldPreview,
  pagination: PaginationPreview,
  popover: PopoverPreview,
  "preview-card": PreviewCardPreview,
  progress: ProgressPreview,
  "progress-circle": ProgressCirclePreview,
  radio: RadioPreview,
  "radio-card-group": RadioCardGroupPreview,
  "responsive-drawer": ResponsiveDrawerPreview,
  "scroll-area": ScrollAreaPreview,
  "search-field": SearchFieldPreview,
  select: SelectPreview,
  "select-native": SelectNativePreview,
  separator: SeparatorPreview,
  sheet: SheetPreview,
  skeleton: SkeletonPreview,
  slider: SliderPreview,
  "sortable-list": SortableListPreview,
  "split-button": SplitButtonPreview,
  stack: StackPreview,
  "stacked-list": StackedListPreview,
  subheading: SubheadingPreview,
  switch: SwitchPreview,
  "tab-navigation": TabNavigationPreview,
  table: TablePreview,
  tabs: TabsPreview,
  tag: TagPreview,
  "tag-group": TagGroupPreview,
  "tag-input": TagInputPreview,
  text: TextPreview,
  "text-list": TextListPreview,
  textarea: TextareaPreview,
  toast: ToastPreview,
  toggle: TogglePreview,
  "toggle-group": ToggleGroupPreview,
  toolbar: ToolbarPreview,
  tooltip: TooltipPreview,
} as const satisfies Record<string, React.ComponentType<any>>;

export const PREVIEW_PROPS_REGISTRY = {
  accordion: accordionPreviewProps,
  "alert-dialog": alertDialogPreviewProps,
  avatar: avatarPreviewProps,
  badge: badgePreviewProps,
  breadcrumbs: breadcrumbsPreviewProps,
  button: buttonPreviewProps,
  "button-group": buttonGroupPreviewProps,
  calendar: calendarPreviewProps,
  callout: calloutPreviewProps,
  card: cardPreviewProps,
  carousel: carouselPreviewProps,
  checkbox: checkboxPreviewProps,
  "checkbox-group": checkboxGroupPreviewProps,
  "code-block": codeBlockPreviewProps,
  collapsible: collapsiblePreviewProps,
  combobox: comboboxPreviewProps,
  "context-menu": contextMenuPreviewProps,
  "copy-button": copyButtonPreviewProps,
  "date-picker": datePickerPreviewProps,
  "description-list": descriptionListPreviewProps,
  dialog: dialogPreviewProps,
  "dismiss-button": dismissButtonPreviewProps,
  dot: dotPreviewProps,
  drawer: drawerPreviewProps,
  "dropdown-item": dropdownItemPreviewProps,
  "empty-state": emptyStatePreviewProps,
  field: fieldPreviewProps,
  "field-array": fieldArrayPreviewProps,
  fieldset: fieldsetPreviewProps,
  form: formPreviewProps,
  grid: gridPreviewProps,
  heading: headingPreviewProps,
  "heading-element": headingElementPreviewProps,
  icon: iconPreviewProps,
  "icon-container": iconContainerPreviewProps,
  "icon-select": iconSelectPreviewProps,
  input: inputPreviewProps,
  kbd: kbdPreviewProps,
  label: labelPreviewProps,
  loader: loaderPreviewProps,
  menu: menuPreviewProps,
  "menu-bar": menuBarPreviewProps,
  meter: meterPreviewProps,
  navbar: navbarPreviewProps,
  "navigation-menu": navigationMenuPreviewProps,
  "number-field": numberFieldPreviewProps,
  pagination: paginationPreviewProps,
  popover: popoverPreviewProps,
  "preview-card": previewCardPreviewProps,
  progress: progressPreviewProps,
  "progress-circle": progressCirclePreviewProps,
  radio: radioPreviewProps,
  "radio-card-group": radioCardGroupPreviewProps,
  "responsive-drawer": responsiveDrawerPreviewProps,
  "scroll-area": scrollAreaPreviewProps,
  "search-field": searchFieldPreviewProps,
  select: selectPreviewProps,
  "select-native": selectNativePreviewProps,
  separator: separatorPreviewProps,
  sheet: sheetPreviewProps,
  skeleton: [],
  slider: sliderPreviewProps,
  "sortable-list": sortableListPreviewProps,
  "split-button": splitButtonPreviewProps,
  stack: stackPreviewProps,
  "stacked-list": stackedListPreviewProps,
  subheading: subheadingPreviewProps,
  switch: switchPreviewProps,
  "tab-navigation": tabNavigationPreviewProps,
  table: tablePreviewProps,
  tabs: tabsPreviewProps,
  tag: tagPreviewProps,
  "tag-group": tagGroupPreviewProps,
  "tag-input": tagInputPreviewProps,
  text: textPreviewProps,
  "text-list": textListPreviewProps,
  textarea: textareaPreviewProps,
  toast: toastPreviewProps,
  toggle: togglePreviewProps,
  "toggle-group": toggleGroupPreviewProps,
  toolbar: toolbarPreviewProps,
  tooltip: tooltipPreviewProps,
} as const satisfies Record<string, PreviewProps[]>;

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
    (config) => config.category === category,
  );
}

export function getPreviewComponent(
  id: string,
): React.ComponentType<any> | undefined {
  const previewComponent = PREVIEW_REGISTRY[id as ComponentId];
  if (previewComponent) return previewComponent;
  const config = getComponentConfig(id);
  let fallback: React.ComponentType<any> | undefined;
  if (config?.component) fallback = config.component;
  else if (config?.components) {
    const primary = config.components.find((c) => c.primary);
    fallback = primary?.component || config.components[0]?.component;
  }
  return fallback;
}

export function getPreviewProps(id: string): PreviewProps[] {
  const previewProps = PREVIEW_PROPS_REGISTRY[
    id as keyof typeof PREVIEW_PROPS_REGISTRY
  ];
  if (previewProps) return previewProps;
  return [];
}

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
  const category = CATEGORY_CONFIG.find((c) => c.key === categoryKey);
  if (!category) return null;
  return {
    title: `${category.name} Components`,
    description: category.description,
  };
}
