"use client";

import type * as React from "react";
import { cx } from "@patternmode/core/utils/cx";
import { Button } from "../button/component";
import type { DropdownItemProps } from "./types";
import { dropdownItemVariants } from "./variants";

/**
 * A consistent dropdown item component that extends Button for use across dropdown components.
 */
const DropdownItem = ({
	ref,
	className,
	variant,
	highlighted = false,
	selected = false,
	hint,
	children,
	role = "option",
	...props
}: DropdownItemProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
	return (
		<Button
			ref={ref}
			render={<div />}
			variant="ghost"
			data-testid="dropdown-item"
			className={cx(dropdownItemVariants({ variant }), className)}
			data-highlighted={highlighted ? "true" : undefined}
			data-selected={selected ? "true" : undefined}
			aria-selected={selected}
			role={role}
			{...props}
		>
			{children}
			{hint && (
				<span className="ml-auto text-xs text-zinc-500 dark:text-zinc-400">
					{hint}
				</span>
			)}
		</Button>
	);
};

DropdownItem.displayName = "DropdownItem";

export { DropdownItem };
