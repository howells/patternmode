import { AlertDialog as BaseAlertDialog } from "@base-ui-components/react/alert-dialog";
import type * as React from "react";
import { cx } from "@patternmode/core/utils/cx";
import { Button } from "../button/component";
import { Subheading } from "../subheading/component";
import { Text } from "../text/component";
import type {
	AlertDialogActionProps,
	AlertDialogBackdropProps,
	AlertDialogCancelProps,
	AlertDialogContentProps,
	AlertDialogDescriptionProps,
	AlertDialogFooterProps,
	AlertDialogHeaderProps,
	AlertDialogProps,
	AlertDialogTitleProps,
	AlertDialogTriggerProps,
} from "./types";
import {
	alertDialogBackdropVariants,
	alertDialogCancelVariants,
	alertDialogContentVariants,
	alertDialogFooterVariants,
	alertDialogHeaderVariants,
	alertDialogTriggerVariants,
} from "./variants";

/**
 * Root container for alert dialog components that require user confirmation.
 */
const AlertDialog = (props: AlertDialogProps) => (
	<BaseAlertDialog.Root data-testid="alert-dialog" {...props} />
);
AlertDialog.displayName = "AlertDialog";

/**
 * Button that triggers the alert dialog to open.
 */
const AlertDialogTrigger = ({
	ref,
	className,
	children,
	...props
}: AlertDialogTriggerProps & {
	ref?: React.RefObject<React.ElementRef<
		typeof BaseAlertDialog.Trigger
	> | null>;
}) => (
	<BaseAlertDialog.Trigger
		ref={ref}
		className={cx(!props.render && alertDialogTriggerVariants(), className)}
		{...props}
	>
		{children}
	</BaseAlertDialog.Trigger>
);
AlertDialogTrigger.displayName = "AlertDialogTrigger";

const AlertDialogPortal = BaseAlertDialog.Portal;

/**
 * Semi-transparent backdrop that appears behind the alert dialog.
 */
const AlertDialogBackdrop = ({
	ref,
	className,
	...props
}: AlertDialogBackdropProps & {
	ref?: React.RefObject<React.ElementRef<
		typeof BaseAlertDialog.Backdrop
	> | null>;
}) => (
	<BaseAlertDialog.Backdrop
		ref={ref}
		className={cx(alertDialogBackdropVariants(), className)}
		{...props}
	/>
);
AlertDialogBackdrop.displayName = "AlertDialogBackdrop";

/**
 * Main content container for the alert dialog.
 */
const AlertDialogContent = ({
	ref,
	className,
	...props
}: AlertDialogContentProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseAlertDialog.Popup> | null>;
}) => (
	<AlertDialogPortal>
		<AlertDialogBackdrop />
		<BaseAlertDialog.Popup
			ref={ref}
			className={cx(alertDialogContentVariants(), className)}
			{...props}
		/>
	</AlertDialogPortal>
);
AlertDialogContent.displayName = "AlertDialogContent";

/**
 * Header container for the alert dialog title and description.
 */
const AlertDialogHeader = ({
	ref,
	className,
	...props
}: AlertDialogHeaderProps & {
	ref?: React.RefObject<HTMLDivElement | null>;
}) => (
	<div
		ref={ref}
		className={cx(alertDialogHeaderVariants(), className)}
		{...props}
	/>
);
AlertDialogHeader.displayName = "AlertDialogHeader";

/**
 * Footer container for alert dialog action buttons.
 */
const AlertDialogFooter = ({
	ref,
	className,
	...props
}: AlertDialogFooterProps & {
	ref?: React.RefObject<HTMLDivElement | null>;
}) => (
	<div
		ref={ref}
		className={cx(alertDialogFooterVariants(), className)}
		{...props}
	/>
);
AlertDialogFooter.displayName = "AlertDialogFooter";

/**
 * Title heading for the alert dialog.
 */
const AlertDialogTitle = ({
	ref,
	className,
	children,
	...props
}: AlertDialogTitleProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseAlertDialog.Title> | null>;
}) => (
	<BaseAlertDialog.Title
		ref={ref}
		className={cx(className)}
		render={typeof children === "string" ? <Subheading level={3} /> : undefined}
		{...props}
	>
		{children}
	</BaseAlertDialog.Title>
);
AlertDialogTitle.displayName = "AlertDialogTitle";

/**
 * Description text that provides additional context for the alert dialog.
 */
const AlertDialogDescription = ({
	ref,
	className,
	children,
	...props
}: AlertDialogDescriptionProps & {
	ref?: React.RefObject<React.ElementRef<
		typeof BaseAlertDialog.Description
	> | null>;
}) => (
	<BaseAlertDialog.Description
		ref={ref}
		className={cx(className)}
		render={typeof children === "string" ? <Text /> : undefined}
		{...props}
	>
		{children}
	</BaseAlertDialog.Description>
);
AlertDialogDescription.displayName = "AlertDialogDescription";

/**
 * Primary action button that closes the dialog and performs the main action.
 */
const AlertDialogAction = ({
	ref,
	className,
	variant = "primary",
	...props
}: AlertDialogActionProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseAlertDialog.Close> | null>;
}) => (
	<BaseAlertDialog.Close
		ref={ref}
		render={
			<Button
				variant={variant}
				className={typeof className === "string" ? className : undefined}
			/>
		}
		{...props}
	/>
);
AlertDialogAction.displayName = "AlertDialogAction";

/**
 * Cancel button that closes the dialog without performing any action.
 */
const AlertDialogCancel = ({
	ref,
	className,
	...props
}: AlertDialogCancelProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseAlertDialog.Close> | null>;
}) => (
	<BaseAlertDialog.Close
		ref={ref}
		render={
			<Button
				variant="outline"
				className={cx(
					alertDialogCancelVariants(),
					typeof className === "string" ? className : undefined,
				)}
			/>
		}
		{...props}
	/>
);
AlertDialogCancel.displayName = "AlertDialogCancel";

export {
	AlertDialog,
	AlertDialogAction,
	AlertDialogBackdrop,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogPortal,
	AlertDialogTitle,
	AlertDialogTrigger,
};
