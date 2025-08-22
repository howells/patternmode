"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { defaultConfig } from "@patternmode/config/default-config";
import { cx } from "@patternmode/utils/cx";
import { focusRing } from "@patternmode/utils/focus-ring";
import { X } from "lucide-react";
import type * as React from "react";
import { Icon } from "@patternmode/icon";

// Inline DismissButton functionality for Sheet
const InlineSheetDismissButton = ({
	ref,
	onClick,
	icon: IconComponent = X,
	iconStrokeWidth = defaultConfig.components.iconStrokeWidth,
	size = "base",
	className,
	"aria-label": ariaLabel = "Remove",
}: {
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	icon?: React.ComponentType<{
		className?: string;
		strokeWidth?: number;
	}>;
	iconStrokeWidth?: number;
	size?: "sm" | "base" | "lg";
	className?: string;
	"aria-label"?: string;
} & { ref?: React.RefObject<HTMLButtonElement | null> }) => {
	// Size-based icon sizing
	const iconSizeMap = {
		sm: "xs" as const,
		base: "xs" as const,
		lg: "sm" as const,
	};

	const iconSize = iconSizeMap[size];

	return (
		<button
			ref={ref}
			type="button"
			onClick={onClick}
			className={cx(
				// Base button styling
				"flex items-center justify-center rounded-full transition-colors",
				// Size-based dimensions
				size === "sm" && "size-4",
				size === "base" && "size-5",
				size === "lg" && "size-6",
				// Color styling (subtle, context-aware)
				"text-zinc-500 dark:text-zinc-400",
				// Hover states
				"hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200",
				// Focus states
				"focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900",
				className,
			)}
			aria-label={ariaLabel}
		>
			<Icon
				icon={IconComponent}
				size={iconSize}
				strokeWidth={iconStrokeWidth}
			/>
		</button>
	);
};

/**
 * Props for the Sheet component.
 */
type SheetProps = React.ComponentPropsWithoutRef<typeof Dialog.Root>;

/**
 * Sheet overlay panel component sliding from screen edges for desktop-optimized interfaces.
 */
const Sheet = (props: SheetProps) => {
	return <Dialog.Root data-testid="sheet" {...props} />;
};
Sheet.displayName = "Sheet";

/**
 * Props for the SheetTrigger component.
 */
type SheetTriggerProps = React.ComponentPropsWithoutRef<typeof Dialog.Trigger>;

/**
 * Sheet trigger component that opens the sheet when activated.
 */
const SheetTrigger = ({
	ref,
	className,
	...props
}: SheetTriggerProps & {
	ref?: React.RefObject<React.ElementRef<typeof Dialog.Trigger> | null>;
}) => {
	return <Dialog.Trigger ref={ref} className={cx(className)} {...props} />;
};
SheetTrigger.displayName = "Sheet.Trigger";

/**
 * Props for the SheetClose component.
 */
type SheetCloseProps = React.ComponentPropsWithoutRef<typeof Dialog.Close>;

/**
 * Sheet close component for dismissing the sheet.
 */
const SheetClose = ({
	ref,
	className,
	...props
}: SheetCloseProps & {
	ref?: React.RefObject<React.ElementRef<typeof Dialog.Close> | null>;
}) => {
	return <Dialog.Close ref={ref} className={cx(className)} {...props} />;
};
SheetClose.displayName = "Sheet.Close";

/**
 * Portal component for rendering sheet content outside normal DOM flow.
 */
const SheetPortal = Dialog.Portal;

/**
 * Props for the SheetOverlay component.
 */
type SheetOverlayProps = React.ComponentPropsWithoutRef<typeof Dialog.Backdrop>;

/**
 * Overlay/backdrop component that appears behind the sheet.
 */
const SheetOverlay = ({
	ref: forwardedRef,
	className,
	...props
}: SheetOverlayProps & {
	ref?: React.RefObject<React.ElementRef<typeof Dialog.Backdrop> | null>;
}) => {
	return (
		<Dialog.Backdrop
			ref={forwardedRef}
			className={cx(
				// base
				"fixed inset-0 z-50 overflow-y-auto",
				// background color
				"bg-black/30",
				// transition
				"data-[closed]:animate-hide data-[open]:animate-dialog-overlay-show",
				className,
			)}
			{...props}
			style={{
				animationDuration: "400ms",
				animationFillMode: "backwards",
			}}
		/>
	);
};

SheetOverlay.displayName = "SheetOverlay";

/**
 * Props for the SheetContent component.
 */
type SheetContentProps = React.ComponentPropsWithoutRef<typeof Dialog.Popup>;

/**
 * Main sheet content container with positioning and animations.
 */
const SheetContent = ({
	ref: forwardedRef,
	className,
	...props
}: SheetContentProps & {
	ref?: React.RefObject<React.ElementRef<typeof Dialog.Popup> | null>;
}) => {
	return (
		<SheetPortal>
			<SheetOverlay />
			<Dialog.Popup
				ref={forwardedRef}
				className={cx(
					// base
					"fixed inset-y-2 z-50 mx-auto flex w-[95vw] flex-1 flex-col overflow-y-auto rounded-md border p-4 shadow-lg focus:outline-hidden max-sm:inset-x-2 sm:inset-y-2 sm:right-2 sm:max-w-lg sm:p-6",
					// border color
					" dark:border-zinc-900",
					// background color
					"bg-white dark:bg-[#090E1A]",
					// transition
					"data-[closed]:animate-sheet-slide-right-and-fade data-[open]:animate-sheet-slide-left-and-fade",
					focusRing,
					className,
				)}
				{...props}
			/>
		</SheetPortal>
	);
};

SheetContent.displayName = "SheetContent";

/**
 * Props for the SheetHeader component.
 */
type SheetHeaderProps = {
	/**
	 * Header content including title, description, and other elements.
	 */
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * Sheet header component with title, description, and close button.
 */
const SheetHeader = ({
	ref,
	children,
	className,
	...props
}: SheetHeaderProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
	return (
		<div
			ref={ref}
			className="flex items-start justify-between gap-x-4 border-b  pb-4 dark:border-zinc-900"
			{...props}
		>
			<div className={cx("mt-1 flex flex-col gap-y-1", className)}>
				{children}
			</div>
			<Dialog.Close
				render={
					<InlineSheetDismissButton
						size="lg"
						aria-label="Close sheet"
						className="mt-1 shrink-0"
					/>
				}
			/>
		</div>
	);
};

SheetHeader.displayName = "Sheet.Header";

/**
 * Props for the SheetTitle component.
 */
type SheetTitleProps = React.ComponentPropsWithoutRef<typeof Dialog.Title>;

/**
 * Sheet title component for the main heading.
 */
const SheetTitle = ({
	ref: forwardedRef,
	className,
	...props
}: SheetTitleProps & {
	ref?: React.RefObject<React.ElementRef<typeof Dialog.Title> | null>;
}) => (
	<Dialog.Title
		ref={forwardedRef}
		className={cx(
			// base
			"text-base font-semibold",
			// text color
			"text-zinc-900 dark:text-zinc-50",
			className,
		)}
		{...props}
	/>
);

SheetTitle.displayName = "SheetTitle";

/**
 * Props for the SheetBody component.
 */
type SheetBodyProps = React.ComponentPropsWithoutRef<"div">;

/**
 * Sheet body component for the main scrollable content area.
 */
const SheetBody = ({
	ref,
	className,
	...props
}: SheetBodyProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
	return <div ref={ref} className={cx("flex-1 py-4", className)} {...props} />;
};
SheetBody.displayName = "Sheet.Body";

/**
 * Props for the SheetDescription component.
 */
type SheetDescriptionProps = React.ComponentPropsWithoutRef<
	typeof Dialog.Description
>;

/**
 * Sheet description component for explanatory text.
 */
const SheetDescription = ({
	ref: forwardedRef,
	className,
	...props
}: SheetDescriptionProps & {
	ref?: React.RefObject<React.ElementRef<typeof Dialog.Description> | null>;
}) => {
	return (
		<Dialog.Description
			ref={forwardedRef}
			className={cx("text-zinc-500 dark:text-zinc-500", className)}
			{...props}
		/>
	);
};

SheetDescription.displayName = "SheetDescription";

/**
 * Props for the SheetFooter component.
 */
type SheetFooterProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Sheet footer component for action buttons and controls.
 */
const SheetFooter = ({ className, ...props }: SheetFooterProps) => {
	return (
		<div
			className={cx(
				"flex flex-col-reverse border-t  pt-4 sm:flex-row sm:justify-end sm:space-x-2 dark:border-zinc-900",
				className,
			)}
			{...props}
		/>
	);
};

SheetFooter.displayName = "SheetFooter";

export {
	Sheet,
	SheetBody,
	type SheetBodyProps,
	SheetClose,
	type SheetCloseProps,
	SheetContent,
	type SheetContentProps,
	SheetDescription,
	type SheetDescriptionProps,
	SheetFooter,
	type SheetFooterProps,
	SheetHeader,
	type SheetHeaderProps,
	type SheetOverlayProps,
	type SheetProps,
	SheetTitle,
	type SheetTitleProps,
	SheetTrigger,
	type SheetTriggerProps,
};
