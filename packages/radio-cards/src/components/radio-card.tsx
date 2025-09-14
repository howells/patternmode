import { Radio } from "@base-ui-components/react/radio";
import type { InputCardProps } from "@patternmode/input-card";
import { InputCard } from "@patternmode/input-card";
import { cx } from "@patternmode/utils/cx";
import { selectionRing } from "@patternmode/utils/focus-ring";
import React from "react";
import { RadioCardsContext } from "../context";
import { RadioCardIndicator } from "./radio-card-indicator";

// Hook that safely handles missing context
const useRadioCardsSafe = () => {
  const context = React.useContext(RadioCardsContext);
  return {
    showIndicator: context?.showIndicator ?? true,
    selectedValue: context?.selectedValue,
  };
};

type RadioCardProps = {
  /**
   * The value this radio card represents in the group.
   * Must be unique within the RadioCards and is used to track selection state.
   */
  value: string;

  /**
   * Whether to show the radio indicator.
   * If not provided, will use the value from RadioCards context.
   * Useful when using RadioCard outside of RadioCards or for overriding context.
   */
  showIndicator?: boolean;

  /**
   * Additional CSS classes to apply to the card.
   */
  className?: string;

  /**
   * Name attribute for the underlying input element.
   */
  name?: string;

  /**
   * Whether the radio is required.
   */
  required?: boolean;
} & Omit<
  React.ComponentPropsWithoutRef<typeof Radio.Root>,
  "value" | "disabled" | "className" | "name" | "required"
> & {
    ref?: React.RefObject<React.ElementRef<typeof Radio.Root> | null>;
  } & Omit<InputCardProps, "input" | "showInput" | "children" | "className">;

/**
 * Individual radio card with enhanced styling and rich content support.
 * Uses render prop composition: Radio.Root → Card → content.
 * Each RadioCard spans 1 column in the parent Grid layout.
 */
const RadioCard = ({
  ref,
  className,
  children,
  showIndicator,
  value,
  disabled,
  ...props
}: RadioCardProps) => {
  // Get context values (safe hook that doesn't throw)
  const { showIndicator: contextShowIndicator, selectedValue } =
    useRadioCardsSafe();

  // Use explicit prop if provided, otherwise use context value
  const finalShowIndicator = showIndicator ?? contextShowIndicator;

  // Check if this card is selected
  const isSelected = selectedValue === value;

  // Separate Radio.Root props from InputCard props
  const {
    // Radio.Root props (these should be passed through)
    name,
    required,
    // InputCard props (these go to the card)
    ...cardProps
  } = props;

  return (
    <Radio.Root
      className={className ? `group ${className}` : "group"}
      disabled={disabled}
      name={name}
      nativeButton={false}
      ref={ref}
      render={
        <InputCard
          className={cx(
            className,
            // Apply selection ring when this radio is selected
            isSelected && selectionRing
          )}
          disabled={disabled}
          input={<RadioCardIndicator />}
          showInput={finalShowIndicator}
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

RadioCard.displayName = "RadioCard";

export { RadioCard };
export type { RadioCardProps };
