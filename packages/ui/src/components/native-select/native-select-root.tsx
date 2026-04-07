import { cn } from "@patternmode/ui/utils/cn";
import { focusInput } from "@patternmode/ui/utils/focus-input";
import { hasErrorInput } from "@patternmode/ui/utils/has-error-input";
import { ChevronDown } from "lucide-react";
import type * as React from "react";
import { Icon } from "../icon";

/**
 * NativeSelect UI component.
 * Import from "@patternmode/ui/components/native-select".
 */
function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <div
      className="group/native-select relative w-fit has-[select:disabled]:opacity-50"
      data-component="native-select-wrapper"
      data-slot="native-select-wrapper"
    >
      <select
        className={cn(
          "h-9 w-full min-w-0 appearance-none rounded-lg border border-border bg-input px-3 py-2 pr-9 text-sm shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed",
          focusInput(),
          hasErrorInput,
          className,
        )}
        data-component="native-select"
        data-slot="native-select"
        {...props}
      />
      <Icon
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 select-none opacity-50"
        data-component="native-select-icon"
        data-slot="native-select-icon"
        icon={ChevronDown}
        size="xs"
      />
    </div>
  );
}

/**
 * NativeSelectOption UI component.
 * Import from "@patternmode/ui/components/native-select".
 */
function NativeSelectOption({ ...props }: React.ComponentProps<"option">) {
  return (
    <option
      data-component="native-select-option"
      data-slot="native-select-option"
      {...props}
    />
  );
}

/**
 * NativeSelectOptGroup UI component.
 * Import from "@patternmode/ui/components/native-select".
 */
function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      className={cn(className)}
      data-component="native-select-optgroup"
      data-slot="native-select-optgroup"
      {...props}
    />
  );
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
