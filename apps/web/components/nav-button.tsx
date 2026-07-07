"use client";

export interface NavButtonProps {
  direction: "previous" | "next";
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

/**
 * Reusable previous/next navigation control — a circular chevron button
 * matching the affordance used inside Aperto's media viewer. Position it via the
 * surrounding layout; style through the shared `.nav-button` class.
 */
export const NavButton = ({
  direction,
  onClick,
  disabled = false,
  label,
  className,
}: NavButtonProps) => {
  const isPrevious = direction === "previous";
  return (
    <button
      aria-label={label ?? (isPrevious ? "Previous" : "Next")}
      className={className === undefined ? "nav-button" : `nav-button ${className}`}
      data-direction={direction}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <svg
        aria-hidden="true"
        fill="none"
        height="18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="18"
      >
        <path d={isPrevious ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
      </svg>
    </button>
  );
};
