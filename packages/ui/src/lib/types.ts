/**
 * Utility type that adds testId prop to component props for Playwright testing.
 */
export type WithTestId<T> = T & {
  testId?: string;
};
