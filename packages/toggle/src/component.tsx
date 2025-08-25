"use client";

import { Toggle as BaseToggle } from "@base-ui-components/react/toggle";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { Button } from "@patternmode/button";
import type { ToggleProps } from "./types";
import { toggleVariants } from "./variants";

/**
 * A two-state button component that toggles between pressed (on) and unpressed (off) states.
 */
const Toggle = ({
	ref,
	className,
	variant,
	size,
	children,
	render,
	leftIcon,
	rightIcon,
	icon,
	fullWidth,
	rounded,
	...props
}: ToggleProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseToggle> | null>;
}) => {
	return (
		<BaseToggle
			data-testid="toggle"
			ref={ref}
			render={
				render ||
				((toggleProps, state) => {
					const { ref: toggleRef, ...buttonProps } = toggleProps;
					return (
						<Button
							{...buttonProps}
							variant={state.pressed ? "secondary" : "ghost"}
							size={size}
							leftIcon={leftIcon}
							rightIcon={rightIcon}
							icon={icon}
							fullWidth={fullWidth}
							rounded={rounded}
							render={(props: any) => (
								<button type="button" {...props} ref={toggleRef} />
							)}
							className={cx(toggleVariants({ variant, size }), className)}
						>
							{children}
						</Button>
					);
				})
			}
			{...props}
		/>
	);
};

Toggle.displayName = "Toggle";

// Export individual components for advanced usage
const ToggleRoot = BaseToggle;

export { Toggle, ToggleRoot };
