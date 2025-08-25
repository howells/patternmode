export type CalloutProps = {
  title?: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  variant?: "default" | "success" | "error" | "warning" | "neutral";
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

