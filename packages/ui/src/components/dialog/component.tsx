import { Dialog as BaseDialog } from "@base-ui-components/react/dialog";
import { cx } from "@patternmode/utils/cx";
import { focusRing } from "@patternmode/utils/focus-ring";
import type React from "react";
import { Subheading } from "../subheading/component";
import { Text } from "../text/component";

type _DialogProps = {
	/**
	 * Whether the dialog is open when controlled.
	 * When provided, the dialog becomes controlled and requires onOpenChange.
	 */
	open?: boolean;
	/**
	 * Whether the dialog is open by default when uncontrolled.
	 * Only used when open prop is not provided.
	 */
	defaultOpen?: boolean;
	/**
	 * Callback fired when the open state changes.
	 * Required when using controlled mode (open prop).
	 */
	onOpenChange?: (open: boolean) => void;
} & React.ComponentPropsWithoutRef<typeof BaseDialog.Root>;

type DialogContentProps = {
	/**
	 * Additional CSS classes for styling the dialog content.
	 * Applied to the main dialog popup container.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseDialog.Popup> & {
		ref?: React.RefObject<React.ElementRef<typeof BaseDialog.Popup> | null>;
	};

type DialogTitleProps = {
	/**
	 * Additional CSS classes for styling the dialog title.
	 * Applied to the heading element.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseDialog.Title> & {
		ref?: React.RefObject<React.ElementRef<typeof BaseDialog.Title> | null>;
	};

type DialogDescriptionProps = {
	/**
	 * Additional CSS classes for styling the dialog description.
	 * Applied to the description text element.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseDialog.Description> & {
		ref?: React.RefObject<React.ElementRef<
			typeof BaseDialog.Description
		> | null>;
	};

/**
 * Modal dialog component built on Base UI's Dialog primitive.
 */
const Dialog = ({
	...props
}: React.ComponentPropsWithoutRef<typeof BaseDialog.Root>) => (
	<BaseDialog.Root {...props} data-testid="dialog" />
);
Dialog.displayName = "Dialog";

const DialogTrigger = BaseDialog.Trigger;
DialogTrigger.displayName = "DialogTrigger";

const DialogClose = BaseDialog.Close;
DialogClose.displayName = "DialogClose";

const DialogPortal = BaseDialog.Portal;

const DialogOverlay = ({
	ref: forwardedRef,
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop> & {
	ref?: React.RefObject<React.ElementRef<typeof BaseDialog.Backdrop> | null>;
}) => {
	return (
		<BaseDialog.Backdrop
			ref={forwardedRef}
			className={cx(
				// base
				"fixed inset-0 z-50",
				// background color
				"bg-black/70",
				// transition
				"transition-all duration-150",
				"data-[starting-style]:opacity-0",
				"data-[ending-style]:opacity-0",
				className,
			)}
			{...props}
		/>
	);
};
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = ({
	ref: forwardedRef,
	className,
	...props
}: DialogContentProps) => {
	return (
		<DialogPortal>
			<DialogOverlay />
			<BaseDialog.Popup
				ref={forwardedRef}
				className={cx(
					// base
					"fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto rounded-md border p-6 shadow-lg",
					// border color
					" dark:border-zinc-900",
					// background color
					"bg-white dark:bg-[#090E1A]",
					// transition
					"transition-all duration-150",
					"data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
					"data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
					focusRing,
					className,
				)}
				tremor-id="tremor-raw"
				{...props}
			/>
		</DialogPortal>
	);
};
DialogContent.displayName = "DialogContent";

const DialogHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return <div className={cx("flex flex-col gap-y-1", className)} {...props} />;
};
DialogHeader.displayName = "DialogHeader";

const DialogTitle = ({
	ref: forwardedRef,
	className,
	...props
}: DialogTitleProps) => (
	<BaseDialog.Title
		ref={forwardedRef}
		render={
			<Subheading
				className={cx(
					// text color
					"text-zinc-900 dark:text-zinc-50",
					className,
				)}
			/>
		}
		{...props}
	/>
);
DialogTitle.displayName = "DialogTitle";

const DialogDescription = ({
	ref: forwardedRef,
	className,
	...props
}: DialogDescriptionProps) => {
	return (
		<BaseDialog.Description
			ref={forwardedRef}
			render={<Text className={cx(className)} />}
			{...props}
		/>
	);
};
DialogDescription.displayName = "DialogDescription";

const DialogFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={cx(
				"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
				className,
			)}
			{...props}
		/>
	);
};
DialogFooter.displayName = "DialogFooter";

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
};
