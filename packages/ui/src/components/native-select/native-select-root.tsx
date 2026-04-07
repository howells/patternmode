import type { ComponentPropsWithoutRef, SelectHTMLAttributes } from "react";

import type { ComponentSize } from "../../lib/size";
import { cn } from "../../utils/cn";
import { focusInput } from "../../utils/focus-input";

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-full"
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m4 6 4 4 4-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

const selectSizeClasses: Record<ComponentSize, string> = {
  sm: "h-10 px-3 text-[0.9rem]",
  base: "h-11 px-4 text-[0.95rem]",
  lg: "h-12 px-4.5 text-[1rem]",
};

export interface NativeSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  size?: ComponentSize;
}

function NativeSelect({
  className,
  size = "base",
  ...props
}: NativeSelectProps) {
  return (
    <div
      className="group/native-select relative w-full has-[select:disabled]:opacity-50"
      data-slot="native-select-wrapper"
    >
      <select
        className={cn(
          "w-full appearance-none rounded-[calc(var(--radius-md)-2px)] border border-border/80 bg-input pr-10 shadow-2xs",
          "text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/70",
          selectSizeClasses[size],
          focusInput(),
          className
        )}
        data-size={size}
        data-slot="native-select"
        {...props}
      />
      <span className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground">
        <ChevronDownIcon />
      </span>
    </div>
  );
}

function NativeSelectOption(props: ComponentPropsWithoutRef<"option">) {
  return <option data-slot="native-select-option" {...props} />;
}

function NativeSelectOptGroup(props: ComponentPropsWithoutRef<"optgroup">) {
  return <optgroup data-slot="native-select-optgroup" {...props} />;
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
