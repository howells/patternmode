/**
 * Provides consistent error styles for input-like components.
 * Supports both aria-invalid attribute and programmatic data-error attribute.
 */
export const hasErrorInput = [
  // aria-invalid (semantic)
  "aria-invalid:ring-[3px]",
  "aria-invalid:border-destructive",
  "aria-invalid:ring-destructive/20",
  "dark:aria-invalid:ring-destructive/40",
  // data-error (for Storybook)
  "data-[error=true]:ring-[3px]",
  "data-[error=true]:border-destructive",
  "data-[error=true]:ring-destructive/20",
  "dark:data-[error=true]:ring-destructive/40",
] as const;
