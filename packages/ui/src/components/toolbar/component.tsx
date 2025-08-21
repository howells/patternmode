"use client";

import { Toolbar as BaseToolbar } from "@base-ui-components/react/toolbar";
import { cx } from "@patternmode/utils/cx";
import type {
	ToolbarButtonProps,
	ToolbarGroupProps,
	ToolbarInputProps,
	ToolbarLinkProps,
	ToolbarProps,
	ToolbarSeparatorProps,
} from "./types";
import { toolbarVariants } from "./variants";

/**
 * A comprehensive toolbar system for creating organized collections of interactive controls, actions, and inputs.
 */
const Toolbar = ({
	ref,
	className,
	variant,
	size,
	orientation,
	...props
}: ToolbarProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Root> | null>;
}) => {
	const { root } = toolbarVariants({ variant, size, orientation });

	return (
		<BaseToolbar.Root
			data-testid="toolbar"
			ref={ref}
			orientation={orientation}
			className={cx(root(), className)}
			{...props}
		/>
	);
};

Toolbar.displayName = "Toolbar";

/**
 * Interactive button component for toolbar actions.
 */
const ToolbarButton = ({
	ref,
	className,
	variant,
	size,
	...props
}: ToolbarButtonProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Button> | null>;
}) => {
	const { button } = toolbarVariants({ variant, size });

	return (
		<BaseToolbar.Button
			ref={ref}
			className={cx(button(), className)}
			{...props}
		/>
	);
};

ToolbarButton.displayName = "ToolbarButton";

/**
 * Link component for toolbar navigation actions.
 */
const ToolbarLink = ({
	ref,
	className,
	variant,
	size,
	...props
}: ToolbarLinkProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Link> | null>;
}) => {
	const { link } = toolbarVariants({ variant, size });

	return (
		<BaseToolbar.Link ref={ref} className={cx(link(), className)} {...props} />
	);
};

ToolbarLink.displayName = "ToolbarLink";

/**
 * Input component for toolbar search and data entry.
 */
const ToolbarInput = ({
	ref,
	className,
	variant,
	size,
	...props
}: ToolbarInputProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Input> | null>;
}) => {
	const { input } = toolbarVariants({ variant, size });

	return (
		<BaseToolbar.Input
			ref={ref}
			className={cx(input(), className)}
			{...props}
		/>
	);
};

ToolbarInput.displayName = "ToolbarInput";

/**
 * Group component for organizing related toolbar items.
 */
const ToolbarGroup = ({
	ref,
	className,
	variant,
	size,
	...props
}: ToolbarGroupProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Group> | null>;
}) => {
	const { group } = toolbarVariants({ variant, size });

	return (
		<BaseToolbar.Group
			ref={ref}
			className={cx(group(), className)}
			{...props}
		/>
	);
};

ToolbarGroup.displayName = "ToolbarGroup";

/**
 * Visual separator for dividing toolbar sections.
 */
const ToolbarSeparator = ({
	ref,
	className,
	variant,
	size,
	orientation,
	...props
}: ToolbarSeparatorProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Separator> | null>;
}) => {
	const { separator } = toolbarVariants({ variant, size, orientation });

	return (
		<BaseToolbar.Separator
			ref={ref}
			orientation={orientation}
			className={cx(separator(), className)}
			{...props}
		/>
	);
};

ToolbarSeparator.displayName = "ToolbarSeparator";

// Export individual components for advanced usage
const ToolbarRoot = BaseToolbar.Root;

export {
	Toolbar,
	ToolbarButton,
	ToolbarGroup,
	ToolbarInput,
	ToolbarLink,
	ToolbarRoot,
	ToolbarSeparator,
};
