"use client";

import { Input as BaseInput } from "@base-ui-components/react/input";
import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { formControlContainerVariants } from "@patternmode/constants/form-control-variants";
import { cx } from "@patternmode/utils/cx";
import { focusRing } from "@patternmode/utils/focus-ring";
import { Eye, EyeOff, Search } from "lucide-react";
import React from "react";
import type { InputProps } from "../types";
import { inputElementStyles } from "../variants";

const isPresent = (v: React.ReactNode) =>
  v !== undefined && v !== null && v !== "";

const getGapClassName = (size: InputProps["size"]) => {
  if (size === "xs" || size === "sm") return "gap-0.5";
  if (size === "base") return "gap-1";
  return "gap-1.5";
};

const getSidePadding = (
  side: "left" | "right",
  size: InputProps["size"],
  hasUnstyled: boolean
) => {
  const key = hasUnstyled ? "unstyled" : "styled";
  const map = {
    left: {
      unstyled: { xs: "pl-1", sm: "pl-1.5", base: "pl-2", lg: "pl-2.5" },
      styled: { xs: "pl-2", sm: "pl-2.5", base: "pl-3", lg: "pl-3.5" },
    },
    right: {
      unstyled: { xs: "pr-1", sm: "pr-1.5", base: "pr-2", lg: "pr-2.5" },
      styled: { xs: "pr-2", sm: "pr-2.5", base: "pr-3", lg: "pr-3.5" },
    },
  } as const;
  const normalizedSize = size === "2xs" ? "xs" : (size ?? "base");
  return map[side][key][normalizedSize];
};

const buildPrefix = (options: {
  prefix?: React.ReactNode;
  prefixText?: React.ReactNode;
  PrefixIcon?: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
  gapClassName: string;
  iconClassName: string;
  iconStrokeWidth: number;
  isSearch: boolean;
}) => {
  const {
    prefix,
    prefixText,
    PrefixIcon,
    gapClassName,
    iconClassName,
    iconStrokeWidth,
    isSearch,
  } = options;
  if (prefix || (prefixText && PrefixIcon)) {
    return (
      <div className={cx("flex items-center", gapClassName)}>
        {PrefixIcon ? (
          <PrefixIcon className={iconClassName} strokeWidth={iconStrokeWidth} />
        ) : null}
        {prefixText ? <span>{prefixText}</span> : null}
      </div>
    );
  }
  if (PrefixIcon)
    return (
      <PrefixIcon className={iconClassName} strokeWidth={iconStrokeWidth} />
    );
  if (isSearch && !isPresent(prefixText))
    return <Search className={iconClassName} />;
  return prefixText || prefix || undefined;
};

const buildPasswordToggle = (
  typeState: string | undefined,
  setTypeState: (v: string) => void,
  iconSize: Record<string, boolean>
) => (
  <button
    aria-label="Change password visibility"
    className={cx(
      "h-fit w-fit rounded-xs outline-hidden transition-all",
      "text-zinc-500 dark:text-zinc-400",
      "hover:text-zinc-600 dark:hover:text-zinc-300",
      focusRing
    )}
    onClick={() => {
      setTypeState(typeState === "password" ? "text" : "password");
    }}
    type="button"
  >
    <span className="sr-only">
      {typeState === "password" ? "Show password" : "Hide password"}
    </span>
    {typeState === "password" ? (
      <Eye aria-hidden="true" className={cx("shrink-0", iconSize)} />
    ) : (
      <EyeOff aria-hidden="true" className={cx("shrink-0", iconSize)} />
    )}
  </button>
);

const buildSuffix = (options: {
  suffix?: React.ReactNode;
  suffixText?: React.ReactNode;
  SuffixIcon?: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
  gapClassName: string;
  iconClassName: string;
  iconStrokeWidth: number;
  isPassword: boolean;
  typeState: string | undefined;
  setTypeState: (v: string) => void;
  iconSize: Record<string, boolean>;
}) => {
  const {
    suffix,
    suffixText,
    SuffixIcon,
    gapClassName,
    iconClassName,
    iconStrokeWidth,
    isPassword,
    typeState,
    setTypeState,
    iconSize,
  } = options;
  if (suffix || (suffixText && SuffixIcon)) {
    return (
      <div className={cx("flex items-center", gapClassName)}>
        {suffixText ? <span>{suffixText}</span> : null}
        {SuffixIcon ? (
          <SuffixIcon className={iconClassName} strokeWidth={iconStrokeWidth} />
        ) : null}
      </div>
    );
  }
  if (SuffixIcon)
    return (
      <SuffixIcon className={iconClassName} strokeWidth={iconStrokeWidth} />
    );
  if (isPassword && !isPresent(suffixText))
    return buildPasswordToggle(typeState, setTypeState, iconSize);
  return suffixText || suffix || undefined;
};

const Input = ({
  ref: forwardedRef,
  className,
  inputClassName,
  hasError,
  enableStepper: _enableStepper = true,
  size = "base",
  type,
  prefix,
  suffix,
  prefixText,
  prefixIcon: PrefixIcon,
  suffixText,
  suffixIcon: SuffixIcon,
  prefixStyling = true,
  suffixStyling = true,
  iconStrokeWidth = DEFAULT_ICON_STROKE_WIDTH,
  minimal,
  unstyled,
  externalRef,
  ...props
}: InputProps & {
  ref?: React.RefObject<React.ElementRef<typeof BaseInput> | null>;
}) => {
  const [typeState, setTypeState] = React.useState(type);
  const isPassword = type === "password";
  const isSearch = type === "search";

  const setInputRef = (node: React.ElementRef<typeof BaseInput> | null) => {
    if (forwardedRef && typeof forwardedRef !== "function") {
      (
        forwardedRef as React.MutableRefObject<React.ElementRef<
          typeof BaseInput
        > | null>
      ).current = node;
    }
    if (externalRef) {
      if (typeof externalRef === "function") {
        externalRef((node as unknown as HTMLInputElement) ?? null);
      } else {
        (
          externalRef as React.MutableRefObject<HTMLInputElement | null>
        ).current = (node as unknown as HTMLInputElement) ?? null;
      }
    }
  };

  const iconSize = {
    "size-3": size === "xs",
    "size-3.5": size === "sm",
    "size-4": size === "base",
    "size-5": size === "lg",
  };
  const iconClassName = cx(
    "shrink-0 text-zinc-500 dark:text-zinc-400",
    iconSize
  );
  const gapClassName = getGapClassName(size);

  const effectivePrefix = buildPrefix({
    prefix,
    prefixText,
    PrefixIcon,
    gapClassName,
    iconClassName,
    iconStrokeWidth,
    isSearch,
  });

  const effectiveSuffix = buildSuffix({
    suffix,
    suffixText,
    SuffixIcon,
    gapClassName,
    iconClassName,
    iconStrokeWidth,
    isPassword,
    typeState,
    setTypeState: (v) => setTypeState(v),
    iconSize,
  });

  const hasCustomPrefix = isPresent(effectivePrefix);
  const hasCustomSuffix = isPresent(effectiveSuffix);
  const hasUnstyledPrefix = hasCustomPrefix && !prefixStyling;
  const hasUnstyledSuffix = hasCustomSuffix && !suffixStyling;

  const leftPadding = getSidePadding("left", size, hasUnstyledPrefix);
  const rightPadding = getSidePadding("right", size, hasUnstyledSuffix);

  const containerClassName = cx(
    formControlContainerVariants({ size, hasError }),
    minimal && "bg-transparent border-transparent shadow-none",
    unstyled && "border-0 bg-transparent shadow-none",
    className
  );

  return (
    <div className={containerClassName} data-testid="input-container">
      {effectivePrefix && (
        <div
          className={cx(
            "pointer-events-none select-none items-center text-zinc-500 dark:text-zinc-400",
            "flex px-2",
            size === "xs" && "pl-1.5",
            size === "sm" && "pl-2",
            size === "base" && "pl-2.5",
            size === "lg" && "pl-3"
          )}
        >
          {effectivePrefix}
        </div>
      )}
      <BaseInput
        className={cx(inputElementStyles({ size }), leftPadding, rightPadding)}
        data-testid="input"
        ref={setInputRef}
        type={typeState}
        {...props}
      />
      {effectiveSuffix && (
        <div
          className={cx(
            "flex items-center text-zinc-500 dark:text-zinc-400",
            "px-2",
            size === "xs" && "pr-1.5",
            size === "sm" && "pr-2",
            size === "base" && "pr-2.5",
            size === "lg" && "pr-3"
          )}
        >
          {effectiveSuffix}
        </div>
      )}
    </div>
  );
};

Input.displayName = "Input";

export { Input };
