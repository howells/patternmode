import { Fieldset as BaseFieldset } from "@base-ui-components/react/fieldset";
import { Subheading } from "@patternmode/subheading";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";

type FieldsetProps = {
  children?: React.ReactNode;
  disabled?: boolean;
  name?: string;
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseFieldset.Root>;

const Fieldset = ({ className, ...props }: FieldsetProps) => (
  <BaseFieldset.Root
    className={cx("flex flex-col gap-4 border-0 p-0", "m-0", className)}
    data-testid="fieldset"
    {...props}
  />
);
Fieldset.displayName = "Fieldset";

type FieldsetLegendProps = {
  children?: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseFieldset.Legend>;

const FieldsetLegend = ({ className, ...props }: FieldsetLegendProps) => (
  <BaseFieldset.Legend
    className={cx(
      "font-medium text-lg leading-6",
      "text-zinc-900 dark:text-zinc-50",
      "border-b dark:border-zinc-800",
      "pb-3",
      "data-disabled:text-zinc-400 dark:data-disabled:text-zinc-600",
      className
    )}
    render={(legendProps) => <Subheading {...legendProps} />}
    {...props}
  />
);
FieldsetLegend.displayName = "FieldsetLegend";

export { Fieldset, FieldsetLegend, type FieldsetLegendProps, type FieldsetProps };

