"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import { Input } from "@patternmode/input";
import { cx } from "@patternmode/utils/cx";
import React from "react";

/**
 * Combobox input component with render prop support.
 */
const ComboboxInput = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Input>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Input> & {
    render?: (props: {
      className?: string;
      ref?: React.RefObject<HTMLInputElement>;
      [key: string]: any;
    }) => React.ReactNode;
  }
>(({ className, render, ...props }) => (
  <BaseCombobox.Input
    className={className}
    render={
      render ||
      (({ className: inputClassName, ref: inputRef, ...renderProps }) => (
        <Input
          className={cx(
            inputClassName
          )}
          externalRef={inputRef as React.RefObject<HTMLInputElement>}
          minimal
          {...renderProps}
        />
      ))
    }
    {...props}
  />
));
ComboboxInput.displayName = "ComboboxInput";

export { ComboboxInput };
