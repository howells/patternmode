"use client";

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox";
import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { Icon } from "@patternmode/icon";
import { cx } from "@patternmode/utils/cx";
import { ChevronsUpDown } from "lucide-react";
import React from "react";

/**
 * Combobox icon component with render prop for custom icons.
 */
const ComboboxIcon = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Icon>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Icon> & {
    render?: (props: { className?: string }) => React.ReactNode;
    iconStrokeWidth?: number;
  }
>(
  (
    {
      className,
      render,
      iconStrokeWidth = DEFAULT_ICON_STROKE_WIDTH,
      ...props
    },
    ref
  ) => (
    <BaseCombobox.Icon className={cx("flex", className)} ref={ref} {...props}>
      {render ? (
        render({ className: "size-4" })
      ) : (
        <Icon
          className="size-4"
          icon={ChevronsUpDown}
          size="sm"
          strokeWidth={iconStrokeWidth}
        />
      )}
    </BaseCombobox.Icon>
  )
);
ComboboxIcon.displayName = "ComboboxIcon";

export { ComboboxIcon };
