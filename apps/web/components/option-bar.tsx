"use client";

export function OptionBar<T extends string | number>({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: T) => void;
  options: { label: string; value: T }[];
  value: T;
}) {
  return (
    <fieldset className="option-bar">
      <legend className="option-bar-label">{label}</legend>
      {options.map((option) => (
        <button
          aria-pressed={value === option.value}
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
}
