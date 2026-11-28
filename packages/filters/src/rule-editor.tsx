"use client";

import { Menu } from "@base-ui/react/menu";
import { NumberField } from "@base-ui/react/number-field";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useEffectEvent, useRef, useState } from "react";

import { FilterOptions } from "./filter-options";
import {
  filterOperators,
  isBetweenDatesRule,
  isBetweenRule,
  isDateRule,
  isNumberRule,
  isOptionRule,
  isTextRule,
  operatorLabels,
  withOperator,
} from "./filter-rules";
import type {
  BetweenDatesRule,
  BetweenRule,
  DateRule,
  FilterRule,
  FilterSpec,
  NumberRule,
  TextRule,
} from "./filter-rules";

type Change = (rule: FilterRule) => void;

const DEFAULT_DEBOUNCE_MS = 150;

const NumberInput = ({
  autoFocus = false,
  label,
  onBlur,
  onChange,
  onEnter,
  placeholder,
  value,
}: {
  autoFocus?: boolean;
  label: string;
  onBlur?: () => void;
  onChange: (value: number | null) => void;
  onEnter?: () => void;
  placeholder: string;
  value: number | null;
}) => (
  <NumberField.Root
    className="patternmode-rule-editor__number-root"
    onValueChange={(next) => {
      onChange(next);
    }}
    value={value}
  >
    <NumberField.Group className="patternmode-rule-editor__number-group">
      <NumberField.Input
        aria-label={label}
        autoFocus={autoFocus}
        className="patternmode-rule-editor__input"
        onBlur={onBlur}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onEnter?.();
          }
        }}
        placeholder={placeholder}
      />
    </NumberField.Group>
  </NumberField.Root>
);

const RangeValue = ({
  delayMs,
  onChange,
  rule,
}: {
  delayMs: number;
  onChange: Change;
  rule: BetweenRule;
}) => {
  const [draft, setDraft] = useState<readonly [number | null, number | null]>(rule.value);
  const [given, setGiven] = useState(rule.value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (given[0] !== rule.value[0] || given[1] !== rule.value[1]) {
    setGiven(rule.value);
    setDraft(rule.value);
  }

  const commit = (next: readonly [number | null, number | null]) => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (next[0] !== rule.value[0] || next[1] !== rule.value[1]) {
      onChange({ operator: "between", value: [next[0], next[1]] });
    }
  };

  const commitFromEffect = useEffectEvent(commit);

  useEffect(() => {
    if (draft[0] === rule.value[0] && draft[1] === rule.value[1]) {
      return () => {
        // No pending draft.
      };
    }

    const timer = setTimeout(() => {
      timerRef.current = null;
      commitFromEffect(draft);
    }, delayMs);

    timerRef.current = timer;

    return () => {
      clearTimeout(timer);
      if (timerRef.current === timer) {
        timerRef.current = null;
      }
    };
  }, [delayMs, draft, rule.value]);

  const [min, max] = draft;

  return (
    <div className="patternmode-rule-editor__range">
      <NumberInput
        autoFocus
        label="From"
        onBlur={() => {
          commit(draft);
        }}
        onChange={(value) => {
          setDraft([value, max]);
        }}
        onEnter={() => {
          commit(draft);
        }}
        placeholder="From"
        value={min}
      />
      <span aria-hidden="true" className="patternmode-rule-editor__dash">
        –
      </span>
      <NumberInput
        label="To"
        onBlur={() => {
          commit(draft);
        }}
        onChange={(value) => {
          setDraft([min, value]);
        }}
        onEnter={() => {
          commit(draft);
        }}
        placeholder="To"
        value={max}
      />
    </div>
  );
};

const TextValue = ({
  delayMs,
  label,
  onChange,
  rule,
}: {
  delayMs: number;
  label: string;
  onChange: Change;
  rule: TextRule;
}) => {
  const [draft, setDraft] = useState(rule.value);
  const [given, setGiven] = useState(rule.value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (given !== rule.value) {
    setGiven(rule.value);
    if (rule.value !== draft) {
      setDraft(rule.value);
    }
  }

  const commit = (next: string) => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (next !== rule.value) {
      onChange({ operator: rule.operator, value: next });
    }
  };

  const commitFromEffect = useEffectEvent(commit);

  useEffect(() => {
    if (draft === rule.value) {
      return () => {
        // No pending draft.
      };
    }

    const timer = setTimeout(() => {
      timerRef.current = null;
      commitFromEffect(draft);
    }, delayMs);

    timerRef.current = timer;

    return () => {
      clearTimeout(timer);
      if (timerRef.current === timer) {
        timerRef.current = null;
      }
    };
  }, [delayMs, draft, rule.value]);

  return (
    <div className="patternmode-rule-editor__field">
      <input
        aria-label={`${label} ${operatorLabels[rule.operator]}`}
        autoFocus
        className="patternmode-rule-editor__input"
        onBlur={() => {
          commit(draft);
        }}
        onChange={(event) => {
          setDraft(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            commit(draft);
          }
        }}
        placeholder="Type a value"
        type="text"
        value={draft}
      />
    </div>
  );
};

const NumberValue = ({
  delayMs,
  label,
  onChange,
  rule,
}: {
  delayMs: number;
  label: string;
  onChange: Change;
  rule: NumberRule;
}) => {
  const [draft, setDraft] = useState<number | null>(rule.value);
  const [given, setGiven] = useState(rule.value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (given !== rule.value) {
    setGiven(rule.value);
    setDraft(rule.value);
  }

  const commit = (next: number | null) => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (next !== rule.value) {
      onChange({ operator: rule.operator, value: next });
    }
  };

  const commitFromEffect = useEffectEvent(commit);

  useEffect(() => {
    if (draft === rule.value) {
      return () => {
        // No pending draft.
      };
    }

    const timer = setTimeout(() => {
      timerRef.current = null;
      commitFromEffect(draft);
    }, delayMs);

    timerRef.current = timer;

    return () => {
      clearTimeout(timer);
      if (timerRef.current === timer) {
        timerRef.current = null;
      }
    };
  }, [delayMs, draft, rule.value]);

  return (
    <div className="patternmode-rule-editor__field">
      <NumberInput
        autoFocus
        label={`${label} ${operatorLabels[rule.operator]}`}
        onBlur={() => {
          commit(draft);
        }}
        onChange={setDraft}
        onEnter={() => {
          commit(draft);
        }}
        placeholder="Type a number"
        value={draft}
      />
    </div>
  );
};

const DateValue = ({
  label,
  onChange,
  rule,
}: {
  label: string;
  onChange: Change;
  rule: DateRule;
}) => (
  <div className="patternmode-rule-editor__field">
    <input
      aria-label={`${label} ${operatorLabels[rule.operator]}`}
      autoFocus
      className="patternmode-rule-editor__input"
      onChange={(event) => {
        onChange({ operator: rule.operator, value: event.target.value });
      }}
      type="date"
      value={rule.value}
    />
  </div>
);

const DateRangeValue = ({ onChange, rule }: { onChange: Change; rule: BetweenDatesRule }) => {
  const [min, max] = rule.value;

  return (
    <div className="patternmode-rule-editor__range">
      <input
        aria-label="From date"
        autoFocus
        className="patternmode-rule-editor__input"
        onChange={(event) => {
          const next = event.target.value === "" ? null : event.target.value;
          onChange({ operator: "between_dates", value: [next, max] });
        }}
        type="date"
        value={min ?? ""}
      />
      <span aria-hidden="true" className="patternmode-rule-editor__dash">
        –
      </span>
      <input
        aria-label="To date"
        className="patternmode-rule-editor__input"
        onChange={(event) => {
          const next = event.target.value === "" ? null : event.target.value;
          onChange({ operator: "between_dates", value: [min, next] });
        }}
        type="date"
        value={max ?? ""}
      />
    </div>
  );
};

const RuleValue = ({
  delayMs,
  label,
  onChange,
  rule,
  spec,
}: {
  delayMs: number;
  label: string;
  onChange: Change;
  rule: FilterRule;
  spec: FilterSpec;
}) => {
  if (isOptionRule(rule)) {
    return (
      <FilterOptions
        label={label.toLocaleLowerCase()}
        multiple
        onChange={(values) => {
          onChange({ operator: rule.operator, value: [...values] });
        }}
        options={spec.options}
        selected={rule.value}
      />
    );
  }

  if (isBetweenRule(rule)) {
    return <RangeValue delayMs={delayMs} onChange={onChange} rule={rule} />;
  }

  if (isBetweenDatesRule(rule)) {
    return <DateRangeValue onChange={onChange} rule={rule} />;
  }

  if (isDateRule(rule)) {
    return <DateValue label={label} onChange={onChange} rule={rule} />;
  }

  if (isTextRule(rule)) {
    return <TextValue delayMs={delayMs} label={label} onChange={onChange} rule={rule} />;
  }

  if (isNumberRule(rule)) {
    return <NumberValue delayMs={delayMs} label={label} onChange={onChange} rule={rule} />;
  }

  return null;
};

export interface RuleEditorProps {
  /** Debounce delay in ms for text and number rule edits. Defaults to 150. */
  delayMs?: number;
  label: string;
  onChange: Change;
  rule: FilterRule;
  spec: FilterSpec;
}

/** A filter chip's editor: the field label, its operator menu, then its value. */
export const RuleEditor = ({
  delayMs = DEFAULT_DEBOUNCE_MS,
  label,
  onChange,
  rule,
  spec,
}: RuleEditorProps) => {
  const operators = filterOperators[spec.kind];

  return (
    <>
      <div className="patternmode-rule-editor__header">
        <span className="patternmode-rule-editor__title">{label}</span>
        <Menu.Root>
          <Menu.Trigger className="patternmode-rule-editor__operator">
            {operatorLabels[rule.operator]}
            <ChevronDown aria-hidden="true" className="patternmode-filters-icon-xs" />
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner
              align="start"
              className="patternmode-filters-positioner"
              sideOffset={4}
            >
              <Menu.Popup className="patternmode-filters-menu">
                <Menu.RadioGroup
                  onValueChange={(value) => {
                    const operator = operators.find((option) => option === value);

                    if (operator !== undefined) {
                      onChange(withOperator(rule, operator));
                    }
                  }}
                  value={rule.operator}
                >
                  {operators.map((operator) => (
                    <Menu.RadioItem
                      className="patternmode-filters-menu__item"
                      key={operator}
                      value={operator}
                    >
                      <span className="patternmode-filters-menu__indicator">
                        <Menu.RadioItemIndicator>
                          <Check aria-hidden="true" className="patternmode-filters-icon-xs" />
                        </Menu.RadioItemIndicator>
                      </span>
                      {operatorLabels[operator]}
                    </Menu.RadioItem>
                  ))}
                </Menu.RadioGroup>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </div>
      <RuleValue
        delayMs={delayMs}
        key={rule.operator}
        label={label}
        onChange={onChange}
        rule={rule}
        spec={spec}
      />
    </>
  );
};
