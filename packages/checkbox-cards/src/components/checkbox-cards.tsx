import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui-components/react/checkbox-group";
import { InputGrid } from "@patternmode/input-grid";
import type { ResponsiveValue } from "@patternmode/utils/responsive-utils";
import type {
  ResponsiveSpacing,
  SpacingValue,
} from "@patternmode/utils/spacing";
import React from "react";

type EventDetails = {
  reason: "none";
  event: Event;
  cancel: () => void;
  allowPropagation: () => void;
  isCanceled: boolean;
  isPropagationAllowed: boolean;
};

// Context for CheckboxCards configuration
type CheckboxCardsContextValue = {
  selectedValues?: string[];
};

const CheckboxCardsContext =
  React.createContext<CheckboxCardsContextValue | null>(null);

type CheckboxCardsProps = React.ComponentPropsWithoutRef<
  typeof BaseCheckboxGroup
> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseCheckboxGroup> | null>;
  columns?: ResponsiveValue<number>;
  gap?: ResponsiveSpacing<SpacingValue>;
};

/**
 * Card-style checkbox group with enhanced visual presentation for multiple selections.
 * Now uses the Grid component for better responsive layout control.
 */
const CheckboxCards = ({
  ref,
  className,
  columns = 2,
  gap = 2,
  value,
  onValueChange,
  ...props
}: CheckboxCardsProps & {
  onValueChange?: (value: string[]) => void;
}) => {
  const handleValueChange = React.useCallback(
    (newValues: unknown, eventDetails: EventDetails) => {
      const arrayValues: string[] = Array.isArray(newValues)
        ? newValues.filter((item): item is string => typeof item === "string")
        : [];
      onValueChange?.(arrayValues);
    },
    [onValueChange]
  );

  const contextValue = React.useMemo(
    () => ({
      selectedValues: Array.isArray(value)
        ? value.filter((item): item is string => typeof item === "string")
        : [],
    }),
    [value]
  );

  return (
    <CheckboxCardsContext.Provider value={contextValue}>
      <BaseCheckboxGroup
        className={typeof className === "function" ? className : undefined}
        data-testid="checkbox-cards"
        onValueChange={handleValueChange}
        ref={ref}
        value={value}
        {...props}
        render={
          <InputGrid
            className={typeof className === "string" ? className : "w-full"}
            columns={columns}
            gap={gap}
          />
        }
      >
        {props.children}
      </BaseCheckboxGroup>
    </CheckboxCardsContext.Provider>
  );
};
CheckboxCards.displayName = "CheckboxCards";

export { CheckboxCards };
export type { CheckboxCardsProps };
