import { Radio } from "@patternmode/radio";
import type { InputCardProps } from "@patternmode/input-card";
import { InputCard } from "@patternmode/input-card";
import { cx } from "@patternmode/utils/cx";
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
  React.ComponentPropsWithoutRef<any>,
  "value" | "disabled" | "className" | "name" | "required"
> & {
    ref?: React.RefObject<HTMLElement | null>;
  } & Omit<InputCardProps, "input" | "showInput" | "children" | "className">;

/**
 * Individual radio card with enhanced styling and rich content support.
 * Uses render prop composition: Radio.Root → Card → content.
 * Each RadioCard spans 1 column in the parent Grid layout.
 */
const RadioCard = ({
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
    <Radio
      className={className ? `group ${className}` : "group"}
      disabled={disabled}
      name={name}
      nativeButton={false}
      indicatorClassName="right-3 top-1/2 -translate-y-1/2"
      render={
        <InputCard
          className={cx(className)}
          disabled={disabled}
          showInput={false}
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
