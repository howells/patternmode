import { Switch as BaseSwitch } from "@base-ui-components/react/switch";
import { cx } from "@patternmode/utils/cx";
import React from "react";
import type { SwitchProps } from "./types";
import { switchVariants } from "./variants";

const Switch = ({
  ref: forwardedRef,
  className,
  size,
  label,
  checked,
  defaultChecked,
  onChange,
  id,
  name,
  disabled,
  ...rest
}: SwitchProps & {
  ref?: React.RefObject<React.ElementRef<typeof BaseSwitch.Root> | null>;
}) => {
  const { root, thumb } = switchVariants({ size });

  const isControlled = typeof checked === "boolean";
  const [internal, setInternal] = React.useState<boolean>(
    defaultChecked ?? false
  );
  const current = isControlled ? (checked as boolean) : internal;

  const setNext = (next: boolean) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const switchNode = (
    <BaseSwitch.Root
      aria-checked={current}
      aria-disabled={disabled || undefined}
      className={cx(root(), className)}
      data-testid="switch"
      disabled={disabled}
      id={id}
      ref={forwardedRef}
      role="switch"
      {...(isControlled ? { checked: current } : { defaultChecked: internal })}
      onCheckedChange={(next: boolean) => setNext(Boolean(next))}
      {...rest}
    >
      <BaseSwitch.Thumb className={cx(thumb())} />
    </BaseSwitch.Root>
  );

  // Render a hidden input for htmlFor label support and form integration
  // Clicking <label htmlFor={id}> toggles the input, which we mirror to the switch
  const hiddenInput = id ? (
    <input
      aria-hidden="true"
      checked={current}
      className="sr-only"
      disabled={disabled}
      id={id}
      name={name}
      onChange={(e) => setNext(e.target.checked)}
      tabIndex={-1}
      type="checkbox"
    />
  ) : null;

  if (label) {
    return (
      <div className="flex items-center space-x-2">
        {hiddenInput}
        {switchNode}
        <span className="text-sm text-zinc-900 dark:text-zinc-100">
          {label}
        </span>
      </div>
    );
  }

  return (
    <>
      {hiddenInput}
      {switchNode}
    </>
  );
};

Switch.displayName = "Switch";

export { Switch };
