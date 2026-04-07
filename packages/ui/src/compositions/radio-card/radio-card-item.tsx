"use client";

import {
  InputCard,
  InputCardIcon,
} from "@patternmode/ui/compositions/input-card";
import type { LucideIcon } from "lucide-react";
import type React from "react";
import { useContext } from "react";
import { Radio } from "../../components/radio";
import { RadioCardContext } from "./radio-card-context";

export interface RadioCardItemProps
  extends Omit<React.ComponentProps<"div">, "value"> {
  /** Whether this radio is disabled */
  disabled?: boolean;
  /** Icon to display as indicator (overrides group-level icon) */
  icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Icon to display at the end of the card */
  suffixIcon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Value for this radio option (required for RadioGroup) */
  value: string;
}

/**
 * RadioCardItem UI component.
 * Import from "@patternmode/ui/compositions/radio-card".
 */
export function RadioCardItem({
  className,
  children,
  value,
  disabled,
  icon: itemIcon,
  suffixIcon,
  ...props
}: RadioCardItemProps) {
  const {
    showIndicator,
    size = "base",
    value: groupValue,
    disabled: groupDisabled,
    indicatorSide = "start",
    icon: groupIcon,
    showIconOnlyWhenSelected,
    onValueChange,
  } = useContext(RadioCardContext);

  const isSelected = groupValue === value;
  const isDisabled = disabled ?? groupDisabled ?? false;
  const icon = itemIcon ?? groupIcon;

  // Always render the Radio for form functionality (hidden when using icon)
  const radioElement = (
    <Radio
      className={
        icon || showIndicator === false
          ? "sr-only"
          : "pointer-events-none mt-0.5"
      }
      disabled={isDisabled}
      size="xs"
      value={value}
    />
  );

  // Render icon indicator (if using icon prop)
  const renderIcon = () => {
    if (!icon) {
      return null;
    }
    // If showIconOnlyWhenSelected is true, only render when selected
    if (showIconOnlyWhenSelected && !isSelected) {
      return null;
    }
    return <InputCardIcon icon={icon} selected={isSelected} size={size} />;
  };

  const renderSuffixIcon = () => {
    if (!suffixIcon) {
      return null;
    }
    return (
      <InputCardIcon icon={suffixIcon} selected={isSelected} size={size} />
    );
  };

  const contentElement = (
    <div className="flex min-w-0 flex-1 flex-col">{children}</div>
  );

  const handleClick = () => {
    if (isDisabled || isSelected) {
      return;
    }
    onValueChange?.(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isDisabled && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onValueChange?.(value);
    }
  };

  return (
    <InputCard
      aria-checked={isSelected}
      className={className}
      data-component="radio-card-item"
      data-disabled={isDisabled || undefined}
      data-slot="radio-card-item"
      disabled={isDisabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="radio"
      selected={isSelected}
      size={size}
      tabIndex={isDisabled ? -1 : 0}
    >
      <div {...props}>
        {/* Radio input always rendered (sr-only when using icon) */}
        {radioElement}
        {indicatorSide === "start" ? (
          <>
            {renderIcon()}
            {contentElement}
            {renderSuffixIcon()}
          </>
        ) : (
          <>
            {renderSuffixIcon()}
            {contentElement}
            {renderIcon()}
          </>
        )}
      </div>
    </InputCard>
  );
}
