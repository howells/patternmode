"use client";

import { useMediaQuery } from "@uidotdev/usehooks";
import React from "react";

import { MEDIA_QUERIES } from "@patternmode/utils/breakpoints";
// Mobile drawer (Vaul)
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../drawer/component";
// Desktop sheet (Base UI Dialog)
import {
	Sheet,
	SheetBody,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../sheet/component";

type ResponsiveDrawerProps = {
	/**
	 * Drawer content including trigger and content components.
	 * Should contain ResponsiveDrawerTrigger and ResponsiveDrawerContent.
	 */
	children?: React.ReactNode;

	/**
	 * Whether the drawer is open in controlled mode.
	 * When provided, the component operates in controlled mode where open state is managed externally.
	 */
	open?: boolean;

	/**
	 * Callback fired when the drawer open state changes.
	 * Called with the new open state when user interactions would change the state.
	 */
	onOpenChange?: (open: boolean) => void;
};

type ResponsiveDrawerTriggerProps = {
	/**
	 * Trigger element content when not using render prop.
	 * Alternative to the render prop for simple trigger content.
	 */
	children?: React.ReactNode;

	/**
	 * Additional CSS classes to apply to the trigger element.
	 * Merged with default trigger styling for customization.
	 */
	className?: string;

	/**
	 * Render prop for custom trigger element with merged functionality.
	 * The provided element receives trigger behavior automatically.
	 */
	render?: React.ReactElement<Record<string, unknown>>;
};

type ResponsiveDrawerContentProps = {
	/**
	 * Content elements including header, body, and footer components.
	 * Typically contains ResponsiveDrawerHeader, ResponsiveDrawerBody, and ResponsiveDrawerFooter.
	 */
	children?: React.ReactNode;

	/**
	 * Additional CSS classes to apply to the content container.
	 * Allows customization of the drawer content appearance.
	 */
	className?: string;
};

type ResponsiveDrawerHeaderProps = {
	/**
	 * Header content including title and description components.
	 * Usually contains ResponsiveDrawerTitle and optionally ResponsiveDrawerDescription.
	 */
	children?: React.ReactNode;

	/**
	 * Additional CSS classes to apply to the header section.
	 * Useful for customizing header spacing and styling.
	 */
	className?: string;
};

type ResponsiveDrawerTitleProps = {
	/**
	 * Title text content displayed prominently in the header.
	 * Should be descriptive of the drawer's purpose or content.
	 */
	children?: React.ReactNode;

	/**
	 * Additional CSS classes to apply to the title element.
	 * Allows customization of title typography and styling.
	 */
	className?: string;
};

type ResponsiveDrawerDescriptionProps = {
	/**
	 * Description text providing additional context about the drawer.
	 * Displayed below the title with appropriate styling and accessibility attributes.
	 */
	children?: React.ReactNode;

	/**
	 * Additional CSS classes to apply to the description element.
	 * Useful for customizing description appearance and layout.
	 */
	className?: string;
};

type ResponsiveDrawerBodyProps = {
	/**
	 * Main scrollable content elements of the drawer.
	 * Contains the primary content that users interact with.
	 */
	children?: React.ReactNode;

	/**
	 * Additional CSS classes to apply to the body container.
	 * Allows customization of content area styling and layout.
	 */
	className?: string;
};

type ResponsiveDrawerFooterProps = {
	/**
	 * Footer content typically containing action buttons.
	 * Common pattern includes save/cancel or close buttons.
	 */
	children?: React.ReactNode;

	/**
	 * Additional CSS classes to apply to the footer section.
	 * Useful for customizing footer layout and button arrangements.
	 */
	className?: string;
};

type ResponsiveDrawerCloseProps = {
	/**
	 * Close trigger element content when not using render prop.
	 * Alternative to the render prop for simple close triggers.
	 */
	children?: React.ReactNode;

	/**
	 * Additional CSS classes to apply to the close trigger.
	 * Merged with default close trigger styling.
	 */
	className?: string;

	/**
	 * Render prop for custom close trigger element with merged functionality.
	 * The provided element receives close behavior automatically.
	 */
	render?: React.ReactElement<Record<string, unknown>>;
};

/**
 * Responsive drawer component that adapts behavior based on screen size.
 */
const ResponsiveDrawer: React.FC<ResponsiveDrawerProps> = ({
	children,
	...props
}) => {
	const [mounted, setMounted] = React.useState(false);
	const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	// During SSR or before mounting, default to Sheet (desktop view)
	if (!mounted) {
		return (
			<Sheet data-testid="responsive-drawer" {...props}>
				{children}
			</Sheet>
		);
	}

	if (isMobile) {
		return (
			<Drawer data-testid="responsive-drawer" {...props}>
				{children}
			</Drawer>
		);
	}

	return (
		<Sheet data-testid="responsive-drawer" {...props}>
			{children}
		</Sheet>
	);
};

/**
 * Responsive drawer trigger component that opens the drawer.
 */
const ResponsiveDrawerTrigger: React.FC<ResponsiveDrawerTriggerProps> = ({
	children,
	render,
	...props
}) => {
	const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);

	if (isMobile) {
		// Vaul uses asChild pattern, so we need to convert render prop to asChild
		if (render) {
			return (
				<DrawerTrigger asChild {...props}>
					{render}
				</DrawerTrigger>
			);
		}
		return <DrawerTrigger {...props}>{children}</DrawerTrigger>;
	}

	// Desktop uses Base UI which supports render prop natively
	if (render) {
		return (
			<SheetTrigger render={render} {...props}>
				{children}
			</SheetTrigger>
		);
	}
	return <SheetTrigger {...props}>{children}</SheetTrigger>;
};

/**
 * Responsive drawer content container with platform-appropriate styling.
 */
const ResponsiveDrawerContent: React.FC<ResponsiveDrawerContentProps> = ({
	children,
	...props
}) => {
	const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);

	if (isMobile) {
		return <DrawerContent {...props}>{children}</DrawerContent>;
	}

	return <SheetContent {...props}>{children}</SheetContent>;
};

/**
 * Responsive drawer header section for title and description.
 */
const ResponsiveDrawerHeader: React.FC<ResponsiveDrawerHeaderProps> = ({
	children,
	...props
}) => {
	const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);

	if (isMobile) {
		return <DrawerHeader {...props}>{children}</DrawerHeader>;
	}

	return <SheetHeader {...props}>{children}</SheetHeader>;
};

/**
 * Responsive drawer title with appropriate typography and accessibility.
 */
const ResponsiveDrawerTitle: React.FC<ResponsiveDrawerTitleProps> = ({
	children,
	...props
}) => {
	const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);

	if (isMobile) {
		return <DrawerTitle {...props}>{children}</DrawerTitle>;
	}

	return <SheetTitle {...props}>{children}</SheetTitle>;
};

/**
 * Responsive drawer description providing additional context.
 */
const ResponsiveDrawerDescription: React.FC<
	ResponsiveDrawerDescriptionProps
> = ({ children, ...props }) => {
	const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);

	if (isMobile) {
		return <DrawerDescription {...props}>{children}</DrawerDescription>;
	}

	return <SheetDescription {...props}>{children}</SheetDescription>;
};

/**
 * Responsive drawer body with scrollable content area.
 */
const ResponsiveDrawerBody: React.FC<ResponsiveDrawerBodyProps> = ({
	children,
	...props
}) => {
	const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);

	if (isMobile) {
		// Mobile drawer doesn't have a specific body component, just use a div
		return (
			<div className="px-4" {...props}>
				{children}
			</div>
		);
	}

	return <SheetBody {...props}>{children}</SheetBody>;
};

/**
 * Responsive drawer footer section for action buttons.
 */
const ResponsiveDrawerFooter: React.FC<ResponsiveDrawerFooterProps> = ({
	children,
	...props
}) => {
	const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);

	if (isMobile) {
		return <DrawerFooter {...props}>{children}</DrawerFooter>;
	}

	return <SheetFooter {...props}>{children}</SheetFooter>;
};

/**
 * Responsive drawer close trigger that dismisses the drawer.
 */
const ResponsiveDrawerClose: React.FC<ResponsiveDrawerCloseProps> = ({
	children,
	render,
	...props
}) => {
	const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);

	if (isMobile) {
		// Vaul uses asChild pattern, so we need to convert render prop to asChild
		if (render) {
			return (
				<DrawerClose asChild {...props}>
					{render}
				</DrawerClose>
			);
		}
		return <DrawerClose {...props}>{children}</DrawerClose>;
	}

	// Desktop uses Base UI which supports render prop natively
	if (render) {
		return (
			<SheetClose render={render} {...props}>
				{children}
			</SheetClose>
		);
	}
	return <SheetClose {...props}>{children}</SheetClose>;
};

export {
	ResponsiveDrawer,
	ResponsiveDrawerBody,
	ResponsiveDrawerClose,
	ResponsiveDrawerContent,
	ResponsiveDrawerDescription,
	ResponsiveDrawerFooter,
	ResponsiveDrawerHeader,
	ResponsiveDrawerTitle,
	ResponsiveDrawerTrigger,
};

export type {
	ResponsiveDrawerBodyProps,
	ResponsiveDrawerCloseProps,
	ResponsiveDrawerContentProps,
	ResponsiveDrawerDescriptionProps,
	ResponsiveDrawerFooterProps,
	ResponsiveDrawerHeaderProps,
	ResponsiveDrawerProps,
	ResponsiveDrawerTitleProps,
	ResponsiveDrawerTriggerProps,
};
