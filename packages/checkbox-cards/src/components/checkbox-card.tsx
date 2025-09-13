import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import { InputCard, type InputCardProps } from "@patternmode/input-card";
import { cx } from "@patternmode/utils/cx";
import { selectionRing } from "@patternmode/utils/focus-ring";
import React from "react";
import { CheckboxCardIndicator } from "./checkbox-card-indicator";

// Context type (duplicated from checkbox-cards.tsx for independence)
type CheckboxCardsContextValue = {
  selectedValues?: string[];
};

const CheckboxCardsContext =
  React.createContext<CheckboxCardsContextValue | null>(null);

// Hook that safely handles missing context
const useCheckboxCardsSafe = () => {
  const context = React.useContext(CheckboxCardsContext);
  return {
    selectedValues: context?.selectedValues || [],
  };
};

// Event details type for Base UI callbacks
type EventDetails = {
  reason: "none";
  event: Event;
  cancel: () => void;
  allowPropagation: () => void;
  isCanceled: boolean;
  isPropagationAllowed: boolean;
};

type CheckboxCardProps = {
  /**
   * The value this checkbox card represents in the group.
   * Must be unique within the CheckboxCards and is used to track selection state.
   */
  value: string;

  /**
   * Whether this checkbox card option is disabled.
   * When true, the card cannot be selected and displays with muted styling.
   */
  disabled?: boolean;

  /**
   * Whether this checkbox is checked.
   * For uncontrolled usage, this sets the initial checked state.
   */
  checked?: boolean;

  /**
   * Content to display inside the checkbox card.
   * Can include rich content like text, icons, pricing, descriptions, or any JSX elements.
   */
  children?: React.ReactNode;

  /**
   * Whether to show the checkbox indicator.
   * Defaults to true for backwards compatibility.
   */
  showIndicator?: boolean;

  /**
   * Additional CSS classes to apply to the card.
   */
  className?: string;

  /**
   * Callback fired when the checkbox state changes.
   */
  onCheckedChange?: (checked: boolean, eventDetails: EventDetails) => void;

  /**
   * Name attribute for the underlying input element.
   */
  name?: string;

  /**
   * Whether the checkbox is required.
   */
  required?: boolean;
} & Omit<InputCardProps, "input" | "showInput" | "children" | "className"> & {
    ref?: React.RefObject<React.ElementRef<typeof BaseCheckbox.Root> | null>;
  };

/**
 * Individual checkbox card with enhanced styling and rich content support.
 */
const CheckboxCard = ({
  ref,
  className,
  children,
  showIndicator = true,
  value,
  disabled,
  checked,
  onCheckedChange,
  name,
  required,
  ...cardProps
}: CheckboxCardProps) => {
  // Get context values (safe hook that doesn't throw)
  const { selectedValues } = useCheckboxCardsSafe();

  // Check if this card is selected
  const isSelected = selectedValues.includes(value);

  return (
    <BaseCheckbox.Root
      checked={checked}
      disabled={disabled}
      name={name}
      nativeButton={false}
      onCheckedChange={onCheckedChange}
      ref={ref}
      render={
        <InputCard
          className={cx(
            // Apply selection ring when this checkbox is checked
            isSelected && selectionRing,
            className
          )}
          disabled={disabled}
          input={<CheckboxCardIndicator />}
          showInput={showIndicator}
          {...cardProps}
        >
          {children}
        </InputCard>
      }
      required={required}
      value={value}
    />
  );
};
CheckboxCard.displayName = "CheckboxCard";

export { CheckboxCard };
export type { CheckboxCardProps };
