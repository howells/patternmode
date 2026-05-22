"use client";

import { Slot, Slottable } from "@radix-ui/react-slot";
import { AnimatePresence, motion } from "motion/react";
import type { ButtonHTMLAttributes, ComponentType, Ref, SVGProps } from "react";

export const BUTTON_VARIANTS = [
	"default",
	"secondary",
	"destructive",
	"outline",
	"ghost",
	"link",
	"brand",
] as const;

export const BUTTON_APPEARANCES = [
	"solid",
	"outline",
	"ghost",
	"dashed",
	"transparent",
	"input",
] as const;

export const BUTTON_BASE_SIZES = [
	"2xs",
	"xs",
	"sm",
	"base",
	"lg",
	"xl",
	"2xl",
	"3xl",
] as const;

export const BUTTON_SIZES = [
	...BUTTON_BASE_SIZES,
	"icon-2xs",
	"icon-xs",
	"icon-sm",
	"icon-base",
	"icon-lg",
	"icon-xl",
	"icon-2xl",
	"icon-3xl",
] as const;

export const BUTTON_BREAKPOINTS = [
	"2xs",
	"xs",
	"sm",
	"md",
	"lg",
	"xl",
	"2xl",
	"3xl",
] as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];
export type ButtonAppearance = (typeof BUTTON_APPEARANCES)[number];
export type ButtonBaseSize = (typeof BUTTON_BASE_SIZES)[number];
export type ButtonSize = (typeof BUTTON_SIZES)[number];
export type ButtonBreakpoint = (typeof BUTTON_BREAKPOINTS)[number];
export type ButtonResponsiveMode = "viewport" | "container";
export type ButtonRadius = "full" | "rounded" | "square";
export type ButtonAlign = "center" | "start" | "end";
export type ButtonIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface ButtonResponsiveSize {
	base?: ButtonSize;
	"2xs"?: ButtonSize;
	xs?: ButtonSize;
	sm?: ButtonSize;
	md?: ButtonSize;
	lg?: ButtonSize;
	xl?: ButtonSize;
	"2xl"?: ButtonSize;
	"3xl"?: ButtonSize;
}

export type ButtonSizeProp = ButtonSize | ButtonResponsiveSize | null;

export interface ButtonProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "prefix"> {
	align?: ButtonAlign;
	appearance?: ButtonAppearance;
	asChild?: boolean;
	dot?: string;
	dotPlacement?: "start" | "end";
	focused?: boolean;
	hovered?: boolean;
	icon?: ButtonIcon;
	iconClassName?: string;
	loading?: boolean;
	loadingLabel?: string;
	pressed?: boolean;
	radius?: ButtonRadius;
	ref?: Ref<HTMLButtonElement>;
	responsiveMode?: ButtonResponsiveMode;
	size?: ButtonSizeProp;
	square?: boolean;
	suffixIcon?: ButtonIcon;
	suffixIconClassName?: string;
	variant?: ButtonVariant;
}

const BUTTON_TRANSITION = {
	type: "spring",
	stiffness: 420,
	damping: 30,
	mass: 0.8,
} as const;

function joinClasses(
	...parts: Array<false | null | string | undefined>
): string | undefined {
	const out = parts.filter(Boolean).join(" ").trim();
	return out.length > 0 ? out : undefined;
}

function isResponsiveSize(
	size: ButtonSizeProp | undefined,
): size is ButtonResponsiveSize {
	return !!size && typeof size === "object" && !Array.isArray(size);
}

function isIconSize(size: ButtonSize): size is `icon-${ButtonBaseSize}` {
	return size.startsWith("icon-");
}

function getBaseSize(size: ButtonSizeProp | undefined): ButtonSize {
	if (!size) {
		return "base";
	}

	if (isResponsiveSize(size)) {
		return size.base ?? "base";
	}

	return size;
}

function getResponsiveSizeClasses(
	size: ButtonSizeProp | undefined,
	mode: ButtonResponsiveMode,
): string[] {
	if (!isResponsiveSize(size)) {
		return [];
	}

	const classes: string[] = [];
	for (const breakpoint of BUTTON_BREAKPOINTS) {
		const breakpointSize = size[breakpoint];
		if (!breakpointSize) {
			continue;
		}

		const prefix = mode === "container" ? "cq-" : "";
		classes.push(`howells-button--${prefix}${breakpoint}-${breakpointSize}`);
	}

	return classes;
}

function hasAccessibleName({
	"aria-label": ariaLabel,
	"aria-labelledby": ariaLabelledBy,
	title,
}: Pick<ButtonProps, "aria-label" | "aria-labelledby" | "title">): boolean {
	return Boolean(ariaLabel || ariaLabelledBy || title);
}

function isDevelopmentBrowser(): boolean {
	if (typeof document === "undefined") {
		return false;
	}

	const runtime = globalThis as typeof globalThis & {
		process?: { env?: { NODE_ENV?: string } };
	};
	return runtime.process?.env?.NODE_ENV !== "production";
}

function ButtonDot({ color }: { color: string }) {
	return (
		<span
			aria-hidden="true"
			className="howells-button__dot"
			data-testid="button-dot"
			style={{ backgroundColor: color }}
		/>
	);
}

function ButtonSpinner() {
	return (
		<svg
			aria-hidden="true"
			className="howells-button__spinner"
			data-testid="button-spinner"
			fill="none"
			viewBox="0 0 20 20"
		>
			<circle cx="10" cy="10" r="7" />
			<path d="M17 10a7 7 0 0 0-7-7" />
		</svg>
	);
}

function IconSlot({
	className,
	icon: Icon,
	slot,
}: {
	className?: string;
	icon: ButtonIcon;
	slot: "icon" | "suffix-icon";
}) {
	return (
		<motion.span
			animate={{ opacity: 1, y: 0 }}
			className="howells-button__icon-slot"
			data-slot={slot}
			exit={{ opacity: 0, y: -4 }}
			initial={{ opacity: 0, y: 4 }}
			key={slot}
			transition={BUTTON_TRANSITION}
		>
			<Icon
				aria-hidden="true"
				className={joinClasses("howells-button__icon", className)}
				focusable="false"
			/>
		</motion.span>
	);
}

function Button({
	align = "center",
	appearance = "solid",
	asChild = false,
	children,
	className,
	disabled,
	dot,
	dotPlacement = "start",
	focused,
	hovered,
	icon,
	iconClassName,
	loading = false,
	loadingLabel,
	pressed = true,
	radius = "full",
	ref,
	responsiveMode = "viewport",
	size,
	square = false,
	style,
	suffixIcon,
	suffixIconClassName,
	type,
	variant = "default",
	...props
}: ButtonProps) {
	const baseSize = getBaseSize(size);
	const hasContent =
		children !== undefined && children !== null && children !== false;
	const iconOnly = isIconSize(baseSize) || (Boolean(icon) && !hasContent);
	const isDisabled = disabled || loading;
	const responsiveSizeClasses = getResponsiveSizeClasses(size, responsiveMode);

	if (
		isDevelopmentBrowser() &&
		iconOnly &&
		!hasAccessibleName(props) &&
		!hasContent
	) {
		console.warn(
			"Icon-only Button is missing an accessible name. Add aria-label, aria-labelledby, or title.",
		);
	}

	const rootClassName = joinClasses(
		"howells-button",
		`howells-button--${baseSize}`,
		...responsiveSizeClasses,
		className,
	);
	const rootProps = {
		"aria-busy": loading || undefined,
		"aria-disabled": asChild && isDisabled ? true : props["aria-disabled"],
		className: rootClassName,
		"data-align": align,
		"data-appearance": appearance,
		"data-component": "button",
		"data-disabled": isDisabled || undefined,
		"data-focused": focused || undefined,
		"data-hovered": hovered || undefined,
		"data-pressed": pressed ? true : undefined,
		"data-radius": radius,
		"data-responsive-mode":
			responsiveMode === "container" ? responsiveMode : undefined,
		"data-size": baseSize,
		"data-slot": "button",
		"data-square": square || undefined,
		"data-variant": variant,
		ref,
		style,
		...props,
	};

	const dotElement = dot ? <ButtonDot color={dot} /> : null;
	const leadingIcon = icon ? (
		<AnimatePresence initial={false} mode="popLayout">
			<IconSlot className={iconClassName} icon={icon} slot="icon" />
		</AnimatePresence>
	) : null;
	const trailingIcon =
		suffixIcon && !iconOnly ? (
			<AnimatePresence initial={false} mode="popLayout">
				<IconSlot
					className={suffixIconClassName}
					icon={suffixIcon}
					slot="suffix-icon"
				/>
			</AnimatePresence>
		) : null;

	const loadingContent = (
		<>
			<AnimatePresence initial={false} mode="popLayout">
				{loading ? (
					<motion.span
						animate={{ opacity: 1, scale: 1 }}
						className="howells-button__spinner-slot"
						exit={{ opacity: 0, scale: 0.72 }}
						initial={{ opacity: 0, scale: 0.72 }}
						key="spinner"
						transition={BUTTON_TRANSITION}
					>
						<ButtonSpinner />
					</motion.span>
				) : null}
			</AnimatePresence>
			{iconOnly ? null : (
				<span className="howells-button__label">
					{loadingLabel ?? children}
				</span>
			)}
		</>
	);

	const content = loading ? (
		loadingContent
	) : iconOnly ? (
		<>
			{dotPlacement === "start" ? dotElement : null}
			{leadingIcon}
			{dotPlacement === "end" ? dotElement : null}
		</>
	) : (
		<>
			{dotPlacement === "start" ? dotElement : null}
			{leadingIcon}
			{asChild ? (
				<Slottable>{children}</Slottable>
			) : (
				<span className="howells-button__label">{children}</span>
			)}
			{trailingIcon}
			{dotPlacement === "end" ? dotElement : null}
		</>
	);

	if (asChild) {
		if (loading) {
			return (
				<Slot {...rootProps}>
					<Slottable>{children}</Slottable>
					{loadingContent}
				</Slot>
			);
		}

		if (iconOnly) {
			return (
				<Slot {...rootProps}>
					{dotPlacement === "start" ? dotElement : null}
					{leadingIcon}
					<Slottable>{children}</Slottable>
					{dotPlacement === "end" ? dotElement : null}
				</Slot>
			);
		}

		return (
			<Slot {...rootProps}>
				{dotPlacement === "start" ? dotElement : null}
				{leadingIcon}
				<Slottable>{children}</Slottable>
				{trailingIcon}
				{dotPlacement === "end" ? dotElement : null}
			</Slot>
		);
	}

	return (
		<button disabled={isDisabled} type={type ?? "button"} {...rootProps}>
			{content}
		</button>
	);
}

export { Button, getBaseSize, getResponsiveSizeClasses, isIconSize };
