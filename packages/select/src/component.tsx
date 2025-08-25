import { Select as BaseSelect } from "@base-ui-components/react/select";
import { Button } from "@patternmode/button";
import { cx } from "@patternmode/utils/cx";
import { hasErrorInput } from "@patternmode/utils/has-error-input";
import { ChevronsUpDown } from "lucide-react";
import type * as React from "react";
import type {
	SelectArrowProps,
	SelectBackdropProps,
	SelectContentProps,
	SelectGroupLabelProps,
	SelectItemProps,
	SelectPositionerProps,
	SelectScrollDownButtonProps,
	SelectScrollUpButtonProps,
	SelectSeparatorProps,
	SelectTriggerProps,
} from "./types";
import { selectItemVariants, selectPopoverVariants } from "./variants";

// Root
const Root = ({
	...props
}: React.ComponentPropsWithoutRef<typeof BaseSelect.Root>) => (
	<BaseSelect.Root data-testid="select" {...props} />
);
Root.displayName = "Select";
const Group = BaseSelect.Group;
const Value = BaseSelect.Value;
const Icon = BaseSelect.Icon;

// Trigger
const Trigger = ({
	ref,
	className,
	hasError,
	size,
	children,
	render,
	...props
}: SelectTriggerProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseSelect.Trigger> | null>;
}) => {
	const defaultRender = (
		<Button
			variant="outline"
			size={size}
			rightIcon={ChevronsUpDown}
			fullWidth
			className={cx("justify-between", hasError && hasErrorInput, className)}
		/>
	);

	return (
		<BaseSelect.Trigger
			ref={ref}
			render={render ?? defaultRender}
			nativeButton={true}
			{...props}
		>
			{children}
		</BaseSelect.Trigger>
	);
};
Trigger.displayName = "SelectTrigger";

// ScrollUpArrow
const ScrollUpArrow = ({
	ref,
	className,
	...props
}: SelectScrollUpButtonProps & {
	ref?: React.RefObject<React.ElementRef<
		typeof BaseSelect.ScrollUpArrow
	> | null>;
}) => (
	<BaseSelect.ScrollUpArrow
		ref={ref}
		className={cx(
			"flex cursor-default items-center justify-center py-1",
			className,
		)}
		{...props}
	/>
);
ScrollUpArrow.displayName = "ScrollUpArrow";

// ScrollDownArrow
const ScrollDownArrow = ({
	ref,
	className,
	...props
}: SelectScrollDownButtonProps & {
	ref?: React.RefObject<React.ElementRef<
		typeof BaseSelect.ScrollDownArrow
	> | null>;
}) => (
	<BaseSelect.ScrollDownArrow
		ref={ref}
		className={cx(
			"flex cursor-default items-center justify-center py-1",
			className,
		)}
		{...props}
	/>
);
ScrollDownArrow.displayName = "ScrollDownArrow";

// Backdrop
const Backdrop = ({
	ref,
	className,
	...props
}: SelectBackdropProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseSelect.Backdrop> | null>;
}) => (
	<BaseSelect.Backdrop
		ref={ref}
		className={cx(
			"fixed inset-0 z-40",
			"bg-black/20 dark:bg-black/40",
			"data-[starting-style]:animate-in data-[ending-style]:animate-out",
			"data-[starting-style]:fade-in data-[ending-style]:fade-out",
			className,
		)}
		{...props}
	/>
);
Backdrop.displayName = "SelectBackdrop";

const Portal = BaseSelect.Portal;

// Positioner
const Positioner = ({
	ref,
	sideOffset = 8,
	collisionPadding = 10,
	alignItemWithTrigger = true,
	...props
}: SelectPositionerProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseSelect.Positioner> | null>;
}) => (
	<BaseSelect.Positioner
		ref={ref}
		sideOffset={sideOffset}
		collisionPadding={collisionPadding}
		alignItemWithTrigger={alignItemWithTrigger}
		{...props}
	/>
);
Positioner.displayName = "SelectPositioner";

// Popup
const Popup = ({
	ref,
	className,
	children,
	sideOffset = 8,
	collisionPadding = 10,
	side = "bottom",
	align = "start",
	alignItemWithTrigger = true,
	size = "base",
	...props
}: SelectContentProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseSelect.Popup> | null>;
}) => (
	<Portal>
		<Positioner
			side={side}
			align={align}
			sideOffset={sideOffset}
			collisionPadding={collisionPadding}
			alignItemWithTrigger={alignItemWithTrigger}
		>
			<ScrollUpArrow />
			<BaseSelect.Popup
				ref={ref}
				className={cx(
					selectPopoverVariants({ size }),
					"min-w-[var(--anchor-width)]",
					className,
				)}
				{...props}
			>
				<div className="">{children}</div>
			</BaseSelect.Popup>
			<ScrollDownArrow />
		</Positioner>
	</Portal>
);
Popup.displayName = "SelectContent";

// GroupLabel
const GroupLabel = ({
	ref,
	className,
	...props
}: SelectGroupLabelProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseSelect.GroupLabel> | null>;
}) => (
	<BaseSelect.GroupLabel
		ref={ref}
		className={cx(
			"px-3 py-2 text-xs font-medium tracking-wide",
			"text-zinc-500 dark:text-zinc-500",
			className,
		)}
		{...props}
	/>
);
GroupLabel.displayName = "SelectGroupLabel";

// Item
const Item = ({
	ref,
	className,
	children,
	size = "base",
	...props
}: SelectItemProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseSelect.Item> | null>;
}) => {
	return (
		<BaseSelect.Item
			ref={ref}
			className={cx(
				selectItemVariants({ size }),
				"data-[disabled]:pointer-events-none data-[disabled]:text-zinc-400 data-[disabled]:hover:bg-none dark:data-[disabled]:text-zinc-600",
				className,
			)}
			{...props}
		>
			{children}
		</BaseSelect.Item>
	);
};
Item.displayName = "SelectItem";

// Separator
const Separator = ({
	ref,
	className,
	...props
}: SelectSeparatorProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseSelect.Separator> | null>;
}) => (
	<BaseSelect.Separator
		ref={ref}
		className={cx("-mx-1 my-1 h-px", "bg-zinc-300 dark:bg-zinc-700", className)}
		{...props}
	/>
);
Separator.displayName = "SelectSeparator";

// Arrow
const Arrow = ({
	ref,
	className,
	...props
}: SelectArrowProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseSelect.Arrow> | null>;
}) => (
	<BaseSelect.Arrow
		ref={ref}
		className={cx(
			"flex transition-all duration-200 ease-out",
			"data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90",
			"data-[side=right]:left-[-13px] data-[side=right]:-rotate-90",
			"data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
			className,
		)}
		{...props}
	>
		<svg width="20" height="10" viewBox="0 0 20 10" fill="none">
			<title>Select arrow</title>
			<path
				d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
				className="fill-white dark:fill-zinc-950"
			/>
			<path
				d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
				className="fill-zinc-200 dark:fill-zinc-700"
			/>
			<path
				d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
				className="fill-zinc-300 dark:fill-zinc-600"
			/>
		</svg>
	</BaseSelect.Arrow>
);
Arrow.displayName = "SelectArrow";
// Compose a Base-UI-compatible API surface on Select
const Select = Object.assign(Root, {
	Root,
	Trigger,
	Value,
	Icon,
	Portal,
	Positioner,
	ScrollUpArrow,
	Popup,
	Item,
	ItemText: BaseSelect.ItemText,
	ItemIndicator: BaseSelect.ItemIndicator,
	ScrollDownArrow,
	Group,
	GroupLabel,
	Separator,
	Backdrop,
	Arrow,
});

// Backwards-compatible named exports
const SelectTrigger = Trigger;
const SelectValue = Value;
const SelectPortal = Portal;
const SelectPositioner = Positioner;
const SelectContent = Popup;
const SelectItem = Item;
const SelectGroup = Group;
const SelectGroupLabel = GroupLabel;
const SelectSeparator = Separator;
const SelectBackdrop = Backdrop;
const SelectArrow = Arrow;
const SelectScrollUpButton = ScrollUpArrow;
const SelectScrollDownButton = ScrollDownArrow;

export {
	Select,
	SelectArrow,
	SelectBackdrop,
	SelectContent,
	SelectGroup,
	SelectGroupLabel,
	SelectItem,
	SelectPortal,
	SelectPositioner,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
	SelectScrollUpButton,
	SelectScrollDownButton,
};
