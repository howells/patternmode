import { NumberField as BaseNumberField } from "@base-ui-components/react/number-field";
import { Button } from "@patternmode/button";
import type { Size } from "@patternmode/constants/sizes";
import { Input } from "@patternmode/input";
import { cx } from "@patternmode/utils/cx";
import { Minus, MoveHorizontal, Plus } from "lucide-react";
import type React from "react";
import { forwardRef, useId } from "react";

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
  const generatedId = useId();
  const fieldId = id || generatedId;
  return (
    <BaseNumberField.Root
      className={cx("flex flex-col items-start gap-1", className)}
      data-testid="number-field"
      id={fieldId}
      ref={ref}
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
            className={cx(fullWidth ? "flex-1" : undefined, inputClassName)}
            placeholder={placeholder}
            size={size}
          />
          <NumberFieldIncrement size={size} />
        </NumberFieldGroup>
      ) : (
        <NumberFieldInput
          className={cx(
            "rounded-md",
            fullWidth ? "w-full" : "w-full max-w-sm",
            inputClassName
          )}
          placeholder={placeholder}
          size={size}
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
          className={cx(
            "cursor-ew-resize font-medium text-sm leading-6",
            "text-zinc-900 dark:text-zinc-50",
            className
          )}
          htmlFor={props.htmlFor}
          ref={ref}
          {...props}
        >
          {children}
        </label>
        <NumberFieldScrubCursor />
      </BaseNumberField.ScrubArea>
    ) : (
      <label
        className={cx(
          "font-medium text-sm leading-6",
          "text-zinc-900 dark:text-zinc-50",
          className
        )}
        htmlFor={props.htmlFor}
        ref={ref}
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
    className={cx("drop-shadow-[0_1px_1px_#0008] filter", className)}
    ref={ref}
    {...props}
  >
    <svg
      aria-hidden="true"
      className="lucide lucide-move-horizontal"
      fill="none"
      height="18"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="18"
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
const NumberFieldInput = forwardRef<
  React.ElementRef<typeof BaseNumberField.Input>,
  NumberFieldInputProps
>(({ size = "base", className, ...props }, inputRef) => (
  <BaseNumberField.Input
    ref={inputRef}
    {...props}
    render={({
      className: renderClassName,
      ref: forwardedInputRef,
      ...renderProps
    }) => (
      <Input
        className={cx(renderClassName, className)}
        externalRef={forwardedInputRef}
        size={size}
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
    render={({ className, ref, ...renderProps }) => (
      <Button
        className={cx(className)}
        icon={Minus}
        ref={ref}
        size={ICON_SIZE_BY_TEXT_SIZE[size]}
        {...renderProps}
      />
    )}
  />
);
NumberFieldDecrement.displayName = "NumberFieldDecrement";

const NumberFieldIncrement = ({
  size = "base",
  ...props
}: NumberFieldButtonProps) => (
  <BaseNumberField.Increment
    {...props}
    render={({ className, ref, ...renderProps }) => (
      <Button
        className={cx(className)}
        icon={Plus}
        ref={ref}
        size={ICON_SIZE_BY_TEXT_SIZE[size]}
        {...renderProps}
      />
    )}
  />
);
NumberFieldIncrement.displayName = "NumberFieldIncrement";

export {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
};

