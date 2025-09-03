"use client";

import { Input as BaseInput } from "@base-ui-components/react/input";
import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { formControlContainerVariants } from "@patternmode/constants/form-control-variants";
import { cx } from "@patternmode/utils/cx";
import { focusRing } from "@patternmode/utils/focus-ring";
import { Eye, EyeOff, Search } from "lucide-react";
import React from "react";
import type { InputProps } from "./types";
import { inputElementStyles } from "./variants";

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
    // Assign to the component's forwarded ref (object ref only)
    if (forwardedRef && typeof forwardedRef !== "function") {
      (
        forwardedRef as React.MutableRefObject<React.ElementRef<
          typeof BaseInput
        > | null>
      ).current = node;
    }
    // Assign to external ref consumers (e.g., Base NumberField render-prop)
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
  const gapClassName = (() => {
    if (size === "xs" || size === "sm") return "gap-0.5";
    if (size === "base") return "gap-1";
    return "gap-1.5";
  })();

  let resolvedPrefix: React.ReactNode | undefined;
  if (prefix || (prefixText && PrefixIcon)) {
    resolvedPrefix = (
      <div className={cx("flex items-center", gapClassName)}>
        {PrefixIcon && (
          <PrefixIcon className={iconClassName} strokeWidth={iconStrokeWidth} />
        )}
        {prefixText && <span>{prefixText}</span>}
      </div>
    );
  } else if (PrefixIcon) {
    resolvedPrefix = (
      <PrefixIcon className={iconClassName} strokeWidth={iconStrokeWidth} />
    );
  } else {
    resolvedPrefix = prefixText || undefined;
  }

  let resolvedSuffix: React.ReactNode | undefined;
  if (suffix || (suffixText && SuffixIcon)) {
    resolvedSuffix = (
      <div className={cx("flex items-center", gapClassName)}>
        {suffixText && <span>{suffixText}</span>}
        {SuffixIcon && (
          <SuffixIcon className={iconClassName} strokeWidth={iconStrokeWidth} />
        )}
      </div>
    );
  } else if (SuffixIcon) {
    resolvedSuffix = (
      <SuffixIcon className={iconClassName} strokeWidth={iconStrokeWidth} />
    );
  } else {
    resolvedSuffix = suffixText || undefined;
  }

  const effectivePrefix =
    isSearch && !resolvedPrefix ? (
      <Search className={iconClassName} />
    ) : (
      resolvedPrefix
    );

  const effectiveSuffix =
    isPassword && !resolvedSuffix ? (
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
    ) : (
      resolvedSuffix
    );

  const hasCustomPrefix =
    effectivePrefix !== undefined &&
    effectivePrefix !== null &&
    effectivePrefix !== "";
  const hasCustomSuffix =
    effectiveSuffix !== undefined &&
    effectiveSuffix !== null &&
    effectiveSuffix !== "";
  const _hasBuiltInPrefix = false;
  const _hasBuiltInSuffix = false;

  const hasUnstyledPrefix = hasCustomPrefix && !prefixStyling;
  const hasUnstyledSuffix = hasCustomSuffix && !suffixStyling;

  const leftPadding = (() => {
    if (hasUnstyledPrefix) {
      if (size === "xs") return "pl-1";
      if (size === "sm") return "pl-1.5";
      if (size === "base") return "pl-2";
      return "pl-2.5";
    }
    if (size === "xs") return "pl-2";
    if (size === "sm") return "pl-2.5";
    if (size === "base") return "pl-3";
    return "pl-3.5";
  })();
  const rightPadding = (() => {
    if (hasUnstyledSuffix) {
      if (size === "xs") return "pr-1";
      if (size === "sm") return "pr-1.5";
      if (size === "base") return "pr-2";
      return "pr-2.5";
    }
    if (size === "xs") return "pr-2";
    if (size === "sm") return "pr-2.5";
    if (size === "base") return "pr-3";
    return "pr-3.5";
  })();

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
