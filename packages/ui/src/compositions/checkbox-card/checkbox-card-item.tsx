"use client";

import {
  InputCard,
  InputCardIcon,
} from "@patternmode/ui/compositions/input-card";
import type { CheckedState } from "@radix-ui/react-checkbox";
import type { LucideIcon } from "lucide-react";
import type React from "react";
import { useContext, useState } from "react";
import { Checkbox } from "../../components/checkbox";
import { CheckboxCardContext } from "./checkbox-card-context";

export interface CheckboxCardItemProps
  extends Omit<
    React.ComponentProps<"div">,
    "onChange" | "defaultChecked" | "defaultValue"
  > {
  /** Controlled checked state */
  checked?: CheckedState;
  /** Default checked state for uncontrolled usage */
  defaultChecked?: CheckedState;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Icon to display as indicator (overrides group-level icon) */
  icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Name for form submission */
  name?: string;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: CheckedState) => void;
  /** Whether the checkbox is required */
  required?: boolean;
  /** Icon to display at the end of the card */
  suffixIcon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Value for form submission */
  value?: string;
}

/**
 * CheckboxCardItem UI component.
 * Import from "@patternmode/ui/compositions/checkbox-card".
 * Built on Radix UI primitives for accessible behavior.
 */
export function CheckboxCardItem({
  className,
  children,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  value,
  name,
  required,
  icon: itemIcon,
  suffixIcon,
  ...props
}: CheckboxCardItemProps) {
  const {
    showIndicator,
    size = "base",
    indicatorSide = "start",
    icon: groupIcon,
    disabled: groupDisabled,
    name: groupName,
    onCheckedChange: onGroupCheckedChange,
    required: groupRequired,
    value: groupValue,
  } = useContext(CheckboxCardContext);

  // Item is disabled if explicitly disabled or group is disabled
  const isDisabled = disabled ?? groupDisabled ?? false;
  const icon = itemIcon ?? groupIcon;

  // Track internal state for uncontrolled mode to properly style the card
  const [internalChecked, setInternalChecked] = useState<CheckedState>(
    defaultChecked ?? false,
  );

  // Use controlled value if provided, otherwise use internal state
  let isChecked: CheckedState = internalChecked;
  if (checked !== undefined) {
    isChecked = checked;
  } else if (groupValue && value) {
    isChecked = groupValue.includes(value);
  }

  const handleCheckedChange = (state: CheckedState) => {
    if (checked === undefined) {
      setInternalChecked(state);
    }
    onCheckedChange?.(state);
    if (value) {
      onGroupCheckedChange?.(value, state === true);
    }
  };

  // Render indicator or icon
  const renderIndicatorOrIcon = () => {
    if (icon) {
      return (
        <InputCardIcon icon={icon} selected={isChecked === true} size={size} />
      );
    }

    if (showIndicator) {
      return (
        <Checkbox
          checked={isChecked}
          className="pointer-events-none mt-0.5"
          defaultChecked={defaultChecked}
          disabled={isDisabled}
          name={name ?? groupName}
          onCheckedChange={handleCheckedChange}
          required={required ?? groupRequired}
          size="xs"
          value={value}
        />
      );
    }

    return null;
  };

  const renderSuffixIcon = () => {
    if (!suffixIcon) {
      return null;
    }
    return (
      <InputCardIcon
        icon={suffixIcon}
        selected={isChecked === true}
        size={size}
      />
    );
  };

  const indicatorOrIcon = renderIndicatorOrIcon();
  const suffixIconElement = renderSuffixIcon();

  // Handle click/keyboard when there's no checkbox indicator
  const handleClick = () => {
    if (isDisabled) {
      return;
    }
    handleCheckedChange(!isChecked);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const content =
    indicatorSide === "start" ? (
      <>
        {indicatorOrIcon}
        {children}
        {suffixIconElement}
      </>
    ) : (
      <>
        {suffixIconElement}
        {children}
        {indicatorOrIcon}
      </>
    );

  return (
    <InputCard
      aria-checked={isChecked === true}
      className={className}
      data-component="checkbox-card-item"
      data-disabled={isDisabled || undefined}
      data-slot="checkbox-card-item"
      data-state={isChecked ? "checked" : "unchecked"}
      disabled={isDisabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="checkbox"
      selected={isChecked === true}
      size={size}
      tabIndex={0}
    >
      <div {...props}>{content}</div>
    </InputCard>
  );
}
