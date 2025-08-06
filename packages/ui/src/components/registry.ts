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
import { themeToggleConfig } from "./theme-toggle/config";
import { toastConfig } from "./toast/config";
import { toggleConfig } from "./toggle/config";
import { toggleGroupConfig } from "./toggle-group/config";
import { toolbarConfig } from "./toolbar/config";
import { tooltipConfig } from "./tooltip/config";
import { trackerConfig } from "./tracker/config";

// Import all preview components
import { AccordionPreview } from "./accordion/preview";
import { AlertDialogPreview } from "./alert-dialog/preview";
import { AreaChartPreview } from "./area-chart/preview";
import { AvatarPreview } from "./avatar/preview";
import { BadgePreview } from "./badge/preview";
import { BarChartPreview } from "./bar-chart/preview";
import { BarListPreview } from "./bar-list/preview";
import { BreadcrumbsPreview } from "./breadcrumbs/preview";
import { ButtonPreview } from "./button/preview";
import { ButtonGroupPreview } from "./button-group/preview";
import { CalendarPreview } from "./calendar/preview";
import { CalloutPreview } from "./callout/preview";
import { CardPreview } from "./card/preview";
import { CarouselPreview } from "./carousel/preview";
import { CategoryBarPreview } from "./category-bar/preview";
import { CheckboxPreview } from "./checkbox/preview";
import { CheckboxGroupPreview } from "./checkbox-group/preview";
import { CodeBlockPreview } from "./code-block/preview";
import { CollapsiblePreview } from "./collapsible/preview";
import { ComboChartPreview } from "./combo-chart/preview";
import { ComboboxPreview } from "./combobox/preview";
import { ContextMenuPreview } from "./context-menu/preview";
import { CopyButtonPreview } from "./copy-button/preview";
import { DatePickerPreview } from "./date-picker/preview";
import { DescriptionListPreview } from "./description-list/preview";
import { DialogPreview } from "./dialog/preview";
import { DismissButtonPreview } from "./dismiss-button/preview";
import { DividerPreview } from "./divider/preview";
import { DonutChartPreview } from "./donut-chart/preview";
import { DotPreview } from "./dot/preview";
import { DrawerPreview } from "./drawer/preview";
import { DropdownItemPreview } from "./dropdown-item/preview";
import { EmptyStatePreview } from "./empty-state/preview";
import { FieldPreview } from "./field/preview";
import { FieldArrayPreview } from "./field-array/preview";
import { FieldsetPreview } from "./fieldset/preview";
import { FormPreview } from "./form/preview";
import { GridPreview } from "./grid/preview";
import { HeadingPreview } from "./heading/preview";
import { HeadingElementPreview } from "./heading-element/preview";
import { IconPreview } from "./icon/preview";
import { IconContainerPreview } from "./icon-container/preview";
import { IconSelectPreview } from "./icon-select/preview";
import { InputPreview } from "./input/preview";
import { KbdPreview } from "./kbd/preview";
import { LabelPreview } from "./label/preview";
import { LineChartPreview } from "./line-chart/preview";
import { LoaderPreview } from "./loader/preview";
import { MenuPreview } from "./menu/preview";
import { MenuBarPreview } from "./menu-bar/preview";
import { MeterPreview } from "./meter/preview";
import { NavbarPreview } from "./navbar/preview";
import { NavigationMenuPreview } from "./navigation-menu/preview";
import { NumberFieldPreview } from "./number-field/preview";
import { PaginationPreview } from "./pagination/preview";
import { PopoverPreview } from "./popover/preview";
import { PreviewCardPreview } from "./preview-card/preview";
import { ProgressPreview } from "./progress/preview";
import { ProgressCirclePreview } from "./progress-circle/preview";
import { RadioPreview } from "./radio/preview";
import { RadioCardGroupPreview } from "./radio-card-group/preview";
import { RadioGroupPreview } from "./radio-group/preview";
import { ResponsiveDrawerPreview } from "./responsive-drawer/preview";
import { ScrollAreaPreview } from "./scroll-area/preview";
import { SearchFieldPreview } from "./search-field/preview";
import { SelectPreview } from "./select/preview";
import { SelectNativePreview } from "./select-native/preview";
import { SeparatorPreview } from "./separator/preview";
import { SheetPreview } from "./sheet/preview";
import { SidebarPreview } from "./sidebar/preview";
import { SkeletonPreview } from "./skeleton/preview";
import { SliderPreview } from "./slider/preview";
import { SparkChartPreview } from "./spark-chart/preview";
import { SplitButtonPreview } from "./split-button/preview";
import { StackPreview } from "./stack/preview";
import { StackedListPreview } from "./stacked-list/preview";
import { SubheadingPreview } from "./subheading/preview";
import { SwitchPreview } from "./switch/preview";
import { TabNavigationPreview } from "./tab-navigation/preview";
import { TablePreview } from "./table/preview";
import { TabsPreview } from "./tabs/preview";
import { TagPreview } from "./tag/preview";
import { TagGroupPreview } from "./tag-group/preview";
import { TagInputPreview } from "./tag-input/preview";
import { TextPreview } from "./text/preview";
import { TextListPreview } from "./text-list/preview";
import { TextareaPreview } from "./textarea/preview";
import { ThemeTogglePreview } from "./theme-toggle/preview";
import { ToastPreview } from "./toast/preview";
import { TogglePreview } from "./toggle/preview";
import { ToggleGroupPreview } from "./toggle-group/preview";
import { ToolbarPreview } from "./toolbar/preview";
import { TooltipPreview } from "./tooltip/preview";
import { TrackerPreview } from "./tracker/preview";

// Import all preview props
import { accordionPreviewProps } from "./accordion/preview";
import { alertDialogPreviewProps } from "./alert-dialog/preview";
import { areaChartPreviewProps } from "./area-chart/preview";
import { avatarPreviewProps } from "./avatar/preview";
import { badgePreviewProps } from "./badge/preview";
import { barChartPreviewProps } from "./bar-chart/preview";
import { barListPreviewProps } from "./bar-list/preview";
import { breadcrumbsPreviewProps } from "./breadcrumbs/preview";
import { buttonPreviewProps } from "./button/preview";
import { buttonGroupPreviewProps } from "./button-group/preview";
import { calendarPreviewProps } from "./calendar/preview";
import { calloutPreviewProps } from "./callout/preview";
import { cardPreviewProps } from "./card/preview";
import { carouselPreviewProps } from "./carousel/preview";
import { categoryBarPreviewProps } from "./category-bar/preview";
import { checkboxPreviewProps } from "./checkbox/preview";
import { checkboxGroupPreviewProps } from "./checkbox-group/preview";
import { codeBlockPreviewProps } from "./code-block/preview";
import { collapsiblePreviewProps } from "./collapsible/preview";
import { comboChartPreviewProps } from "./combo-chart/preview";
import { comboboxPreviewProps } from "./combobox/preview";
import { contextMenuPreviewProps } from "./context-menu/preview";
import { copyButtonPreviewProps } from "./copy-button/preview";
import { datePickerPreviewProps } from "./date-picker/preview";
import { descriptionListPreviewProps } from "./description-list/preview";
import { dialogPreviewProps } from "./dialog/preview";
import { dismissButtonPreviewProps } from "./dismiss-button/preview";
import { dividerPreviewProps } from "./divider/preview";
import { donutChartPreviewProps } from "./donut-chart/preview";
import { dotPreviewProps } from "./dot/preview";
import { drawerPreviewProps } from "./drawer/preview";
import { dropdownItemPreviewProps } from "./dropdown-item/preview";
import { emptyStatePreviewProps } from "./empty-state/preview";
import { fieldPreviewProps } from "./field/preview";
import { fieldArrayPreviewProps } from "./field-array/preview";
import { fieldsetPreviewProps } from "./fieldset/preview";
import { formPreviewProps } from "./form/preview";
import { gridPreviewProps } from "./grid/preview";
import { headingPreviewProps } from "./heading/preview";
import { headingElementPreviewProps } from "./heading-element/preview";
import { iconPreviewProps } from "./icon/preview";
import { iconContainerPreviewProps } from "./icon-container/preview";
import { iconSelectPreviewProps } from "./icon-select/preview";
import { inputPreviewProps } from "./input/preview";
import { kbdPreviewProps } from "./kbd/preview";
import { labelPreviewProps } from "./label/preview";
import { lineChartPreviewProps } from "./line-chart/preview";
import { loaderPreviewProps } from "./loader/preview";
import { menuPreviewProps } from "./menu/preview";
import { menuBarPreviewProps } from "./menu-bar/preview";
import { meterPreviewProps } from "./meter/preview";
import { navbarPreviewProps } from "./navbar/preview";
import { navigationMenuPreviewProps } from "./navigation-menu/preview";
import { numberFieldPreviewProps } from "./number-field/preview";
import { paginationPreviewProps } from "./pagination/preview";
import { popoverPreviewProps } from "./popover/preview";
import { previewCardPreviewProps } from "./preview-card/preview";
import { progressPreviewProps } from "./progress/preview";
import { progressCirclePreviewProps } from "./progress-circle/preview";
import { radioPreviewProps } from "./radio/preview";
import { radioCardGroupPreviewProps } from "./radio-card-group/preview";
import { radioGroupPreviewProps } from "./radio-group/preview";
import { responsiveDrawerPreviewProps } from "./responsive-drawer/preview";
import { scrollAreaPreviewProps } from "./scroll-area/preview";
import { searchFieldPreviewProps } from "./search-field/preview";
import { selectPreviewProps } from "./select/preview";
import { selectNativePreviewProps } from "./select-native/preview";
import { separatorPreviewProps } from "./separator/preview";
import { sheetPreviewProps } from "./sheet/preview";
import { sidebarPreviewProps } from "./sidebar/preview";
import { skeletonPreviewProps } from "./skeleton/preview";
import { sliderPreviewProps } from "./slider/preview";
import { sparkChartPreviewProps } from "./spark-chart/preview";
import { splitButtonPreviewProps } from "./split-button/preview";
import { stackPreviewProps } from "./stack/preview";
import { stackedListPreviewProps } from "./stacked-list/preview";
import { subheadingPreviewProps } from "./subheading/preview";
import { switchPreviewProps } from "./switch/preview";
import { tabNavigationPreviewProps } from "./tab-navigation/preview";
import { tablePreviewProps } from "./table/preview";
import { tabsPreviewProps } from "./tabs/preview";
import { tagPreviewProps } from "./tag/preview";
import { tagGroupPreviewProps } from "./tag-group/preview";
import { tagInputPreviewProps } from "./tag-input/preview";
import { textPreviewProps } from "./text/preview";
import { textListPreviewProps } from "./text-list/preview";
import { textareaPreviewProps } from "./textarea/preview";
import { toastPreviewProps } from "./toast/preview";
import { togglePreviewProps } from "./toggle/preview";
import { toggleGroupPreviewProps } from "./toggle-group/preview";
import { toolbarPreviewProps } from "./toolbar/preview";
import { tooltipPreviewProps } from "./tooltip/preview";
import { trackerPreviewProps } from "./tracker/preview";

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
  "theme-toggle": themeToggleConfig,
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
  "theme-toggle": ThemeTogglePreview,
  "toast": ToastPreview,
  "toggle": TogglePreview,
  "toggle-group": ToggleGroupPreview,
  "toolbar": ToolbarPreview,
  "tooltip": TooltipPreview,
  "tracker": TrackerPreview,
} as const satisfies Record<string, React.ComponentType<any>>;

// Static preview props registry
export const PREVIEW_PROPS_REGISTRY = {
  "accordion": accordionPreviewProps,
  "alert-dialog": alertDialogPreviewProps,
  "area-chart": areaChartPreviewProps,
  "avatar": avatarPreviewProps,
  "badge": badgePreviewProps,
  "bar-chart": barChartPreviewProps,
  "bar-list": barListPreviewProps,
  "breadcrumbs": breadcrumbsPreviewProps,
  "button": buttonPreviewProps,
  "button-group": buttonGroupPreviewProps,
  "calendar": calendarPreviewProps,
  "callout": calloutPreviewProps,
  "card": cardPreviewProps,
  "carousel": carouselPreviewProps,
  "category-bar": categoryBarPreviewProps,
  "checkbox": checkboxPreviewProps,
  "checkbox-group": checkboxGroupPreviewProps,
  "code-block": codeBlockPreviewProps,
  "collapsible": collapsiblePreviewProps,
  "combo-chart": comboChartPreviewProps,
  "combobox": comboboxPreviewProps,
  "context-menu": contextMenuPreviewProps,
  "copy-button": copyButtonPreviewProps,
  "date-picker": datePickerPreviewProps,
  "description-list": descriptionListPreviewProps,
  "dialog": dialogPreviewProps,
  "dismiss-button": dismissButtonPreviewProps,
  "divider": dividerPreviewProps,
  "donut-chart": donutChartPreviewProps,
  "dot": dotPreviewProps,
  "drawer": drawerPreviewProps,
  "dropdown-item": dropdownItemPreviewProps,
  "empty-state": emptyStatePreviewProps,
  "field": fieldPreviewProps,
  "field-array": fieldArrayPreviewProps,
  "fieldset": fieldsetPreviewProps,
  "form": formPreviewProps,
  "grid": gridPreviewProps,
  "heading": headingPreviewProps,
  "heading-element": headingElementPreviewProps,
  "icon": iconPreviewProps,
  "icon-container": iconContainerPreviewProps,
  "icon-select": iconSelectPreviewProps,
  "input": inputPreviewProps,
  "kbd": kbdPreviewProps,
  "label": labelPreviewProps,
  "line-chart": lineChartPreviewProps,
  "loader": loaderPreviewProps,
  "menu": menuPreviewProps,
  "menu-bar": menuBarPreviewProps,
  "meter": meterPreviewProps,
  "navbar": navbarPreviewProps,
  "navigation-menu": navigationMenuPreviewProps,
  "number-field": numberFieldPreviewProps,
  "pagination": paginationPreviewProps,
  "popover": popoverPreviewProps,
  "preview-card": previewCardPreviewProps,
  "progress": progressPreviewProps,
  "progress-circle": progressCirclePreviewProps,
  "radio": radioPreviewProps,
  "radio-card-group": radioCardGroupPreviewProps,
  "radio-group": radioGroupPreviewProps,
  "responsive-drawer": responsiveDrawerPreviewProps,
  "scroll-area": scrollAreaPreviewProps,
  "search-field": searchFieldPreviewProps,
  "select": selectPreviewProps,
  "select-native": selectNativePreviewProps,
  "separator": separatorPreviewProps,
  "sheet": sheetPreviewProps,
  "sidebar": sidebarPreviewProps,
  "skeleton": skeletonPreviewProps,
  "slider": sliderPreviewProps,
  "spark-chart": sparkChartPreviewProps,
  "split-button": splitButtonPreviewProps,
  "stack": stackPreviewProps,
  "stacked-list": stackedListPreviewProps,
  "subheading": subheadingPreviewProps,
  "switch": switchPreviewProps,
  "tab-navigation": tabNavigationPreviewProps,
  "table": tablePreviewProps,
  "tabs": tabsPreviewProps,
  "tag": tagPreviewProps,
  "tag-group": tagGroupPreviewProps,
  "tag-input": tagInputPreviewProps,
  "text": textPreviewProps,
  "text-list": textListPreviewProps,
  "textarea": textareaPreviewProps,
  "toast": toastPreviewProps,
  "toggle": togglePreviewProps,
  "toggle-group": toggleGroupPreviewProps,
  "toolbar": toolbarPreviewProps,
  "tooltip": tooltipPreviewProps,
  "tracker": trackerPreviewProps,
} as const satisfies Record<string, PropMetadata[]>;

// Component metadata registry
export const COMPONENT_METADATA_REGISTRY = {
  "accordion": { title: accordionConfig.name, description: accordionConfig.description },
  "alert-dialog": { title: alertDialogConfig.name, description: alertDialogConfig.description },
  "area-chart": { title: areaChartConfig.name, description: areaChartConfig.description },
  "avatar": { title: avatarConfig.name, description: avatarConfig.description },
  "badge": { title: badgeConfig.name, description: badgeConfig.description },
  "bar-chart": { title: barChartConfig.name, description: barChartConfig.description },
  "bar-list": { title: barListConfig.name, description: barListConfig.description },
  "breadcrumbs": { title: breadcrumbsConfig.name, description: breadcrumbsConfig.description },
  "button": { title: buttonConfig.name, description: buttonConfig.description },
  "button-group": { title: buttonGroupConfig.name, description: buttonGroupConfig.description },
  "calendar": { title: calendarConfig.name, description: calendarConfig.description },
  "callout": { title: calloutConfig.name, description: calloutConfig.description },
  "card": { title: cardConfig.name, description: cardConfig.description },
  "carousel": { title: carouselConfig.name, description: carouselConfig.description },
  "category-bar": { title: categoryBarConfig.name, description: categoryBarConfig.description },
  "checkbox": { title: checkboxConfig.name, description: checkboxConfig.description },
  "checkbox-group": { title: checkboxGroupConfig.name, description: checkboxGroupConfig.description },
  "code-block": { title: codeBlockConfig.name, description: codeBlockConfig.description },
  "collapsible": { title: collapsibleConfig.name, description: collapsibleConfig.description },
  "combo-chart": { title: comboChartConfig.name, description: comboChartConfig.description },
  "combobox": { title: comboboxConfig.name, description: comboboxConfig.description },
  "context-menu": { title: contextMenuConfig.name, description: contextMenuConfig.description },
  "copy-button": { title: copyButtonConfig.name, description: copyButtonConfig.description },
  "date-picker": { title: datePickerConfig.name, description: datePickerConfig.description },
  "description-list": { title: descriptionListConfig.name, description: descriptionListConfig.description },
  "dialog": { title: dialogConfig.name, description: dialogConfig.description },
  "dismiss-button": { title: dismissButtonConfig.name, description: dismissButtonConfig.description },
  "divider": { title: dividerConfig.name, description: dividerConfig.description },
  "donut-chart": { title: donutChartConfig.name, description: donutChartConfig.description },
  "dot": { title: dotConfig.name, description: dotConfig.description },
  "drawer": { title: drawerConfig.name, description: drawerConfig.description },
  "dropdown-item": { title: dropdownItemConfig.name, description: dropdownItemConfig.description },
  "empty-state": { title: emptyStateConfig.name, description: emptyStateConfig.description },
  "field": { title: fieldConfig.name, description: fieldConfig.description },
  "field-array": { title: fieldArrayConfig.name, description: fieldArrayConfig.description },
  "fieldset": { title: fieldsetConfig.name, description: fieldsetConfig.description },
  "form": { title: formConfig.name, description: formConfig.description },
  "grid": { title: gridConfig.name, description: gridConfig.description },
  "heading": { title: headingConfig.name, description: headingConfig.description },
  "heading-element": { title: headingElementConfig.name, description: headingElementConfig.description },
  "icon": { title: iconConfig.name, description: iconConfig.description },
  "icon-container": { title: iconContainerConfig.name, description: iconContainerConfig.description },
  "icon-select": { title: iconSelectConfig.name, description: iconSelectConfig.description },
  "input": { title: inputConfig.name, description: inputConfig.description },
  "kbd": { title: kbdConfig.name, description: kbdConfig.description },
  "label": { title: labelConfig.name, description: labelConfig.description },
  "line-chart": { title: lineChartConfig.name, description: lineChartConfig.description },
  "loader": { title: loaderConfig.name, description: loaderConfig.description },
  "menu": { title: menuConfig.name, description: menuConfig.description },
  "menu-bar": { title: menuBarConfig.name, description: menuBarConfig.description },
  "meter": { title: meterConfig.name, description: meterConfig.description },
  "navbar": { title: navbarConfig.name, description: navbarConfig.description },
  "navigation-menu": { title: navigationMenuConfig.name, description: navigationMenuConfig.description },
  "number-field": { title: numberFieldConfig.name, description: numberFieldConfig.description },
  "pagination": { title: paginationConfig.name, description: paginationConfig.description },
  "popover": { title: popoverConfig.name, description: popoverConfig.description },
  "preview-card": { title: previewCardConfig.name, description: previewCardConfig.description },
  "progress": { title: progressConfig.name, description: progressConfig.description },
  "progress-circle": { title: progressCircleConfig.name, description: progressCircleConfig.description },
  "radio": { title: radioConfig.name, description: radioConfig.description },
  "radio-card-group": { title: radioCardGroupConfig.name, description: radioCardGroupConfig.description },
  "radio-group": { title: radioGroupConfig.name, description: radioGroupConfig.description },
  "responsive-drawer": { title: responsiveDrawerConfig.name, description: responsiveDrawerConfig.description },
  "scroll-area": { title: scrollAreaConfig.name, description: scrollAreaConfig.description },
  "search-field": { title: searchFieldConfig.name, description: searchFieldConfig.description },
  "select": { title: selectConfig.name, description: selectConfig.description },
  "select-native": { title: selectNativeConfig.name, description: selectNativeConfig.description },
  "separator": { title: separatorConfig.name, description: separatorConfig.description },
  "sheet": { title: sheetConfig.name, description: sheetConfig.description },
  "sidebar": { title: sidebarConfig.name, description: sidebarConfig.description },
  "skeleton": { title: skeletonConfig.name, description: skeletonConfig.description },
  "slider": { title: sliderConfig.name, description: sliderConfig.description },
  "spark-chart": { title: sparkChartConfig.name, description: sparkChartConfig.description },
  "split-button": { title: splitButtonConfig.name, description: splitButtonConfig.description },
  "stack": { title: stackConfig.name, description: stackConfig.description },
  "stacked-list": { title: stackedListConfig.name, description: stackedListConfig.description },
  "subheading": { title: subheadingConfig.name, description: subheadingConfig.description },
  "switch": { title: switchConfig.name, description: switchConfig.description },
  "tab-navigation": { title: tabNavigationConfig.name, description: tabNavigationConfig.description },
  "table": { title: tableConfig.name, description: tableConfig.description },
  "tabs": { title: tabsConfig.name, description: tabsConfig.description },
  "tag": { title: tagConfig.name, description: tagConfig.description },
  "tag-group": { title: tagGroupConfig.name, description: tagGroupConfig.description },
  "tag-input": { title: tagInputConfig.name, description: tagInputConfig.description },
  "text": { title: textConfig.name, description: textConfig.description },
  "text-list": { title: textListConfig.name, description: textListConfig.description },
  "textarea": { title: textareaConfig.name, description: textareaConfig.description },
  "theme-toggle": { title: themeToggleConfig.name, description: themeToggleConfig.description },
  "toast": { title: toastConfig.name, description: toastConfig.description },
  "toggle": { title: toggleConfig.name, description: toggleConfig.description },
  "toggle-group": { title: toggleGroupConfig.name, description: toggleGroupConfig.description },
  "toolbar": { title: toolbarConfig.name, description: toolbarConfig.description },
  "tooltip": { title: tooltipConfig.name, description: tooltipConfig.description },
  "tracker": { title: trackerConfig.name, description: trackerConfig.description },
} as const satisfies Record<string, { title: string; description: string }>;

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
  // First try to get props from the preview props registry
  const previewProps = PREVIEW_PROPS_REGISTRY[id as keyof typeof PREVIEW_PROPS_REGISTRY];
  if (previewProps) {
    return previewProps;
  }

  // Fallback to config props
  const config = getComponentConfig(id);
  return config?.props || [];
}

export function getComponentMetadata(id: string): { title: string; description: string } | undefined {
  return COMPONENT_METADATA_REGISTRY[id as keyof typeof COMPONENT_METADATA_REGISTRY];
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
