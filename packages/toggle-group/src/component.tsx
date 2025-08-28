"use client";

import { Toggle as BaseToggle } from "@base-ui-components/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui-components/react/toggle-group";
import { Button } from "@patternmode/button";
import { cx } from "@patternmode/utils/cx";
import React, { use } from "react";
import { ToggleGroupContext } from "./constants";
import type { ToggleGroupItemProps, ToggleGroupProps } from "./types";
import { toggleGroupVariants } from "./variants";

/**
 * A group of related toggle buttons that work together as a cohesive unit for multi-select or single-select interactions.
 */
const ToggleGroup = ({
	ref,
	className,
	variant,
	size,
	orientation,
	children,
	...props
}: ToggleGroupProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseToggleGroup> | null>;
}) => {
	const { root } = toggleGroupVariants({ variant, size, orientation });
	const contextValue = React.useMemo(
		() => ({ size, variant }),
		[size, variant],
	);

	return (
		<ToggleGroupContext value={contextValue}>
			<BaseToggleGroup
				data-testid="toggle-group"
				ref={ref}
				className={cx(root(), className)}
				{...props}
			>
				{children}
			</BaseToggleGroup>
		</ToggleGroupContext>
	);
};

ToggleGroup.displayName = "ToggleGroup";

const ToggleGroupItem = ({
	ref,
	className: _className,
	variant,
	size,
	children,
	leftIcon: LeftIcon,
	rightIcon: RightIcon,
	iconStrokeWidth,
	render,
	icon,
	fullWidth,
	rounded,
	...props
}: ToggleGroupItemProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseToggle> | null>;
}) => {
	const finalIconStrokeWidth = iconStrokeWidth ?? 1.5;
	const context = use(ToggleGroupContext);
	const finalSize = size ?? context.size;
	const finalVariant = variant ?? context.variant;
	const { item: _item } = toggleGroupVariants({
		variant: finalVariant,
		size: finalSize,
	});

	// Check if children contains only screen reader text by checking the rendered string
	const childrenString = React.isValidElement(children)
		? ""
		: String(children || "").trim();
	// Determine if this is an icon-only button (no visible text content)
	const _isIconOnly =
		!childrenString.length && (LeftIcon != null || RightIcon != null);

	const renderContent = () => {
		return children;
	};

	return (
		<BaseToggle
			ref={ref}
			render={
				render ||
				((toggleProps, state) => {
					const { ref: toggleRef, ...buttonProps } = toggleProps;
					return (
						<Button
							{...buttonProps}
							variant={state.pressed ? "secondary" : "ghost"}
							size={finalSize}
							leftIcon={LeftIcon}
							rightIcon={RightIcon}
							icon={icon}
							iconStrokeWidth={finalIconStrokeWidth}
							fullWidth={fullWidth}
							rounded={rounded}
							render={(props) => (
								<button type="button" {...props} ref={toggleRef} />
							)}
						>
							{renderContent()}
						</Button>
					);
				})
			}
			{...props}
		/>
	);
};

ToggleGroupItem.displayName = "ToggleGroupItem";

// Export the components
export { ToggleGroup, ToggleGroupItem };
