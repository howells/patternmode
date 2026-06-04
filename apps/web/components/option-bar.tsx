"use client";

interface OptionBarProps<T extends string | number> {
  isPressed?: (value: T) => boolean;
  label: string;
  onChange: (value: T) => void;
  options: { label: string; value: T }[];
  value: T;
}

export const OptionBar = <T extends string | number>({
  isPressed,
  label,
  onChange,
  options,
  value,
}: OptionBarProps<T>) => (
  <fieldset className="option-bar">
    <legend className="option-bar-label">{label}</legend>
    {options.map((option) => (
      <button
        aria-pressed={isPressed ? isPressed(option.value) : value === option.value}
        className="option-bar-item"
        key={String(option.value)}
        onClick={() => onChange(option.value)}
        type="button"
      >
        {option.label}
      </button>
    ))}
  </fieldset>
);
