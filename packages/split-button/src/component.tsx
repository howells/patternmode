"use client";

import { cx } from "@patternmode/utils/cx";
import { ChevronDown } from "lucide-react";
import type React from "react";
import { Button } from "@patternmode/button";
import { Menu, MenuContent, MenuTrigger } from "@patternmode/menu";
import { Separator } from "@patternmode/separator";
import type { SplitButtonProps } from "./types";
import { splitButtonVariants } from "./variants";

const DEFAULT_MENU_PROPS = {};

/**
 * Compound button with primary action and dropdown menu for secondary actions.
 */
const SplitButton = ({
	ref,
	variant = "primary",
	size = "base",
	rounded = false,
	buttonContent,
	children,
	onButtonClick,
	disabled = false,
	isLoading = false,
	loadingText,
	leftIcon,
	dropdownIcon: DropdownIcon = ChevronDown as React.ComponentType<{
		className?: string;
		strokeWidth?: number;
	}>,
	menuProps = DEFAULT_MENU_PROPS,
	className,
	...props
}: SplitButtonProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
	// Calculate separator position based on size
	const getSeparatorPosition = () => {
		switch (size) {
			case "xs":
				return "right-7"; // h-control-xs = 24px, so right-7 (28px)
			case "sm":
				return "right-8"; // h-control-sm = 28px, so right-8 (32px)
			case "base":
				return "right-9"; // h-control-base = 32px, so right-9 (36px)
			case "lg":
				return "right-12"; // h-control-lg = 40px, so right-10 (40px)
			default:
				return "right-9";
		}
	};

	return (
		<div
			ref={ref}
			data-testid="split-button"
			className={cx(
				splitButtonVariants({ rounded }),
				disabled && "data-disabled",
				className,
			)}
			{...props}
		>
			{/* Main Button */}
			<Button
				variant={variant}
				size={size}
				disabled={disabled || isLoading}
				isLoading={isLoading}
				loadingText={loadingText}
				leftIcon={leftIcon}
				onClick={onButtonClick}
				className={cx(
					"rounded-r-none border-r-0",
					rounded && "rounded-l-full",
					!rounded && "rounded-l-lg",
				)}
			>
				{buttonContent}
			</Button>

			<Separator
				orientation="vertical"
				className={cx(
					"z-10 opacity-25 absolute h-1/2 top-1/2 -translate-y-1/2",
					getSeparatorPosition(),
				)}
			/>

			{/* Dropdown Trigger */}
			<Menu>
				<MenuTrigger
					render={
						<Button
							variant={variant}
							size={size}
							disabled={disabled}
							icon={DropdownIcon}
							className={cx(
								"rounded-l-none border-l-0",
								rounded && "rounded-r-full",
								!rounded && "rounded-r-lg",
							)}
						/>
					}
				></MenuTrigger>
				<MenuContent align="end" sideOffset={4} {...menuProps}>
					{children}
				</MenuContent>
			</Menu>
		</div>
	);
};

SplitButton.displayName = "SplitButton";

export { SplitButton };
