"use client";

import { useRender } from "@base-ui-components/react/use-render";
import { cx } from "@patternmode/utils/cx";
import { Moon, Sun } from "lucide-react";
import type React from "react";
import { Icon } from "@patternmode/icon";
import { Loader } from "@patternmode/loader";
import type { ThemeToggleProps } from "./types";
import { themeToggleVariants } from "./variants";

/**
 * Toggle button for switching between light and dark themes.
 * Generic component that requires theme state and toggle handler from parent.
 */
export const ThemeToggle = ({
	ref: forwardedRef,
	render = <button type="button" />,
	theme,
	onToggle,
	isLoading = false,
	size = "base",
	variant = "outline",
	rounded = false,
	className,
	...otherProps
}: ThemeToggleProps & { ref?: React.RefObject<HTMLButtonElement | null> }) => {
	// Map theme toggle size to icon size
	const getIconSize = (size: ThemeToggleProps["size"]) => {
		switch (size) {
			case "2xs":
				return "xs" as const;
			case "xs":
				return "sm" as const;
			case "sm":
				return "sm" as const;
			case "base":
				return "base" as const;
			case "lg":
				return "lg" as const;
			default:
				return "base" as const;
		}
	};

	const iconSize = getIconSize(size);
	const otherTheme = theme === "dark" ? "light" : "dark";

	const renderToggleContent = () => {
		if (isLoading) {
			return (
				<Loader
					size={size === "2xs" ? "xs" : size}
					aria-label="Loading theme toggle"
				/>
			);
		}

		return (
			<>
				{/* Sun icon - visible in light mode */}
				<Icon
					icon={Sun}
					size={iconSize}
					className={cx(
						"text-current transition-all duration-200",
						theme === "dark" ? "scale-0 opacity-0" : "scale-100 opacity-100",
					)}
				/>

				{/* Moon icon - visible in dark mode */}
				<Icon
					icon={Moon}
					size={iconSize}
					className={cx(
						"absolute text-current transition-all duration-200",
						theme === "light" ? "scale-0 opacity-0" : "scale-100 opacity-100",
					)}
				/>
			</>
		);
	};

	const defaultProps: useRender.ElementProps<"button"> & {
		"data-testid": string;
	} = {
		type: "button" as const,
		className: cx(themeToggleVariants({ size, variant, rounded }), className),
		"aria-label": `Switch to ${otherTheme} theme`,
		onClick: onToggle,
		disabled: isLoading || otherProps.disabled,
		"data-testid": "theme-toggle",
		children: (
			<>
				{/* Touch target for mobile devices */}
				<span
					className="absolute size-12 pointer-fine:hidden"
					aria-hidden="true"
				/>
				{renderToggleContent()}
			</>
		),
	};

	const element = useRender({
		render,
		ref: forwardedRef ?? undefined,
		props: { ...defaultProps, ...otherProps },
	});

	return element;
};

ThemeToggle.displayName = "ThemeToggle";
