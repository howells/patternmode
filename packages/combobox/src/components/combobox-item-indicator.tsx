"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import { Icon } from "@patternmode/icon";
import { cx } from "@patternmode/utils/cx";
import { Check } from "lucide-react";
import React from "react";

/**
 * Combobox item indicator component (checkmark for selected items).
 */
const ComboboxItemIndicator = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.ItemIndicator>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.ItemIndicator> & {
    render?: (props: { className?: string }) => React.ReactNode;
  }
>(({ className, render, ...props }, ref) => (
  <BaseCombobox.ItemIndicator
    className={cx(
      "absolute right-2 flex size-3.5 items-center justify-center",
      className
    )}
    ref={ref}
    {...props}
  >
    {render ? (
      render({ className: "size-3.5" })
    ) : (
      <Icon className="size-3.5" icon={Check} size="xs" strokeWidth={2.5} />
    )}
  </BaseCombobox.ItemIndicator>
));
ComboboxItemIndicator.displayName = "ComboboxItemIndicator";

export { ComboboxItemIndicator };
