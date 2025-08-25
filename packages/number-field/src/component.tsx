import { NumberField as BaseNumberField } from "@base-ui-components/react/number-field";
import { cx } from "@patternmode/utils/cx";
import { focusRing } from "@patternmode/utils/focus-ring";
import { Minus, MoveHorizontal, Plus } from "lucide-react";
import * as React from "react";

type NumberFieldProps = {
	label?: string;
	placeholder?: string;
	showScrubArea?: boolean;
	showSteppers?: boolean;
	fullWidth?: boolean;
	size?: "xs" | "sm" | "base" | "lg";
	className?: string;
	inputClassName?: string;
} & React.ComponentPropsWithoutRef<typeof BaseNumberField.Root>;

const NumberField = ({
	ref,
	label,
	placeholder,
	showScrubArea = true,
	showSteppers = true,
	fullWidth = false,
	size = "base",
	className,
	inputClassName,
	id,
	...props
}: NumberFieldProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseNumberField.Root> | null>;
}) => {
	const generatedId = React.useId();
	const fieldId = id || generatedId;
	return (
		<BaseNumberField.Root
			data-testid="number-field"
			ref={ref}
			id={fieldId}
			className={cx("flex flex-col items-start gap-1", className)}
			{...props}
		>
			{label && (
				<NumberFieldLabel htmlFor={fieldId} showScrubArea={showScrubArea}>
					{label}
				</NumberFieldLabel>
			)}
			{showSteppers ? (
				<NumberFieldGroup className={fullWidth ? "w-full" : "w-full max-w-sm"}>
					<NumberFieldDecrement size={size} />
					<NumberFieldInput
						size={size}
						placeholder={placeholder}
						className={cx(fullWidth ? "flex-1" : undefined, inputClassName)}
					/>
					<NumberFieldIncrement size={size} />
				</NumberFieldGroup>
			) : (
				<NumberFieldInput
					size={size}
					placeholder={placeholder}
					className={cx(
						"rounded-md",
						fullWidth ? "w-full" : "w-full max-w-sm",
						inputClassName,
					)}
				/>
			)}
		</BaseNumberField.Root>
	);
};
NumberField.displayName = "NumberField";

type NumberFieldLabelProps = {
	ref?: React.RefObject<HTMLLabelElement | null>;
	className?: string;
	children?: React.ReactNode;
	showScrubArea?: boolean;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

const NumberFieldLabel = ({
	ref,
	className,
	children,
	showScrubArea = true,
	...props
}: NumberFieldLabelProps) => (
	<>
		{showScrubArea ? (
			<BaseNumberField.ScrubArea className="cursor-ew-resize">
				<label
					ref={ref}
					htmlFor={props.htmlFor}
					className={cx(
						"cursor-ew-resize text-sm font-medium leading-6",
						"text-zinc-900 dark:text-zinc-50",
						className,
					)}
					{...props}
				>
					{children}
				</label>
				<NumberFieldScrubCursor />
			</BaseNumberField.ScrubArea>
		) : (
			<label
				ref={ref}
				htmlFor={props.htmlFor}
				className={cx(
					"text-sm font-medium leading-6",
					"text-zinc-900 dark:text-zinc-50",
					className,
				)}
				{...props}
			>
				{children}
			</label>
		)}
	</>
);
NumberFieldLabel.displayName = "NumberFieldLabel";

type NumberFieldScrubCursorProps = {
	ref?: React.RefObject<React.ElementRef<
		typeof BaseNumberField.ScrubAreaCursor
	> | null>;
	className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseNumberField.ScrubAreaCursor>;

const NumberFieldScrubCursor = ({
	ref,
	className,
	...props
}: NumberFieldScrubCursorProps) => (
	<BaseNumberField.ScrubAreaCursor
		ref={ref}
		className={cx("drop-shadow-[0_1px_1px_#0008] filter", className)}
		{...props}
	>
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="white"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="lucide lucide-move-horizontal"
		>
			<MoveHorizontal />
		</svg>
	</BaseNumberField.ScrubAreaCursor>
);
NumberFieldScrubCursor.displayName = "NumberFieldScrubCursor";

type NumberFieldGroupProps = React.ComponentPropsWithoutRef<"div">;
const NumberFieldGroup = ({ className, ...props }: NumberFieldGroupProps) => (
	<div className={cx("inline-flex items-center gap-1", className)} {...props} />
);

type NumberFieldInputProps = {
	size?: "xs" | "sm" | "base" | "lg";
	className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseNumberField.Input>;
const NumberFieldInput = ({
	ref,
	size = "base",
	className,
	...props
}: NumberFieldInputProps) => (
	<BaseNumberField.Input
		ref={ref}
		className={cx(
			"flex h-9 w-32 items-center rounded-md border px-3 py-1 text-sm outline-hidden",
			" dark:border-zinc-800",
			focusRing,
			className,
		)}
		{...props}
	/>
);
NumberFieldInput.displayName = "NumberFieldInput";

type NumberFieldButtonProps = {
	size?: "xs" | "sm" | "base" | "lg";
} & React.ComponentPropsWithoutRef<"button">;

const NumberFieldDecrement = ({
	size = "base",
	...props
}: NumberFieldButtonProps) => (
	<BaseNumberField.Decrement
		{...props}
		className={cx(
			"inline-flex items-center justify-center rounded-md border px-2 py-1 text-sm text-zinc-700 dark:text-zinc-200",
			" dark:border-zinc-800",
			focusRing,
		)}
	>
		<Minus className={size === "lg" ? "size-5" : "size-4"} />
	</BaseNumberField.Decrement>
);
NumberFieldDecrement.displayName = "NumberFieldDecrement";

const NumberFieldIncrement = ({
	size = "base",
	...props
}: NumberFieldButtonProps) => (
	<BaseNumberField.Increment
		{...props}
		className={cx(
			"inline-flex items-center justify-center rounded-md border px-2 py-1 text-sm text-zinc-700 dark:text-zinc-200",
			" dark:border-zinc-800",
			focusRing,
		)}
	>
		<Plus className={size === "lg" ? "size-5" : "size-4"} />
	</BaseNumberField.Increment>
);
NumberFieldIncrement.displayName = "NumberFieldIncrement";

export {
	NumberField,
	NumberFieldInput,
	NumberFieldGroup,
	NumberFieldDecrement,
	NumberFieldIncrement,
	NumberFieldLabel,
};
