import { NumberField as BaseNumberField } from "@base-ui-components/react/number-field";
import { Button } from "@patternmode/button";
import type { Size } from "@patternmode/constants/sizes";
import { Input } from "@patternmode/input";
import { cx } from "@patternmode/utils/cx";
import { Minus, MoveHorizontal, Plus } from "lucide-react";
import * as React from "react";

const ICON_SIZE_BY_TEXT_SIZE = {
	"2xs": "icon-2xs",
	xs: "icon-xs",
	sm: "icon-sm",
	base: "icon",
	lg: "icon-lg",
} as const;

type NumberFieldProps = {
	label?: string;
	placeholder?: string;
	showScrubArea?: boolean;
	showSteppers?: boolean;
	fullWidth?: boolean;
	size?: Size;
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
			aria-hidden="true"
		>
			<title>Scrub cursor</title>
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
	size?: Size;
	className?: string;
} & Omit<React.ComponentPropsWithoutRef<typeof BaseNumberField.Input>, "size">;
const NumberFieldInput = React.forwardRef<
	React.ElementRef<typeof BaseNumberField.Input>,
	NumberFieldInputProps
>(({ size = "base", className, ...props }, ref) => (
	<BaseNumberField.Input
		ref={ref}
		{...props}
		render={({ className: renderClassName, ref, ...renderProps }) => (
			<Input
				className={cx(renderClassName, className)}
				size={size}
				externalRef={ref}
				{...renderProps}
			/>
		)}
	/>
));
NumberFieldInput.displayName = "NumberFieldInput";

type NumberFieldButtonProps = {
	size?: Size;
} & React.ComponentPropsWithoutRef<"button">;

const NumberFieldDecrement = ({
	size = "base",
	...props
}: NumberFieldButtonProps) => (
	<BaseNumberField.Decrement
		{...props}
		render={({ className, ref, ...props }) => (
			<Button
				ref={ref}
				className={cx(className)}
				size={ICON_SIZE_BY_TEXT_SIZE[size]}
				icon={Minus}
				{...props}
			/>
		)}
	></BaseNumberField.Decrement>
);
NumberFieldDecrement.displayName = "NumberFieldDecrement";

const NumberFieldIncrement = ({
	size = "base",
	...props
}: NumberFieldButtonProps) => (
	<BaseNumberField.Increment
		{...props}
		render={({ className, ref, ...props }) => (
			<Button
				ref={ref}
				className={cx(className)}
				size={ICON_SIZE_BY_TEXT_SIZE[size]}
				icon={Plus}
				{...props}
			/>
		)}
	></BaseNumberField.Increment>
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
