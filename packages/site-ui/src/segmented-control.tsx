"use client";

export const SegmentedControl = <T extends string | number>({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: T) => void;
  options: { label: string; value: T }[];
  value: T;
}) => (
  <div className="segmented-field">
    <span>{label}</span>
    <div className="segmented-control">
      {options.map((option) => (
        <button
          aria-pressed={value === option.value}
          key={String(option.value)}
          onClick={() => {
            onChange(option.value);
          }}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>
);
