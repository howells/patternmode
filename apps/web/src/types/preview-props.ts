/**
 * Preview props interface for interactive component experimentation in previews
 */
export type PreviewProps = {
  name: string;
  type: unknown;
  description?: string;
  defaultValue?: unknown;
  required?: boolean;
  options?: unknown;
  min?: number;
  max?: number;
};

