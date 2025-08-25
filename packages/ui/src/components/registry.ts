import { avatarConfig } from "@patternmode/avatar/config";
import { AvatarPreview, avatarPreviewProps } from "@patternmode/avatar/preview";
import { badgeConfig } from "@patternmode/badge/config";
import { BadgePreview, badgePreviewProps } from "@patternmode/badge/preview";
import { buttonConfig } from "@patternmode/button/config";
import { ButtonPreview, buttonPreviewProps } from "@patternmode/button/preview";
import { checkboxConfig } from "@patternmode/checkbox/config";
import {
	CheckboxPreview,
	checkboxPreviewProps,
} from "@patternmode/checkbox/preview";
import { comboboxConfig } from "@patternmode/combobox/config";
import {
	ComboboxPreview,
	comboboxPreviewProps,
} from "@patternmode/combobox/preview";
import { dismissButtonConfig } from "@patternmode/dismiss-button/config";
import {
	DismissButtonPreview,
	dismissButtonPreviewProps,
} from "@patternmode/dismiss-button/preview";
import { dotConfig } from "@patternmode/dot/config";
import { DotPreview, dotPreviewProps } from "@patternmode/dot/preview";
import { dropdownItemConfig } from "@patternmode/dropdown-item/config";
import {
	DropdownItemPreview,
	dropdownItemPreviewProps,
} from "@patternmode/dropdown-item/preview";
import { gridConfig } from "@patternmode/grid/config";
import { GridPreview, gridPreviewProps } from "@patternmode/grid/preview";
import { headingConfig } from "@patternmode/heading/config";
import {
	HeadingPreview,
	headingPreviewProps,
} from "@patternmode/heading/preview";
import { iconConfig } from "@patternmode/icon/config";
import { IconPreview, iconPreviewProps } from "@patternmode/icon/preview";
import { iconContainerConfig } from "@patternmode/icon-container/config";
import {
	IconContainerPreview,
	iconContainerPreviewProps,
} from "@patternmode/icon-container/preview";
import { iconSelectConfig } from "@patternmode/icon-select/config";
import {
	IconSelectPreview,
	iconSelectPreviewProps,
} from "@patternmode/icon-select/preview";
import { inputConfig } from "@patternmode/input/config";
import { InputPreview, inputPreviewProps } from "@patternmode/input/preview";
import { kbdConfig } from "@patternmode/kbd/config";
import { KbdPreview, kbdPreviewProps } from "@patternmode/kbd/preview";
import { labelConfig } from "@patternmode/label/config";
import { LabelPreview, labelPreviewProps } from "@patternmode/label/preview";
import { loaderConfig } from "@patternmode/loader/config";
import { LoaderPreview, loaderPreviewProps } from "@patternmode/loader/preview";
import { numberFieldConfig } from "@patternmode/number-field/config";
import {
	NumberFieldPreview,
	numberFieldPreviewProps,
} from "@patternmode/number-field/preview";
import { selectConfig } from "@patternmode/select/config";
import { SelectPreview, selectPreviewProps } from "@patternmode/select/preview";
import { selectNativeConfig } from "@patternmode/select-native/config";
import {
	SelectNativePreview,
	selectNativePreviewProps,
} from "@patternmode/select-native/preview";
import { separatorConfig } from "@patternmode/separator/config";
import {
	SeparatorPreview,
	separatorPreviewProps,
} from "@patternmode/separator/preview";
import { stackConfig } from "@patternmode/stack/config";
import { StackPreview, stackPreviewProps } from "@patternmode/stack/preview";
import { subheadingConfig } from "@patternmode/subheading/config";
import {
	SubheadingPreview,
	subheadingPreviewProps,
} from "@patternmode/subheading/preview";
import { switchConfig } from "@patternmode/switch/config";
import { SwitchPreview, switchPreviewProps } from "@patternmode/switch/preview";
import { tagConfig } from "@patternmode/tag/config";
import { TagPreview, tagPreviewProps } from "@patternmode/tag/preview";
import { tagGroupConfig } from "@patternmode/tag-group/config";
import {
	TagGroupPreview,
	tagGroupPreviewProps,
} from "@patternmode/tag-group/preview";
import { tagInputConfig } from "@patternmode/tag-input/config";
import {
	TagInputPreview,
	tagInputPreviewProps,
} from "@patternmode/tag-input/preview";
import { textConfig } from "@patternmode/text/config";
import { TextPreview, textPreviewProps } from "@patternmode/text/preview";
import { textListConfig } from "@patternmode/text-list/config";
import {
	TextListPreview,
	textListPreviewProps,
} from "@patternmode/text-list/preview";
import { textareaConfig } from "@patternmode/textarea/config";
import {
	TextareaPreview,
	textareaPreviewProps,
} from "@patternmode/textarea/preview";
import { tooltipConfig } from "@patternmode/tooltip/config";
import {
	TooltipPreview,
	tooltipPreviewProps,
} from "@patternmode/tooltip/preview";
import type React from "react";
import type { ComponentConfig } from "../types/component-types";
import type { PreviewProps } from "../types/preview-props-type";
import { accordionConfig } from "@patternmode/accordion/config";
import { AccordionPreview, accordionPreviewProps } from "@patternmode/accordion/preview";
import { alertDialogConfig } from "@patternmode/alert-dialog/config";
import {
	AlertDialogPreview,
	alertDialogPreviewProps,
} from "@patternmode/alert-dialog/preview";
import { breadcrumbsConfig } from "@patternmode/breadcrumbs/config";
import {
	BreadcrumbsPreview,
	breadcrumbsPreviewProps,
} from "@patternmode/breadcrumbs/preview";
import { buttonGroupConfig } from "@patternmode/button-group/config";
import {
	ButtonGroupPreview,
	buttonGroupPreviewProps,
} from "@patternmode/button-group/preview";
import { calendarConfig } from "@patternmode/calendar/config";
import { CalendarPreview, calendarPreviewProps } from "@patternmode/calendar/preview";
import { calloutConfig } from "@patternmode/callout/config";
import { CalloutPreview, calloutPreviewProps } from "@patternmode/callout/preview";
import { cardConfig } from "@patternmode/card/config";
import { CardPreview, cardPreviewProps } from "@patternmode/card/preview";
import { carouselConfig } from "@patternmode/carousel/config";
import { CarouselPreview, carouselPreviewProps } from "@patternmode/carousel/preview";
import { checkboxGroupConfig } from "./checkbox-group/config";
import {
	CheckboxGroupPreview,
	checkboxGroupPreviewProps,
} from "./checkbox-group/preview";
import { codeBlockConfig } from "./code-block/config";
import { CodeBlockPreview, codeBlockPreviewProps } from "./code-block/preview";
import { collapsibleConfig } from "./collapsible/config";
import {
	CollapsiblePreview,
	collapsiblePreviewProps,
} from "./collapsible/preview";
import { contextMenuConfig } from "./context-menu/config";
import {
	ContextMenuPreview,
	contextMenuPreviewProps,
} from "./context-menu/preview";
import { copyButtonConfig } from "./copy-button/config";
import {
	CopyButtonPreview,
	copyButtonPreviewProps,
} from "./copy-button/preview";
import { datePickerConfig } from "./date-picker/config";
import {
	DatePickerPreview,
	datePickerPreviewProps,
} from "./date-picker/preview";
import { descriptionListConfig } from "./description-list/config";
import {
	DescriptionListPreview,
	descriptionListPreviewProps,
} from "./description-list/preview";
import { dialogConfig } from "@patternmode/dialog/config";
import { DialogPreview, dialogPreviewProps } from "@patternmode/dialog/preview";
import { drawerConfig } from "@patternmode/drawer/config";
import { DrawerPreview, drawerPreviewProps } from "@patternmode/drawer/preview";
import { emptyStateConfig } from "./empty-state/config";
import {
	EmptyStatePreview,
	emptyStatePreviewProps,
} from "./empty-state/preview";
import { fieldConfig } from "./field/config";
import { FieldPreview, fieldPreviewProps } from "./field/preview";
import { fieldArrayConfig } from "./field-array/config";
import {
	FieldArrayPreview,
	fieldArrayPreviewProps,
} from "./field-array/preview";
import { fieldsetConfig } from "./fieldset/config";
import { FieldsetPreview, fieldsetPreviewProps } from "./fieldset/preview";
import { formConfig } from "./form/config";
import { FormPreview, formPreviewProps } from "./form/preview";
import { headingElementConfig } from "./heading-element/config";
import {
	HeadingElementPreview,
	headingElementPreviewProps,
} from "./heading-element/preview";
import { menuConfig } from "@patternmode/menu/config";
import { MenuPreview, menuPreviewProps } from "@patternmode/menu/preview";
import { menuBarConfig } from "./menu-bar/config";
import { MenuBarPreview, menuBarPreviewProps } from "./menu-bar/preview";
import { meterConfig } from "./meter/config";
import { MeterPreview, meterPreviewProps } from "./meter/preview";
import { navbarConfig } from "./navbar/config";
import { NavbarPreview, navbarPreviewProps } from "./navbar/preview";
import { navigationMenuConfig } from "./navigation-menu/config";
import {
	NavigationMenuPreview,
	navigationMenuPreviewProps,
} from "./navigation-menu/preview";
import { paginationConfig } from "./pagination/config";
import {
	PaginationPreview,
	paginationPreviewProps,
} from "./pagination/preview";
import { popoverConfig } from "@patternmode/popover/config";
import { PopoverPreview, popoverPreviewProps } from "@patternmode/popover/preview";
import { previewCardConfig } from "./preview-card/config";
import {
	PreviewCardPreview,
	previewCardPreviewProps,
} from "./preview-card/preview";
import { progressConfig } from "./progress/config";
import { ProgressPreview, progressPreviewProps } from "./progress/preview";
import { progressCircleConfig } from "./progress-circle/config";
import {
	ProgressCirclePreview,
	progressCirclePreviewProps,
} from "./progress-circle/preview";
import { radioConfig } from "@patternmode/radio/config";
import { RadioPreview, radioPreviewProps } from "@patternmode/radio/preview";
import { radioCardGroupConfig } from "./radio-card-group/config";
import {
	RadioCardGroupPreview,
	radioCardGroupPreviewProps,
} from "./radio-card-group/preview";
import { responsiveDrawerConfig } from "./responsive-drawer/config";
import {
	ResponsiveDrawerPreview,
	responsiveDrawerPreviewProps,
} from "./responsive-drawer/preview";
import { scrollAreaConfig } from "./scroll-area/config";
import {
	ScrollAreaPreview,
	scrollAreaPreviewProps,
} from "./scroll-area/preview";
import { searchFieldConfig } from "@patternmode/search-field/config";
import {
	SearchFieldPreview,
	searchFieldPreviewProps,
} from "@patternmode/search-field/preview";
import { sheetConfig } from "@patternmode/sheet/config";
import { SheetPreview, sheetPreviewProps } from "@patternmode/sheet/preview";
import { skeletonConfig } from "./skeleton/config";
import { SkeletonPreview } from "./skeleton/preview";
import { sliderConfig } from "./slider/config";
import { SliderPreview, sliderPreviewProps } from "./slider/preview";
import { sortableListConfig } from "@patternmode/sortable-list/config";
import {
	SortableListPreview,
	sortableListPreviewProps,
} from "@patternmode/sortable-list/preview";
import { splitButtonConfig } from "./split-button/config";
import {
	SplitButtonPreview,
	splitButtonPreviewProps,
} from "./split-button/preview";
import { stackedListConfig } from "./stacked-list/config";
import {
	StackedListPreview,
	stackedListPreviewProps,
} from "./stacked-list/preview";
import { tabNavigationConfig } from "./tab-navigation/config";
import {
	TabNavigationPreview,
	tabNavigationPreviewProps,
} from "./tab-navigation/preview";
import { tableConfig } from "./table/config";
import { TablePreview, tablePreviewProps } from "./table/preview";
import { tabsConfig } from "./tabs/config";
import { TabsPreview, tabsPreviewProps } from "./tabs/preview";
import { themeToggleConfig } from "./theme-toggle/config";
import { ThemeTogglePreview } from "./theme-toggle/preview";
import { toastConfig } from "./toast/config";
import { ToastPreview, toastPreviewProps } from "./toast/preview";
import { toggleConfig } from "./toggle/config";
import { TogglePreview, togglePreviewProps } from "./toggle/preview";
import { toggleGroupConfig } from "@patternmode/toggle-group/config";
import {
	ToggleGroupPreview,
	toggleGroupPreviewProps,
} from "@patternmode/toggle-group/preview";
import { toolbarConfig } from "@patternmode/toolbar/config";
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

// Static preview component registry
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
	"theme-toggle": ThemeTogglePreview,
	toast: ToastPreview,
	toggle: TogglePreview,
	"toggle-group": ToggleGroupPreview,
	toolbar: ToolbarPreview,
	tooltip: TooltipPreview,
} as const satisfies Record<string, React.ComponentType<any>>;

// Static preview props registry
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

// Component metadata registry
export const COMPONENT_METADATA_REGISTRY = {
	accordion: {
		title: accordionConfig.name,
		description: accordionConfig.description,
	},
	"alert-dialog": {
		title: alertDialogConfig.name,
		description: alertDialogConfig.description,
	},

	avatar: { title: avatarConfig.name, description: avatarConfig.description },
	badge: { title: badgeConfig.name, description: badgeConfig.description },

	breadcrumbs: {
		title: breadcrumbsConfig.name,
		description: breadcrumbsConfig.description,
	},
	button: { title: buttonConfig.name, description: buttonConfig.description },
	"button-group": {
		title: buttonGroupConfig.name,
		description: buttonGroupConfig.description,
	},
	calendar: {
		title: calendarConfig.name,
		description: calendarConfig.description,
	},
	callout: {
		title: calloutConfig.name,
		description: calloutConfig.description,
	},
	card: { title: cardConfig.name, description: cardConfig.description },
	carousel: {
		title: carouselConfig.name,
		description: carouselConfig.description,
	},

	checkbox: {
		title: checkboxConfig.name,
		description: checkboxConfig.description,
	},
	"checkbox-group": {
		title: checkboxGroupConfig.name,
		description: checkboxGroupConfig.description,
	},
	"code-block": {
		title: codeBlockConfig.name,
		description: codeBlockConfig.description,
	},
	collapsible: {
		title: collapsibleConfig.name,
		description: collapsibleConfig.description,
	},

	combobox: {
		title: comboboxConfig.name,
		description: comboboxConfig.description,
	},
	"context-menu": {
		title: contextMenuConfig.name,
		description: contextMenuConfig.description,
	},
	"copy-button": {
		title: copyButtonConfig.name,
		description: copyButtonConfig.description,
	},
	"date-picker": {
		title: datePickerConfig.name,
		description: datePickerConfig.description,
	},
	"description-list": {
		title: descriptionListConfig.name,
		description: descriptionListConfig.description,
	},
	dialog: { title: dialogConfig.name, description: dialogConfig.description },
	"dismiss-button": {
		title: dismissButtonConfig.name,
		description: dismissButtonConfig.description,
	},

	dot: { title: dotConfig.name, description: dotConfig.description },
	drawer: { title: drawerConfig.name, description: drawerConfig.description },
	"dropdown-item": {
		title: dropdownItemConfig.name,
		description: dropdownItemConfig.description,
	},
	"empty-state": {
		title: emptyStateConfig.name,
		description: emptyStateConfig.description,
	},
	field: { title: fieldConfig.name, description: fieldConfig.description },
	"field-array": {
		title: fieldArrayConfig.name,
		description: fieldArrayConfig.description,
	},
	fieldset: {
		title: fieldsetConfig.name,
		description: fieldsetConfig.description,
	},
	form: { title: formConfig.name, description: formConfig.description },
	grid: { title: gridConfig.name, description: gridConfig.description },
	heading: {
		title: headingConfig.name,
		description: headingConfig.description,
	},
	"heading-element": {
		title: headingElementConfig.name,
		description: headingElementConfig.description,
	},
	icon: { title: iconConfig.name, description: iconConfig.description },
	"icon-container": {
		title: iconContainerConfig.name,
		description: iconContainerConfig.description,
	},
	"icon-select": {
		title: iconSelectConfig.name,
		description: iconSelectConfig.description,
	},
	input: { title: inputConfig.name, description: inputConfig.description },
	kbd: { title: kbdConfig.name, description: kbdConfig.description },
	label: { title: labelConfig.name, description: labelConfig.description },

	loader: { title: loaderConfig.name, description: loaderConfig.description },
	menu: { title: menuConfig.name, description: menuConfig.description },
	"menu-bar": {
		title: menuBarConfig.name,
		description: menuBarConfig.description,
	},
	meter: { title: meterConfig.name, description: meterConfig.description },
	navbar: { title: navbarConfig.name, description: navbarConfig.description },
	"navigation-menu": {
		title: navigationMenuConfig.name,
		description: navigationMenuConfig.description,
	},
	"number-field": {
		title: numberFieldConfig.name,
		description: numberFieldConfig.description,
	},
	pagination: {
		title: paginationConfig.name,
		description: paginationConfig.description,
	},
	popover: {
		title: popoverConfig.name,
		description: popoverConfig.description,
	},
	"preview-card": {
		title: previewCardConfig.name,
		description: previewCardConfig.description,
	},
	progress: {
		title: progressConfig.name,
		description: progressConfig.description,
	},
	"progress-circle": {
		title: progressCircleConfig.name,
		description: progressCircleConfig.description,
	},
	radio: { title: radioConfig.name, description: radioConfig.description },
	"radio-card-group": {
		title: radioCardGroupConfig.name,
		description: radioCardGroupConfig.description,
	},
	"responsive-drawer": {
		title: responsiveDrawerConfig.name,
		description: responsiveDrawerConfig.description,
	},
	"scroll-area": {
		title: scrollAreaConfig.name,
		description: scrollAreaConfig.description,
	},
	"search-field": {
		title: searchFieldConfig.name,
		description: searchFieldConfig.description,
	},
	select: { title: selectConfig.name, description: selectConfig.description },
	"select-native": {
		title: selectNativeConfig.name,
		description: selectNativeConfig.description,
	},
	separator: {
		title: separatorConfig.name,
		description: separatorConfig.description,
	},
	sheet: { title: sheetConfig.name, description: sheetConfig.description },
	skeleton: {
		title: skeletonConfig.name,
		description: skeletonConfig.description,
	},
	slider: { title: sliderConfig.name, description: sliderConfig.description },
	"sortable-list": {
		title: sortableListConfig.name,
		description: sortableListConfig.description,
	},

	"split-button": {
		title: splitButtonConfig.name,
		description: splitButtonConfig.description,
	},
	stack: { title: stackConfig.name, description: stackConfig.description },
	"stacked-list": {
		title: stackedListConfig.name,
		description: stackedListConfig.description,
	},
	subheading: {
		title: subheadingConfig.name,
		description: subheadingConfig.description,
	},
	switch: { title: switchConfig.name, description: switchConfig.description },
	"tab-navigation": {
		title: tabNavigationConfig.name,
		description: tabNavigationConfig.description,
	},
	table: { title: tableConfig.name, description: tableConfig.description },
	tabs: { title: tabsConfig.name, description: tabsConfig.description },
	tag: { title: tagConfig.name, description: tagConfig.description },
	"tag-group": {
		title: tagGroupConfig.name,
		description: tagGroupConfig.description,
	},
	"tag-input": {
		title: tagInputConfig.name,
		description: tagInputConfig.description,
	},
	text: { title: textConfig.name, description: textConfig.description },
	"text-list": {
		title: textListConfig.name,
		description: textListConfig.description,
	},
	textarea: {
		title: textareaConfig.name,
		description: textareaConfig.description,
	},
	"theme-toggle": {
		title: themeToggleConfig.name,
		description: themeToggleConfig.description,
	},
	toast: { title: toastConfig.name, description: toastConfig.description },
	toggle: { title: toggleConfig.name, description: toggleConfig.description },
	"toggle-group": {
		title: toggleGroupConfig.name,
		description: toggleGroupConfig.description,
	},
	toolbar: {
		title: toolbarConfig.name,
		description: toolbarConfig.description,
	},
	tooltip: {
		title: tooltipConfig.name,
		description: tooltipConfig.description,
	},
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
		(config) => config.category === category,
	);
}

export function getTotalComponentsCount(): number {
	return Object.keys(COMPONENT_REGISTRY).length;
}

export function getPreviewComponent(
	id: string,
): React.ComponentType<any> | undefined {
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
		const primaryComponent = config.components.find((c) => c.primary);
		fallbackComponent =
			primaryComponent?.component || config.components[0]?.component;
	}

	return fallbackComponent;
}

export function getPreviewProps(id: string): PreviewProps[] {
	// First try to get props from the preview props registry
	const previewProps =
		PREVIEW_PROPS_REGISTRY[id as keyof typeof PREVIEW_PROPS_REGISTRY];
	if (previewProps) {
		return previewProps;
	}

	// Fallback to config props
	const config = getComponentConfig(id);
	return config?.previewProps || [];
}

export function getComponentMetadata(
	id: string,
): { title: string; description: string } | undefined {
	return COMPONENT_METADATA_REGISTRY[
		id as keyof typeof COMPONENT_METADATA_REGISTRY
	];
}

// Component list organized by categories (derived automatically)
export const COMPONENT_LIST = Object.values(COMPONENT_REGISTRY).reduce(
	(acc, config) => {
		const category = config.category;
		if (!acc[category]) {
			acc[category] = [];
		}
		acc[category].push(config.id);
		return acc;
	},
	{} as Record<string, string[]>,
);

// Category configuration for web app
export const CATEGORY_CONFIG = [
	{
		key: "display",
		name: "Display & Content",
		description: "Components for displaying and organizing content",
	},
	{
		key: "controls",
		name: "Interactive Controls",
		description: "User interaction and input components",
	},
	{
		key: "layout",
		name: "Layout & Structure",
		description: "Components for page structure and spacing",
	},
	{
		key: "overlay",
		name: "Overlays & Modals",
		description: "Components that appear over content",
	},
	{
		key: "visual",
		name: "Visual Elements",
		description: "Small visual indicators and decorative elements",
	},
	{
		key: "actions",
		name: "Actions & Commands",
		description: "Components that trigger actions or display commands",
	},
	{
		key: "media",
		name: "Media & Rich Content",
		description: "Components for rich media and complex content display",
	},
	{
		key: "typography",
		name: "Typography",
		description: "Text and typography components",
	},
	{
		key: "navigation",
		name: "Navigation",
		description: "Navigation and wayfinding components",
	},
	{
		key: "charts",
		name: "Charts",
		description:
			"Data visualization components for displaying metrics and analytics",
	},
	{
		key: "feedback",
		name: "Feedback",
		description:
			"Status indicators, notifications, and user feedback components",
	},
	{
		key: "forms",
		name: "Forms",
		description:
			"Form layouts and validation components for complex data entry",
	},
	{
		key: "data",
		name: "Data",
		description: "Components for displaying and organizing structured data",
	},
	{
		key: "ui",
		name: "UI",
		description: "Core user interface components for building applications",
	},
	{
		key: "inputs",
		name: "Inputs",
		description:
			"Form inputs and interactive controls for user data collection",
	},
	{
		key: "utility",
		name: "Utility",
		description: "Helper components and tools for enhanced functionality",
	},
] as const;

export type CategoryKey = (typeof CATEGORY_CONFIG)[number]["key"];

export function getCategoryInfo(categoryKey: string) {
	const category = CATEGORY_CONFIG.find((c) => c.key === categoryKey);
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
