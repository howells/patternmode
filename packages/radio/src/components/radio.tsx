import { Radio as BaseRadio } from "@base-ui-components/react/radio";
import { cx } from "@patternmode/utils/cx";
import { focusRing } from "@patternmode/utils/focus-ring";
import type React from "react";

export const Radio = ({
  className,
  children,
  indicatorClassName,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseRadio.Root> & {
  indicatorClassName?: string;
}) => {
  const propsAsRecord = props as Record<string, unknown>;
  const renderProp = propsAsRecord.render;
  const hasCustomRender = Object.hasOwn(props, "render") && renderProp != null;
  return (
    <BaseRadio.Root
      {...props}
      className={cx(
        "group relative",
        hasCustomRender
          ? null
          : [
              "inline-flex items-center justify-center",
              "size-4 rounded-full border-2 border-zinc-300 bg-white text-zinc-50 dark:border-zinc-600 dark:bg-zinc-950",
              "data-[checked]:border-transparent data-[checked]:bg-blue-500",
              focusRing,
            ],
        className
      )}
      data-testid="radio"
    >
      {children}
      {hasCustomRender ? (
        <span
          className={cx(
            "pointer-events-none absolute z-10 inline-flex size-4 items-center justify-center rounded-full border-2",
            "-translate-y-1/2 top-1/2 right-3",
            "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-950",
            "group-data-[checked]:border-transparent group-data-[checked]:bg-blue-500",
            indicatorClassName
          )}
        >
          <BaseRadio.Indicator className="flex items-center justify-center">
            <span className="block size-2 rounded-full bg-white dark:bg-zinc-50" />
          </BaseRadio.Indicator>
        </span>
      ) : (
        <BaseRadio.Indicator className="absolute inset-0 flex items-center justify-center">
          <span className="block size-2 rounded-full bg-white dark:bg-zinc-50" />
        </BaseRadio.Indicator>
      )}
    </BaseRadio.Root>
  );
};
Radio.displayName = "Radio";
