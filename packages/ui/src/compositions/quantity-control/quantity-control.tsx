"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../../components/button";
import { ButtonGroup, ButtonGroupText } from "../../components/button-group";

interface QuantityControlProps {
  /** Whether the control is disabled */
  disabled?: boolean;
  /** Maximum value (defaults to 99) */
  max?: number;
  /** Minimum value (defaults to 1) */
  min?: number;
  /** Called when decrement button is clicked (when value > 1) */
  onDecrement: () => void;
  /** Called when increment button is clicked */
  onIncrement: () => void;
  /** Called when remove button is clicked (when value = 1). If not provided, onDecrement is called instead. */
  onRemove?: () => void;
  /** Border radius style */
  radius?: "rounded" | "full";
  /** Test ID for the quantity display */
  testId?: string;
  /** Current quantity value */
  value: number;
}

/**
 * A compact quantity control with increment/decrement buttons.
 * Shows a trash icon when quantity is at minimum, minus icon otherwise.
 *
 * @example
 * ```tsx
 * <QuantityControl
 *   value={quantity}
 *   onIncrement={() => setQuantity(q => q + 1)}
 *   onDecrement={() => setQuantity(q => q - 1)}
 *   onRemove={() => removeItem()}
 * />
 * ```
 */
export function QuantityControl({
  value,
  onIncrement,
  onDecrement,
  onRemove,
  min = 1,
  max = 99,
  disabled = false,
  radius = "rounded",
  testId,
}: QuantityControlProps) {
  const isAtMin = value <= min;
  const isAtMax = value >= max;

  const handleDecrement = () => {
    if (isAtMin && onRemove) {
      onRemove();
    } else {
      onDecrement();
    }
  };

  return (
    <ButtonGroup dividers={false} radius={radius} variant="segmented">
      <Button
        aria-label={isAtMin && onRemove ? "Remove item" : "Decrease quantity"}
        disabled={disabled || (isAtMin && !onRemove)}
        icon={isAtMin && onRemove ? Trash2 : Minus}
        onClick={handleDecrement}
        size="icon-xs"
        variant="ghost"
      />
      <ButtonGroupText
        className="border-0 bg-transparent px-2 text-sm shadow-none"
        data-testid={testId}
      >
        {value}
      </ButtonGroupText>
      <Button
        aria-label="Increase quantity"
        disabled={disabled || isAtMax}
        icon={Plus}
        onClick={onIncrement}
        size="icon-xs"
        variant="ghost"
      />
    </ButtonGroup>
  );
}
