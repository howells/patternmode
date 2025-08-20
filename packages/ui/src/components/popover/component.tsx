import { Popover as BasePopover } from "@base-ui-components/react/popover";
import type { useRender } from "@base-ui-components/react/use-render";
import type React from "react";
import type { Size } from "../../constants/sizes";
import { cx } from "../../utils/cx";
import type { ButtonProps } from "../button/component";
import { Button } from "../button/component";

type PopoverProps = React.ComponentPropsWithoutRef<typeof BasePopover.Root>;

/**
 * Root popover component for creating contextual overlays and tooltips.
 */
const Popover = (props: PopoverProps) => (
	<BasePopover.Root data-testid="popover" {...props} />
);

type PopoverTriggerProps = {
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
} & React.ComponentPropsWithoutRef<typeof BasePopover.Trigger>;

/**
 * Trigger element that opens the popover when activated with proper focus states.
 */
const PopoverTrigger = ({
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
}: PopoverTriggerProps) => {
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
		/>
	);

	return (
		<BasePopover.Trigger ref={ref} render={render || defaultRender} {...props}>
			{children}
		</BasePopover.Trigger>
	);
};
PopoverTrigger.displayName = "PopoverTrigger";

type _PopoverPortalProps = React.ComponentPropsWithoutRef<
	typeof BasePopover.Portal
>;

/**
 * Portal component for rendering popover content outside normal DOM flow.
 */
const PopoverPortal = BasePopover.Portal;

type PopoverBackdropProps = {
	/**
	 * Reference to the backdrop element.
	 */
	ref?: React.RefObject<React.ElementRef<typeof BasePopover.Backdrop> | null>;
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<typeof BasePopover.Backdrop>;

/**
 * Optional backdrop that appears behind the popover for modal-like behavior.
 */
const PopoverBackdrop = ({
	ref,
	className,
	...props
}: PopoverBackdropProps) => (
	<BasePopover.Backdrop
		ref={ref}
		className={cx(
			// base
			"fixed inset-0 z-40",
			// background
			"bg-black/20 dark:bg-black/40",
			// animations
			"data-[starting-style]:animate-in data-[ending-style]:animate-out",
			"data-[starting-style]:fade-in data-[ending-style]:fade-out",
			className,
		)}
		{...props}
	/>
);
PopoverBackdrop.displayName = "PopoverBackdrop";

type PopoverPositionerProps = {
	/**
	 * Reference to the positioner element.
	 */
	ref?: React.RefObject<React.ElementRef<typeof BasePopover.Positioner> | null>;
	/**
	 * Distance from the trigger element in pixels.
	 */
	sideOffset?: number;
	/**
	 * Padding for collision detection boundaries.
	 */
	collisionPadding?: number;
} & React.ComponentPropsWithoutRef<typeof BasePopover.Positioner>;

/**
 * Positioner component that handles smart popover placement with collision detection.
 */
const PopoverPositioner = ({
	ref,
	sideOffset = 10,
	collisionPadding = 5,
	...props
}: PopoverPositionerProps) => (
	<BasePopover.Positioner
		ref={ref}
		sideOffset={sideOffset}
		collisionPadding={collisionPadding}
		{...props}
	/>
);
PopoverPositioner.displayName = "PopoverPositioner";

type PopoverContentProps = {
	/**
	 * Reference to the content element.
	 */
	ref?: React.RefObject<React.ElementRef<typeof BasePopover.Popup> | null>;
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
	/**
	 * Distance from the trigger element in pixels.
	 */
	sideOffset?: number;
	/**
	 * Preferred placement side relative to trigger.
	 */
	side?: "top" | "right" | "bottom" | "left";
	/**
	 * Alignment relative to the trigger element.
	 */
	align?: "start" | "center" | "end";
	/**
	 * Padding for collision detection boundaries.
	 */
	collisionPadding?: number;
} & React.ComponentPropsWithoutRef<typeof BasePopover.Popup>;

/**
 * Main popover content container with automatic positioning and portal rendering.
 */
const PopoverContent = ({
	ref,
	className,
	sideOffset = 10,
	side = "bottom",
	align = "center",
	collisionPadding = 5,
	...props
}: PopoverContentProps) => {
	return (
		<PopoverPortal>
			<PopoverPositioner
				side={side}
				align={align}
				sideOffset={sideOffset}
				collisionPadding={collisionPadding}
			>
				<BasePopover.Popup
					ref={ref}
					className={cx(
						// base
						"z-50 min-w-60 max-w-sm overflow-hidden rounded-md border p-2.5 text-sm shadow-xl shadow-black/[2.5%]",
						// border color
						" dark:border-zinc-800",
						// text color
						"text-zinc-900 dark:text-zinc-50",
						// background color
						"bg-white dark:bg-zinc-950",
						// animations
						"data-[starting-style]:animate-in data-[ending-style]:animate-out",
						"data-[starting-style]:fade-in data-[ending-style]:fade-out",
						"data-[starting-style]:zoom-in-95 data-[ending-style]:zoom-out-95",
						"data-[side=bottom]:data-[starting-style]:slide-in-from-top-2 data-[side=bottom]:data-[ending-style]:slide-out-to-top-2",
						"data-[side=left]:data-[starting-style]:slide-in-from-right-2 data-[side=left]:data-[ending-style]:slide-out-to-right-2",
						"data-[side=right]:data-[starting-style]:slide-in-from-left-2 data-[side=right]:data-[ending-style]:slide-out-to-left-2",
						"data-[side=top]:data-[starting-style]:slide-in-from-bottom-2 data-[side=top]:data-[ending-style]:slide-out-to-bottom-2",
						className,
					)}
					onWheel={(event) => {
						event.stopPropagation();
						const isScrollingDown = event.deltaY > 0;
						if (isScrollingDown) {
							event.currentTarget.dispatchEvent(
								new KeyboardEvent("keydown", { key: "ArrowDown" }),
							);
						} else {
							event.currentTarget.dispatchEvent(
								new KeyboardEvent("keydown", { key: "ArrowUp" }),
							);
						}
					}}
					{...props}
				/>
			</PopoverPositioner>
		</PopoverPortal>
	);
};
PopoverContent.displayName = "PopoverContent";

type PopoverArrowProps = {
	/**
	 * Reference to the arrow element.
	 */
	ref?: React.RefObject<React.ElementRef<typeof BasePopover.Arrow> | null>;
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<typeof BasePopover.Arrow>;

/**
 * Arrow component that points from the popover to its trigger with automatic rotation.
 */
const PopoverArrow = ({ ref, className, ...props }: PopoverArrowProps) => (
	<BasePopover.Arrow
		ref={ref}
		className={cx(
			// base
			"flex transition-all duration-200 ease-out",
			// positioning based on side
			"data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90",
			"data-[side=right]:left-[-13px] data-[side=right]:-rotate-90",
			"data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
			className,
		)}
		{...props}
	>
		<svg width="20" height="10" viewBox="0 0 20 10" fill="none">
			<path
				d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
				className="fill-white dark:fill-zinc-950"
			/>
			<path
				d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
				className="fill-zinc-200 dark:fill-none"
			/>
			<path
				d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
				className="dark:fill-zinc-300"
			/>
		</svg>
	</BasePopover.Arrow>
);
PopoverArrow.displayName = "PopoverArrow";

type PopoverTitleProps = {
	/**
	 * Reference to the title element.
	 */
	ref?: React.RefObject<React.ElementRef<typeof BasePopover.Title> | null>;
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<typeof BasePopover.Title>;

/**
 * Title heading component for popover content with prominent typography.
 */
const PopoverTitle = ({ ref, className, ...props }: PopoverTitleProps) => (
	<BasePopover.Title
		ref={ref}
		className={cx(
			// base
			"text-lg font-semibold leading-6",
			// text color
			"text-zinc-900 dark:text-zinc-50",
			// spacing
			"mb-2",
			className,
		)}
		{...props}
	/>
);
PopoverTitle.displayName = "PopoverTitle";

type PopoverDescriptionProps = {
	/**
	 * Reference to the description element.
	 */
	ref?: React.RefObject<React.ElementRef<
		typeof BasePopover.Description
	> | null>;
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<typeof BasePopover.Description>;

/**
 * Description component for explanatory popover text with muted styling.
 */
const PopoverDescription = ({
	ref,
	className,
	...props
}: PopoverDescriptionProps) => (
	<BasePopover.Description
		ref={ref}
		className={cx(
			// base
			"text-sm leading-6",
			// text color
			"text-zinc-600 dark:text-zinc-400",
			className,
		)}
		{...props}
	/>
);
PopoverDescription.displayName = "PopoverDescription";

type PopoverCloseProps = {
	/**
	 * Reference to the close button element.
	 */
	ref?: React.RefObject<React.ElementRef<typeof BasePopover.Close> | null>;
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<typeof BasePopover.Close>;

/**
 * Close button component for dismissing the popover with focus management.
 */
const PopoverClose = ({ ref, className, ...props }: PopoverCloseProps) => (
	<BasePopover.Close
		ref={ref}
		className={cx(
			// base
			"inline-flex h-6 w-6 items-center justify-center rounded-sm text-sm font-medium transition-colors",
			// text color
			"text-zinc-500 dark:text-zinc-400",
			// hover
			"hover:text-zinc-900 dark:hover:text-zinc-50",
			// focus
			"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
			// disabled
			"disabled:pointer-events-none disabled:opacity-50",
			className,
		)}
		{...props}
	/>
);
PopoverClose.displayName = "PopoverClose";

/**
 * Legacy alias for PopoverTrigger (backward compatibility).
 * @deprecated Use PopoverTrigger instead.
 */
const PopoverAnchor = PopoverTrigger;

export {
	Popover,
	PopoverAnchor,
	PopoverArrow,
	PopoverBackdrop,
	PopoverClose,
	PopoverContent,
	PopoverDescription,
	PopoverPortal,
	PopoverPositioner,
	PopoverTitle,
	PopoverTrigger,
};

export type { PopoverProps };
