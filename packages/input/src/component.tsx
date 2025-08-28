"use client";

import { Input as BaseInput } from "@base-ui-components/react/input";
import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { formControlContainerVariants } from "@patternmode/constants/form-control-variants";
import { cx } from "@patternmode/utils/cx";
import { focusRing } from "@patternmode/utils/focus-ring";
import { Eye, EyeOff, Search } from "lucide-react";
import React from "react";
import type { InputProps } from "./types";
import { inputElementStyles } from "./variants";

const Input = ({
	ref: forwardedRef,
	className,
	inputClassName,
	hasError,
	enableStepper: _enableStepper = true,
	size = "base",
	type,
	prefix,
	suffix,
	prefixText,
	prefixIcon: PrefixIcon,
	suffixText,
	suffixIcon: SuffixIcon,
	prefixStyling = true,
	suffixStyling = true,
	iconStrokeWidth = DEFAULT_ICON_STROKE_WIDTH,
	minimal,
	unstyled,
	...props
}: InputProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseInput> | null>;
}) => {
	const [typeState, setTypeState] = React.useState(type);
	const isPassword = type === "password";
	const isSearch = type === "search";

	const iconSize = {
		"size-3": size === "xs",
		"size-3.5": size === "sm",
		"size-4": size === "base",
		"size-5": size === "lg",
	};
	const iconClassName = cx(
		"shrink-0 text-zinc-500 dark:text-zinc-400",
		iconSize,
	);
	const gapClassName =
		size === "xs" || size === "sm"
			? "gap-0.5"
			: size === "base"
				? "gap-1"
				: "gap-1.5";

	const resolvedPrefix =
		prefix || (prefixText && PrefixIcon) ? (
			<div className={cx("flex items-center", gapClassName)}>
				{PrefixIcon && (
					<PrefixIcon className={iconClassName} strokeWidth={iconStrokeWidth} />
				)}
				{prefixText && <span>{prefixText}</span>}
			</div>
		) : PrefixIcon ? (
			<PrefixIcon className={iconClassName} strokeWidth={iconStrokeWidth} />
		) : (
			prefixText || undefined
		);

	const resolvedSuffix =
		suffix || (suffixText && SuffixIcon) ? (
			<div className={cx("flex items-center", gapClassName)}>
				{suffixText && <span>{suffixText}</span>}
				{SuffixIcon && (
					<SuffixIcon className={iconClassName} strokeWidth={iconStrokeWidth} />
				)}
			</div>
		) : SuffixIcon ? (
			<SuffixIcon className={iconClassName} strokeWidth={iconStrokeWidth} />
		) : (
			suffixText || undefined
		);

	const effectivePrefix =
		isSearch && !resolvedPrefix ? (
			<Search className={iconClassName} />
		) : (
			resolvedPrefix
		);

	const effectiveSuffix =
		isPassword && !resolvedSuffix ? (
			<button
				aria-label="Change password visibility"
				className={cx(
					"h-fit w-fit rounded-xs outline-hidden transition-all",
					"text-zinc-500 dark:text-zinc-400",
					"hover:text-zinc-600 dark:hover:text-zinc-300",
					focusRing,
				)}
				type="button"
				onClick={() => {
					setTypeState(typeState === "password" ? "text" : "password");
				}}
			>
				<span className="sr-only">
					{typeState === "password" ? "Show password" : "Hide password"}
				</span>
				{typeState === "password" ? (
					<Eye className={cx("shrink-0", iconSize)} aria-hidden="true" />
				) : (
					<EyeOff className={cx("shrink-0", iconSize)} aria-hidden="true" />
				)}
			</button>
		) : (
			resolvedSuffix
		);

	const hasCustomPrefix =
		effectivePrefix !== undefined &&
		effectivePrefix !== null &&
		effectivePrefix !== "";
	const hasCustomSuffix =
		effectiveSuffix !== undefined &&
		effectiveSuffix !== null &&
		effectiveSuffix !== "";
	const hasBuiltInPrefix = false;
	const hasBuiltInSuffix = false;

	const hasUnstyledPrefix = hasCustomPrefix && !prefixStyling;
	const hasUnstyledSuffix = hasCustomSuffix && !suffixStyling;

	const leftPadding = hasUnstyledPrefix
		? size === "xs"
			? "pl-1"
			: size === "sm"
				? "pl-1.5"
				: size === "base"
					? "pl-2"
					: "pl-2.5"
		: size === "xs"
			? "pl-2"
			: size === "sm"
				? "pl-2.5"
				: size === "base"
					? "pl-3"
					: "pl-3.5";
	const rightPadding = hasUnstyledSuffix
		? size === "xs"
			? "pr-1"
			: size === "sm"
				? "pr-1.5"
				: size === "base"
					? "pr-2"
					: "pr-2.5"
		: size === "xs"
			? "pr-2"
			: size === "sm"
				? "pr-2.5"
				: size === "base"
					? "pr-3"
					: "pr-3.5";

	const containerClassName = cx(
		formControlContainerVariants({ size, hasError }),
		minimal && "bg-transparent border-transparent shadow-none",
		unstyled && "border-0 bg-transparent shadow-none", // fully unstyled
		className,
	);

	return (
		<div className={containerClassName} data-testid="input-container">
			{effectivePrefix && (
				<div
					className={cx(
						"pointer-events-none select-none items-center text-zinc-500 dark:text-zinc-400",
						"flex px-2",
						size === "xs" && "pl-1.5",
						size === "sm" && "pl-2",
						size === "base" && "pl-2.5",
						size === "lg" && "pl-3",
					)}
				>
					{effectivePrefix}
				</div>
			)}
			<BaseInput
				ref={forwardedRef}
				className={cx(inputElementStyles({ size }), leftPadding, rightPadding)}
				data-testid="input"
				type={typeState}
				{...props}
			/>
			{effectiveSuffix && (
				<div
					className={cx(
						"flex items-center text-zinc-500 dark:text-zinc-400",
						"px-2",
						size === "xs" && "pr-1.5",
						size === "sm" && "pr-2",
						size === "base" && "pr-2.5",
						size === "lg" && "pr-3",
					)}
				>
					{effectiveSuffix}
				</div>
			)}
		</div>
	);
};

Input.displayName = "Input";

export { Input };
