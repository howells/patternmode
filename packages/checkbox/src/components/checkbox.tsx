import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import { cx } from "@patternmode/utils/cx";
import { focusRing } from "@patternmode/utils/focus-ring";
import type React from "react";
import { Check, Minus } from "lucide-react";
import type { CheckboxProps } from "../types";

const Checkbox = ({
  ref: forwardedRef,
  className,
  checked,
  onCheckedChange,
  indicatorClassName,
  ...props
}: CheckboxProps & {
  ref?: React.RefObject<React.ElementRef<typeof BaseCheckbox.Root> | null>;
  indicatorClassName?: string;
}) => {
  const baseUIProps: React.ComponentPropsWithoutRef<
    typeof BaseCheckbox.Root
  > & {
    indeterminate?: boolean;
  } = {
    ...props,
    checked: checked === "indeterminate" ? false : checked,
    indeterminate: checked === "indeterminate",
  };
  const hasCustomRender = Object.prototype.hasOwnProperty.call(props, "render") && (props as any).render != null;
  const handleChange = (next: boolean) => {
    onCheckedChange?.(next);
  };
  return (
    <BaseCheckbox.Root
      ref={forwardedRef}
      {...baseUIProps}
      className={cx(
        hasCustomRender
          ? "group relative"
          : [
              "group relative inline-flex size-4 items-center justify-center rounded border transition-colors",
              "border-zinc-300 bg-white text-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-900",
              "data-[checked]:bg-zinc-900 dark:data-[checked]:bg-zinc-50",
              focusRing,
            ],
        className
      )}
      data-testid="checkbox"
      onCheckedChange={handleChange}
    >
      {hasCustomRender ? (
        <span
          className={cx(
            "absolute inline-flex size-4 items-center justify-center rounded border transition-colors",
            "right-3 top-1/2 -translate-y-1/2",
            "border-zinc-300 bg-white text-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-900",
            "group-data-[checked]:bg-zinc-900 dark:group-data-[checked]:bg-zinc-50",
            indicatorClassName
          )}
        >
          <BaseCheckbox.Indicator className="flex items-center justify-center text-current">
            {checked === "indeterminate" ? (
              <Minus aria-hidden="true" className="h-3.5 w-3.5" />
            ) : (
              <Check aria-hidden="true" className="h-3.5 w-3.5" />
            )}
          </BaseCheckbox.Indicator>
        </span>
      ) : (
        <BaseCheckbox.Indicator className="flex items-center justify-center text-current">
          {checked === "indeterminate" ? (
            <Minus aria-hidden="true" className="h-3.5 w-3.5" />
          ) : (
            <Check aria-hidden="true" className="h-3.5 w-3.5" />
          )}
        </BaseCheckbox.Indicator>
      )}
    </BaseCheckbox.Root>
  );
};

Checkbox.displayName = "Checkbox";

export { Checkbox };
