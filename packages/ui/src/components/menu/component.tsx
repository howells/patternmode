"use client";

import { Menu as BaseMenu } from "@base-ui-components/react/menu";
import { cx } from "@patternmode/utils/cx";
import { Check, ChevronRight, Circle, CircleDot } from "lucide-react";
import type * as React from "react";
import { Button } from "../button/component";
import type { ButtonProps } from "../button/types";
import { Icon as IconComponent } from "../icon/component";
import type { useRender } from "../utils/use-render";

/**
 * Root container for contextual menu with hierarchical navigation and action items.
 */
const Menu = (props: React.ComponentPropsWithoutRef<typeof BaseMenu.Root>) => (
	<BaseMenu.Root data-testid="menu" {...props} />
);

type MenuTriggerProps = {
	/**
	 * Reference to the trigger element.
	 */
	ref?: React.RefObject<React.ElementRef<typeof BasePopover.Trigger> | null>;
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
	/**
	 * Custom element to render (defaults to Button).
	 * Enables using custom components as the trigger.
	 */
	render?: useRender.RenderProp<Record<string, unknown>>;
	/**
	 * Button variant to use for the default render.
	 */
	variant?: ButtonProps["variant"];
	/**
	 * Button size to use for the default render.
	 */
	size?: Size;
	/**
	 * Icon component to display on the left side of the default Button render.
	 */
	leftIcon?: ButtonProps["leftIcon"];
	/**
	 * Icon component to display on the right side of the default Button render.
	 */
	rightIcon?: ButtonProps["rightIcon"];
	/**
	 * Icon component (proxy for leftIcon) for the default Button render.
	 */
	icon?: ButtonProps["icon"];
	/**
	 * Whether the button should take full width in the default render.
	 */
	fullWidth?: ButtonProps["fullWidth"];
	/**
	 * Whether the button should have rounded corners in the default render.
	 */
	rounded?: ButtonProps["rounded"];
} & React.ComponentPropsWithoutRef<typeof BaseMenu.Trigger>;

/**
 * Trigger element that opens the popover when activated with proper focus states.
 */
const MenuTrigger = ({
	ref,
	className,
	children,
	render,
	variant = "outline",
	size,
	leftIcon,
	rightIcon,
	icon,
	fullWidth,
	rounded,
	...props
}: MenuTriggerProps) => {
	// Default to Button render unless custom render prop is provided
	const defaultRender = (
		<Button
			variant={variant}
			size={size}
			leftIcon={leftIcon}
			rightIcon={rightIcon}
			icon={icon}
			fullWidth={fullWidth}
			rounded={rounded}
			className={cx("cursor-pointer", className)}
		>
			{children}
		</Button>
	);

	return (
		<BaseMenu.Trigger ref={ref} render={render || defaultRender} {...props}>
			{render ? children : undefined}
		</BaseMenu.Trigger>
	);
};
MenuTrigger.displayName = "MenuTrigger";

const MenuGroup = BaseMenu.Group;

const MenuSubmenu = BaseMenu.SubmenuRoot;

const MenuRadioGroup = BaseMenu.RadioGroup;

type MenuSubmenuTriggerProps = React.ComponentPropsWithoutRef<
	typeof BaseMenu.SubmenuTrigger
> & {
	ref?: React.RefObject<React.ElementRef<
		typeof BaseMenu.SubmenuTrigger
	> | null>;
};

const MenuSubmenuTrigger = ({
	ref: forwardedRef,
	className,
	children,
	...props
}: MenuSubmenuTriggerProps) => (
	<BaseMenu.SubmenuTrigger
		ref={forwardedRef}
		className={cx(
			// base
			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-1 outline-hidden transition-colors data-checked:font-semibold sm:text-sm",
			// text color
			"text-zinc-900 dark:text-zinc-50",
			// disabled
			"data-disabled:pointer-events-none data-disabled:text-zinc-400 data-disabled:hover:bg-none dark:data-disabled:text-zinc-600",
			// focus
			"focus-visible:bg-zinc-100 data-[popup-open]:bg-zinc-100 dark:focus-visible:bg-zinc-900 dark:data-[popup-open]:bg-zinc-900",
			// hover
			"hover:bg-zinc-100 dark:hover:bg-zinc-900",
			className,
		)}
		{...props}
	>
		{children}
		<IconComponent icon={ChevronRight} className="ml-auto" aria-hidden="true" />
	</BaseMenu.SubmenuTrigger>
);
MenuSubmenuTrigger.displayName = "MenuSubmenuTrigger";

type MenuSubmenuContentProps = React.ComponentPropsWithoutRef<
	typeof BaseMenu.Popup
> & {
	ref?: React.RefObject<React.ElementRef<typeof BaseMenu.Popup> | null>;
};

const MenuSubmenuContent = ({
	ref: forwardedRef,
	className,
	...props
}: MenuSubmenuContentProps) => (
	<BaseMenu.Portal>
		<BaseMenu.Positioner sideOffset={8} collisionPadding={8}>
			<BaseMenu.Popup
				ref={forwardedRef}
				className={cx(
					// base
					"relative z-50 overflow-hidden rounded-md border p-1 shadow-xl shadow-black/[2.5%]",
					// widths
					"min-w-32",
					// heights
					"max-h-[var(--menu-available-height)]",
					// background color
					"bg-white dark:bg-zinc-950",
					// text color
					"text-zinc-900 dark:text-zinc-50",
					// border color
					" dark:border-zinc-800",
					// transition
					"will-change-[transform,opacity]",
					"data-[starting-style]:animate-hide",
					"data-[ending-style]:animate-hide",
					"data-[side=bottom]:animate-slide-down-and-fade data-[side=left]:animate-slide-left-and-fade data-[side=right]:animate-slide-right-and-fade data-[side=top]:animate-slide-up-and-fade",
					className,
				)}
				{...props}
			/>
		</BaseMenu.Positioner>
	</BaseMenu.Portal>
);
MenuSubmenuContent.displayName = "MenuSubmenuContent";

type MenuContentProps = React.ComponentPropsWithoutRef<
	typeof BaseMenu.Popup
> & {
	/**
	 * Distance in pixels from the trigger element.
	 * Controls the gap between the menu trigger and the popup content.
	 */
	sideOffset?: number;
	/**
	 * Minimum distance in pixels from viewport edges.
	 * Prevents the menu from being cut off at screen boundaries.
	 */
	collisionPadding?: number;
	/**
	 * Alignment relative to the trigger element.
	 * Determines how the menu aligns with its trigger horizontally.
	 */
	align?: "start" | "center" | "end";
	ref?: React.RefObject<React.ElementRef<typeof BaseMenu.Popup> | null>;
};

/**
 * Container for menu items with positioning and animation support.
 */
const MenuContent = ({
	ref: forwardedRef,
	className,
	sideOffset = 8,
	collisionPadding = 8,
	align = "center",
	...props
}: MenuContentProps) => (
	<BaseMenu.Portal>
		<BaseMenu.Positioner
			sideOffset={sideOffset}
			align={align}
			collisionPadding={collisionPadding}
		>
			<BaseMenu.Popup
				ref={forwardedRef}
				className={cx(
					// base
					"relative z-50 overflow-hidden rounded-md border p-1 shadow-xl shadow-black/[2.5%]",
					// widths
					"min-w-48",
					// heights
					"max-h-[var(--menu-available-height)]",
					// background color
					"bg-white dark:bg-zinc-950",
					// text color
					"text-zinc-900 dark:text-zinc-50",
					// border color
					" dark:border-zinc-800",
					// transition
					"will-change-[transform,opacity]",
					"data-[starting-style]:animate-hide",
					"data-[ending-style]:animate-hide",
					"data-[side=bottom]:animate-slide-down-and-fade data-[side=left]:animate-slide-left-and-fade data-[side=right]:animate-slide-right-and-fade data-[side=top]:animate-slide-up-and-fade",
					className,
				)}
				{...props}
			/>
		</BaseMenu.Positioner>
	</BaseMenu.Portal>
);
MenuContent.displayName = "MenuContent";

type MenuItemProps = React.ComponentPropsWithoutRef<typeof BaseMenu.Item> & {
	/**
	 * Keyboard shortcut text displayed on the right side.
	 * Shows helpful shortcut hints for menu actions (e.g., "⌘N", "Ctrl+C").
	 */
	shortcut?: string;
	/**
	 * Additional hint text displayed on the right side.
	 * Provides extra context or information about the menu item.
	 */
	hint?: string;
	/**
	 * Icon component to display on the left side of the menu item.
	 * Enhances visual recognition and menu navigation.
	 */
	icon?: React.ComponentType<{ className?: string }>;
	ref?: React.RefObject<React.ElementRef<typeof BaseMenu.Item> | null>;
};

/**
 * Individual menu item with support for icons, shortcuts, and hints.
 */
const MenuItem = ({
	ref: forwardedRef,
	className,
	shortcut,
	hint,
	icon: Icon,
	children,
	...props
}: MenuItemProps) => (
	<BaseMenu.Item
		ref={forwardedRef}
		className={cx(
			// base
			"group/MenuItem relative flex cursor-pointer select-none items-center rounded-sm py-1.5 outline-hidden transition-colors sm:text-sm",
			// adjust padding based on whether icon is present
			Icon ? "pl-8 pr-1" : "pl-2 pr-1",
			// text color
			"text-zinc-900 dark:text-zinc-50",
			// disabled
			"data-disabled:pointer-events-none data-disabled:text-zinc-400 data-disabled:hover:bg-none dark:data-disabled:text-zinc-600",
			// focus
			"focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-900",
			// hover
			"data-highlighted:bg-zinc-100 dark:data-highlighted:bg-zinc-900",
			className,
		)}
		tremor-id="tremor-raw"
		{...props}
	>
		{Icon && (
			<span className="absolute left-2 flex size-4 items-center justify-center">
				<IconComponent
					icon={Icon}
					className="text-zinc-600 dark:text-zinc-400 group-data-disabled/MenuItem:text-zinc-400 dark:group-data-disabled/MenuItem:text-zinc-700"
				/>
			</span>
		)}
		{children}
		{hint && (
			<span
				className={cx("ml-auto pl-2 text-sm text-zinc-400 dark:text-zinc-600")}
			>
				{hint}
			</span>
		)}
		{shortcut && (
			<span
				className={cx("ml-auto pl-2 text-sm text-zinc-400 dark:text-zinc-600")}
			>
				{shortcut}
			</span>
		)}
	</BaseMenu.Item>
);
MenuItem.displayName = "MenuItem";

type MenuCheckboxItemProps = React.ComponentPropsWithoutRef<
	typeof BaseMenu.CheckboxItem
> & {
	/**
	 * Keyboard shortcut text displayed on the right side.
	 * Shows helpful shortcut hints for checkbox actions.
	 */
	shortcut?: string;
	/**
	 * Additional hint text displayed on the right side.
	 * Provides extra context about the checkbox state or functionality.
	 */
	hint?: string;
	ref?: React.RefObject<React.ElementRef<typeof BaseMenu.CheckboxItem> | null>;
};

/**
 * Menu item with checkbox functionality for toggle states.
 */
const MenuCheckboxItem = ({
	ref: forwardedRef,
	className,
	hint,
	shortcut,
	children,
	checked,
	...props
}: MenuCheckboxItemProps) => (
	<BaseMenu.CheckboxItem
		ref={forwardedRef}
		className={cx(
			// base
			"relative flex cursor-pointer select-none items-center gap-x-2 rounded-sm py-1.5 pl-8 pr-1 outline-hidden transition-colors data-checked:font-semibold sm:text-sm",
			// text color
			"text-zinc-900 dark:text-zinc-50",
			// disabled
			"data-disabled:pointer-events-none data-disabled:text-zinc-400 data-disabled:hover:bg-none dark:data-disabled:text-zinc-600",
			// focus
			"focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-900",
			// hover
			"data-highlighted:bg-zinc-100 dark:data-highlighted:bg-zinc-900",
			className,
		)}
		checked={checked}
		{...props}
	>
		<span className="absolute left-2 flex size-4 items-center justify-center">
			<BaseMenu.CheckboxItemIndicator>
				<IconComponent
					icon={Check}
					aria-hidden="true"
					className="size-full text-zinc-800 dark:text-zinc-200"
				/>
			</BaseMenu.CheckboxItemIndicator>
		</span>
		{children}
		{hint && (
			<span
				className={cx(
					"ml-auto text-sm font-normal text-zinc-400 dark:text-zinc-600",
				)}
			>
				{hint}
			</span>
		)}
		{shortcut && (
			<span
				className={cx(
					"ml-auto text-sm font-normal tracking-widest text-zinc-400 dark:border-zinc-800 dark:text-zinc-600",
				)}
			>
				{shortcut}
			</span>
		)}
	</BaseMenu.CheckboxItem>
);
MenuCheckboxItem.displayName = "MenuCheckboxItem";

type MenuRadioItemProps = React.ComponentPropsWithoutRef<
	typeof BaseMenu.RadioItem
> & {
	/**
	 * Keyboard shortcut text displayed on the right side.
	 * Shows helpful shortcut hints for radio selection actions.
	 */
	shortcut?: string;
	/**
	 * Additional hint text displayed on the right side.
	 * Provides extra context about the radio option or its effects.
	 */
	hint?: string;
	ref?: React.RefObject<React.ElementRef<typeof BaseMenu.RadioItem> | null>;
};

/**
 * Menu item with radio button functionality for mutually exclusive selections.
 */
const MenuRadioItem = ({
	ref: forwardedRef,
	className,
	hint,
	shortcut,
	children,
	...props
}: MenuRadioItemProps) => (
	<BaseMenu.RadioItem
		ref={forwardedRef}
		className={cx(
			// base
			"group/MenuRadioItem relative flex cursor-pointer select-none items-center gap-x-2 rounded-sm py-1.5 pl-8 pr-1 outline-hidden transition-colors data-checked:font-semibold sm:text-sm",
			// text color
			"text-zinc-900 dark:text-zinc-50",
			// disabled
			"data-disabled:pointer-events-none data-disabled:text-zinc-400 data-disabled:hover:bg-none dark:data-disabled:text-zinc-600",
			// focus
			"focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-900",
			// hover
			"data-highlighted:bg-zinc-100 dark:data-highlighted:bg-zinc-900",
			className,
		)}
		{...props}
	>
		<span className="absolute left-2 flex size-4 items-center justify-center">
			<BaseMenu.RadioItemIndicator>
				<IconComponent
					icon={CircleDot}
					aria-hidden="true"
					className="size-full text-blue-500 dark:text-blue-500"
				/>
			</BaseMenu.RadioItemIndicator>
			<span className="data-checked:hidden">
				<IconComponent
					icon={Circle}
					aria-hidden="true"
					className="size-full text-zinc-300 dark:text-zinc-700"
				/>
			</span>
		</span>
		{children}
		{hint && (
			<span
				className={cx(
					"ml-auto text-sm font-normal text-zinc-400 dark:text-zinc-600",
				)}
			>
				{hint}
			</span>
		)}
		{shortcut && (
			<span
				className={cx(
					"ml-auto text-sm font-normal tracking-widest text-zinc-400 dark:border-zinc-800 dark:text-zinc-600",
				)}
			>
				{shortcut}
			</span>
		)}
	</BaseMenu.RadioItem>
);
MenuRadioItem.displayName = "MenuRadioItem";

type MenuLabelProps = React.ComponentPropsWithoutRef<
	typeof BaseMenu.GroupLabel
> & {
	ref?: React.RefObject<React.ElementRef<typeof BaseMenu.GroupLabel> | null>;
};

/**
 * Label component for grouping and organizing menu items.
 */
const MenuLabel = ({
	ref: forwardedRef,
	className,
	...props
}: MenuLabelProps) => (
	<BaseMenu.GroupLabel
		ref={forwardedRef}
		className={cx(
			// base
			"px-2 py-2 text-xs font-medium tracking-wide",
			// text color
			"text-zinc-500 dark:text-zinc-500",
			className,
		)}
		{...props}
	/>
);
MenuLabel.displayName = "MenuLabel";

type MenuSeparatorProps = React.ComponentPropsWithoutRef<
	typeof BaseMenu.Separator
> & {
	ref?: React.RefObject<React.ElementRef<typeof BaseMenu.Separator> | null>;
};

/**
 * Visual separator for dividing menu items into logical groups.
 */
const MenuSeparator = ({
	ref: forwardedRef,
	className,
	...props
}: MenuSeparatorProps) => (
	<BaseMenu.Separator
		ref={forwardedRef}
		className={cx("-mx-1 my-1 h-px border-t  dark:border-zinc-800", className)}
		{...props}
	/>
);
MenuSeparator.displayName = "MenuSeparator";

export {
	Menu,
	MenuCheckboxItem,
	MenuContent,
	MenuGroup,
	MenuItem,
	MenuLabel,
	MenuRadioGroup,
	MenuRadioItem,
	MenuSeparator,
	MenuSubmenu,
	MenuSubmenuContent,
	MenuSubmenuTrigger,
	MenuTrigger,
};
